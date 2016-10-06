"use strict";
var core_1 = require('@angular/core');
core_1.Injectable();
var CurrencyService = (function () {
    function CurrencyService() {
    }
    CurrencyService.prototype.resolve = function (currencyName, price) {
        var result = 0;
        switch (currencyName) {
            case 'USD':
                result = (price * 1.7);
                break;
            case 'EUR':
                result = (price * 1.95);
                break;
        }
        return result.toFixed(2);
    };
    return CurrencyService;
}());
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=currency.servce.js.map