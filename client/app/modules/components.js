/*import angular from 'angular';*/
import cardsComponent from '../components/my-projects/my-projects.component';
import myProjectsComponent from '../components/my-projects/my-projects.component';


const ComponentsModule = angular.module('app-components',[])
    .component('cardsList', cardsComponent)
    .component('myProjects',myProjectsComponent);

export default ComponentsModule;