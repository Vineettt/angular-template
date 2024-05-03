import { Injectable } from '@angular/core';
import { Subject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventQueueService {
  private eventBrocker = new Subject<AppEvent<any>>();

  constructor() {}

  on(eventType: AppEventType): Observable<AppEvent<any>> {
    return this.eventBrocker.pipe(filter((event) => event.type === eventType));
  }

  dispatch<T>(event: AppEvent<T>): void {
    this.eventBrocker.next(event);
  }

  unsubscribe(): void {
    this.eventBrocker.unsubscribe();
  }
}


export enum AppEventType {
  onPause = 'ON_PAUSE',
  onResume = 'ON_RESUME',
  OnModalSubmit = "OnModalSubmit"
}

export class AppEvent<T> {
  constructor(public type: AppEventType, public payload: T) {}
}
