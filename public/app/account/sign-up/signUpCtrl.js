(function() {
    angular.module('fm').controller('signUpCtrl', SignUpCtrl);
    SignUpCtrl.$inject = ['authenticateSvc', '$location'];

    function SignUpCtrl(authenticateSvc, $location) {
        var vm = this;
        vm.model = {};
        vm.signUp = signUp;

        function signUp() {
            var newUserData = {
                username: vm.model.username,
                password: vm.model.password,
                firstName: vm.model.firstName,
                lastName: vm.model.lastName
            };
            authenticateSvc.createUser(newUserData).then(function() {
                alert('Successfully');
                $location.path('/');
            }, function(res) {
                alert(res.data.toString());
            });
        }
    }
})();
