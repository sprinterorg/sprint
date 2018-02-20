import template from './projects.component.html';
import controller from './projects.controller';
import './projects.component.scss';

let projectsComponent = {
    restrict: 'E',
    bindings:{
    	hideFunc:"<"
    },
    template,
    controller,
    controllerAs: 'ProjectsCtrl'
};

export default projectsComponent;