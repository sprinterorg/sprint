import angular from 'angular';
import helloHellComponent from '../components/hello-hell/hello-hell.component';


const ComponentsModule = angular.module('app-components',[])
    .component('brHelloHell', helloHellComponent);

export default ComponentsModule;