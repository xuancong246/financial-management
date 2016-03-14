(function() {
    angular.module('fm').factory('fnFundSettingDataSvc', FnFundSettingDataSvc);
    FnFundSettingDataSvc.$inject = ['$q', '$http', 'fundSettingModel'];

    function FnFundSettingDataSvc($q, $http, fundSettingModel) {
        var service = {
            create: create,
            update: update,
            getById: getById
        };
        return service;

        function create(fundSetting) {
            var newFundSetting = new fundSettingModel(fundSetting);
            var defer = $q.defer();
            newFundSetting.$save().then(function() {
                defer.resolve();
            }, function(res) {
                defer.reject(res);
            });
            return defer.promise;
        }

        function update(user) {
            var defer = $q.defer();
            var updatedUser = new fundSettingModel();
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

            fundSettingModel.get({id: id}).$promise.then(function(data) {
                defer.resolve(data);
            }, function(err) {
                defer.reject();
            });
            return defer.promise;
        }
    }
})();
