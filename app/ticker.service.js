"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var TickerService = (function () {
    function TickerService() {
    }
    TickerService.CALCULATE = 'C';
    TickerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TickerService);
    return TickerService;
}());
exports.TickerService = TickerService;
angular.module('app')
    .factory('tickers', ['$http', 'quote', 'results', 'currency', function ($http, quote, results, currency) {
        var CALCULATE = 'C';
        var TickerService = function () {
        };
        TickerService.prototype = {
            read: function () {
                return $http.get('api/tickers');
            },
            resolve: function (data) {
                var _this = this;
                Object.keys(data).forEach(function (key) {
                    var entity = data[key];
                    switch (entity.type) {
                        case CALCULATE:
                            _this._calculate(entity);
                            break;
                    }
                });
            },
            _calculate: function (entity) {
                var assets = entity.assets;
                var currencyName = entity.currency;
                assets.forEach(function (current, index) {
                    quote.read(current.name).success(function (data) {
                        current.price = data.price;
                        current.value = (currency.resolve(currencyName, data.price) * current.quantity).toFixed(2);
                        current.currency = currencyName;
                        results.add(current);
                    });
                });
            }
        };
        return new TickerService();
    }]);
//# sourceMappingURL=ticker.service.js.map