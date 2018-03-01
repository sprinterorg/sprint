import myProjectsComponent from '../components/my-projects/my-projects.component';
import myTasksComponent from '../components/my-tasks/my-tasks.component';
import modalWindowComponent from '../components/modal-window/modal-window.component';
import loginFormComponent from '../components/login-form/login-form.component';
import mainMenuComponent from '../components/main-menu/main-menu.component';
import spinner from '../components/spinner/spinner.component';
import projectSettingsComponent from '../components/project-settings/project-settings.component';
import projectsComponent from '../components/projects/projects.component';
import progressBarComponent from '../components/progress-bar/progress-bar.component';
import userAddingComponent from '../components/user-adding/user-adding.component';
import sprintHeaderComponent from '../components/current-sprint/sprint-header/sprint-header.component';
import popUpComponent from '../components/pop-up/pop-up.component';//pop-up by Alex


const ComponentsModule = angular.module('app-components',[])
    .component('myProjects', myProjectsComponent)
    .component('myTasks', myTasksComponent)
    .component('modalWindow', modalWindowComponent)
    .component('loginForm', loginFormComponent)
    .component('mainMenu', mainMenuComponent)
    .component('spinner', spinner)
    .component('projectSettings', projectSettingsComponent)
    .component('projects', projectsComponent)
    .component('progressBar', progressBarComponent)
    .component('sprintHeader', sprintHeaderComponent)
    .component('userAdding', userAddingComponent)
    .component('popUp', popUpComponent);//pop-up by Alex

export default ComponentsModule;