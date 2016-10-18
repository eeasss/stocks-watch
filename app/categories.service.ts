import { Injectable } from '@angular/core';

@Injectable()
export class CategoriesService {
        private categories:string[] = [
            'Bonds',
            'USA ETF',
            'REIT',
            'Yield Co',
            'Emerging and International ETF',
            'Stocks',
            'EMEA ETF'
        ]

        read(): any {
            return this.categories.map(c => {
                return { name: c, value: 0 }
            });
        }
}