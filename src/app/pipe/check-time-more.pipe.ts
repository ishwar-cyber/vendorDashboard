import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkTimeMore',
  standalone: true
})
export class CheckTimeMorePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    let time = args;
    return time;
  }

}
