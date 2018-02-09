/*import angular from 'angular';*/

import myProjectsComponent from '../components/my-projects/my-projects.component';
import myTasksComponent from '../components/my-tasks/my-tasks.component';
import modalWindowComponent from '../components/modal-window/modal-window.component';
import loginFormComponent from '../components/login-form/login-form.component';


const ComponentsModule = angular.module('app-components',[])
    .component('myProjects', myProjectsComponent)
    .component('myTasks', myTasksComponent)
    .component('modalWindow', modalWindowComponent)
    .component('loginForm', loginFormComponent);

export default ComponentsModule;