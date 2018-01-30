import template from './task-board.component.html';
import controller from './task-board.controller';
import './task-board.component.scss';
import ServicesModule from '../../modules/services.js'

let TaskBoardComponent = {
  restrict: 'E',
  bindings: {
      someInput: '<',
      someOutput: '&',
  },
  template,
  controller,
  controllerAs: 'taskBoardCtrl'
};

export default TaskBoardComponent