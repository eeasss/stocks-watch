import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class QuoteService {
    constructor(private http: Http) {
    }

    read(ticker: string): Observable<any> {
        return this.http.get('/api/ticker?ticker=' + ticker).map((res: Response) => res.json());
    }
}
