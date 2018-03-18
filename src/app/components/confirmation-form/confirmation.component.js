import template from './confirmation.component.html';
import controller from './confirmation.controller';

let confirmationComponent = {
    restrict: 'E',
    bindings: {
    	formName:"@",
    	formText:"@",
    	onConfirm:"<",
        hideFunc:"&"
    },
    template,
    controller,
    controllerAs: 'comfirmationController'
};

export default confirmationComponent;

