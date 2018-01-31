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