export default class myProjectsComponent {
    //help me to inject dependencies here!
    constructor() {
        this.hide = false;
    }

    toHide() {
        this.hide = !this.hide;
    }
}
/*
app.controller('modalWindowController', ['$scope', function ($scope) {
    $scope.hide = false;
    $scope.toHide = function () {
        $scope.hide = !$scope.hide;
    }
}]);
*/