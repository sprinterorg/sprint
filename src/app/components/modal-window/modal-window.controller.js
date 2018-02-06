export default class myProjectsComponent {
    /*@ngInject*/
    constructor() {
        this.hide_login_form = false;
    }

    toHideLoginForm() {
        this.hide_login_form = !this.hide_login_form;
    }
}