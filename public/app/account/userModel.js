(function() {
    angular.module('app').factory('userModel', UserModel);
    UserModel.$inject = ['$resource'];

    function UserModel($resource) {
        var UserResource = $resource('/api/users/:id', {_id: '@id'}, {
            update: {method: 'PUT', isArray: false}
        });
        return UserResource;
    }
})();
