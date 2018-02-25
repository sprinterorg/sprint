import template from './user-adding.component.html';
import controller from './user-adding.controller';

let userAddingComponent = {
  restrict: 'E',
  bindings: {
  	  allUsers: '<',
      users: '<',
      project: '<',
      projectId: '<',
      booleanProject: '<',
      task: '<',
      taskId: '<'
  },
  template,
  controller,
  controllerAs: 'UserAddingCtrl'
};

export default userAddingComponent;