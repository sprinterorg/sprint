/*import angular from 'angular';*/

import myProjectsComponent from '../components/my-projects/my-projects.component';
import myTasksComponent from '../components/my-tasks/my-tasks.component';
import modalWindowComponent from '../components/modal-window/modal-window.component';
import loginFormComponent from '../components/login-form/login-form.component';
import mainMenuComponent from '../components/main-menu/main-menu.component';


const ComponentsModule = angular.module('app-components',[])
    .component('myProjects', myProjectsComponent)
    .component('myTasks', myTasksComponent)
    .component('modalWindow', modalWindowComponent)
    .component('loginForm', loginFormComponent)
    .component('mainMenu', mainMenuComponent);

export default ComponentsModule;