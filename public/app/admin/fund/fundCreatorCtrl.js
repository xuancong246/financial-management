(function() {
    angular.module('fm').controller('fundCreatorCtrl', FundCreatorCtrl);
    FundCreatorCtrl.$inject = ['fundDataSvc', '$state', 'notifierSvc'];

    function FundCreatorCtrl(fundDataSvc, $state, notifierSvc) {
        var vm = this;
        vm.model = {};
        vm.create = create;

        function create() {
            var fundData = {
                name: vm.model.name,
                description: vm.model.description,
                isActive: vm.model.isActive
            };
            fundDataSvc.create(fundData).then(function() {
                notifierSvc.showSuccess('Creating fund successfully!');
                $state.go('admin.funds');
            }, function(res) {
                console.log('Creating fund failed. reason: ' + res.data.reason);
                notifierSvc.showError('Creating fund failed!');
            });
        }
    }
})();
