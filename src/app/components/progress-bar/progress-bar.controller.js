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
        this.overlayWidth = (100-(Math.round((Date.now()-this.project.startTimeStamp)/(6*6*24*this.project.duration)))/1000)+"%";
        //чувствительность progress-bar 0.001% от полной его длинны
    }
}

