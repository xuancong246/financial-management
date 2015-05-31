(function() {
    angular.module('fm').controller('userManagerCtrl', UserManagerCtrl);
    UserManagerCtrl.$inject = ['userModel'];

    function UserManagerCtrl(userModel) {
        var vm = this;

        vm.model = {
            users: []
        };

        init();
        function init() {
            userModel.query().$promise.then(function(data) {
                vm.model.users = data;
            }, function(reason) {
                console.log(reason);
            });
        }
    }
})();
