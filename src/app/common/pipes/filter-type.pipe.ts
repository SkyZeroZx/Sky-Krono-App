import { Pipe, PipeTransform } from '@angular/core';
import { Constant } from 'src/app/common/constants/Constant';

@Pipe({
  name: 'filterType',
})
export class FilterType implements PipeTransform {
  transform(value: any, args1: any): any {
    const resultSearch = [];
    for (const type of value) {
      if (type.description.toLowerCase().indexOf(args1[0].toLowerCase()) > -1) {
        resultSearch.push(type);
      }
    }
    Constant.REPORT = resultSearch;
    return resultSearch;
  }
}
