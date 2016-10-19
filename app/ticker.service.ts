import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { QuoteService } from './quote.service.ts';
import { ResultsService } from'./results.service.ts';
import { CurrencyService } from './currency.service.ts';

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

    private calculate(entity:any) {

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
}
