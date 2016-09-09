(function() {
    angular.module('fm').factory('roleDataSvc', RoleDataSvc);
    RoleDataSvc.$inject = ['$q', 'roleModel'];
    function RoleDataSvc($q, roleModel) {
        var service = {
            create: create,
            update: update,
            getById: getById
        };
        return service;

        function create(role) {
            var newRole = new roleModel(role),
                defer = $q.defer();
            newRole.$save().then(function() {
                defer.resolve();
            }, function(res) {
                defer.reject(res);
            });
            return defer.promise;
        }

        function update(role) {
            var defer = $q.defer(),
                updatedRole = new roleModel();
            angular.extend(updatedRole, role);

            updatedRole.$update().then(function() {
                defer.resolve();
            }, function(reason) {
                defer.reject(reason);
            });
            return defer.promise;
        }

        function getById(id) {
            var defer = $q.defer();

            roleModel.get({id: id}).$promise.then(function(data) {
                defer.resolve(data);
            }, function(err) {
                defer.reject();
            });
            return defer.promise;
        }
    }
})();
