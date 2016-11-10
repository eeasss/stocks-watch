import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuoteService {
    constructor(private http: Http) {
    }

    read(ticker: string): Promise<any> {
        return this.http.get('/api/ticker?ticker=' + ticker).toPromise();
    }
}
