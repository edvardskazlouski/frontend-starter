<template>
    <div id="app">
        <Header />
        <router-view></router-view>
        <Modals />
    </div>
</template>
<script>
  import Header from 'components/Header';
  import Modals from 'components/ModalsContainer';

  export default {
    components: { Header, Modals },
  };

</script>
<style lang="scss">
    @import 'theme/global.scss';
</style>