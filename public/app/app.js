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
    });
});

// angular.module('fm').run(function($rootScope, $location, $window) {
//   $rootScope.$on('$locationChangeStart', function(event, next, current) {
//     if ($location.path() !== '/login' && $location.path() !== '/index' && $location.path() !== '/' && $location.path() !== '/index.html') {
//       $location.path('/login');
//     }
//   });
// });
