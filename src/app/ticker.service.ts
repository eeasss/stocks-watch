import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';

import { QuoteService } from './quote.service';
import { CurrencyService } from './currency.service';
import { Entity } from './models/entity';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TickerService {
    constructor(private http: Http, private quote: QuoteService, private currency: CurrencyService) {

    }

    read(): Observable<any> {
        return this.http.get('api/tickers').map((res: Response) => res.json());
    }

    resolve(entities: Entity[]): EventEmitter<any> {
        const CALCULATE = 'C';
        let notifier = new EventEmitter<any>();

        entities.forEach(entity => {
            switch (entity.type) {
                case CALCULATE:
                this.calculate(entity, notifier);
                break;
            }
        });

        return notifier;
    }

    private calculate(entity: Entity, notifier: EventEmitter<any>) {
        let assets = entity.assets;
        let that = this;

        assets.forEach((asset, idx) => {
            that.quote.read(asset.name).subscribe(quote => {
                asset.price = parseFloat(quote.price);
                asset.value = (asset.price * asset.quantity);

                if (idx === assets.length - 1) {
                    notifier.emit(entity.name);
                }
            });
        });

    }
}
