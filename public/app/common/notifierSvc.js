(function() {
  angular.module('fm').value('toastr', toastr);

  angular.module('fm').factory('notifierSvc', NotifierSvc);

  function NotifierSvc(toastr) {
    var factory = {
      showWarning: showWarning,
      showSuccess: showSuccess,
      showError: showError
    };
    return factory;

    function showWarning(msg) {
      toastr.warning(msg);
    }

    function showSuccess(msg) {
      toastr.success(msg);
    }

    function showError(msg) {
      toastr.error(msg);
    }
  }
})();
