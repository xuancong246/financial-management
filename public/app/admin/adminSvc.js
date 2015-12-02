(function() {
    angular.module('fm').service('adminSvc', adminSvc);

    function adminSvc() {
        var sharedItem = {
            isAdminBodyLoading: false
        };
        var service = {
            getSharedItem: getSharedItem,
            setIsAdminBodyLoading: setIsAdminBodyLoading
        };
        return service;

        function getSharedItem() {
            return sharedItem;
        }

        function setIsAdminBodyLoading(isLoading) {
            sharedItem.isAdminBodyLoading = isLoading;
        }
    }
})();
