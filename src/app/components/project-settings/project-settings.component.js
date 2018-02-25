import template from './project-settings.component.html';
import controller from './project-settings.controller';

let ProjectSettingsComponent = {
  restrict: 'E',
  bindings: {
      projectHash: '<',
      hideFunc: '<'
  },
  template,
  controller,
  controllerAs: 'ProjectSettingsCtrl'
};

export default ProjectSettingsComponent;