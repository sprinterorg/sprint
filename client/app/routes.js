import ProjectsCtrl from './components/projects/projects.controller';
import projectsTemplate from './components/projects/projects.component.html';
import SprintCtrl from './components/current-sprint/current-sprint.controller';
import currentSprintTemplate from './components/current-sprint/current-sprint.component.html';

export default /*@ngInject*/ function($locationProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $stateProvider.state('projects', {
        url: '/projects',
        template: projectsTemplate,
        controller: ProjectsCtrl,
        controllerAs: 'ProjectsCtrl'

    });
    $stateProvider.state('current-sprint', {
        url: '/project/:ids',
        template: currentSprintTemplate,
        controller: SprintCtrl,
        controllerAs: 'SprintCtrl'
  });
}
