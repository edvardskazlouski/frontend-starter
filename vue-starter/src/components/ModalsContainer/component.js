import { mapGetters, mapActions  } from 'vuex';
import ModalConstants from 'store/modules/modals/constants';

import TestModal from 'components/modals/TestModal';

const modalsMap = {
  [ModalConstants.MODAL_TYPES.TEST_MODAL]: TestModal,
};

export default {
  computed: {
    modals () {
      return this.$store.getters.modals.map(modal => ({
        component: modalsMap[modal.type],
        data: modal.data,
      }));
    }
  },
  methods: mapActions([
    'closeModal',
  ]),
  components: { TestModal },
};
