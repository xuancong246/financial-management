(function() {
    angular.module('fm').factory('userOrganizationModel', UserOrganizationModel);
    UserOrganizationModel.$inject = ['$resource'];

    function UserOrganizationModel($resource) {
        var UserOrganizationResource = $resource('/api/users-organization/:organizationId', {organizationId: '@organizationId'}, {
            get: {method: 'GET', isArray: true}
        });
        return UserOrganizationResource;
    }
})();
