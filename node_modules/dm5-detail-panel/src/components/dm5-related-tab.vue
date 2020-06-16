<template>
  <div class="dm5-related-tab">
    <dm5-topic-list v-if="!loading" :topics="topics" :sort-mode="sortMode" :marker-ids="markerIds"
      @topic-click="topicClick" @icon-click="iconClick" @sort-change="sortChange">
    </dm5-topic-list>
    <div v-else v-loading="true" class="dm5-spinner"></div>
  </div>
</template>

<script>
export default {

  created () {
    // console.log('dm5-related-tab created', this.markerIds)
    this.fetchTopics()
  },

  destroyed () {
    // console.log('dm5-related-tab destroyed')
  },

  mixins: [
    require('./mixins/object').default
  ],

  props: {
    tab: {type: String, required: true},    // The selected tab: 'info', 'related', ...
    sortMode: String,                       // topic list sort mode: 'topic', 'type', 'assoc'
    markerIds: Array                        // IDs of topics to render as "marked"
  },

  data () {
    return {
      topics: [],
      loading: false
    }
  },

  watch: {

    object () {
      this.topics = []        // enforce refetch
      this.fetchTopics()
    },

    tab () {
      this.fetchTopics()
    }
  },

  methods: {

    fetchTopics () {
      // console.log('fetchTopics', this.object.id, this.tab === 'related', !this.topics.length)
      // fetch only if "Related" tab is selected AND not fetched already
      if (this.tab === 'related' && !this.topics.length) {
        this.loading = true
        this.object.getRelatedTopicsWithoutChilds().then(topics => {
          this.topics = topics
          this.loading = false
        })
      }
    },

    topicClick (relTopic) {
      this.$emit('related-topic-click', relTopic)
    },

    iconClick (relTopic) {
      this.$emit('related-icon-click', relTopic)
    },

    sortChange (sortMode) {
      this.$emit('sort-change', sortMode)
    }
  },

  components: {
    'dm5-topic-list': require('dm5-topic-list').default
  }
}
</script>

<style>
.dm5-related-tab {
  overflow: auto;
  padding: var(--detail-panel-padding-all);
}

.dm5-related-tab .dm5-spinner {
  height: 42px;               /* see --loading-spinner-size in element-ui/packages/theme-chalk/src/common/var.scss */
}

.dm5-related-tab .dm5-spinner .el-loading-mask{
  background-color: unset;    /* no white mask */
}
</style>
