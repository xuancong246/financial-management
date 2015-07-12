(function() {
    angular.module('fm').config(function($stateProvider) {
        $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: '/partials/admin/admin'
        })
        .state('admin.users', {
            parent: 'admin',
            url: '/users',
            templateUrl: '/partials/admin/user/userManager',
            controller: 'userManagerCtrl', controllerAs: 'vm'
        })
        .state('admin.users.create', {
            parent: 'admin',
            url: '/users/create',
            templateUrl: '/partials/admin/user/userCreator',
            controller: 'userCreatorCtrl', controllerAs: 'vm'
        })
        .state('admin.users.edit', {
            parent: 'admin',
            url: '/users/edit/:id',
            templateUrl: '/partials/admin/user/userEditor',
            controller: 'userEditorCtrl', controllerAs: 'vm'
        })
        .state('admin.roles', {
            parent: 'admin',
            url: '/roles',
            templateUrl: '/partials/admin/role/roleManager',
            controller: 'roleManagerCtrl', controllerAs: 'vm'
        })
        .state('admin.roles.create', {
            parent: 'admin',
            url: '/roles/create',
            templateUrl: '/partials/admin/role/roleCreator',
            controller: 'roleCreatorCtrl', controllerAs: 'vm'
        })
        .state('admin.roles.edit', {
            parent: 'admin',
            url: '/roles/edit/:id',
            templateUrl: '/partials/admin/role/roleEditor',
            controller: 'roleEditorCtrl', controllerAs: 'vm'
        })
        .state('admin.funds', {
            parent: 'admin',
            url: '/funds',
            templateUrl: '/partials/admin/fund/fundManager',
            controller: 'fundManagerCtrl', controllerAs: 'vm'
        })
        .state('admin.funds.create', {
            parent: 'admin',
            url: '/funds/create',
            templateUrl: '/partials/admin/fund/fundCreator',
            controller: 'fundCreatorCtrl', controllerAs: 'vm'
        })
        .state('admin.funds.edit', {
            parent: 'admin',
            url: '/funds/edit/:id',
            templateUrl: '/partials/admin/fund/fundEditor',
            controller: 'fundEditorCtrl', controllerAs: 'vm'
        })
        .state('admin.organizations', {
            parent: 'admin',
            url: '/organizations',
            templateUrl: '/partials/admin/organization/organizationManager',
            controller: 'organizationManagerCtrl', controllerAs: 'vm'
        })
        .state('admin.organizations.create', {
            parent: 'admin',
            url: '/organizations/create',
            templateUrl: '/partials/admin/organization/organizationCreator',
            controller: 'organizationCreatorCtrl', controllerAs: 'vm'
        })
        .state('admin.organizations.edit', {
            parent: 'admin',
            url: '/organizations/edit/:id',
            templateUrl: '/partials/admin/organization/organizationEditor',
            controller: 'organizationEditorCtrl', controllerAs: 'vm'
        });
    });
})();
