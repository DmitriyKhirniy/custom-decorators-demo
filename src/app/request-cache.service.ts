import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable()
export class RequestCacheService {
  // tslint:disable-next-line: no-any  : impossible to describe type of second parameter
  protected cache: Map<string, any> = new Map<string, any>();
  readonly DEFAULT_MAX_AGE: number = 300000;
  // tslint:disable-next-line: no-any  : impossible to describe type of second parameter
  private inFlightObservables: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  /**
   * Gets the value from cache if the key is provided.
   * If no value exists in cache, then check if the same call exists
   * in flight, if so return the subject. If not create a new
   * Subject inFlightObservable and return the source observable.
   */
  get<Type>(key: string, fallback?: Observable<Type>, maxAge = this.DEFAULT_MAX_AGE): Observable<Type> | Subject<Type> {

    if (this.hasValidCachedValue(key)) {
      console.log(`%cGetting from cache ${key}`, 'color: green'); // tslint:disable-line:no-console

      return of(this.cache.get(key).value);
    }

    if (this.inFlightObservables.has(key)) {
      return this.inFlightObservables.get(key);
    } else if (fallback && fallback instanceof Observable) {
      console.log(`%c Calling api for ${key}`, 'color: purple'); // tslint:disable-line:no-console

      return fallback.pipe(tap(value => {
        this.inFlightObservables.set(key, new Subject());
        this.set(key, value, maxAge);
      }));
    } else {
      return throwError('Requested key is not available in Cache');
    }

  }

  /**
   * Sets the value with key in the cache
   * Notifies all observers of the new value
   */
  // tslint:disable-next-line: no-any  : impossible to describe type of value parameter
  set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE): void {
    this.cache.set(key, { value, expiry: Date.now() + maxAge });
    this.notifyInFlightObservers(key, value);
  }

  /**
   * Checks if the a key exists in cache
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Publishes the value to all observers of the given
   * in progress observables if observers exist.
   */
  private notifyInFlightObservers(key: string, value: object): void {
    if (this.inFlightObservables.has(key)) {
      const inFlight = this.inFlightObservables.get(key);
      const observersCount = inFlight.observers.length;
      if (observersCount) {
        // tslint:disable-next-line:no-console
        console.log(`%cNotifying ${inFlight.observers.length} flight subscribers for ${key}`, 'color: blue');
        inFlight.next(value);
      }
      inFlight.complete();
      this.inFlightObservables.delete(key);
    }
  }

  /**
   * Checks if the key exists and   has not expired.
   */
  private hasValidCachedValue(key: string): boolean {
    if (this.cache.has(key)) {
      if (this.cache.get(key).expiry < Date.now()) {
        this.cache.delete(key);

        return false;
      }

      return true;
    } else {
      return false;
    }
  }
}
