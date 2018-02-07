import template from './modal-window.component.html';
import controller from './modal-window.controller';
import './modal-window.component.scss';

let modalWindowComponent = {
    restrict: 'E',
    bindings: {
        buttonText: "<"
    },
    template,
    controller,
    controllerAs: 'modalWindowController',
    transclude: true
};

export default modalWindowComponent;