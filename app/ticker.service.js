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
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
const quote_service_ts_1 = require('./quote.service.ts');
const results_service_ts_1 = require('./results.service.ts');
const currency_service_ts_1 = require('./currency.service.ts');
require('rxjs/add/operator/toPromise');
let TickerService = class TickerService {
    constructor(http, quote, currency, results) {
        this.http = http;
        this.quote = quote;
        this.currency = currency;
        this.results = results;
    }
    read() {
        return this.http.get('api/tickers').toPromise();
    }
    resolve(data) {
        const CALCULATE = 'C';
        Object.keys(data).forEach(key => {
            let entity = data[key];
            switch (entity.type) {
                case CALCULATE:
                    break;
            }
        });
    }
    calculate(entity) {
        var assets = entity.assets;
        var currencyName = entity.currency;
        assets.forEach((current, index) => {
            this.quote.read(current.name).then(data => {
                current.price = data.price;
                //current.value = (this.currency.resolve(currencyName, data.price) * current.quantity).toFixed(2);
                this.results.add(current);
            });
        });
    }
};
TickerService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, quote_service_ts_1.QuoteService, currency_service_ts_1.CurrencyService, results_service_ts_1.ResultsService])
], TickerService);
exports.TickerService = TickerService;
// angular.module('app')
//     .factory('tickers', ['$http', 'quote', 'results', 'currency', function($http, quote, results, currency) {
//         var CALCULATE = 'C';
//         var TickerService = function() {
//         }
//         TickerService.prototype = {
//             read: function() {
//                 return $http.get('api/tickers');
//             },
//             resolve: function(data) {
//                 Object.keys(data).forEach(key=> {
//                     var entity = data[key];
//                     switch (entity.type) {
//                         case CALCULATE:
//                             this._calculate(entity);
//                         break;
//                     }
//                 });
//             },
//             _calculate: function(entity) {
//                 var assets = entity.assets;
//                 var currencyName = entity.currency;
//                 assets.forEach((current, index) => {
//                     quote.read(current.name).success(data => {
//                         current.price = data.price;
//                         current.value = (currency.resolve(currencyName, data.price) * current.quantity).toFixed(2);
//                         current.currency = currencyName;
//                         results.add(current);
//                     });
//                 });
//             }
//         }
//         return new TickerService();
//     }]);
//# sourceMappingURL=ticker.service.js.map