<template>
    <div id="app">
        <div>APP:</div>
        <div>{{ name }}</div>
        <div>{{ role }}</div>
        <button
            @click="refreshUser()"
        >
            Refresh user
        </button>
    </div>
</template>
<script>
  import { mapGetters, mapActions  } from 'vuex';

  export default {
    computed: mapGetters({
      name: 'name',
      role: 'role',
    }),
    methods: mapActions([
      'refreshUser',
    ]),
    created () {
      this.$store.dispatch('loadUser');
    }
  };
</script>