(function() {
    angular.module('fm').controller('userCreatorCtrl', UserCreatorCtrl);
    UserCreatorCtrl.$inject = ['userDataSvc', '$state', 'notifierSvc'];

    function UserCreatorCtrl(userDataSvc, $state, notifierSvc) {
        var vm = this;
        vm.model = {};
        vm.createUser = createUser;

        function createUser() {
            var newUserData = {
                username: vm.model.username,
                password: vm.model.password,
                firstName: vm.model.firstName,
                lastName: vm.model.lastName
            };
            userDataSvc.create(newUserData).then(function() {
                notifierSvc.showSuccess('Creating user successfully!');
                $state.go('admin.users');
            }, function(res) {
                console.log('Creating user failed. reason: ' + res.data.reason.toString());
                notifierSvc.showError('Creating user failed!');
            });
        }
    }
})();
