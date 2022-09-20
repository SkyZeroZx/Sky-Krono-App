import { Pipe, PipeTransform } from '@angular/core';
import { Constant } from 'src/app/common/constants/Constant';

@Pipe({
  name: 'filterChargue',
})
export class FilterChargue implements PipeTransform {
  transform(value: any, args1: any): any {
    const resultSearch = [];
    for (const chargue of value) {
      if (chargue.name.toLowerCase().indexOf(args1[0].toLowerCase()) > -1) {
        resultSearch.push(chargue);
      }
    }
    Constant.REPORT = resultSearch;
    return resultSearch;
  }
}
