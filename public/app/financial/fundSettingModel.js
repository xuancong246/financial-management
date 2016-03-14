(function() {
    angular.module('fm').factory('fundSettingModel', FundSettingModel);
    FundSettingModel.$inject = ['$resource'];

    function FundSettingModel($resource) {
        var FundSettingResource = $resource('/api/fundsettings/:id', {_id: '@id'}, {
            update: {method: 'PUT', isArray: false}
        });
        return FundSettingResource;
    }
})();
