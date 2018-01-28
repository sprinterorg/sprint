// import 'bootstrap-css-only';
// import 'normalize.css';
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import appComponent from './app.component';

import './components/hello-world/hello-world.component.scss';
import './components/hello-hell/hello-hell.component.scss';

import routing from '../routes';

angular.module('app', [uiRouter])
    .component('app', appComponent)
    .config(routing);