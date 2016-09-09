(function() {
    angular.module('fm').controller('financialCtrl', financialCtrl);
    financialCtrl.$inject = ['financialSvc'];

    function financialCtrl(financialSvc) {
        var vm = this;
        vm.sharedItem = financialSvc.getSharedItem();
    }
})();
