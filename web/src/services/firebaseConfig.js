import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import '@firebase/firestore';
import 'firebase/database';
// Initialize Firebase
var config = {
	apiKey: 'AIzaSyCOSCJRqiVBlknPm5MT99eHXkLhVAHHQWs',
	authDomain: 'more-thrash.firebaseapp.com',
	databaseURL: 'https://more-thrash.firebaseio.com',
	projectId: 'more-thrash',
	storageBucket: 'more-thrash.appspot.com',
	messagingSenderId: '884093458579'
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
export const storageRef = firebase.storage().ref();
export const provider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
export const database = firebase.database();
export const firestore = firebase.firestore();
export default firebase;
