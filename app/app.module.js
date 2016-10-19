"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const platform_browser_1 = require('@angular/platform-browser');
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
const app_component_1 = require('./app.component');
const ticker_viewer_component_1 = require('./ticker-viewer.component');
const notification_service_ts_1 = require('./notification.service.ts');
const quote_service_ts_1 = require('./quote.service.ts');
const results_service_ts_1 = require('./results.service.ts');
const ticker_service_ts_1 = require('./ticker.service.ts');
const currency_service_ts_1 = require('./currency.service.ts');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            ticker_viewer_component_1.TickerViewerComponent
        ],
        providers: [
            notification_service_ts_1.NotificationService,
            quote_service_ts_1.QuoteService,
            results_service_ts_1.ResultsService,
            ticker_service_ts_1.TickerService,
            currency_service_ts_1.CurrencyService
        ]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map