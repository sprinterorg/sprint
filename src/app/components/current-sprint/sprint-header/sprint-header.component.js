import template from './sprint-header.component.html';
import controller from './sprint-header.controller';

let sprintHeaderComponent = {
  restrict: 'E',
  bindings: {
      cards: '<',
      project: '<'
  },
  template,
  controller,
  controllerAs: 'SprintHeaderCtrl'
};

export default sprintHeaderComponent;