import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ModelsModule } from './models/models.module.ts';

import { AppComponent } from './app.component';
import { TickerViewerComponent } from  './ticker-viewer.component';

import { NotificationService } from './notification.service.ts';
import { QuoteService } from './quote.service.ts';
import { ResultsService } from './results.service.ts';
import { TickerService } from './ticker.service.ts';
import { CurrencyService } from './currency.service.ts';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ModelsModule
    ],
    declarations: [
        AppComponent,
        TickerViewerComponent
    ],
    exports: [
        ModelsModule
    ],
    providers: [
        NotificationService,
        QuoteService,
        ResultsService,
        TickerService,
        CurrencyService
    ]
})

export class AppModule {
}



