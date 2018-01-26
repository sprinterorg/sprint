import helloTemplate from './app/components/hello-World/helloWorld.component.html';
import helloCtrl from './app/components/hello-World/helloWorld.controller';
import hellCtrl from './app/components/hello-hell/hello-hell.controller';
import helloHellTemplate from './app/components/hello-hell/hello-hell.component.html';

export default /*@ngInject*/ function($locationProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);
    $stateProvider.state('hello', {
        url: '/hello',
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
