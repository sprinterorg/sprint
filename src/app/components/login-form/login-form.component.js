import template from './login-form.component.html';
import controller from './login-form.controller';
import './login-form.component.scss';


let loginFormComponent = {
    restrict: 'E',
    template,
    controller,
    controllerAs:'loginCtrl'
};

export default loginFormComponent;

