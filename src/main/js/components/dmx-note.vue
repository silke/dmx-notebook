<template>
  <div class="dmx-note">
    <dmx-note-main></dmx-note-main>
    <dmx-note-menu class="main-menu"></dmx-note-menu>
    <dm5-login-dialog :visible="loginVisible" @logged-in="loggedIn" @close="closeLogin"></dm5-login-dialog>
  </div>
</template>

<script>
export default {

  computed: {

    object () {
      return this.$store.state.object
    },

    writable () {
      return this.$store.state.writable
    },

    tab () {
      return this.$store.state.details.tab
    },

    mode () {
      return this.$store.state.details.mode
    },

    quillConfig () {
      return this.$store.state.quillConfig
    },

    loginVisible () {
      return this.$store.state.login.visible
    },

    searchVisible () {
      return this.$store.state.search.visible
    },

    createEnabled () {
      return this.$store.state.login.username !== ''
    },

    menuTopicTypes () {
      return this.$store.getters.menuTopicTypes
    }
  },

  methods: {

    loggedIn (username) {
      this.$store.dispatch('loggedIn', username)
    },

    closeLogin () {
      this.$store.dispatch('closeLoginDialog')
    },

    revealTopic (topic) {
      this.$store.dispatch('callTopicRoute', topic.id)
    },

    createTopic ({topictype, value}) {
      this.$store.dispatch('createtopic', {topictype, value})
    },

    closeSearch () {
      this.$store.dispatch('closesearchwidget')
    },

    tabClick (tab) {
      let detail = tab
      // clicking 1st tab while in form mode
      if (tab === 'info' && this.mode === 'form') {
        // 1st tab is selected already -> no-op
        if (this.tab === 'info') {
          return
        }
        // another tab is currently selected -> resume editing
        detail = 'edit'
      }
      //
      this.$store.dispatch('selectDetail', detail)
    },

    edit () {
      this.$store.dispatch('selectDetail', 'edit')
    },

    submit (object) {
      this.$store.dispatch('submit', object)
      this.$store.dispatch('selectDetail', 'info')
    },

    submitInline (object) {
      this.$store.dispatch('submit', object)
    }
  },

  components: {
    'dmx-note-main':     require('./dmx-note-main').default,
    'dmx-note-menu':     require('./dmx-note-menu').default,
    'dm5-login-dialog':  require('dm5-login-dialog').default,
  }
}
</script>

<style>
.dmx-note {
  min-height: 100%;
}

.dmx-note {
  flex-grow: 1;
  background-color: var(--background-color);
}

.main-menu {
  margin: 1vh;
}
</style>
