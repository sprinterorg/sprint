import template from './window-profile.component.html';
import controller from './window-profile.controller';

let windowProfileComponent = {
  restrict: 'E',
  bindings: {
      userInfo: '<',
      userTop: '<',
      userIsShow: '='
  },
  template,
  controller,
  controllerAs: 'WindowProfileCtrl'
};

export default windowProfileComponent;