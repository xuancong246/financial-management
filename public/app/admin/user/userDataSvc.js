(function() {
    angular.module('fm').factory('userDataSvc', UserDataSvc);
    UserDataSvc.$inject = ['$q', '$http', 'userModel', 'userOrganizationModel', 'identitySvc'];

    function UserDataSvc($q, $http, userModel, userOrganizationModel, identitySvc) {
        var service = {
            create: create,
            update: update,
            getUsersByOrganizationId: getUsersByOrganizationId,
            getById: getById
        };
        return service;

        function create(user) {
            var newUser = new userModel(user);
            var defer = $q.defer();
            newUser.$save().then(function() {
                defer.resolve();
            }, function(res) {
                defer.reject(res);
            });
            return defer.promise;
        }

        function update(user) {
            var defer = $q.defer();
            var updatedUser = new userModel();
            angular.extend(updatedUser, user);

            updatedUser.$update().then(function() {
                defer.resolve();
            }, function(reason) {
                defer.reject(reason);
            });
            return defer.promise;
        }

        function getUsersByOrganizationId(id) {
            var defer = $q.defer();
            userOrganizationModel.get({organizationId: id}).$promise.then(function(data) {
                defer.resolve(data);
            }, function() {
                defer.reject();
            });
            return defer.promise;
        }

        function getById(id) {
            var defer = $q.defer();

            userModel.get({id: id}).$promise.then(function(data) {
                defer.resolve(data);
            }, function(err) {
                defer.reject();
            });
            return defer.promise;
        }
    }
})();
