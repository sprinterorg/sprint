import angular from 'angular';
import helloWorldComponent from './helloWorld.component';

export default helloWorldModule = angular.module('helloWorld', [])
  .component('helloWorld', helloWorldComponent);
