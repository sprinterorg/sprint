import firebase from 'firebase/app';
import  'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


export default /*@ngInject*/ function() {
    var config = {
	    apiKey: "AIzaSyDVS9Dls26xt6Qa46dYP6Qaxx2GqQ5edsc",
	    authDomain: "task-tracker-242dc.firebaseapp.com",
	    databaseURL: "https://task-tracker-242dc.firebaseio.com",
	    projectId: "task-tracker-242dc",
	    storageBucket: "task-tracker-242dc.appspot.com",
	    messagingSenderId: "49682798157"
 	};
 	firebase.initializeApp(config);
}