import { fromJS } from 'immutable';

const initialState = fromJS({
  role: null,
  accessToken: null,
});

export default function(state = initialState, { type, payload }) {
  switch (type) {

    default: {
      return state;
    }
  }
}
