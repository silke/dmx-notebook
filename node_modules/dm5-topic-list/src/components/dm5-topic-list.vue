<template>
  <div class="dm5-topic-list">
    <div class="field-label" v-if="!noSortMenu">{{sortLabel}}</div>
    <template v-if="size">
      <el-select class="sort-menu" :value="sortMode" v-if="!noSortMenu" @input="sortChange">
        <el-option label="Topic" value="topic"></el-option>
        <el-option label="Topic Type" value="type"></el-option>
        <el-option label="Association Type" value="assoc" v-if="isRelTopics"></el-option>
      </el-select>
      <div class="group" v-for="group in groups">
        <div class="field-label" v-if="!topicSort">{{group.title}} ({{group.topics.length}})</div>
        <div>
          <!-- Note: the same topic might appear more than once (e.g. in a "what's related" list).
               In order to avoid a key clash we use the loop index. -->
          <dm5-topic v-for="(topic, i) in group.topics" :topic="topic" :omit="omit" :class="{'marked': marked(topic)}"
            :key="i" @click.native="click(topic)" @icon-click="iconClick(topic)">
          </dm5-topic>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dm5 from 'dm5'

export default {

  created () {
    // console.log('dm5-topic-list created', this.topics, this.topics.length)
  },

  props: {
    topics: {
      type: Array,
      required: true,     // TODO: don't require?
      validator: topics => topics.every(topic => {
        const ok = topic instanceof dm5.Topic
        !ok && console.warn('"topics" array passed to dm5-topic-list contains a non-topic element:', topic, '(' +
          topic.constructor.name + ')')
        return ok
      })
    },
    sortMode: {
      type: String,
      default: 'type'     // topic list sort mode: 'topic', 'type', 'assoc'
    },
    noSortMenu: Boolean,
    emptyText: String,
    markerIds: Array      // IDs of topics to render as "marked"
  },

  data () {
    return {
      emptyTextDefault: 'No Data'
    }
  },

  computed: {

    size () {
      return this.topics.length
    },

    sortLabel () {
      return this.size ? `${this.size} Topics, sorted by` : this.emptyText || this.emptyTextDefault
    },

    isRelTopics () {
      return this.topics[0] instanceof dm5.RelatedTopic
    },

    groups () {
      const groups = []
      // Note: as "topics" is reactive state in-place sorting would trigger re-computation of "groups" ad infinitum
      const _topics = this.topics.slice()   // shallow copy
      _topics.sort(this.compareFn)          // in-place sort
      if (this.topicSort) {
        // no grouping (put all topics in one group)
        groups.push({topics: _topics})
      } else {
        // do grouping
        const select = selectFn[this.sortMode]
        let title   // current title
        let group   // current group
        _topics.forEach(topic => {
          const _title = startGroup()
          if (_title) {
            // start new group
            title = _title
            group = {title, topics: [topic]}
            groups.push(group)
          } else {
            // append to current group
            group.topics.push(topic)
          }

          function startGroup () {
            const _title = select(topic)
            return _title !== title && _title
          }
        })
      }
      return groups
    },

    compareFn () {
      const select = selectFn[this.sortMode]
      return (t1, t2) => {
        const v1 = select(t1)
        const v2 = select(t2)
        if (v1 === v2) {
          // topics belong to same group -- compare topic values
          return t1.value.localeCompare ? t1.value.localeCompare(t2.value) : t1.value - t2.value
        } else {
          // topic belong to different groups -- compare groups
          return v1.localeCompare ? v1.localeCompare(v2) : v1 - v2
        }
        // Note: numbers and booleans does not have a "localeCompare" method
      }
    },

    topicSort () {
      return this.sortMode === 'topic'
    },

    omit () {
      // Note: dm5-topic expects a String (or undefined)
      if (!this.topicSort) {
        return this.sortMode
      }
    }
  },

  methods: {

    marked (topic) {
      return this.markerIds && this.markerIds.includes(topic.id)
    },

    click (topic) {
      this.$emit('topic-click', topic)
    },

    iconClick (topic) {
      this.$emit('icon-click', topic)
    },

    sortChange (sortMode) {
      this.$emit('sort-change', sortMode)
    }
  },

  components: {
    'dm5-topic': require('./dm5-topic').default
  }
}

const selectFn = {
  topic: topic => topic.value,
  type:  topic => topic.typeName,
  assoc: topic => topic.assoc.typeName
}
</script>

<style>
.dm5-topic-list .sort-menu {
  margin-bottom: 2em;
}

.dm5-topic-list .group + .group {
  margin-top: 1.6em;
}

/* copy in dm5-comp-def-list.vue */
.dm5-topic-list .dm5-topic {
  border-bottom: 1px solid var(--border-color);
  border-left:   1px solid var(--border-color);
  border-right:  3px solid var(--border-color);
  background-color: white;
  transition: background-color 0.25s;
  padding: var(--object-item-padding);
}

.dm5-topic-list .dm5-topic:nth-child(1) {
  border-top: 1px solid var(--border-color);
}

.dm5-topic-list .dm5-topic.marked {
  border-right-color: var(--color-topic-icon);
}

.dm5-topic-list .dm5-topic:hover {
  background-color: var(--background-color-darker);
}
</style>
