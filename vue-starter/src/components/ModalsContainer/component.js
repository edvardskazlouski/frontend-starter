import { mapGetters, mapActions  } from 'vuex';
import ModalConstants from 'store/modules/modals/constants';

import TestModal from 'components/modals/TestModal';

export default {
  computed: {
    ...mapGetters([
      'modals',
    ]),
    modalTypes: () => ModalConstants.MODAL_TYPES,
  },
  methods: mapActions([
    'closeModal',
  ]),
  components: { TestModal },
};
