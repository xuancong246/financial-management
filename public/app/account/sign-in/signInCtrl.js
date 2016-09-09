(function() {
    angular.module('fm').controller('signInCtrl', SignInCtrl);
    SignInCtrl.$inject = ['$location', 'authenticateSvc', 'notifierSvc'];

    function SignInCtrl($location, authenticateSvc, notifierSvc) {
        var vm = this;
        vm.model = {};

        vm.login = login;

        function login() {
            authenticateSvc.authenticateUser(vm.model.username, vm.model.password).then(function(success) {
                if (success) {
                    notifierSvc.showSuccess('Login successfully!');
                    $location.path('/');
                } else {
                    notifierSvc.showWarning('Login failed!');
                }
            }, function(reason) {
                notifierSvc.showError('Failed');
            });
        }
    }
})();
