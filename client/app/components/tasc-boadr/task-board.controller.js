
export default class helloHellCtrl{

    /*@ngInject*/
    constructor(someService) {
        this.name = someService.getItems();
    }
}

