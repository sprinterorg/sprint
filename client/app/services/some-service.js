class SomeService {

    /*@ngInject*/
    constructor() {
        this.serviceData = 'some data can from service';
    }

    getItems() {
        return this.serviceData;

    }

}

export default SomeService;


