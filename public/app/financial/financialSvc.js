(function() {
    angular.module('fm').service('financialSvc', financialSvc);

    function financialSvc() {
        var sharedItem = {
            isFinancialBodyLoading: false
        };
        var service = {
            getSharedItem: getSharedItem,
            setIsFinancialBodyLoading: setIsFinancialBodyLoading
        };
        return service;

        function getSharedItem() {
            return sharedItem;
        }

        function setIsFinancialBodyLoading(isLoading) {
            sharedItem.isFinancialBodyLoading = isLoading;
        }
    }
})();
