import { Component, OnInit, DoCheck } from '@angular/core';
import { TickerService } from './../ticker.service';

@Component({
    selector: 'ticker-viewer',
    templateUrl: './ticker-viewer.component.html',
    styleUrls: ['./ticker-viewer.component.scss']
})

export class TickerViewerComponent implements OnInit, DoCheck {
    title: 'Ticker Viewer';
    entities = null;

    constructor(private tickerService: TickerService) {

    }

    ngOnInit(): void {
        let that = this;
        this.tickerService.read().subscribe(response => {
            that.entities = response;
            this.tickerService.resolve(response);
        });
    }

    ngDoCheck(): void {

    }

};

