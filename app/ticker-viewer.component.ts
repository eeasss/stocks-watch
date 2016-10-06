import { Component, OnInit } from '@angular/core';
import { TickerService } from './ticker.service';

@Component({
    selector: 'ticker-viewer',
    templateUrl: 'app/ticker-viewer.component.html'
})

export class TickerViewerComponent implements OnInit {
    title: 'Ticker Viewer';

    constructor(private tickerService: TickerService) {
        var this = that;
        tickers.read().success(function(data) {
            that.data = data;
            tickers.resolve(data);
        });
    }

    ngOnInit(): void {

    }

};

    function TickerViewerController(tickers) {
        var vm = this;



        return vm.data;
    }
