(function() {
    angular.module('fm').controller('userEditorCtrl', UserEditorCtrl);
    UserEditorCtrl.$inject = ['$stateParams', '$state', 'userDataSvc', 'notifierSvc'];

    function UserEditorCtrl($stateParams, $state, userDataSvc, notifierSvc) {
        var vm = this;
        vm.model = {
            user: {},
            newPassword: ''
        };

        vm.update = update;

        init();
        function init() {
            var userId = $stateParams.id;
            userDataSvc.getById(userId).then(function(data) {
                vm.model.user = data;
            });
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
