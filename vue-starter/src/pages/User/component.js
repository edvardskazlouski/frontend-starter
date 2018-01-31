import { mapActions  } from 'vuex';

export default {
  computed: {
    id () {
      return this.$route.params.id;
    }
  },
  methods: mapActions([
    'openTestModal',
  ]),
};
