import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TrackChanges } from 'custom-decorators';

@Component({
  selector: 'app-testing',
  template: `<h4>Value1: {{values.val1}}</h4><h4>Value2: {{values.val2}}</h4>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingComponent implements OnChanges {
  @Input() value1: number;
  @Input() value2: number;

  values = {
    val1: null,
    val2: null
  };

  @TrackChanges<number>('value1', 'parseValue1')
  @TrackChanges<number>('value2', 'parseValue2')
  ngOnChanges(changes: SimpleChanges): void {

    /*How it was*/
    // if (changes['value1'] && changes['value1'].currentValue) {
    //   this.parseValue1(changes['value1'].currentValue);
    // }
    //
    // if (changes['value2'] && changes['value2'].currentValue) {
    //   this.parseValue2(changes['value2'].currentValue);
    // }
  }

  parseValue1(value: number): void {
    this.values.val1 = value * 10;
  }

  parseValue2(value: number): void {
    this.values.val2 = value * 100;
  }
}
