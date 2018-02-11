import firebase from 'firebase/app';

class firebaseAuthService {
    /*@ngInject*/
    constructor(fireBase) {
        this._fireBase = fireBase;
    }

    signUp(user) {
       return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    }

    logIn(user) {
        return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    }

    logOut() {
        return firebase.auth().signOut();
            
    }
}

export default firebaseAuthService;