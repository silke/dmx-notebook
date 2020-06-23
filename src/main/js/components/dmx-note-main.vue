<template>
  <div v-if="username" class="main">
    <div class="header">
      <div class="title"><b>dmx</b> note</div>
    </div>
    <div class="note">
      <div class="note-title">
        <el-input
          id="titlefield"
          :placeholder="getDate()"
          v-model="titlefield"
        >
        </el-input>
      </div>
      <div class="note-content">
        <div class="content-scroll-wrapper">
          <el-input
            id="contentfield"
            type="textarea"
            :autosize="{minRows: 17}"
            placeholder="Note content"
            v-model="contentfield"
          >
          </el-input>
        </div>
      </div>
      <div class="note-others">
        <div class="colorcode-picker">
          <div 
            class="colorcode-wrapper"
            v-for="(color, index) in colorcodes" 
          >
            <div 
              :class="checkSelectedColor(index)"
              :id="color"
              @click.prevent="selectColor(index)"
            >
            </div>
          </div>
        </div>
        <el-button v-if="contentfield" class="save-note">Save</el-button>
        <el-button v-else disabled class="save-disabled">Save</el-button>
      </div>
    </div>
  </div>
  <div v-else class="note-login">
    <div class="title"><b>dmx</b> note</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titlefield: '',
      contentfield: '',
      colorcodes: ['red', 'green', 'blue', 'yellow', 'purple'],
      selectedColorIndex: null
    }
  },

  computed: {
    username () {
      return this.$store.state.login.username;
    }
  },

  methods: {
    getDate() {
      return (new Date()).toDateString();
    },
    selectColor(index) {
      if(this.selectedColorIndex === index) { // deselect color if already selected
        this.selectedColorIndex = null;
      }
      else {
        this.selectedColorIndex = index; 
      };
    },
    checkSelectedColor(index) {
      if(this.selectedColorIndex === index){
        return 'colorcode-selected';
      }
      else {
        return 'colorcode';
      };
    }
  },

  //mounted: {
  //  this.$store.dispatch(openLoginDialog());
  //}
}
</script>

<style>
.title {
  font-size: 3vh;
  font-weight: 400;
  color: var(--fg-light);
  margin-left: 5vw;
}

.note-login .title {
  margin: 0;
}

.header {
  min-height: 8vh;
  display: flex;
  align-items: center;
  background-color: var(--bg-header);
  border-bottom: solid 1px gray;
}

.note-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-header);
}

#titlefield, #contentfield {
  margin-top: 0.3vh !important;
  border-style: none !important;
  border-radius: 0 !important;
}

#titlefield {
  padding: 3vh !important;
  font-size: 2em !important;
}

#contentfield {
  padding: 1.5vh !important;
}

.note {
  padding-top: 2vh;
  width: 87%;
  margin: auto;
}

.note-title {
  margin: 1vh;
  box-sizing: border-box;
  background-color: var(--bg-note);
}

.note-content {
  margin: 1vh;
  margin-top: 2vh;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  height: 24em;
  background-color: var(--bg-note);
}

.content-scroll-wrapper {
  width: 96%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.note-others {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  margin: 1vh;
  margin-top: 2vh;
}

.save-note, .save-disabled{
  border: none !important;
  border-radius: 0 !important;
  width: 11vh !important;
  height: 4.5vh !important;
}

.save-note {
  background-color: #6AA84F !important;
  color: var(--fg-light) !important;
}

.save-disabled {
  background-color: #97aa97 !important;
  color: lightgray !important;
}

.colorcode-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%; 
  width: 63%;
}

.colorcode, .colorcode-selected {
  height: 90%;
  width: 90%;
}

.colorcode-selected {
  border: solid 2px ghostwhite;
  outline: solid 1px var(--bg-header);
}

.colorcode-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 5vh;
  background-color: var(--bg-main); 
}


.colorcode:hover, .colorcode-selected:hover {
  cursor: pointer;
}

#red {background-color: indianred;}
#green {background-color: limegreen;}
#blue {background-color: lightskyblue;}
#yellow {background-color: gold;}
#purple {background-color: darkorchid;}
/*
.note-title:hover, .note-content:hover {
  box-shadow: 0 6px 10px 4px rgba(0,0,0,0.15);
}
*/

.main {
  min-height: 100vh; /* Header = 8vh */
  background-color: var(--bg-main);
  justify-content: center;
}
</style>
