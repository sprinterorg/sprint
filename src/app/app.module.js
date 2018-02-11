import uiRouter from '@uirouter/angularjs';
import routing from './config/routes.config';
import appComponent from './app.component';
import angFire from 'angularfire';
import firebasecfg from './config/firebase-cfg';
import angularDragula from 'angularjs-dragula';
import fileUpload from 'ng-file-upload';

import ComponentsModule from './modules/components';
import ServicesModule from './modules/services';

import './components/projects/projects.component.scss';
import './components/current-sprint/current-sprint.component.scss';
import './components/landing/landing.component.scss';
import './components/login-form/login-form.component.scss';
import './components/my-projects/my-projects.component.scss';
import './components/my-tasks/my-tasks.component.scss';
import './components/profile/profile.component.scss';
import './components/project-settings/project-settings.component.scss';
import './components/task/task.component.scss';



angular.module('app', [
    angFire,
    uiRouter,
    angularDragula(angular),
    fileUpload,
    ComponentsModule.name,
    ServicesModule.name

])
    .component('app', appComponent)
    .config(routing)
    .config(firebasecfg);