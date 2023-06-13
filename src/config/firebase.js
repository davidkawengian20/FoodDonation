// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBvnKnl4vbbmGklpoD5sIPA0n9dXm5-jsY',
  authDomain: 'fooddonation-fcf5d.firebaseapp.com',
  databaseURL: 'https://fooddonation-fcf5d-default-rtdb.firebaseio.com/',
  projectId: 'fooddonation-fcf5d',
  storageBucket: 'fooddonation-fcf5d.appspot.com',
  messagingSenderId: '858972016878',
  appId: '1:858972016878:web:8fafb0afdd9a736774a3ff',
  measurementId: 'G-9P7QF2JCZC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default authentication = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
