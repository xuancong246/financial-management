(function() {
    angular.module('fm').factory('roleModel', RoleModel);
    RoleModel.$inject = ['$resource'];
    function RoleModel($resource) {
        return $resource('/api/roles/:id', {_id: '@id'}, {
            update: {method: 'PUT', isArray: false}
        });
    }
})();
