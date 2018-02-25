import template from './progress-bar.component.html';
import controller from './progress-bar.controller';

let progressBarComponent = {
  restrict: 'E',
  bindings: {
      tasks: '<',
      projectId: '<'
  },
  template,
  controller,
  controllerAs: 'ProgressBarCtrl'
};

export default progressBarComponent;