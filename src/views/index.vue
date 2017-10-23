<template>
    <div class="background">
        <img class="index" src="../assets/logo.png">
    </div>
</template>
<script>
  export default {
    mounted() {
      setTimeout(() => {
          this.$router.push({
              name: 'list'
          });
      }, 2000);
    }
  };
</script>
<style lang="stylus">
body
  margin 0
  .index {
      width: 100%;
      margin-top: 40%;
  }
  .background {
    background-size: 30px 30px;
    width: 100%;
  }
</style>
