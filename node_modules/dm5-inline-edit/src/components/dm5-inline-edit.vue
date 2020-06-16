<template>
  <div :class="['dm5-inline-edit', mode, {disabled}]">
    <slot name="info" v-if="infoMode"></slot>
    <slot name="form" v-if="formMode"></slot>
    <!-- Edit Button -->
    <el-button class="edit fa fa-pencil" v-if="infoMode" type="text" @click="edit"></el-button>
    <!-- Save Button -->
    <el-button class="save-button" v-if="formMode" @click.stop="save">Save</el-button>
  </div>
</template>

<script>
export default {

  mixins: [
    require('./mixins/info-mode').default
  ],

  props: {
    disabled: Boolean     // is inline edit disabled?
  },

  data () {
    return {
      mode: 'info'        // 'info' or 'form'
    }
  },

  methods: {

    edit () {
      this.mode = 'form'
    },

    save () {
      this.mode = 'info'
      this.$emit('save')
    }
  }
}  
</script>

<style>
.dm5-inline-edit {
  position: relative;     /* for absolute positioned "edit" button */
}

.dm5-inline-edit.disabled {
  pointer-events: none;
}

.dm5-inline-edit.info:hover {
  background-color: white;
}

/* Edit Button */

.dm5-inline-edit button.edit {
  position: absolute;
  bottom: 0;
  right: -12px;
  visibility: hidden;
  padding: 0 !important;
}

.dm5-inline-edit:hover button.edit {
  visibility: visible;
}
</style>
