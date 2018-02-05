export default class userController {
    /*@ngInject*/
    constructor(fireBase, supportService, $state) {
        this._fireBase = fireBase;
        this._supportService = supportService;
        this._$state = $state;
    }

    createUser(){
        let self = this;
        this._fireBase.createUser({
        	username: this.username,
        	email: this.email
        }).then( rootRef => {
        	let id = rootRef.key;
        	self._supportService.setUser(id);
            self.username = '';
            self.email = '';
            self._$state.go('profile', {
  				preventResolve: {
    			value: false,
    			squash: true
  			}}, {
        		location: true,
        		notify: false,
        		reload: false
      		});
        });
    }
}

