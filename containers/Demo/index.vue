<template lang='pug'>
  .demoPage {{ title }}
</template>

<script>
export default {
  name: 'DemoPage',
  data() {
    return {
      title: 'Demo',
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '~common/global.styl'

.demoPage
  color red
  display flex
</style>
