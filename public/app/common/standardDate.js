(function() {
    angular.module('fm').filter('standardDate', standardDate);
    standardDate.$inject = ['$filter'];

    function standardDate($filter) {
        return function(input) {
            var temp = new Date(input);
            if (!angular.isDate(temp)) return "NA";
            return $filter('date')(new Date(temp), 'dd/MM/yyyy hh:mm a');
        }
    }
})();
