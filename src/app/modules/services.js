import SupportService from '../services/support-service';
import FireBase from '../services/firebase-sevice';
import firebaseAuthService from '../services/firebase-auth-service';
import spinnerService from '../components/spinner/spinner.service';


const ServicesModule = angular.module('app-services',[])
    .service('supportService', SupportService)
    .service('fireBase', FireBase)
    .service('firebaseAuthService', firebaseAuthService)
    .service('spinnerService', spinnerService);
export default ServicesModule;