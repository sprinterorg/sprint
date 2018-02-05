import ProjectsCtrl from '../components/projects/projects.controller';
import projectsTemplate from '../components/projects/projects.component.html';

import SprintCtrl from '../components/current-sprint/current-sprint.controller';
import currentSprintTemplate from '../components/current-sprint/current-sprint.component.html';

import ProfileCtrl from '../components/profile/profile.controller';
import profileTemplate from '../components/profile/profile.component.html';

import UserCtrl from '../components/user-creation/user-creation.controller';
import userTemplate from '../components/user-creation/user-creation.component.html';

import ProjectSettingsCtrl from '../components/project-settings/project-settings.controller';
import projectSettingsTemplate from '../components/project-settings/project-settings.component.html';

export default /*@ngInject*/ function($locationProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');
    $locationProvider.html5Mode(true);
    $stateProvider.state('user', {
        url: '/user',
        template: userTemplate,
        controller: UserCtrl,
        controllerAs: 'UserCtrl'

    });
    $stateProvider.state('profile', {
        url: '/profile',
        secure: true,
        template: profileTemplate,
        controller: ProfileCtrl,
        controllerAs: 'ProfileCtrl'

    });
    $stateProvider.state('projects', {
        url: '/projects',
        secure: true,
        template: projectsTemplate,
        controller: ProjectsCtrl,
        controllerAs: 'ProjectsCtrl'

    });
    $stateProvider.state('current-sprint', {
        url: '/project/:project_id',
        secure: true,
        template: currentSprintTemplate,
        controller: SprintCtrl,
        controllerAs: 'SprintCtrl'
  });
    $stateProvider.state('project-settings', {
        url: '/project/settings/:project_id',
        secure: true,
        template: projectSettingsTemplate,
        controller: ProjectSettingsCtrl,
        controllerAs: 'ProjectSettingsCtrl'
  });

}
