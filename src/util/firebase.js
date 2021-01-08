import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/analytics';

const settings = { timestampsInSnapshots: true };

const firebaseConfig = {
    apiKey: "AIzaSyDgQQty5kHKFAl8zLpXSRaf6Jeq3OYyal0",
    authDomain: "simple-crud-react-pwa.firebaseapp.com",
    projectId: "simple-crud-react-pwa",
    storageBucket: "simple-crud-react-pwa.appspot.com",
    messagingSenderId: "779786647337",
    appId: "1:779786647337:web:584f92d994782551922938",
    measurementId: "G-5RK3EHGS1V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore().settings(settings);

export default firebase;