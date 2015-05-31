(function() {
    angular.module('fm').factory('userDataSvc', UserDataSvc);
    UserDataSvc.$inject = ['$q', '$http', 'userModel', 'identitySvc'];

    function UserDataSvc($q, $http, userModel, identitySvc) {
        var service = {
            // createUser: createUser,
            update: update,
            getById: getById
        };
        return service;


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
