import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TickerViewerComponent } from  './ticker-viewer.component';

import { NotificationService } from './notification.service';
import { QuoteService } from './quote.service';
import { ResultsService } from './results.service';
import { TickerService } from './ticker.service';
import { CurrencyService } from './currency.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        TickerViewerComponent
    ],
    exports: [
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



