(function() {
    angular.module('fm').directive('fnInputCashByMonth', FnInputCashByMonth);

    function FnInputCashByMonth() {
        var directive = {
            restrict: 'E',
            templateUrl: '/partials/financial/inputCash/input-cash-by-month',
            scope: {
                inputCashByMonth: '=cashByMonth'
            }
        };
        return directive;
    }
})();