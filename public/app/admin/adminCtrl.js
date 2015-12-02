(function() {
    angular.module('fm').controller('adminCtrl', adminCtrl);
    adminCtrl.$inject = ['adminSvc'];

    function adminCtrl(adminSvc) {
        var vm = this;
        vm.sharedItem = adminSvc.getSharedItem();
    }
})();
