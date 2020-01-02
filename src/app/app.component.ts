import { Component, OnDestroy } from '@angular/core';
import { TakeUntilDestroy } from 'custom-decorators';

import { Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@TakeUntilDestroy
export class AppComponent implements OnDestroy {
  title = 'custom-decorators-demo';

  decoratorTitle = 'TakeUntilDestroy';
  decoratorDescription = 'Logic for unsubscribe.';

  private componentDestroy: () => Observable<unknown>;

  constructor() {
    this.execute(10)
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe(value => {});
    this.execute(20)
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe(value => {});
    this.execute(30)
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe(value => {});
  }

  ngOnDestroy(): void {}

  execute(value: number): Observable<number> {
    return of(value);
  }
}
