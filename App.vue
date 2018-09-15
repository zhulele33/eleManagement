<template lang='pug'>
  #app
      router-view(v-if="isRouterAlive")
</template>

<script>
/* eslint-disable func-names */
export default {
  name: 'app',
  data() {
    return {
      isRouterAlive: true,
    }
  },
  provide() {
    return {
      reload: this.reload,
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
    #app
        padding 20px
</style>
