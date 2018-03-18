

export default class landingController {
    /*@ngInject*/
    constructor($window, $scope) {
    	this.animateHand = false;
    	this.animateTime = false;
    	angular.element($window).bind('scroll', this.runAnimation.bind(this));
    	this._$scope = $scope;
    	this.proposition = false;
        this.moveLists = false;
        this.amimateText = false;
        this.moveAllTexts = false;
    	this._$window = $window;
        this.showBacklog = false;
        this.showPreloader = false;
        this.showBackground = false;
    }

    runAnimation() {
    	if (angular.element(document.querySelector('.about__block--first'))[0] && window.pageYOffset >= parseInt(window.getComputedStyle(document.querySelector('.about__block--first')).height, 10)){
    		this.animateHand = true;
    		this._$scope.$apply();
    		setTimeout(()=>{this.animateTime=true; this._$scope.$apply();}, 2500);
    	}
         if (angular.element(document.querySelector('.content'))[0] && window.pageYOffset >= document.querySelector('.content').getBoundingClientRect().top + 1.5*parseInt(window.getComputedStyle(document.querySelector('.content')).height, 10)){
             this.amimateText = true;
             this._$scope.$apply();
         }
    }

    showProposition(shown) {
    	this.proposition = shown;
    }

    getStart() {
    	this._$scope.$emit('registrate');
    }

    login() {
        this._$scope.$emit('login');
    }

    toMoveLists(move) {
        this.moveLists = move;
    }

    toMoveAllTexts() {
        this.moveAllTexts = true;
    }

    toShowBackground(shown) {
        this.showBackground = shown;
    }
    toShowPreloader(shown) {
        this.showPreloader = shown;
    }
    toShowBacklog(shown) {
        this.showBacklog = shown;
    }
}

