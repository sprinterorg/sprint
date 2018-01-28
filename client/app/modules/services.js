
import angular from 'angular';
import SomeService from '../services/some-service'



const ServicesModule = angular.module('app-services',[])
    .service('someService', SomeService);
export default ServicesModule;