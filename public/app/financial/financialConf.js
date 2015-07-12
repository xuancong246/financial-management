(function() {
    angular.module('fm').config(function($stateProvider) {
        $stateProvider
        .state('financial', {
            url: '/financial',
            templateUrl: '/partials/financial/financial'
        })
        .state('financial.fundsetting', {
            url: '/fundsetting',
            templateUrl: '/partials/financial/fundSetting',
            controller: 'fundSettingCtrl', controllerAs: 'vm'
        });
    });
})();
