/*import ProjectsCtrl from '../components/projects/projects.controller';
import projectsTemplate from '../components/projects/projects.component.html';*/

import SprintCtrl from '../components/current-sprint/current-sprint.controller';
import currentSprintTemplate from '../components/current-sprint/current-sprint.component.html';

import CardChildCtrl from '../components/current-sprint/card/card-child.controller';
import cardChildTemplate from '../components/current-sprint/card/card-child.component.html';

import ProfileCtrl from '../components/profile/profile.controller';
import profileTemplate from '../components/profile/profile.component.html';

import ParentCtrl from '../components/parent-route/parrent.controller';
import parentCtrlTemplate from '../components/parent-route/parent.component.html';

import ChildCtrl from '../components/parent-route/child-route/child.controller';
import childCtrlTemplate from '../components/parent-route/child-route/child.component.html';

import ProjectSettingsCtrl from '../components/project-settings/project-settings.controller';
import projectSettingsTemplate from '../components/project-settings/project-settings.component.html';

import TaskCtrl from '../components/task/task.controller';
import taskTemplate from '../components/task/task.component.html';

import LandingCtrl from '../components/landing/landing.controller';
import landingTemplate from '../components/landing/landing.component.html';

import hystoryCtrl from '../components/hystory/hystory.controller';
import hystoryTemplate from '../components/hystory/hystory.component.html';

export default /*@ngInject*/ function($locationProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    
    $stateProvider.state('landing', {
        url: '/',
        secure: true,
        template: landingTemplate,
        controller: LandingCtrl,
        controllerAs: 'LandingCtrl'

    });


    $stateProvider.state('profile', {
        url: '/profile',
        secure: true,
        template: profileTemplate,
        controller: ProfileCtrl,
        controllerAs: 'ProfileCtrl'

    });
    /*
    $stateProvider.state('projects', {
        url: '/projects',
        secure: true,
        template: projectsTemplate,
        controller: ProjectsCtrl,
        controllerAs: 'ProjectsCtrl'
    });
    */
    $stateProvider.state('current-sprint', {
        url: '/project/:project_id',
        secure: true,
        template: currentSprintTemplate,
        controller: SprintCtrl,
        controllerAs: 'SprintCtrl'
        })
        .state('card-child-component', {
            parent: 'current-sprint',
            url: '/:card_id',
            template: cardChildTemplate,
            controller: SprintCtrl,
            controllerAs: 'SprintCtrl',
    });
    $stateProvider.state('parent-component', {
        url: '/parent',
        template: parentCtrlTemplate,
        controller: ParentCtrl,
        controllerAs: 'ParentCtrl',
        })
        .state('child-component', {
            parent: 'parent-component',
            url: '/child',
            template: childCtrlTemplate,
            controller: ChildCtrl,
            controllerAs: 'ChildCtrl',
    });
    $stateProvider.state('project-settings', {
        url: '/project/settings/:project_id',
        secure: true,
        template: projectSettingsTemplate,
        controller: ProjectSettingsCtrl,
        controllerAs: 'ProjectSettingsCtrl'
  });
    $stateProvider.state('task', {
        url: '/task/:project_id/:task_id',
        secure: true,
        template: taskTemplate,
        controller: TaskCtrl,
        controllerAs: 'TaskCtrl'
  });
    $stateProvider.state('hystory', {
        url: '/project/:project_id/hystory',
        secure: true,
        template: hystoryTemplate,
        controller: hystoryCtrl,
        controllerAs: 'hystoryCtrl'
  });
}
