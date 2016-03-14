(function() {
    angular.module('fm').config(function($stateProvider) {
        $stateProvider
        .state('financial', {
            url: '/financial',
            templateUrl: '/partials/financial/financial',
            controller: 'financialCtrl', controllerAs: 'vm'
        })
        .state('financial.fundsetting', {
            url: '/fundsetting',
            templateUrl: '/partials/financial/fundSetting',
            controller: 'fundSettingCtrl', controllerAs: 'vm'
        })
        .state('financial.fundsetting.editor', {
            parent: 'financial',
            url: '/editor',
            templateUrl: '/partials/financial/fundSetting/editor',
            controller: 'fnFundSettingEditorCtrl', controllerAs: 'vm'
        });
    });
})();
