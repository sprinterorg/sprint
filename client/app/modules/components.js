import angular from 'angular';
import helloHellComponent from '../components/hello-hell/hello-hell.component';
import TaskBoardComponent from "../components/task-boadr/task-board.component";


const ComponentsModule = angular.module('app-components',[])
    .component('brTaskBoard', TaskBoardComponent)
    .component('brHelloHell', helloHellComponent)



export default ComponentsModule;