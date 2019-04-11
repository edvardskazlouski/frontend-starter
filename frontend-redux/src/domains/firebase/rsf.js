import firebase from 'firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import ReduxSagaFirebase from 'redux-saga-firebase';

// Initialize Firebase
// Insert your credentials
const config = {
  apiKey: 'AIzaSyBPUuIONtxcQ3efdGpMGbJVEn6fUG_1E5g',
  authDomain: 'my-first-project-8d8d9.firebaseapp.com',
  databaseURL: 'https://my-first-project-8d8d9.firebaseio.com',
  projectId: 'my-first-project-8d8d9',
  storageBucket: 'my-first-project-8d8d9.appspot.com',
  messagingSenderId: '801023450889'
};

const rsf = new ReduxSagaFirebase(firebase.initializeApp(config));

export default rsf;
