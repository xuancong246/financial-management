(function() {
    angular.module('fm').factory('identitySvc', IdentitySvc);
    IdentitySvc.$inject = ['$window', 'userModel'];

    function IdentitySvc($window, userModel) {
        var currentUser;

        init();
        function init() {
            if (!!$window.bootstrappedUserObject) {
                currentUser = new userModel();
                angular.extend(currentUser, $window.bootstrappedUserObject);
            }
        }

        var factory = {
            currentUser: currentUser,
            isAuthenticated: isAuthenticated
        };
        return factory;

        function isAuthenticated() {
            return !!this.currentUser;
        }
    }
})();
