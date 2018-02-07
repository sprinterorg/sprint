export default class appController {
    /*@ngInject*/
    constructor() {
        this.showModalWindow = false;
    }

    toShowModalWindow() {
        this.showModalWindow = true;
    }
}