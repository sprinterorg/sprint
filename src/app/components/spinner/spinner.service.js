export default class spinnerSevice{
    /*@ngInject*/
     constructor() {
         this.isActive = true;
    }

    spinnerIsActive(){
         return this.isActive;
    }

    activate(){
        this.isActive = true;
    }

    deactivate(){
        this.isActive = false;
    }

}

