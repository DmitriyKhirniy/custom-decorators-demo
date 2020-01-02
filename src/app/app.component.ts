import { Component } from '@angular/core';

import { Storage } from 'custom-decorators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom-decorators-demo';

  decoratorTitle = 'Storage';
  decoratorDescription = 'Logic for storing values in browser storage.';

  @Storage<number>('custom-decorators-demo')
  value: number;

  setValue(): void {
    this.value = 10;
  }

  clear(): void {
    this.value = null;
  }
}
