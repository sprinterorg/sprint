import helloTemplate from './app/components/hello-world/hello-world.component.html';
import helloCtrl from './app/components/hello-world/hello-world.controller';
import hellCtrl from './app/components/hello-hell/hello-hell.controller';
import helloHellTemplate from './app/components/hello-hell/hello-hell.component.html';

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
}
