import { Component } from '@angular/core';

import { ResultsService } from './results.service';
import { NotificationService } from './notification.service';
import { CategoriesService } from './categories.service';

@Component({
    selector: 'total-viewer',
    templateUrl: './total-viewer.component.html'
})
export class TotalViewerComponent {
    private data: any;
    private value: number = 0;
    private cats: any[]

    constructor(private reuslts: ResultsService, private notis: NotificationService, private categories: CategoriesService) {
        this.cats = categories.read();
        var that = this;

        this.notis.bind('ticker-resolved', function(e, data) {
            that.value += parseFloat(data.value);

            that.updateCategories(data, that.cats);
            that.updateAllocations(data, that.cats, that.value);
        });
    }

    updateCategories(ticker:any, categories: any[]) {
        var category = categories.find(c => c.name === ticker.category)
        category.value += parseFloat(ticker.value);
    }

    updateAllocations(ticker: string, categories: any[], totalValue: number) {
        categories.forEach(c => {
            c.percentage = ((c.value / totalValue) * 100).toFixed(2) + '%';
        });
    }


}
