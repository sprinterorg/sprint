export default class windowProfileController{
    /*@ngInject*/
    constructor() {
        this.user = this.userInfo;
        this.top = this.userTop;
        this.left = this.userLeft;
        this.userIsShow;
        this.managerIsShow;
    }
    
    classNameFunc(){
    	let className = 'window__profile';
    	let self = this;
        if (this.userIsShow){
            className += '__show';
        }else{
            className += '__hide';
		}
        return className;
    }
}