(function() {
    angular.module('fm').factory('inputCashModel', InputCashModel);
    InputCashModel.$inject = ['$resource'];

    function InputCashModel($resource) {
        var InputCashResource = $resource('/api/inputcash/:id', {_id: '@id'}, {
            update: {method: 'PUT', isArray: false}
        });
        return InputCashResource;
    }
})();
