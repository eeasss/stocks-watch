import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
    private events: Array<{event: string, callback: Function}>

    constructor() {
        this.events = new Array<{event: string, callback: Function}>();
    }

    bind(event: string, callback: Function) {
        this.events.push({ event: event, callback: callback });
    }

    trigger(eventName: string, args: any) {
        this.events.find(p => p.event === eventName).callback.call(this, args);
    }
}


