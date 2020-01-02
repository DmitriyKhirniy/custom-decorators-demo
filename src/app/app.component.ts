import { Component } from '@angular/core';
import { RequestCacheService } from './request-cache.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Cacheable } from 'custom-decorators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom-decorators-demo';

  decoratorTitle = 'Cacheable';
  decoratorDescription = 'Decorator that hiding a lot of inner logic with caching observable.';

  value;

  isLoading = false;

  constructor(readonly cacheService: RequestCacheService) {
  }

  fetchValues(): void {
    this.isLoading = true;
    this.getValues()
      .subscribe(res => {
        this.value = res;
        this.isLoading = false;
      });
  }

  @Cacheable('custom_key', false, 5000)
  getValues(): Observable<number> {
    return of(this.getRandomArbitrary(0, 10000))
      .pipe(
        delay(2000)
      );
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}
