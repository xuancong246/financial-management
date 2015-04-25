(function() {
  angular.module('app').controller('userNavigationCtrl', UserNavigationCtrl);
  UserNavigationCtrl.$inject = ['identitySvc', 'authenticateSvc', 'notifierSvc', '$location'];

  function UserNavigationCtrl(identitySvc, authenticateSvc, notifierSvc, $location) {
    var vm = this;
    vm.identity = identitySvc;
    vm.model = {};

    vm.signOut = signOut;

    function signOut() {
      authenticateSvc.signOutUser().then(function() {
        notifierSvc.showSuccess('You have successfully signed out!');
        vm.model.username = '';
        vm.model.password = '';
        $location.path('/');
      });
    }
  }
})();
