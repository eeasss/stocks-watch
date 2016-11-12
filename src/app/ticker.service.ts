import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';

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

    resolve(entities: Entity[]) {
        const CALCULATE = 'C';

        entities.forEach(entity => {
            switch (entity.type) {
                case CALCULATE:
                this.calculate(entity);
                break;
            }
        });
    }

    private calculate(entity: Entity) {
        let assets = entity.assets;
        let currency = entity.currency;
        let that = this;
        assets.forEach((asset, index) => {
            that.quote
                .read(asset.name)
                .then((quote:Response) => {
                    asset.price = parseFloat(quote.json().price);
                    let converted = that.currency.resolve(currency, asset.price);
                    asset.value = (converted * asset.quantity).toFixed(2);
                });
        });

    }
}
