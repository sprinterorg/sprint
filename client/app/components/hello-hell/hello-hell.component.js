import template from './hello-hell.component.html';
import controller from './hello-hell.controller';
import './hello-hell.component.scss';


let helloHellComponent = {
  restrict: 'E',
  bindings: {
      someInput: '<',
      someOutput: '&'
  },
  template,
  controller,
  controllerAs: 'hellCtrl'
};

export default helloHellComponent;