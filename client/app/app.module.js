// import 'bootstrap-css-only';
// import 'normalize.css';
import angular from 'angular';
import 'angular-route';
import uiRouter from '@uirouter/angularjs';

import appComponent from './app.component';
import helloWorldController from './components/hello-World/helloWorld.controller';

import './components/hello-World/helloWorld.component.scss';

import routing from '../routes';

angular.module('app', [
    'ngRoute',
    uiRouter,

])
    .component('app', appComponent)
    .config(routing);
    // .controller('helloWorldController', helloWorldController);