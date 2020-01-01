import { Component, NgZone, OnInit } from '@angular/core';
import { OutsideZone } from 'custom-decorators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'custom-decorators-demo';

  decoratorTitle = 'OutsideZone';
  decoratorDescription = 'Wrapping up target method with try catch structure.';

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
  }

  changeTitle(): void {
    this.execute('Testing Title');
    this.executionWithoutZone('Description');
  }

  execute(newTitle: string): void {
    this.decoratorTitle = newTitle;
  }

  @OutsideZone
  executionWithoutZone(description: string): void {
    setTimeout(() => {
      this.decoratorDescription = description;
    }, 1000);
  }
}
