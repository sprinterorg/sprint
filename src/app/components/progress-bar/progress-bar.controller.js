export default class progressBarComponent {
    /*@ngInject*/
     constructor(fireBase, $stateParams, $scope, $rootScope, supportService) {
        this._rootScope = $rootScope;
        this._scope = $scope;
        this.stateParams = $stateParams;
        this.project = fireBase.getSprint(this.stateParams.project_id);
        this.overlayWidth;
        this._supportService = supportService;
    }

    runProgressBar() {
        this.overlayWidth = (100-(Math.ceil((Date.now()-this.project.startTimeStamp)/(60*60*24*1000))/this.project.duration)*100)+"%";
    }

    get startDate() {
        let x = this._supportService.getFormattedDate(this.project.startTimeStamp)
        // x = x.replace('.','/')
        // x = x.replace('.','/')
        return x;
    }
    get finishDate() {
        let plus = 3600 * 24 * 1000 * (+this.project.duration);
        let x = this._supportService.getFormattedDate(this.project.startTimeStamp + plus)
        // x = x.replace('.','/')
        // x = x.replace('.','/')
        return x;
    }

}

