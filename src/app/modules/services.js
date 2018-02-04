/*import angular from 'angular';*/
import SupportService from '../services/support-service';
import FireBase from '../services/firebase-sevice';



const ServicesModule = angular.module('app-services',[])
    .service('supportService', SupportService)
    .service('fireBase', FireBase);
export default ServicesModule;