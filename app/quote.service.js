"use strict";
require('rxjs/add/operator/toPromise');
var QuoteService = (function () {
    function QuoteService(http) {
        this.http = http;
    }
    QuoteService.prototype.read = function (ticker) {
        return this.http.get('/api/ticker?ticker=' + ticker).toPromise();
    };
    return QuoteService;
}());
exports.QuoteService = QuoteService;
//# sourceMappingURL=quote.service.js.map