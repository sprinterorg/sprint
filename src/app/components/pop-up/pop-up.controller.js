export default class popUpComponent {
    /*@ngInject*/
     constructor($scope) {
        this._$scope = $scope;
     	this.popUpVisibleStatus=this.popUpVisible;
        this.popUpAnswer;//true->delete, false->close

        this.act = [
        	{
        		btn: "Delete",
        		answer: "Are you sure want to delete this project?"
        	},
        	{
        		btn: "Close",
        		answer: "Are you sure want to close this sprint?"
        	},
        	{
        		btn: "Cancel"
        	}
        ]
    }

    clickCancelBtn() {
        console.log("popUpVisible= "+this.popUpVisibleStatus);
    	//console.log("popUpAnswer= "+this.popUpAnswer);    
    }

}
