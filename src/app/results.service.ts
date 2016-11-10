import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable()
export class ResultsService {
    private data: Array<any>;

    constructor(private notifications: NotificationService) {

    }

    add(entity: any) {
        this.data.push(entity);
        this.notifications.trigger('ticker-resolved', entity);
    }

    get(): Array<any> {
        return this.data;
    }
}
