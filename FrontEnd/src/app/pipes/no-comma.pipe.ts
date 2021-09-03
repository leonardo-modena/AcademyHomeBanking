import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noComma'
})
export class NoCommaPipe implements PipeTransform {

  transform(value: string | null): string {
    if (value === null)
      return ''
    else
      return  value.replace(',', '');
  }

}
