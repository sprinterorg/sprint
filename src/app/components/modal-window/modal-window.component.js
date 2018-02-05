import template from './modal-window.component.html';
import controller from './modal-window.controller';
import './modal-window.component.scss';

let modalWindowComponent = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs:'modalWindowController',
    transclude: {
        form: 'modalForm'
    }
};

export default  modalWindowComponent;