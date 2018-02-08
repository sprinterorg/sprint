import template from './login-form.component.html';
import controller from './login-form.controller';
import './login-form.component.scss';


let loginFormComponent = {
    restrict: 'E',
    bindings: {
        hideFunc: '&?'
    },
    template,
    controller,
    controllerAs: 'loginController'
};

export default loginFormComponent;

