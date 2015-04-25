(function() {
  angular.module('app').controller('homeCtrl', HomeCtrl);
  HomeCtrl.$inject = ['$location'];

  function HomeCtrl($location) {
    var vm = this;
    vm.test = test;

    function test() {
      $location.path('/login');
    }
  }
})();
