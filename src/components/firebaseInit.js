import * as firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/storage'
import firebaseConfig from './firebaseConfig'

const firebaseAppInit = firebase.initializeApp(firebaseConfig);


export default firebaseAppInit;