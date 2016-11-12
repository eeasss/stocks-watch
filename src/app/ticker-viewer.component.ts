import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { TickerService } from './ticker.service';
import { Entity } from './models/entity';

import { Observable } from 'rxjs'

@Component({
    selector: 'ticker-viewer',
    templateUrl: 'ticker-viewer.component.html',
    styleUrls: ['ticker-viewer.component.css']
})

export class TickerViewerComponent implements OnInit {
    title: 'Ticker Viewer';
    entities = null;

    constructor(private tickerService: TickerService) {
        let that = this;
        tickerService.read().then((result: Response) => {
            let entities: Entity[] = result.json();
            that.entities = entities
            tickerService.resolve(entities);
        });
    }

    ngOnInit(): void {

    }

};

