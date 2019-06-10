<template>
  <div class="about">
    <h1>This is an about page. "{{username}}"</h1>
    <el-button type="primary" style="width:10%;margin-bottom:30px;" @click="goBack">返回</el-button>
  </div>
</template>
<script>
export default {
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.path;
    }
  },
  methods: {
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push("/first");
      console.log(this.$route);
    }
  }
};
</script>
