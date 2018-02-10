import template from './my-tasks.component.html';
import controller from './my-tasks.controller';

let myTasksComponent = {
  restrict: 'E',
  bindings: {
      tasks: '<',
      projectId: '<'
  },
  template,
  controller,
  controllerAs: 'MyTasksCtrl'
};

export default myTasksComponent;