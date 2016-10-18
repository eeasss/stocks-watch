import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TickerService {
    constructor(private http: Http) {

    }

    read(): Promise<Object> {
        return this.http.get('api/tickers').toPromise();
    }

    resolve(data: Object) {
        const CALCULATE:string = 'C';

        Object.keys(data).forEach(key => {
            let entity = data[key];

            switch (entity.type) {
                case CALCULATE:
                break;
            }
        });
    }

    private calculate(entity:any) {

        var assets = entity.assets;
        var currencyName = entity.currency;

        assets.forEach((current, index) => {
            quote.read(current.name).success(data => {
                current.price = data.price;
                current.value = (currency.resolve(currencyName, data.price) * current.quantity).toFixed(2);

                results.add(current);
            });
        });
    }
}


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
