/*import angular from 'angular';*/
import SomeService from '../services/some-service';
import FireBase from '../services/firebase-sevice';



const ServicesModule = angular.module('app-services',[])
    .service('someService', SomeService)
    .service('fireBase', FireBase);
export default ServicesModule;