import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { QuoteService } from './quote.service';
import { ResultsService } from'./results.service';
import { CurrencyService } from './currency.service';

import { Entity } from './models/entity';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TickerService {
    constructor(private http: Http, private quote: QuoteService, private currency: CurrencyService, private results: ResultsService) {

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

    private calculate(entity:Entity) {
        var assets = entity.assets;
        var currency = entity.currency;
        var that = this;

        assets.forEach((asset, index) => {
            that.quote
                .read(asset.name)
                .then(quote => {
                    asset.price = quote.price;
                    var converted = that.currency.resolve(currency, asset.price);
                    asset.value = (converted * asset.quantity).toFixed(2);
                });
        });

    }
}
