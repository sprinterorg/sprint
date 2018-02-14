
let spinner = {
  restrict: 'E',
  template: `<div class="spinner-wrap">
                   <div ng-show="$ctrl.spinner.spinnerIsActive()" class="spinner">
                        <div class="double-bounce1"></div>
                        <div class="double-bounce2"></div>
              </div>
            </div>
            `,
  controller: /*@ngInject*/ function (spinnerService) {
     this.spinner = spinnerService;
  },
  controllerAs: '$ctrl'
};

export default spinner;