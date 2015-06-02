(function() {
    angular.module('fm').factory('authenticateSvc', AuthenticateSvc);
    AuthenticateSvc.$inject = ['$q', '$http', 'userModel', 'identitySvc'];

    function AuthenticateSvc($q, $http, userModel, identitySvc) {
        var service = {
            createUser: createUser,
            authenticateUser: authenticateUser,
            signOutUser: signOutUser,
            updateUser: updateUser
        };
        return service;

        function createUser(newUserData) {
            var newUser = new userModel(newUserData);
            var defer = $q.defer();
            newUser.$save().then(function() {
                identitySvc.currentUser = newUser;
                defer.resolve();
            }, function(res) {
                defer.reject(res);
            });
            return defer.promise;
        }

        function authenticateUser(username, password) {
            var defer = $q.defer();
            $http.post('/signin', {username: username, password: password}).success(function(data, status, headers, config) {
                if (data && data.success && data.user) {
                    var user = new userModel();
                    angular.extend(user, data.user);
                    identitySvc.currentUser = user;
                    defer.resolve(true);
                } else {
                    defer.resolve(false);
                }
            }).error(function(data, status, headers, config) {
                console.log('on error');
                defer.reject();
            });
            return defer.promise;
        }

        function signOutUser() {
            var defer = $q.defer();
            $http.post('/signout', {}).then(function() {
                identitySvc.currentUser = undefined;
                defer.resolve();
            });
            return defer.promise;
        }

        function updateUser(userData) {
            var defer = $q.defer();
            var updateUserData = angular.copy(identitySvc.currentUser);
            angular.extend(updateUserData, userData);

            updateUserData.$update().then(function() {
                identitySvc.currentUser = updateUserData;
                defer.resolve();
            }, function(reason) {
                defer.reject(reason);
            });
            return defer.promise;
        }
    }
})();
