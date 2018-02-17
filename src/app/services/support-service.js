class SupportService {
    /*@ngInject*/
    constructor(fireBase, spinnerService, $rootScope) {
      this.userId = this.getCookie('user') || '';
        this._fireBase = fireBase;
        this._spinnerService = spinnerService;
        this._$rootScope = $rootScope;

        this.isModalOpen = false;
        this.title = null;
        this.cardSuperId = null;
        this.cardSimpleId = null;
        this.cardListId = null;
        this.superPriority = null;
        this.priority = null;

    }

    get titleCard() {
        return this.title;
    }

    set titleCard(title) {
        this.title = title;
    }

    setUser(userId) {
      this.userId = userId;
      this.setCookie("user",userId,{
            expires: 86400,
            path: 'path=/'
          }); 
    }

    getUserId() {
      return this.userId;
    }

    setCookie(name, value, options) {
  		options = options || {};

  		let expires = options.expires;

  		if (typeof expires == "number" && expires) {
    		let d = new Date();
    		d.setTime(d.getTime() + expires * 1000);
    		expires = options.expires = d;
  		}
  		if (expires && expires.toUTCString) {
    		options.expires = expires.toUTCString();
  		}

  		value = encodeURIComponent(value);

  		let updatedCookie = name + "=" + value;

  		for (let propName in options) {
    		updatedCookie += "; " + propName;
    		let propValue = options[propName];
    	  if (propValue !== true) {
      		updatedCookie += "=" + propValue;
    	  }
      }

    document.cookie = updatedCookie;
  }

  getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
    checkLoadApp (userId) {
        let self = this;
        self._$rootScope.$broadcast('hideApp');
        this._fireBase.getUserPromise(this.userId || userId).then(data => {
            let img = new Image();
            img.onload = () => this.deactivate();
            img.onerror = () => this.deactivate();
            img.src = data.avatar;
        });
    }
    deactivate () {
        let self = this;
        self._$rootScope.$broadcast('appLoaded');
        self._spinnerService.deactivate();
        self._$rootScope.$apply();
    }

}

export default SupportService;


