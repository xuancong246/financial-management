(function() {
    angular.module('fm').controller('organizationManagerCtrl', OrganizationManagerCtrl);
    OrganizationManagerCtrl.$inject = ['organizationModel', '$scope'];
    function OrganizationManagerCtrl(organizationModel, $scope) {
        var vm = this;
        vm.model = {
            organizations: []
        };
        vm.selectedIds = [];

        vm.onSelectAll = onSelectAll;

        init();
        function init() {
            organizationModel.query().$promise.then(function(data) {
                addSelectedField(data);
                vm.model.organizations = data;
            }, function(error) {
                console.log(error);
            });

            function addSelectedField(organizations) {
                for (var i = 0; i < organizations.length; i++) {
                    organizations[i].selected = false;
                }
            }

            $scope.getSelectionState = function() {
                var selectionState = true;
                for (var i = 0; i < vm.model.organizations.length; i++) {
                    selectionState = selectionState && vm.model.organizations[i].selected;
                }
                return selectionState;
            };
            vm.model.selectedAll = false;

            $scope.$watch('getSelectionState()', function(value) {
                if (value !== undefined) {
                    vm.model.selectedAll = value;
                }
            });

            $scope.$watch('vm.model.organizations', function(newValues) {
                vm.selectedIds = [];
                angular.forEach(newValues, function(item) {
                    if (item.selected) {
                        vm.selectedIds.push(item._id);
                    }
                });
                console.log(vm.selectedIds);
            }, true);
        }

        function onSelectAll() {
            for(var i = 0; i < vm.model.organizations.length; i++) {
                vm.model.organizations[i].selected = vm.model.selectedAll;
            }
        }
    }
})();
