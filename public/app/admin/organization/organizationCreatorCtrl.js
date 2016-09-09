(function() {
    angular.module('fm').controller('organizationCreatorCtrl', OrganizationCreatorCtrl);
    OrganizationCreatorCtrl.$inject = ['organizationDataSvc', '$state', 'notifierSvc'];

    function OrganizationCreatorCtrl(organizationDataSvc, $state, notifierSvc) {
        var vm = this;
        vm.model = {};
        vm.create = create;

        function create() {
            var organizationData = {
                name: vm.model.name,
                address: vm.model.address,
                description: vm.model.description
            };
            organizationDataSvc.create(organizationData).then(function() {
                notifierSvc.showSuccess('Creating organization successfully!');
                $state.go('admin.organizations');
            }, function(res) {
                console.log('Creating organization failed. reason: ' + res.data.reason);
                notifierSvc.showError('Creating organization failed!');
            });
        }
    }
})();
