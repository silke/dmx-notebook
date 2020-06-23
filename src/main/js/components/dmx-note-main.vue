<template>
  <div class="main">
    <div class="header">
      <div class="title"><b>dmx</b> note</div>
    </div>
    <div class="note">
      <div class="note-title">
        <el-input
          id="titlefield"
          placeholder="Note title"
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
      <el-button>Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titlefield: '',
      contentfield: ''
    }
  }
}
</script>

<style>
.title {
  font-size: 3vh;
  font-weight: 400;
  color: ghostwhite;
  margin-left: 5vw;
}

.header {
  display: flex;
  align-items: center;
  height: 8vh; /* Body = 92vh */
  background-color: #2F2D40;
  border-bottom: solid 1px gray;
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
  background-color: white;
  /* box-shadow: 0 4px 8px 2px rgba(0,0,0,0.15);
  transition: 0.3s;
  */
}

.note-content {
  margin: 1vh;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  height: 24em;
  background-color: white;
}

.content-scroll-wrapper {
  width: 96%;
  overflow-y: scroll;
  overflow-x: hidden;
}
/*
.note-title:hover, .note-content:hover {
  box-shadow: 0 6px 10px 4px rgba(0,0,0,0.15);
}
*/

.main {
  height: 92vh; /* Header = 8vh */
  background-color: ghostwhite;
  justify-content: center;
}
</style>
