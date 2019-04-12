import firebase from 'config/fbConfig';
import '@firebase/firestore';
import '@firebase/auth';
import ReduxSagaFirebase from 'redux-saga-firebase';

const rsf = new ReduxSagaFirebase(firebase);

export default rsf;
