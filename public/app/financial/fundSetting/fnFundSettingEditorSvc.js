(function() {
    angular.module('fm').service('fnFundSettingEditorSvc', fnFundSettingEditorSvc);

    function fnFundSettingEditorSvc() {
        var service = {
            initChartConfig: initChartConfig,
            buildPieChartSeries: buildPieChartSeries
        };
        return service;

        function initChartConfig() {
            var chartConfig = {
                options: {
                    chart: {
                        type: 'pie'
                    },
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    }
                },

                series: [{
                    data: [1]
                }],
                title: {
                    text: 'Fund setting detail'
                },
                loading: false,
                xAxis: {
                    currentMin: 0,
                    currentMax: 20,
                    title: {text: 'values'}
                },
                useHighStocks: false,
                size: {
                    width: 400,
                    height: 300
                },
                func: function (chart) {
                }
            };
            return chartConfig;
        }

        function buildPieChartSeries(fundSettings) {
            var series = [{
                data: []
            }];
            fundSettings.forEach(function(setting) {
                series[0].data.push({
                    name: setting.name,
                    y: parseInt(setting.percentage)
                });
            });
            // series = [{data:[]}];
            // series[0].data.push({name: 'a', y: 15});
            // series[0].data.push({name:'b', y:90});
            // series[0].data.push({name:'c', y:20});
            return series;
        }
    }
})();
