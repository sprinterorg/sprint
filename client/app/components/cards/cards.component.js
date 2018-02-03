import template from './cards.component.html';
import controller from './cards.controller';
import './cards.component.scss';

let cardsComponent = {
  restrict: 'E',
  bindings: {
      listId: '<',
	  cards: '<',
  },
  template,
  controller,
  controllerAs: 'cardsCtrl'
};

export default cardsComponent;