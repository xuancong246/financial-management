(function() {
    angular.module('fm').controller('fnFundSettingEditorCtrl', fnFundSettingEditorCtrl);
    fnFundSettingEditorCtrl.$inject = [
        'fundModel', 'financialSvc', '$state', 'fnFundSettingEditorSvc', 'fnFundSettingDataSvc',
        'notifierSvc'];

    function fnFundSettingEditorCtrl(
        fundModel, financialSvc, $state, fnFundSettingEditorSvc, fnFundSettingDataSvc,
        notifierSvc) {
        var vm = this;
        vm.model = {
            appliedOn: new Date(),
            funds: []
        };
        vm.status = {open: false};
        vm.open = function(event) {
            vm.status.open = true;
        };

        vm.renderFundPercentagePieChart = renderFundPercentagePieChart;
        vm.save = save;

        init();

        function init() {
            financialSvc.setIsFinancialBodyLoading(true);
            fundSettingId = '';
            vm.chartConfig = fnFundSettingEditorSvc.initChartConfig();
            vm.model.fundSettingDetails = [];
            fundModel.query().$promise.then(function(funds) {
                vm.model.funds = funds;
                generateFundSettingDetails();


                financialSvc.setIsFinancialBodyLoading(false);
            }, function(error) {
                console.log(error);
                financialSvc.setIsFinancialBodyLoading(false);
            });
        }

        function generateFundSettingDetails() {
            vm.model.fundSettingDetails.splice(0, vm.model.fundSettingDetails.length);
            vm.model.funds.forEach(function(fund) {
                vm.model.fundSettingDetails.push({
                    _id: fund._id,
                    name: fund.name,
                    description: fund.description,
                    percentage: fund.percentage
                });
            })
        }

        function renderFundPercentagePieChart() {
            vm.chartConfig.series = fnFundSettingEditorSvc.buildPieChartSeries(vm.model.fundSettingDetails);
            //vm.chartConfig.series = [{data:[{name: 'a', y: 15}, {name:'b', y:90}]}];
        }

        function save() {
            console.log(vm);
            var fundSetting = buildFundSettingForSaving();
            console.log(fundSetting);
            fnFundSettingDataSvc.create(fundSetting).then(function() {
                notifierSvc.showSuccess('Creating fund setting was successful.');
                $state.go('financial.fundsetting');
            }, function(res) {
                console.log('Creating fund setting was not successful. Reason: ' + res.data.reason.toString());
                notifierSvc.showError('Creating fund setting was not successful.');
            });
            return;

            function buildFundSettingForSaving() {
                var settings = [];
                vm.model.fundSettingDetails.forEach(function(detail) {
                    settings.push({
                        fund: detail._id,
                        percentage: detail.percentage
                    });
                });
                return {
                    appliedOn: vm.model.appliedOn,
                    //organization: '',
                    settings: settings,
                    isActive: true
                };
            }
        }
    }
})();
