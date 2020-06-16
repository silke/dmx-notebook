<template>
  <div class="main">
    <div class="field-label">Title</div>
    <el-input
      id="note-title"
      placeholder="Snörje"
      v-model="titlefield"
    >
    </el-input>
    <div class="field-label">Content</div>
    <el-input
      id="note-content"
      type="textarea"
      :autosize="{ minRows: 3 }"
      placeholder="Börje"
      v-model="contentfield"
    >
    </el-input>
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
h3 {
  color: red;
}

#note-title {
  width: 66%;
}

#note-content {
  width: 90%;
}

.el-input__inner, .el-textarea__inner {
  margin: 0.3em !important;
  border-radius: 0 !important;
}

.main {
  margin-top: 5px;
  margin-left: 5vw;
  margin-right: 5vw;
}
</style>
