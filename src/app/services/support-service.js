class SupportService {
    /*@ngInject*/
    constructor(fireBase, spinnerService, $rootScope) {
      this.userId = this.getCookie('user') || '';
        this._fireBase = fireBase;
        this._spinnerService = spinnerService;
        this._$rootScope = $rootScope;
        this.isModalOpen = false;
        this.card = null;
        this.backgrounds = [
          'https://firebasestorage.googleapis.com/v0/b/portfolio-5e570.appspot.com/o/img%2F393525bg1-max.jpg?alt=media&token=fc067192-be2b-416a-ac71-7e8f8e62e073',
          'https://firebasestorage.googleapis.com/v0/b/portfolio-5e570.appspot.com/o/img%2F435530bg2-max.png?alt=media&token=13cdd15f-648d-4bd6-8c33-584561dde2ce',
          'https://firebasestorage.googleapis.com/v0/b/portfolio-5e570.appspot.com/o/img%2F559032bg3-max.jpg?alt=media&token=cba00a00-8f6f-45b7-a92b-17c5e3949a9c',
          'https://firebasestorage.googleapis.com/v0/b/portfolio-5e570.appspot.com/o/img%2F405789bg4-max.jpeg?alt=media&token=55e1628d-7154-40bb-b89c-3b8b88580e6e',
          'https://firebasestorage.googleapis.com/v0/b/portfolio-5e570.appspot.com/o/img%2F558877bg5-max.jpeg?alt=media&token=15c213c0-01c2-43f0-8f6c-52dfc407d7cd',
          'https://firebasestorage.googleapis.com/v0/b/portfolio-5e570.appspot.com/o/img%2F125175bg6-max.jpg?alt=media&token=c232bbb3-ccd2-4bf3-af37-66459dd8babd',
          'https://firebasestorage.googleapis.com/v0/b/portfolio-5e570.appspot.com/o/img%2F933127901925.jpg?alt=media&token=f07fdc22-0a7f-4bdd-88e6-8dbd34fb07ed'
        ];  
        this.priorities = [0,1,2,3]; 
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

    getBackgrounds() {
      return this.backgrounds;
    }

    getPriorities() {
      return this.priorities;
    }

}

export default SupportService;