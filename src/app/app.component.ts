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

  value1;
  value2;

  setValue1(): void {
    this.value1 = this.getRandomArbitrary(1, 100);
  }

  setValue2(): void {
    this.value2 = this.getRandomArbitrary(1, 100);
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}
