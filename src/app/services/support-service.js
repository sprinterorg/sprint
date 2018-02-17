class SupportService {
    /*@ngInject*/
    constructor(fireBase, spinnerService, $rootScope) {
      this.userId = this.getCookie('user') || '';
        this._fireBase = fireBase;
        this._spinnerService = spinnerService;
        this._$rootScope = $rootScope;

        this.isModalOpen = false;
        this.card = null;
    }

    get isCardOpen() {
        return this.isModalOpen;
    }

    set isCardOpen(flag) {
        this.isModalOpen = flag;
    }

    get openCard() {
        return this.card;
    }

    set openCard(card) {
        this.card = card;
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
            if(data && data.avatar) {
            let img = new Image();
            img.onload = () => this.deactivate();
            img.onerror = () => this.deactivate();
            img.src = data.avatar;
            } else {
                this.deactivate();
            }
        });
    }
    deactivate () {
        let self = this;
        self._$rootScope.$broadcast('appLoaded');
        self._spinnerService.deactivate();
        self._$rootScope.$apply();
    }

    getFormattedDate(ms) {
        let date = new Date(ms);
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
        return dd + '.' + mm + '.' + yy;
    }

}

export default SupportService;


