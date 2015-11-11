(function() {
    angular.module('fm').controller('userEditorCtrl', UserEditorCtrl);
    UserEditorCtrl.$inject = [
        '$stateParams', '$state', 'userDataSvc', 'notifierSvc', 'organizationModel',
        'roleModel'
    ];

    function UserEditorCtrl(
        $stateParams, $state, userDataSvc, notifierSvc, organizationModel,
        roleModel) {
        var vm = this;
        vm.model = {
            isEditMode: true,
            user: {},
            newPassword: '',
            organization: '',
            roleId: ''
        };

        vm.update = update;

        init();
        function init() {
            var userId = $stateParams.id;
            getUserToModel();
            getCategoriesToModel();
            return;

            function getUserToModel() {
                userDataSvc.getById(userId).then(function(data) {
                    vm.model.user = data;
                });
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
            updatedUser.newPassword = vm.model.newPassword !== '' ? vm.model.newPassword : undefined;

            userDataSvc.update(updatedUser).then(function() {
                notifierSvc.showSuccess('Updating user successfully!');
                $state.go('admin.users');
            }, function(reason) {
                console.log('Updating user failed. reason: ' + reason.data);
                notifierSvc.showError('Updating user failed!');
            });
        }
    }
})();
