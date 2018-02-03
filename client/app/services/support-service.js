class SupportService {

    /*@ngInject*/
    constructor() {
      this.userId = '';
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
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

}

export default SupportService;


