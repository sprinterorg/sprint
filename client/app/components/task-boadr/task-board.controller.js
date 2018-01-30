
export default class taskBoardCtlr {

    /*@ngInject*/
    constructor(someService) {
        this.name = someService.getItems();
    }
}

