(function() {
    angular.module('fm').controller('roleManagerCtrl', RoleManagerCtrl);
    RoleManagerCtrl.$inject = ['roleModel'];
    function RoleManagerCtrl(roleModel) {
        var self = this;
        self.model = {
            roles: []
        };

        init();
        function init() {
            roleModel.query().$promise.then(function(data) {
                self.model.roles = data;
            }, function(error) {
                console.log(error);
            });
        }
    }
})();
