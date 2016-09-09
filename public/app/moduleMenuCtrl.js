(function() {
    angular.module('fm').controller('moduleMenuCtrl', ModuleMenuCtrl);
    ModuleMenuCtrl.$inject = ['$location', '$scope'];

    function ModuleMenuCtrl($location, $scope) {
        var vm = this;
        vm.menus = {
            financial: 'Financial',
            admin: 'Admin'
        };
        vm.currentMenu = '';

        init();
        function init() {
            $scope.$on('$locationChangeSuccess', function(next, current) {
                vm.currentMenu = getCurrentMenu();
                function getCurrentMenu() {
                    if ($location.path().indexOf('/financial') === 0) return vm.menus.financial;
                    if ($location.path().indexOf('/admin') === 0) return vm.menus.admin;
                    return '';
                }
            });
        }
    }
})();
