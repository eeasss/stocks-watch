import { Component, OnInit } from '@angular/core';
import { TickerService } from './../ticker.service';
import{ aggregateBy } from '@progress/kendo-data-query';
import { Entity } from './../models/entity'

@Component({
    selector: 'ticker-viewer',
    templateUrl: './ticker-viewer.component.html',
    styleUrls: ['./ticker-viewer.component.scss']
})

export class TickerViewerComponent implements OnInit {
    public title: 'Ticker Viewer';
    public entities: Entity[] = null;
    public totals = {};
    public agg = {};

    constructor(private tickerService: TickerService) {
    }

    public ngOnInit(): void {
        let that = this;
        this.tickerService.read().subscribe(response => {
            that.entities = response;
            this.InitTotals();

            var notifier = this.tickerService.resolve(this.entities);
            notifier.subscribe(entityName => {
                var entity = this.entities.find(e => e.name === entityName);

                let sumAggregate = aggregateBy(entity.assets, [{
                    aggregate: "sum", field: "value"
                }]);

                this.totals[entity.name] = (sumAggregate as any).value.sum;
            })
        });
    }

    private InitTotals(): void {
        this.entities.forEach(e => this.totals[e.name] = 0 );
    }

};
