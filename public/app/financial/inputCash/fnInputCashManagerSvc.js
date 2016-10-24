(function () {
    angular.module('fm').service('fnInputCashManagerSvc', FnInputCashManagerSvc);

    function FnInputCashManagerSvc() {
        var service = {
            buildInputCashByMonth: buildInputCashByMonth
        };
        return service;

        function buildInputCashByMonth(inputCash) {
            inputCash = inputCash.sort(function(a, b) {
                var inputDateA = new Date(a.inputDate),
                    inputDateB = new Date(b.inputDate);
                if (inputDateA < inputDateB) return 1;
                if (inputDateA === inputDateB) return 0;
                return 0;
            });
            console.log(inputCash);
            var cashByMonth = {
                months: [],
                detail: {}
            };
            inputCash.forEach(function(cash) {
                var key = moment(new Date(cash.inputDate)).format('MMM-YYYY');
                if (cashByMonth.months.indexOf(key) <= 0) {
                    cashByMonth.months.push(key);
                    cashByMonth.detail[key] = {
                        displayMonth: key,
                        totalCash: 0,
                        items: []
                    };
                }
                cashByMonth.detail[key].totalCash += cash.cash;
                cashByMonth.detail[key].items.push(cash);
            });
            return cashByMonth;
        }
    }
})();