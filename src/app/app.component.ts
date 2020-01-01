import { Component, OnInit } from '@angular/core';
import { Safe } from 'custom-decorators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'custom-decorators-demo';

  decoratorTitle = 'Safe';
  decoratorDescription = 'Wrapping up target method with try catch structure.';

  ngOnInit(): void {
    console.log('{value: 10}: ', this.execute({value: 10}));
    console.log('{ }: ', this.execute({  }));
    console.log('null: ', this.execute(null));
  }

  @Safe({ returnValue: null })
  execute(o: object): number {
    return o['value'] / 10;
  }
}
