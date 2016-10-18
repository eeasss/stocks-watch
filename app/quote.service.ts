import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class QuoteService {
    constructor(private http:Http) {
    }

    read(ticker:string): Promise<any> {
        return this.http.get('/api/ticker?ticker=' + ticker).toPromise();
    }
}
