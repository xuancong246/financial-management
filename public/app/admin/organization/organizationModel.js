(function() {
    angular.module('fm').factory('organizationModel', OrganizationModel);
    OrganizationModel.$inject = ['$resource'];
    function OrganizationModel($resource) {
        return $resource('/api/organizations/:id', {_id: '@id'}, {
            update: {method: 'PUT', isArray: false}
        });
    }
})();
