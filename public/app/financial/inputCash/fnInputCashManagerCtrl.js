(function() {
    angular.module('fm').controller('fnInputCashManagerCtrl', FnInputCashManagerCtrl);
    FnInputCashManagerCtrl.$inject = [
        'fnInputCashDataSvc', 'notifierSvc', 'inputCashModel', 'financialDataSvc',
        'fnInputCashManagerSvc'];

    function FnInputCashManagerCtrl(
        fnInputCashDataSvc, notifierSvc, inputCashModel, financialDataSvc,
        fnInputCashManagerSvc) {
        var vm = this;
        vm.model = {
            inputDate: new Date(),
            source: 'Test source',
            inputCash: []
        };
        vm.status = {open: false};
        vm.open = function(event) {
            vm.status.open = true;
        };
        vm.users = financialDataSvc.users;

        vm.init = init;
        vm.add = add;

        init();

        function init() {
            inputCashModel.query().$promise.then(function(data) {
                vm.model.inputCash = data;
                vm.model.cashByMonth = fnInputCashManagerSvc.buildInputCashByMonth(vm.model.inputCash);
            }, function(error) {
                console.log(error);
            });
        }

        function add() {
            var inputCashData = {
                inputDate: vm.model.inputDate,
                source: vm.model.source,
                cash: 1000000
            };
            fnInputCashDataSvc.create(inputCashData).then(function() {
                notifierSvc.showSuccess('Creating input cash successfully!');
            }, function(res) {
                console.log('Creating input cash failed. reason: ' + res.data.reason);
                notifierSvc.showError('Creating input cash failed!');
            });
        }
    }
})();
