(function () {
    angular.module('fm').controller('financialCtrl', financialCtrl);
    financialCtrl.$inject = [
        'financialSvc', 'identitySvc', 'financialDataSvc', 'userDataSvc',
        'organizationDataSvc', '$q'];

    function financialCtrl(
        financialSvc, identitySvc, financialDataSvc, userDataSvc,
        organizationDataSvc, $q) {
        var vm = this;
        vm.sharedItem = financialSvc.getSharedItem();

        var promises = [
            organizationDataSvc.getById(identitySvc.currentUser.organization),
            userDataSvc.getUsersByOrganizationId(identitySvc.currentUser.organization)
        ];

        financialSvc.setIsFinancialBodyLoading(true);
        $q.all(promises).then(function (data) {
            financialDataSvc.organization = data[0];
            vm.organization = financialDataSvc.organization;
            financialDataSvc.users = data[1];
            financialSvc.setIsFinancialBodyLoading(false);
        }, function (error) {
            console.log(error);
            financialSvc.setIsFinancialBodyLoading(false);
        });
    }
})();
