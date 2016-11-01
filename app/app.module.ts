import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TickerViewerComponent } from  './ticker-viewer.component';
import { TotalViewerComponent } from './total-viewer.component';

import { NotificationService } from './notification.service';
import { QuoteService } from './quote.service';
import { ResultsService } from './results.service';
import { TickerService } from './ticker.service';
import { CurrencyService } from './currency.service';
import { CategoriesService } from './categories.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        TickerViewerComponent,
        TotalViewerComponent
    ],
    bootstrap: [
        AppComponent
    ],
    exports: [
        TickerViewerComponent,
        TotalViewerComponent
    ],
    providers: [
        NotificationService,
        QuoteService,
        ResultsService,
        TickerService,
        CurrencyService,
        CategoriesService
    ]
})

export class AppModule {
}



