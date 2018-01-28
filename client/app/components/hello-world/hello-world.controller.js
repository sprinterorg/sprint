export default class helloWorldController {
    /*@ngInject*/
    constructor(someService) {
      this.name = 'hello-world-controller';
      this.dataFromSvc = someService.getItems();

        this.someDataForHellComp = 'some data from hello-world-controller';
    }
  }

