import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, share } from 'rxjs/operators';

@Injectable() // tslint:disable-line:no-unsafe-any
export class GlobalEventsService {
  /**
   * Scroll event stream shared by all subscribers in the app.
   * Debounce is not included here because some scroll events may actually want
   * to respond in real time. Debouncing can be done via a pipe on the caller
   */
  public onScroll: Observable<Event> =
    fromEvent(document, 'scroll').pipe(share());

  public click = (fromEvent(
      document.querySelector('body'), 'click') as Observable<MouseEvent>
    ).pipe(share());
}
