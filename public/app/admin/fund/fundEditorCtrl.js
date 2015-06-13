(function() {
    angular.module('fm').controller('fundEditorCtrl', FundEditorCtrl);
    FundEditorCtrl.$inject = ['$stateParams', '$state', 'fundDataSvc', 'notifierSvc'];

    function FundEditorCtrl($stateParams, $state, fundDataSvc, notifierSvc) {
        var vm = this;
        vm.model = {
            fund: {}
        };

        vm.update = update;

        init();
        function init() {
            var fundId = $stateParams.id;
            fundDataSvc.getById(fundId).then(function(data) {
                vm.model.fund = data;
            });
        }

        function update() {
            fundDataSvc.update(vm.model.fund).then(function() {
                notifierSvc.showSuccess('Updating fund successfully!');
                $state.go('admin.funds');
            }, function(reason) {
                console.log('Updating fund failed. reason: ' + reason.data);
                notifierSvc.showError('Updating fund failed!');
            });
        }
    }
})();
