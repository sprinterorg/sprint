import template from './my-projects.component.html';
import controller from './my-projects.controller';
import './my-projects.component.scss';

let myProjectsComponent = {
  restrict: 'E',
  template,
  controller,
  controllerAs: 'MyProjectsCtrl'
};

export default myProjectsComponent;