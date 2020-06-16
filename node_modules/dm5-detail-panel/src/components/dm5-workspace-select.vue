<template>
  <el-select class="dm5-workspace-select" v-model="workspace_">
    <el-option v-for="workspace in workspaces" :label="workspace.value" :value="workspace"
      :disabled="!workspace.writable" :key="workspace.id">
    </el-option>
  </el-select>
</template>

<script>
import dm5 from 'dm5'
import Vue from 'vue'

export default {

  created () {
    this.initWorkspaces()
  },

  props: {
    workspace: {type: Object, required: true}
  },

  data () {
    return {
      workspaces: [],               // all workspaces (array of dm5.Topic)
      workspace_: this.workspace    // selected workspace (dm5.Topic)
    }
  },

  methods: {
    initWorkspaces () {
      dm5.restClient.getTopicsByType('dmx.workspaces.workspace').then(workspaces => {
        this.workspaces = workspaces.sort((w1, w2) => w1.value.localeCompare(w2.value))
        // set writable flags
        workspaces.forEach(workspace => {
          workspace.isWritable().then(writable => {
            Vue.set(workspace, 'writable', writable)
          })
        })
      })
    }
  }
}
</script>

<style>
</style>
