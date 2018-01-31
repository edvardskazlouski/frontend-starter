import { mapGetters, mapActions  } from 'vuex';

export default {
  computed: mapGetters({
    name: 'name',
    role: 'role',
    token: 'token',
  }),
  methods: mapActions([
    'refreshUser',
  ]),
  created () {
    this.$store.dispatch('loadUser');
  }
};
