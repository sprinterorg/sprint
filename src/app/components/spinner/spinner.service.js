export default class spinnerSevice{
    /*@ngInject*/
     constructor($rootScope) {
         this.isActive = true;
    }

    spinnerIsActive(){
         return this.isActive;
    }

    activate(){
        this.isActive = true;
    }

    deactivate(){
        console.log('deactivate');
        this.isActive = false;
    }

}

