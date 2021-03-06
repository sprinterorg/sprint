import uiRouter from '@uirouter/angularjs';
import routing from './config/routes.config';
import appComponent from './app.component';
import angFire from 'angularfire';
import firebasecfg from './config/firebase-cfg';
import dndLists from 'angular-drag-and-drop-lists';
import fileUpload from 'ng-file-upload';
import timeAgo from 'angular-moment';

import 'angular-sanitize'
import 'angular-emoji-picker/dist/js/emoji-picker.js'
import 'angular-emoji-filter-hd';
import ComponentsModule from './modules/components';
import ServicesModule from './modules/services';
import '@iamadamjowett/angular-click-outside';

import './components/projects/projects.component.scss';
import './components/current-sprint/current-sprint.component.scss';
import './components/landing/landing.component.scss';
import './components/login-form/login-form.component.scss';
import './components/my-projects/my-projects.component.scss';
import './components/my-tasks/my-tasks.component.scss';
import './components/profile/profile.component.scss';
import './components/project-settings/project-settings.component.scss';
import './components/task/task.component.scss';
import './components/main-menu/main-menu.component.scss';
import './components/spinner/spinner.component.scss';
import './components/current-sprint/sprint-header/sprint-header.component.scss';
import './components/hystory/hystory.component.scss';
import '../font/flaticon.css';
import './components/progress-bar/progress-bar.component.scss';
import './components/user-adding/user-adding.component.scss';
import 'angular-emoji-picker/dist/css/emoji-picker.css';
import 'angular-emoji-filter-hd/dist/emoji.scss';
import './components/window-profile/window-profile.component.scss';
import './components/confirmation-form/confirmation.component.scss';

angular.module('app', [
    angFire,
    uiRouter,
    'dndLists',
    fileUpload,
    timeAgo,
    'angular-click-outside',
    'vkEmojiPicker',
    'dbaq.emoji',
    ComponentsModule.name,
    ServicesModule.name

])
    .component('app', appComponent)
    .config(routing)
    .config(firebasecfg);