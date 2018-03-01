import template from './pop-up.component.html';
import controller from './pop-up.controller';

let popUpComponent = {
  restrict: 'E',
  bindings: {
		popUpVisibleStatus: '=',
		popUpAnswer: '<',
		popUpDelete: '&'
  },
  template,
  controller,
  controllerAs: 'PopUpCtrl'
};

export default popUpComponent;