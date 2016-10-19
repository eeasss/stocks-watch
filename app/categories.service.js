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
let CategoriesService = class CategoriesService {
    constructor() {
        this.categories = [
            'Bonds',
            'USA ETF',
            'REIT',
            'Yield Co',
            'Emerging and International ETF',
            'Stocks',
            'EMEA ETF'
        ];
    }
    read() {
        return this.categories.map(c => {
            return { name: c, value: 0 };
        });
    }
};
CategoriesService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map