import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom-decorators-demo';

  decoratorTitle = 'TrackChanges';
  decoratorDescription = 'Logic for tracking changes for properties with @Input decorator.';

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
