import firebase from 'firebase/app';
import  'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


export default /*@ngInject*/ function() {
    var config = {
	    apiKey: "AIzaSyBRpSW5WdXVfPkRwJE65q5QZYyEUIF1o90",
        authDomain: "portfolio-5e570.firebaseapp.com",
        databaseURL: "https://portfolio-5e570.firebaseio.com",
        projectId: "portfolio-5e570",
        storageBucket: "portfolio-5e570.appspot.com",
        messagingSenderId: "755756395572"
 	};
 	firebase.initializeApp(config);
}