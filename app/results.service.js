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
const core_1 = require('@angular/core');
const notification_service_1 = require('./notification.service');
let ResultsService = class ResultsService {
    constructor(notifications) {
        this.notifications = notifications;
    }
    add(entity) {
        this.data.push(entity);
        this.notifications.trigger('ticker-resolved', entity);
    }
    get() {
        return this.data;
    }
};
ResultsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [notification_service_1.NotificationService])
], ResultsService);
exports.ResultsService = ResultsService;
//# sourceMappingURL=results.service.js.map