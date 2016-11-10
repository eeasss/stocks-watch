import { Injectable } from '@angular/core';

Injectable()
export class CurrencyService {
    resolve(currencyName: string, price: number): number {
        let result = 0;
        switch (currencyName) {
            case 'USD':
                result = (price * 1.7);
            break;
            case 'EUR':
                result = (price * 1.95);
            break;
        }

        return result;
    }
}