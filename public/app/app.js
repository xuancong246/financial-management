angular.module('fm', ['ngResource', 'ui.router', 'ui.bootstrap']);

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
    });
});

// angular.module('fm').run(function($rootScope, $location, $window) {
//   $rootScope.$on('$locationChangeStart', function(event, next, current) {
//     if ($location.path() !== '/login' && $location.path() !== '/index' && $location.path() !== '/' && $location.path() !== '/index.html') {
//       $location.path('/login');
//     }
//   });
// });
