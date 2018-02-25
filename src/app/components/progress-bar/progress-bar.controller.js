export default class progressBarComponent{
    /*@ngInject*/
     constructor(fireBase, $stateParams, $scope, $rootScope) {
        this._rootScope = $rootScope;
        this._scope = $scope;
        this.stateParams = $stateParams;
        this.project = fireBase.getSprint(this.stateParams.project_id);
        this.overlayWidth;
    }

    runProgressBar(){
        this.overlayWidth = (100-(Math.ceil((Date.now()-this.project.startTimeStamp)/(60*60*24*1000))/this.project.duration)*100)+"%";
    }
}

