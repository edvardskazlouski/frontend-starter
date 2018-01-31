<template>
    <div id="app">
        <Header/>
        <router-view></router-view>
    </div>
</template>
<script>
  import Header from 'components/Header/index.vue'

  export default {
    components: { Header }
  }
</script>
<style lang="scss">
    @import 'theme/global.scss';
</style>