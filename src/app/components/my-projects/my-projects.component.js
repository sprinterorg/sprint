import template from './my-projects.component.html';
import controller from './my-projects.controller';

let myProjectsComponent = {
  restrict: 'E',
  bindings: {
        hideFunc: '<'
  },
  template,
  controller,
  controllerAs: 'MyProjectsCtrl'
};

export default myProjectsComponent;