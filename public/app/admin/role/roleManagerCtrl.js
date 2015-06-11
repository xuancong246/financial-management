(function() {
    angular.module('fm').controller('roleManagerCtrl', RoleManagerCtrl);
    RoleManagerCtrl.$inject = ['roleModel', '$scope'];
    function RoleManagerCtrl(roleModel, $scope) {
        var vm = this;
        vm.model = {
            roles: []
        };

        vm.onSelectAll = onSelectAll;

        init();
        function init() {
            roleModel.query().$promise.then(function(data) {
                addSelectedField(data);
                vm.model.roles = data;
            }, function(error) {
                console.log(error);
            });

            function addSelectedField(roles) {
                for (var i = 0; i < roles.length; i++) {
                    roles[i].selected = false;
                }
            }

            $scope.getSelectionState = function() {
                var selectionState = true;
                for (var i = 0; i < vm.model.roles.length; i++) {
                    selectionState = selectionState && vm.model.roles[i].selected;
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
            for(var i = 0; i < vm.model.roles.length; i++) {
                vm.model.roles[i].selected = vm.model.selectedAll;
            }
        }
    }
})();
