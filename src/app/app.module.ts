import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { GridModule } from '@progress/kendo-angular-grid';

import { AppComponent } from './app.component';
import { TickerViewerComponent } from  './ticker-viewer.component';

import { QuoteService } from './quote.service';
import { TickerService } from './ticker.service';
import { CurrencyService } from './currency.service';
import { CategoriesService } from './categories.service';
import { CategoryPIeComponent } from './category-pie/category-pie.component';
import { PerformanceByAllocationComponent } from './performance-by-allocation/performance-by-allocation.component';

@NgModule({
    imports: [
        BrowserModule,
        GridModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        TickerViewerComponent,
        CategoryPIeComponent,
        PerformanceByAllocationComponent
    ],
    bootstrap: [
        AppComponent
    ],
    exports: [
        TickerViewerComponent
    ],
    providers: [
        QuoteService,
        TickerService,
        CurrencyService,
        CategoriesService
    ]
})

export class AppModule {
}



