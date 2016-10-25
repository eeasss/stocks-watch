import { Component, OnInit } from '@angular/core';
import { TickerService } from './ticker.service';

@Component({
    selector: 'ticker-viewer',
    templateUrl: 'app/ticker-viewer.component.html',
    styleUrls: ['app/ticker-viewer.component.css']
})

export class TickerViewerComponent implements OnInit {
    title: 'Ticker Viewer';
    data = null;

    constructor(private tickerService: TickerService) {
        var that = this;
        tickerService.read().then(data => {
            that.data = data;
            tickerService.resolve(data);
        });
    }

    ngOnInit(): void {

    }

};

