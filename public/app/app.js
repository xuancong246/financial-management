angular.module('fm', ['ngResource', 'ui.router']);

angular.module('fm').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '/partials/home/home',
        controller: 'homeCtrl',
        controllerAs: 'vm'
    })
    .state('signin', {
        url: '/signin',
        templateUrl: '/partials/account/sign-in/signIn',
        controller: 'signInCtrl', controllerAs: 'vm'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: '/partials/account/sign-up/signUp',
        controller: 'signUpCtrl', controllerAs: 'vm'
    })
    .state('profile', {
        url: '/profile',
        templateUrl: '/partials/account/profile/profile',
        controller: 'profileCtrl', controllerAs: 'vm'
    })
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
    });
});

// angular.module('fm').run(function($rootScope, $location, $window) {
//   $rootScope.$on('$locationChangeStart', function(event, next, current) {
//     if ($location.path() !== '/login' && $location.path() !== '/index' && $location.path() !== '/' && $location.path() !== '/index.html') {
//       $location.path('/login');
//     }
//   });
// });
