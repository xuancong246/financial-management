(function() {
    angular.module('fm').factory('fundModel', FundModel);
    FundModel.$inject = ['$resource'];

    function FundModel($resource) {
        var FundResource = $resource('/api/funds/:id', {_id: '@id'}, {
            update: {method: 'PUT', isArray: false}
        });
        return FundResource;
    }
})();
