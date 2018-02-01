import uiRouter from '@uirouter/angularjs';
import appComponent from './app.component';
import './components/projects/projects.component.scss';
import './components/current-sprint/current-sprint.component.scss';
import ComponentsModule from './modules/components';
import ServicesModule from './modules/services'
import routing from './routes';
import angFire from 'angularfire';
import angularDragula from 'angularjs-dragula';
import fbase from './fbase';


angular.module('app', [
    angFire,
    uiRouter,
    angularDragula(angular),
    ComponentsModule.name,
    ServicesModule.name

])
  .component('app', appComponent)
   .config(routing)
    .config(fbase);

