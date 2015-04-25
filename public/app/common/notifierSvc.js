(function() {
  angular.module('app').value('toastr', toastr);

  angular.module('app').factory('notifierSvc', NotifierSvc);

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
