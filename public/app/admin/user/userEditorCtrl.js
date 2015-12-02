(function() {
    angular.module('fm').controller('userEditorCtrl', UserEditorCtrl);
    UserEditorCtrl.$inject = [
        '$stateParams', '$state', 'userDataSvc', 'notifierSvc', 'organizationModel',
        'roleModel', '$q'
    ];

    function UserEditorCtrl(
        $stateParams, $state, userDataSvc, notifierSvc, organizationModel,
        roleModel, $q) {
        var vm = this;
        vm.model = {
            isEditMode: true,
            user: {},
            newPassword: '',
            organization: '',
            roles: []
        };

        vm.update = update;

        init();
        function init() {
            getExistingData();
            return;

            function getExistingData() {
                var promiseOrganization = organizationModel.query().$promise,
                    promiseRole = roleModel.query().$promise;
                $q.all([promiseOrganization, promiseRole]).then(function(data) {
                    vm.model.organizations = data[0];
                    vm.model.roles = data[1];
                    getUserToModel();
                }, function(error) {
                    console.log(error);
                });
            }

            function getUserToModel() {
                var userId = $stateParams.id;
                userDataSvc.getById(userId).then(function(data) {
                    vm.model.user = data;
                    if (vm.model.user.roles.length > 0) {
                        vm.model.user.roles = getRolesFromRoleIds(vm.model.user.roles);
                    }
                });
                return;

                function getRolesFromRoleIds(roleIds) {
                    var roles = [];
                    for (var i = 0; i < vm.model.roles.length; i++) {
                        var role = vm.model.roles[i];
                        if (roleIds.indexOf(role._id) >= 0) {
                            roles.push(role);
                        }
                    }
                    return roles;
                }
            }

            function getCategoriesToModel() {
                organizationModel.query().$promise.then(function(data) {
                    vm.model.organizations = data;
                }, function(error) {
                    console.log(error);
                });

                roleModel.query().$promise.then(function(data) {
                    vm.model.roles = data;
                }, function(error) {
                    console.log(error);
                });
            }
        }

        function update() {
            var updatedUser = vm.model.user;
            updatedUser.roles = getRoleIdsFromRoles(updatedUser.roles);
            updatedUser.newPassword = vm.model.newPassword !== '' ? vm.model.newPassword : undefined;

            userDataSvc.update(updatedUser).then(function() {
                notifierSvc.showSuccess('Updating user successfully!');
                $state.go('admin.users');
            }, function(reason) {
                console.log('Updating user failed. reason: ' + reason.data);
                notifierSvc.showError('Updating user failed!');
            });
            return;

            function getRoleIdsFromRoles(roles) {
                return roles.map(function(role){
                    return role._id;
                });
            }
        }
    }
})();
