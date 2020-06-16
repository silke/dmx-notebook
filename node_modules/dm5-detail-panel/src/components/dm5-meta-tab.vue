<template>
  <div class="dm5-meta-tab">
    <div class="flex">
      <div>
        <div class="field-label">ID</div>
        <el-link type="primary" :underline="false" title="Show JSON" @click="idClick">{{object.id}}</el-link>
      </div>
      <div>
        <div class="field-label">URI</div>
        <div>{{object.uri || 'n/a'}}</div>
      </div>
    </div>
    <div class="flex">
      <div>
        <div class="field-label">Created</div>
        <div>{{created || 'n/a'}}</div>
      </div>
      <div>
        <div class="field-label">User</div>
        <div>{{creator || 'n/a'}}</div>
      </div>
    </div>
    <div class="flex">
      <div>
        <div class="field-label">Modified</div>
        <div>{{modified || 'n/a'}}</div>
      </div>
      <div>
        <div class="field-label">User</div>
        <div>{{modifier || 'n/a'}}</div>
      </div>
    </div>
    <!-- Workspace -->
    <div class="flex">
      <div>
        <div class="field-label">Workspace</div>
        <dm5-inline-edit :disabled="!writable" @save="assignToWorkspace">
          <template #info>
            <div>{{workspace && workspace.value || 'n/a'}}</div>
          </template>
          <template #form>
            <dm5-workspace-select :workspace="workspace" ref="workspaceSelect"></dm5-workspace-select>
          </template>
        </dm5-inline-edit>
      </div>
      <div>
        <div class="field-label">Owner</div>
        <div>{{owner || 'n/a'}}</div>
      </div>
    </div>
    <!-- Type -->
    <dm5-topic-list :topics="types" no-sort-menu :marker-ids="markerIds"
      @topic-click="topicClick" @icon-click="iconClick">
    </dm5-topic-list>
    <!-- Topicmaps -->
    <dm5-topic-list :topics="topicmapTopics" no-sort-menu :marker-ids="markerIds"
      @topic-click="topicClick" @icon-click="iconClick">
    </dm5-topic-list>
  </div>
</template>

<script>
import dm5 from 'dm5'

export default {

  created () {
    // console.log('dm5-meta-tab created')
    this.fetchMetaData()
  },

  destroyed () {
    // console.log('dm5-meta-tab destroyed')
  },

  mixins: [
    require('./mixins/object').default,
    require('./mixins/writable').default
  ],

  props: {
    tab: {type: String, required: true},    // The selected tab: 'info', 'related', ...
    markerIds: Array                        // IDs of topics to render as "marked"
  },

  data () {
    return {
      created:   undefined,
      modified:  undefined,
      creator:   undefined,
      modifier:  undefined,
      workspace: undefined,
      owner:     undefined,
      types: [],
      topicmapTopics: []
    }
  },

  watch: {

    object () {
      // console.log('object watcher', this.object.id)
      this.fetchMetaData()
    },

    tab () {
      // TODO: suppress unnecessary refetching when browsing between tabs and revisit the "Meta" tab
      // TODO: why is tab watcher needed at all?
      // console.log('tab watcher', this.tab)
      this.fetchMetaData()
    }
  },

  methods: {

    fetchMetaData () {
      // console.log('fetchMetaData', this.object.id, this.tab === 'meta')
      // don't fetch if "Meta" tab is not selected
      if (this.tab !== 'meta') {
        return
      }
      this.object.getCreationTime()
        .then(created => this.created = created && new Date(created).toLocaleString())
      this.object.getModificationTime()
        .then(modified => this.modified = modified && new Date(modified).toLocaleString())
      this.object.getCreator()
        .then(creator => this.creator = creator)
      this.object.getModifier()
        .then(modifier => this.modifier = modifier);
      // if the selected object is a workspace the workspace is the object itself
      (this.object.typeUri === 'dmx.workspaces.workspace' ? Promise.resolve(this.object) : this.object.getWorkspace())
        .then(workspace => this.workspace = workspace)
        .then(workspace => {
          if (workspace) {
            dm5.restClient.getWorkspaceOwner(workspace.id).then(owner => this.owner = owner)
          } else {
            this.owner = undefined
          }
        })
      // manual traversal gives us a RelatedTopic as needed for revelation
      this.object.getRelatedTopics({
        assocTypeUri:      'dmx.core.instantiation',
        myRoleTypeUri:     'dmx.core.instance',
        othersRoleTypeUri: 'dmx.core.type'
      }).then(types => this.types = types)
      this.object.getTopicmapTopics().then(topicmapTopics => this.topicmapTopics = topicmapTopics)
    },

    assignToWorkspace () {
      this.workspace = this.$refs.workspaceSelect.workspace_    // update client state
      console.log('assignToWorkspace', this.workspace.id)
      this.object.assignToWorkspace(this.workspace.id)          // update server
      // TODO: process directives
    },

    topicClick (relTopic) {
      this.$emit('related-topic-click', relTopic)
    },

    iconClick (relTopic) {
      this.$emit('related-icon-click', relTopic)
    },

    idClick () {
      this.$emit('object-id-click', this.object)
    }
  },

  components: {
    'dm5-topic-list':       require('dm5-topic-list').default,
    'dm5-inline-edit':      require('dm5-inline-edit').default,
    'dm5-workspace-select': require('./dm5-workspace-select').default
  }
}
</script>

<style>
.dm5-meta-tab {
  overflow: auto;
  padding: var(--detail-panel-padding-all);
}

.dm5-meta-tab .flex {
  display: flex;
}

.dm5-meta-tab .flex > div + div {
  margin-left: 2.5em;
}

.dm5-meta-tab .flex + .flex,
.dm5-meta-tab .dm5-topic-list {
  margin-top: var(--field-spacing);
}
</style>
