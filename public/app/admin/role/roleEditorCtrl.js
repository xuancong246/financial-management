(function() {
    angular.module('fm').controller('roleEditorCtrl', RoleEditorCtrl);
    RoleEditorCtrl.$inject = ['$stateParams', '$state', 'roleDataSvc', 'notifierSvc'];

    function RoleEditorCtrl($stateParams, $state, roleDataSvc, notifierSvc) {
        var vm = this;
        vm.model = {
            role: {}
        };

        vm.update = update;

        init();
        function init() {
            var roleId = $stateParams.id;
            roleDataSvc.getById(roleId).then(function(data) {
                vm.model.role = data;
            });
        }

        function update() {
            roleDataSvc.update(vm.model.role).then(function() {
                notifierSvc.showSuccess('Updating role successfully!');
                $state.go('admin.roles');
            }, function(reason) {
                console.log('Updating role failed. reason: ' + reason.data);
                notifierSvc.showError('Updating role failed!');
            });
        }
    }
})();
