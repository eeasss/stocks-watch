import { Component } from '@angular/core';

@Component({
    selector:'stocks-watch',
    template:`
        <div>
            <total-viewer></total-viewer>
            <ticker-viewer></ticker-viewer>
        </div>
    `
})

export class AppComponent {
    title: 'Stocks Watch';
}