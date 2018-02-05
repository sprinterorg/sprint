import template from './modal-window.component.html';
import controller from './modal-window.controller';
import './modal-window.component.scss';

let myProjectsComponent = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    transclude: {
        form: 'modalForm'
    }
};

export default myProjectsComponent;