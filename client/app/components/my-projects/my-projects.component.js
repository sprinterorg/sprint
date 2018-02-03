import template from './my-projects.component.html';
import controller from './my-projects.controller';
import './my-projects.component.scss';

let cardsComponent = {
  restrict: 'E',
  template,
  controller,
  controllerAs: 'MyProjectsCtrl'
};

export default cardsComponent;