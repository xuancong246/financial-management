(function() {
    angular.module('fm').factory('identitySvc', IdentitySvc);
    IdentitySvc.$inject = [
        '$window', 'userModel', 'organizationModel'];

    function IdentitySvc($window, userModel, organizationModel) {
        var currentUser,
            currentOrganization;

        init();
        function init() {
            if (!!$window.bootstrappedUserObject) {
                currentUser = new userModel();
                angular.extend(currentUser, $window.bootstrappedUserObject);
            }
            if (!!$window.bootstrappedOrganizationObject) {
                currentOrganization = new organizationModel();
                angular.extend(currentOrganization, $window.bootstrappedOrganizationObject);
            }
        }

        var factory = {
            currentUser: currentUser,
            currentOrganization: currentOrganization,
            isAuthenticated: isAuthenticated
        };
        return factory;

        function isAuthenticated() {
            return !!this.currentUser;
        }
    }
})();
