import helloCtrl from './components/hello-world/hello-world.controller';
import helloTemplate from './components/hello-world/hello-world.component.html';

import hellCtrl from './components/hello-hell/hello-hell.controller';
import helloHellTemplate from './components/hello-hell/hello-hell.component.html';

import taskBoardCtlr from './components/task-boadr/task-board.controller';
import taskBoardTemplate from './components/task-boadr/task-board.component.html';


export default /*@ngInject*/ function($locationProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $stateProvider.state('hello-world', {
        url: '/hello-world',
        template: helloTemplate,
        controller: helloCtrl,
        controllerAs: 'helloCtrl'

    });
    $stateProvider.state('hello-hell', {
        url: '/hello-hell',
        template: helloHellTemplate,
        controller: hellCtrl,
        controllerAs: 'hellCtrl'
    });
    $stateProvider.state('task-board', {
        url: '/task-board',
        template: taskBoardTemplate,
        controller: taskBoardCtlr,
        controllerAs: 'taskBoardCtlr'
    });
}
