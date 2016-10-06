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
var core_1 = require('@angular/core');
var ticker_service_1 = require('./ticker.service');
var TickerViewerComponent = (function () {
    function TickerViewerComponent(tickerService) {
        this.tickerService = tickerService;
        var ;
        this = that;
        tickers.read().success(function (data) {
            that.data = data;
            tickers.resolve(data);
        });
    }
    TickerViewerComponent.prototype.ngOnInit = function () {
    };
    TickerViewerComponent = __decorate([
        core_1.Component({
            selector: 'ticker-viewer',
            templateUrl: 'app/ticker-viewer.component.html'
        }), 
        __metadata('design:paramtypes', [ticker_service_1.TickerService])
    ], TickerViewerComponent);
    return TickerViewerComponent;
}());
exports.TickerViewerComponent = TickerViewerComponent;
;
function TickerViewerController(tickers) {
    var vm = this;
    return vm.data;
}
//# sourceMappingURL=ticker-viewer.component.js.map