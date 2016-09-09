(function() {
    angular.module('fm').controller('userManagerCtrl', UserManagerCtrl);
    UserManagerCtrl.$inject = ['userModel', '$scope'];

    function UserManagerCtrl(userModel, $scope) {
        var vm = this;

        vm.model = {
            users: []
        };

        vm.onSelectAll = onSelectAll;

        init();
        function init() {
            userModel.query().$promise.then(function(data) {
                addSelectedField(data);
                data.forEach(function(user) {
                    user.organizationName = user.organization ? user.organization.name : '';
                    user.roleNames = '';
                    if (user.roles) {
                        var roles = user.roles.map(function(role) {
                            return role.name;
                        });
                        user.roleNames = roles.join('; ');
                    }
                });
                vm.model.users = data;
            }, function(reason) {
                console.log('Get all users, error: ' + reason);
            });

            $scope.getSelectionState = function() {
                var selectionState = true;
                for (var i = 0; i < vm.model.users.length; i++) {
                    selectionState = selectionState && vm.model.users[i].selected;
                }
                return selectionState;
            };
            vm.model.selectedAll = false;

            $scope.$watch('getSelectionState()', function(value) {
                if (value !== undefined) {
                    vm.model.selectedAll = value;
                }
            });

            function addSelectedField(users) {
                for (var i = 0; i < users.length; i++) {
                    users[i].selected = false;
                }
            }
        }

        function onSelectAll() {
            for(var i = 0; i < vm.model.users.length; i++) {
                vm.model.users[i].selected = vm.model.selectedAll;
            }
        }
    }
})();
