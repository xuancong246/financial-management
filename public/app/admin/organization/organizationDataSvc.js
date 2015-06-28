(function() {
    angular.module('fm').factory('organizationDataSvc', OrganizationDataSvc);
    OrganizationDataSvc.$inject = ['$q', 'organizationModel'];
    function OrganizationDataSvc($q, organizationModel) {
        var service = {
            create: create,
            update: update,
            getById: getById
        };
        return service;

        function create(organization) {
            var newOrganization = new organizationModel(organization),
                defer = $q.defer();
            newOrganization.$save().then(function() {
                defer.resolve();
            }, function(res) {
                defer.reject(res);
            });
            return defer.promise;
        }

        function update(organization) {
            var defer = $q.defer(),
                updatedOrganization = new organizationModel();
            angular.extend(updatedOrganization, organization);

            updatedOrganization.$update().then(function() {
                defer.resolve();
            }, function(reason) {
                defer.reject(reason);
            });
            return defer.promise;
        }

        function getById(id) {
            var defer = $q.defer();

            organizationModel.get({id: id}).$promise.then(function(data) {
                defer.resolve(data);
            }, function(err) {
                defer.reject();
            });
            return defer.promise;
        }
    }
})();
