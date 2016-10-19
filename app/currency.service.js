"use strict";
const core_1 = require('@angular/core');
core_1.Injectable();
class CurrencyService {
    resolve(currencyName, price) {
        let result = 0;
        switch (currencyName) {
            case 'USD':
                result = (price * 1.7);
                break;
            case 'EUR':
                result = (price * 1.95);
                break;
        }
        return result.toFixed(2);
    }
}
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=currency.service.js.map