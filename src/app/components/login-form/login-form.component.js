import template from './login-form.component.html';
import controller from './login-form.controller';
import './login-form.component.scss';


let loginFormComponent = {
    restrict: 'E',
    replace: false,
    template,
    controller
};

export default loginFormComponent;