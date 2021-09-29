import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noDot'
})
export class NoDotPipe implements PipeTransform {

  transform(value: string | null): string {
    if (value === null)
      return ''
    else {
      let support = '';
      for (let c of value) {
        if (c !== '.')
          support += c;
      }
      return support;
    }
  }
}
