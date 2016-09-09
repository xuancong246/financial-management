(function() {
    angular.module('fm').controller('fundManagerCtrl', FundManagerCtrl);
    FundManagerCtrl.$inject = ['fundModel', '$scope'];
    function FundManagerCtrl(fundModel, $scope) {
        var vm = this;
        vm.model = {
            funds: []
        };

        vm.onSelectAll = onSelectAll;

        init();
        function init() {
            fundModel.query().$promise.then(function(data) {
                addSelectedField(data);
                vm.model.funds = data;
            }, function(error) {
                console.log(error);
            });

            function addSelectedField(funds) {
                for (var i = 0; i < funds.length; i++) {
                    funds[i].selected = false;
                }
            }

            $scope.getSelectionState = function() {
                var selectionState = true;
                for (var i = 0; i < vm.model.funds.length; i++) {
                    selectionState = selectionState && vm.model.funds[i].selected;
                }
                return selectionState;
            };
            vm.model.selectedAll = false;

            $scope.$watch('getSelectionState()', function(value) {
                if (value !== undefined) {
                    vm.model.selectedAll = value;
                }
            });
        }

        function onSelectAll() {
            for(var i = 0; i < vm.model.funds.length; i++) {
                vm.model.funds[i].selected = vm.model.selectedAll;
            }
        }
    }
})();
