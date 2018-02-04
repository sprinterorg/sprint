/*import angular from 'angular';*/

import myProjectsComponent from '../components/my-projects/my-projects.component';
import myTasksComponent from '../components/my-tasks/my-tasks.component';


const ComponentsModule = angular.module('app-components',[])
    .component('myProjects', myProjectsComponent)
    .component('myTasks', myTasksComponent);

export default ComponentsModule;