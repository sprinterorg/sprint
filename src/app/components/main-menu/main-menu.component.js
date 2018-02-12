import template from './main-menu.component.html';
import controller from './main-menu.controller';

let mainMenuComponent = {
  restrict: 'E',
  bindings: {
        hideFunc: '<'
  },
  template,
  controller,
  controllerAs: 'MainMenuCtrl'
};

export default mainMenuComponent;