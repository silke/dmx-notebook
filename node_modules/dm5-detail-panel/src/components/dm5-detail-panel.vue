<template>
  <div class="dm5-detail-panel" v-if="visible_"><!-- background is already shown for the sake of feedback -->
    <el-button v-if="!noPinButton" :class="['pin', {unpinned: !pinned_}, 'fa', 'fa-thumb-tack']" type="text"
      :title="pinTitle" @click="togglePinned">
    </el-button>
    <el-tabs v-if="object_" :value="tab_" @tab-click="tabClick"><!-- tabs are shown once object arrives -->
      <el-tab-pane :label="object_.typeName" name="info">
        <dm5-info-tab :object="object_" :writable="writable_" :mode="mode_" :detail-renderers="detailRenderers"
          :types="types_" :quill-config="quillConfig" @edit="edit" @submit="submit" @submit-inline="submitInline"
          @child-topic-reveal="revealChildTopic" ref="infoTab">
        </dm5-info-tab>
      </el-tab-pane>
      <el-tab-pane label="Related" name="related">
        <dm5-related-tab :object="object_" :tab="tab_" :sort-mode="sortMode" :marker-ids="markerIds_"
          @related-topic-click="relatedTopicClick" @related-icon-click="relatedIconClick" @sort-change="sortChange">
        </dm5-related-tab>
      </el-tab-pane>
      <el-tab-pane label="Meta" name="meta">
        <dm5-meta-tab :object="object_" :writable="writable_" :tab="tab_" :marker-ids="markerIds_"
          @related-topic-click="relatedTopicClick" @related-icon-click="relatedIconClick"
          @object-id-click="objectIdClick">
        </dm5-meta-tab>
      </el-tab-pane>
      <el-tab-pane label="View" name="view" :disabled="!viewConfigTopic">
        <dm5-view-tab :view-config-topic="viewConfigTopic" :writable="writable_" :detail-renderers="detailRenderers"
          v-if="viewConfigTopic" @submit-view-config="submitViewConfig">
        </dm5-view-tab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import dm5 from 'dm5'

export default {

  created () {
    // console.log('dm5-detail-panel created', this.types)
  },

  destroyed () {
    // console.log('dm5-detail-panel destroyed')
  },

  mixins: [
    require('./mixins/writable').default,
    require('./mixins/mode-default').default,
    require('./mixins/detail-renderers').default
  ],

  props: {
    visible: {type: Boolean, default: true},    // Trueish if the detail panel is visible. Optional. Default is true.
    pinned: {type: Boolean, default: false},    // Pin toggle state
    tab: {type: String, default: 'info'},       // The selected tab: 'info', 'related', ... Optional. Default is 'info'.
    object: dm5.DMXObject,                      // The topic/assoc to display. Undefined if data not yet available.
    markerIds: Array,                           // Optional: IDs of topics to render as "marked" in related-tab.
    types: Object,                              // Optional: "assocTypes" and "roleTypes" (arrays)
    quillConfig: Object,
    noPinButton: Boolean
  },

  data () {
    return {
      sortMode: 'type',                         // Related tab sort mode: 'topic', 'type', 'assoc'
      // mirror props ### FIXME: add remaining props?
      visible_:   this.visible,
      pinned_:    this.pinned,
      tab_:       this.tab,
      object_:    this.object,
      writable_:  this.writable,
      mode_:      this.mode,
      markerIds_: this.markerIds,
      types_:     this.types
    }
  },

  computed: {

    pinTitle () {
      return this.pinned_ ? 'Unpin Detail Panel\n\nIf unpinned, the detail panel closes if nothing is selected' :
        'Pin Detail Panel\n\nIf pinned, the detail panel remains open even if nothing is selected'
    },

    viewConfigTopic () {
      // console.log('viewConfigTopic', this.object_)
      if (this.object_ && (this.object_.isType() || this.object_.isCompDef())) {
        const viewConfig = this.object_.viewConfig
        if (!viewConfig) {
          console.warn('Type or comp def has no view config', this.object_)
          return
        }
        const viewConfigTopic = viewConfig['dmx.webclient.view_config']
        if (!viewConfigTopic) {
          console.warn('Type or comp def has no view config topic', this.object_)
          return
        }
        return viewConfigTopic
      }
    }
  },

  watch: {
    // needed when instantiated via template
    object   () {this.object_   = this.object},
    writable () {this.writable_ = this.writable},
    tab      () {this.tab_      = this.tab},
    mode     () {this.mode_     = this.mode}
    // FIXME: add watchers for the remaining props?
  },

  methods: {

    tabClick (tabPane) {
      this.$emit('tab-click', tabPane.name)
    },

    edit () {
      this.$emit('edit')
    },

    submit (object) {
      this.$emit('submit', object)
    },

    submitInline (object) {
      this.$emit('submit-inline', object)
    },

    submitViewConfig (viewConfigTopic) {
      this.$emit('submit-view-config', viewConfigTopic)
    },

    revealChildTopic (relTopic) {
      this.$emit('child-topic-reveal', relTopic)
    },

    relatedTopicClick (relTopic) {
      this.$emit('related-topic-click', relTopic)
    },

    relatedIconClick (relTopic) {
      this.$emit('related-icon-click', relTopic)
    },

    objectIdClick (object) {
      this.$emit('object-id-click', object)
    },

    togglePinned () {
      this.$emit('pin', !this.pinned_)
    },

    sortChange (sortMode) {
      this.sortMode = sortMode
    },

    // Public API

    isDirty () {
      return this.$refs.infoTab.isDirty()
    },

    save () {
      this.$refs.infoTab.submitInline()
    }
  },

  components: {
    'dm5-info-tab':    require('./dm5-info-tab').default,
    'dm5-related-tab': require('./dm5-related-tab').default,
    'dm5-meta-tab':    require('./dm5-meta-tab').default,
    'dm5-view-tab':    require('./dm5-view-tab').default
  }
}
</script>

