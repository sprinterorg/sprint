export default class confirmationController {
    /*@ngInject*/
    constructor($rootScope, $scope) {
    	this._$rootScope = $rootScope;
    	this._$scope = $scope;
    	self = this;
    	this.show =	false;

		$rootScope.$on('hideProjectDelete', function (event, data) {
			self.show = false;
		});
		$scope.$on('showProjectDeleteConfirmation', (event, data)=>{
			this.show = true;
		});
    }
}