

export default class landingController {
    /*@ngInject*/
    constructor($window, $scope) {
    	this.animateHand = false;
    	this.animateTime = false;
    	angular.element($window).bind('scroll', this.runAnimation.bind(this));
    	this._$scope = $scope;
    	this.proposition = false;
    	this._$window = $window;
    }

    runAnimation() {
    	if (angular.element(document.querySelector('.about__block--first'))[0] && window.pageYOffset >= parseInt(window.getComputedStyle(document.querySelector('.about__block--first')).height, 10)){
    		this.animateHand = true;
    		this._$scope.$apply();
    		setTimeout(()=>{this.animateTime=true; this._$scope.$apply();}, 2500);
    	}
    }

    showProposition(shown) {
    	this.proposition = shown;
    }

    getStart() {
    	this._$scope.$emit("registrate");
    }
}

