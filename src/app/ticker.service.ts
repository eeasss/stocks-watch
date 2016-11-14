import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';

import { QuoteService } from './quote.service';
import { CurrencyService } from './currency.service';
import { Entity } from './models/entity';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class TickerService {
    constructor(private http: Http, private quote: QuoteService, private currency: CurrencyService) {

    }

    read(): Observable<any> {
        return this.http.get('api/tickers').map((res: Response) => res.json());
    }

    resolve(entities: Observable<Entity>) {
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
            that.quote.read(asset.name).subscribe(quote => {
                asset.price = parseFloat(quote.price);
                asset.value = (asset.price * asset.quantity).toFixed(2);
            });
        });

    }
}
