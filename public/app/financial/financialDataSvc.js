(function() {
    angular.module('fm').service('financialDataSvc', FinancialDataSvc);
    FinancialDataSvc.$inject = ['identitySvc'];

    function FinancialDataSvc(identitySvc) {
        var _organization = null;
        var _users = [];

        var service = {
            organization: _organization,
            users: _users
        };
        return service;
    }
})();