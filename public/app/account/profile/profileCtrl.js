(function() {
  angular.module('app').controller('profileCtrl', ProfileCtrl);
  ProfileCtrl.$inject = ['identitySvc', 'authenticateSvc', 'notifierSvc'];

  function ProfileCtrl(identitySvc, authenticateSvc, notifierSvc) {
    var vm = this;
    vm.model = {};

    vm.update = update;

    init();
    function init() {
      if (!identitySvc.currentUser) return;
      vm.model.username = identitySvc.currentUser.username;
      vm.model.firstName = identitySvc.currentUser.firstName;
      vm.model.lastName = identitySvc.currentUser.lastName;
    }

    function update() {
      var updateUserData = {
        username: vm.model.username,
        firstName: vm.model.firstName,
        lastName: vm.model.lastName
      };
      updateUserData.newPassword = vm.model.newPassword ? vm.model.newPassword : undefined;

      authenticateSvc.updateUser(updateUserData).then(function() {
        notifierSvc.showSuccess('Your user account has been updated');
      }, function(reason) {
        notifierSvc.showError(reason);
      });
    }
  }
})();
