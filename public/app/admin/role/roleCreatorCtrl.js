(function() {
    angular.module('fm').controller('roleCreatorCtrl', RoleCreatorCtrl);
    RoleCreatorCtrl.$inject = ['roleDataSvc', '$state', 'notifierSvc'];

    function RoleCreatorCtrl(roleDataSvc, $state, notifierSvc) {
        var vm = this;
        vm.model = {};
        vm.create = create;

        function create() {
            var roleData = {
                name: vm.model.name,
                description: vm.model.description
            };
            roleDataSvc.create(roleData).then(function() {
                notifierSvc.showSuccess('Creating role successfully!');
                $state.go('admin.roles');
            }, function(res) {
                console.log('Creating role failed. reason: ' + res.data.reason);
                notifierSvc.showError('Creating role failed!');
            });
        }
    }
})();
