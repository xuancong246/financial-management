(function() {
    angular.module('fm').factory('fundDataSvc', FundDataSvc);
    FundDataSvc.$inject = ['$q', 'fundModel'];
    function FundDataSvc($q, fundModel) {
        var service = {
            create: create,
            update: update,
            getById: getById
        };
        return service;

        function create(fund) {
            var newFund = new fundModel(fund),
                defer = $q.defer();
            newFund.$save().then(function() {
                defer.resolve();
            }, function(res) {
                defer.reject(res);
            });
            return defer.promise;
        }

        function update(fund) {
            var defer = $q.defer(),
                updatedFund = new fundModel();
            angular.extend(updatedFund, fund);

            updatedFund.$update().then(function() {
                defer.resolve();
            }, function(reason) {
                defer.reject(reason);
            });
            return defer.promise;
        }

        function getById(id) {
            var defer = $q.defer();

            fundModel.get({id: id}).$promise.then(function(data) {
                defer.resolve(data);
            }, function(err) {
                defer.reject();
            });
            return defer.promise;
        }
    }
})();
