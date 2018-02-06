import uiRouter from '@uirouter/angularjs';
import routing from './config/routes.config';
import appComponent from './app.component';
import angFire from 'angularfire';
import firebasecfg from './config/firebase-cfg';
import angularDragula from 'angularjs-dragula';

import ComponentsModule from './modules/components';
import ServicesModule from './modules/services'

import './components/projects/projects.component.scss';
import './components/current-sprint/current-sprint.component.scss';


angular.module('app', [
    angFire,
    uiRouter,
    angularDragula(angular),
    ComponentsModule.name,
    ServicesModule.name

])
    .component('app', appComponent)
    .config(routing)
    .config(firebasecfg);