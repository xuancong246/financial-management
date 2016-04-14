(function() {
    angular.module('fm').service('fnInputCashDataSvc', FnInputCashDataSvc);
    FnInputCashDataSvc.$inject = ['inputCashModel', '$q'];

    function FnInputCashDataSvc(inputCashModel, $q) {
        var service = {
            create: create
        };
        return service;

        function create(inputCash) {
            var newInputCash = new inputCashModel(inputCash),
                defer = $q.defer();
            newInputCash.$save().then(function() {
                defer.resolve();
            }, function(res) {
                defer.reject(res);
            });
            return defer.promise;
        }
    }
})();