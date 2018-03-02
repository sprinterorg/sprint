import template from './window-profile.component.html';
import controller from './window-profile.controller';

let windowProfileComponent = {
  restrict: 'E',
  bindings: {
      userInfo: '<',
      userTop: '<',
      userLeft: '<',
      userIsShow: '<',
      managerIsShow: '<'
  },
  template,
  controller,
  controllerAs: 'WindowProfileCtrl'
};

export default windowProfileComponent;