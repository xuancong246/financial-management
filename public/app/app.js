angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider
    .when('/', {templateUrl: '/partials/home/home', controller: 'homeCtrl', controllerAs: 'vm'})
    .when('/signup', {templateUrl: '/partials/account/sign-up/signUp', controller: 'signUpCtrl', controllerAs: 'vm'})
    .when('/signin', {templateUrl: '/partials/account/sign-in/signIn', controller: 'signInCtrl', controllerAs: 'vm'})
    .when('/profile', {templateUrl: '/partials/account/profile/profile', controller: 'profileCtrl', controllerAs: 'vm'})
    .when('/admin', {templateUrl: '/partials/admin/admin'});
});

// angular.module('app').run(function($rootScope, $location, $window) {
//   $rootScope.$on('$locationChangeStart', function(event, next, current) {
//     if ($location.path() !== '/login' && $location.path() !== '/index' && $location.path() !== '/' && $location.path() !== '/index.html') {
//       $location.path('/login');
//     }
//   });
// });