<style>
.dm5-detail-panel .el-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dm5-detail-panel .el-tabs__header {
  margin: 0;                            /* was 0 0 15px */
  padding-left:  12px;
}

.dm5-detail-panel .el-tabs__header .el-tabs__item {
  font-size: var(--label-font-size);    /* was 14px */
  color: var(--label-color);            /* was #303133 (Element UI --color-text-primary) */
  height: 36px;                         /* was 40px */
  line-height: 36px;                    /* was 40px */
  padding: 0 12px;                      /* was 0 20px */
}

.dm5-detail-panel .el-tabs__header .el-tabs__item:hover {
  color: var(--highlight-color);        /* restore original Element UI active color as accidentally */
}                                       /* overridden by previous rule due to higher specificity    */

.dm5-detail-panel .el-tabs__header .el-tabs__item.is-active {
  color: var(--highlight-color);        /* restore original Element UI active color as accidentally */
}                                       /* overridden by previous rule due to higher specificity    */

.dm5-detail-panel .el-tabs__header .el-tabs__item.is-disabled {
  color: var(--label-color-disabled);   /* restore original Element UI disabled color as accidentally */
}                                       /* overridden by previous rule due to higher specificity      */

.dm5-detail-panel .el-tabs__content,
.dm5-detail-panel .el-tabs__content .el-tab-pane {
  display: flex;
  flex-direction: column;
}

.dm5-detail-panel .el-tabs__content .el-tab-pane {
  min-height: 0;  /* Needed for children of a column-oriented flex container. Otherwise el-tab-pane exceeds viewport. */
                  /* http://stackoverflow.com/questions/26895349/how-can-i-get-ff-33-x-flexbox-behavior-in-ff-34-x    */
                  /* https://www.w3.org/TR/css-flexbox-1/#min-size-auto                                               */
}

.dm5-detail-panel button.pin {
  position: absolute;
  top: 10px;
  right: 6px;
  font-size: 16px !important;
  padding: 0 !important;
  z-index: 3;                           /* stack above el-tabs__nav */
}

.dm5-detail-panel button.pin.unpinned {
  color: transparent;
  font-size: 15px !important;
  -webkit-text-stroke: 1px var(--highlight-color);
}
</style>
