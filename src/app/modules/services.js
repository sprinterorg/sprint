/*import angular from 'angular';*/
import SupportService from '../services/support-service';
import FireBase from '../services/firebase-sevice';
import firebaseAuthService from '../services/firebase-auth-service';


const ServicesModule = angular.module('app-services',[])
    .service('supportService', SupportService)
    .service('fireBase', FireBase)
    .service('firebaseAuthService', firebaseAuthService);
export default ServicesModule;