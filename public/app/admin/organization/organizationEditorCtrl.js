(function() {
    angular.module('fm').controller('organizationEditorCtrl', OrganizationEditorCtrl);
    OrganizationEditorCtrl.$inject = ['$stateParams', '$state', 'organizationDataSvc', 'notifierSvc'];

    function OrganizationEditorCtrl($stateParams, $state, organizationDataSvc, notifierSvc) {
        var vm = this;
        vm.model = {
            organization: {}
        };

        vm.update = update;

        init();
        function init() {
            var organizationId = $stateParams.id;
            organizationDataSvc.getById(organizationId).then(function(data) {
                vm.model.organization = data;
            });
        }

        function update() {
            organizationDataSvc.update(vm.model.organization).then(function() {
                notifierSvc.showSuccess('Updating organization successfully!');
                $state.go('admin.organizations');
            }, function(reason) {
                console.log('Updating organization failed. reason: ' + reason.data);
                notifierSvc.showError('Updating organization failed!');
            });
        }
    }
})();
