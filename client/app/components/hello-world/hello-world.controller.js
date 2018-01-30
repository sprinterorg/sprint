export default class helloWorldController {
    /*@ngInject*/
    constructor(someService, $firebaseArray) {
        this.name = 'hello-world-controller';
        this.dataFromSvc = someService.getItems();

        this.someDataForHellComp = 'some data from hello-world-controller';

        let rootRef = firebase.database().ref();
        let ref = rootRef.child('projects');
        this.projects = $firebaseArray(ref);

        this.projectName = '';
        this.managerID = '';
    }

        addProject () {
            // console.log(this.projectName);
            // console.log(this.managerID);
                this.projects.$add({
                    projectName: this.projectName,
                    managerID: this.managerID
                }).then(function (rootRef) {
                    console.log(rootRef);
                    // let id = rootRef.key;
                    // this.projectName = "";
                    // this.managerID = "";
                });
            }
    }

