(function() {
    angular.module('fm').controller('fundSettingCtrl', FundSettingCtrl);
    FundSettingCtrl.$inject = ['fundModel', 'fundSettingModel', '$scope', '$q'];

    function FundSettingCtrl(fundModel, fundSettingModel, $scope, $q) {
        var vm = this;

        vm.model = {
            settings: [],
            funds: []
        };

        vm.onSelectAll = onSelectAll;

        init();
        function init() {
            var getFunds = fundModel.query().$promise,
                getFundSettings = fundSettingModel.query().$promise;

            $q.all([getFunds, getFundSettings]).then(function(responses) {
                processFund(responses[0]);
                processFundSettings(responses[1], vm.model.funds);
            }, function(reason) {
                console.log('Get all fund settings and funds, error: ' + reason);
            });

            function processFund(funds) {
                var colors = ['brown', 'burlywood', 'cadetblue', 'chocolate', 'crimson',
                    'darkblue', 'darkcyan', 'darkgreen', 'darkorange', 'darkred', 'goldenrod',
                    'grey', 'indigo', 'lightcoral', 'maroon'
                ];
                var forUseColors = [];
                colors.forEach(function(color) {
                    forUseColors.push({
                        color: color,
                        used: false
                    });
                });
                vm.model.funds = [];
                for (var i = 0; i < funds.length; i ++) {
                    vm.model.funds.push({
                        _id: funds[i]._id,
                        name: funds[i].name,
                        color: getColorForFund()
                    });
                }
                return;

                function getColorForFund() {
                    var tempColor = forUseColors.find(function(colorItem) {
                        return !colorItem.used;
                    });
                    if (tempColor) tempColor.used = true;
                    return tempColor ? tempColor.color : '';
                }
            }

            function processFundSettings(settings, funds) {
                settings.forEach(function(setting) {
                    setting.selected = false;
                    setting.settings.forEach(function(settingDetail) {
                        settingDetail.color = mapColor(settingDetail.fund);
                    });
                });

                vm.model.settings = settings;
                return;

                function mapColor(fundId) {
                    var tempFund = funds.find(function(fund) {
                        return fund._id === fundId;
                    });
                    return tempFund ? tempFund.color : '';
                }
            }

            $scope.getSelectionState = function() {
                var selectionState = true;
                for (var i = 0; i < vm.model.settings.length; i++) {
                    selectionState = selectionState && vm.model.settings[i].selected;
                }
                return selectionState;
            };
            vm.model.selectedAll = false;

            $scope.$watch('getSelectionState()', function(value) {
                if (value !== undefined) {
                    vm.model.selectedAll = value;
                }
            });
        }

        function onSelectAll() {
            for(var i = 0; i < vm.model.settings.length; i++) {
                vm.model.settings[i].selected = vm.model.selectedAll;
            }
        }
    }
})();
