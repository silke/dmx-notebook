<template>
  <div class="dm5-info-tab">
    <dm5-object-renderer :object="objectToRender" :writable="writable" :mode="mode"
      :renderers="detailRenderers" :types="types" :quill-config="_quillConfig"
      @inline="setInlineId" @submit="submit" @child-topic-reveal="revealChildTopic">
    </dm5-object-renderer>
    <div>
      <!-- Wrapper div fixes button height. Somehow an el-button does not like to be a flex item. -->
      <el-button class="button" v-if="buttonVisibility" :disabled="buttonDisabled" :title="buttonTitle"
        @click="buttonAction">{{buttonLabel}}
      </el-button>
    </div>
  </div>
</template>

<script>
import dm5 from 'dm5'

export default {

  created () {
    // console.log('dm5-info-tab created')
  },

  destroyed () {
    // console.log('dm5-info-tab destroyed')
  },

  mixins: [
    require('./mixins/object').default,
    require('./mixins/writable').default,
    require('./mixins/mode').default,
    require('./mixins/info-mode').default,
    require('./mixins/detail-renderers').default
  ],

  props: {
    types: Object,              // Optional: "assocTypes" and "roleTypes" (arrays)
    quillConfig: Object
  },

  data () {
    return {
      objectToEdit: undefined,      // the edit buffer
      objectToCompare: undefined,   // used for dirty check
      inlineId: undefined   // trueish if inline edit is active in this object or in *any* child topic (recursively)
    }
  },

  computed: {

    objectToRender () {
      // console.log('objectToRender', this.object.id, this.mode)
      if (this.infoMode) {
        this.objectToEdit = undefined     // reset dirty state, see isDirty()
        return this.object
      } else {
        this.objectToCompare = this.object.clone().fillChildren()
        this.objectToEdit = this.objectToCompare.clone()
        return this.objectToEdit
      }
    },

    buttonLabel () {
      return this.infoMode ? 'Edit' : 'Save'
    },

    buttonVisibility () {
      return this.writable && !this.inlineId
    },

    // copy in dm5-object-renderer.vue (as editDisabled())
    buttonDisabled () {
      // only entity topics are enabled; assocs and types are always enabled
      return this.object.isTopic() && !this.object.isType() && !this.object.type.isEntity()
    },

    buttonTitle () {
      const typeName = this.object.typeName
      return this.buttonDisabled && `A ${typeName} is immutable as "${typeName}" is a value type. ` +
        'Edit the parent context instead.'
    },

    // principle copy in dm5-detail.vue (dm5-topicmap-panel)
    _quillConfig () {
      const _quillConfig = dm5.utils.clone(this.quillConfig)
      _quillConfig.options.bounds = '.dm5-detail-panel'
      return _quillConfig
    }
  },

  methods: {

    buttonAction () {
      if (this.infoMode) {
        this.$emit('edit')
      } else {
        this.submit()
      }
    },

    setInlineId (id) {
      this.inlineId = id
      if (!id) {
        // TODO: introduce edit buffer also for inline editing?
        this.$emit('submit-inline', this.object)
      }
    },

    submit () {
      this.$emit('submit', this.objectToEdit)
    },

    submitInline () {
      this.$emit('submit-inline', this.objectToEdit)
    },

    revealChildTopic (relTopic) {
      this.$emit('child-topic-reveal', relTopic)
    },

    // Public API

    isDirty () {
      return this.objectToEdit && !this.objectToEdit.equals(this.objectToCompare)
    }
  },

  components: {
    'dm5-object-renderer': require('dm5-object-renderer').default
  }
}
</script>

<style>
.dm5-info-tab {
  display: flex;
  flex-direction: column;
  min-height: 0; /* Needed for children of a column-oriented flex container. Otherwise dm5-info-tab exceeds viewport. */
                 /* http://stackoverflow.com/questions/26895349/how-can-i-get-ff-33-x-flexbox-behavior-in-ff-34-x     */
                 /* https://www.w3.org/TR/css-flexbox-1/#min-size-auto                                                */
}

.dm5-info-tab .dm5-object-renderer {
  overflow: auto;
  padding: var(--detail-panel-padding-all);
}

.dm5-info-tab .button {
  margin: var(--detail-panel-padding);
}
</style>
