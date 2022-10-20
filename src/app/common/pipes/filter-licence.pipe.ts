import { Pipe, PipeTransform } from '@angular/core';
import { Constant } from 'src/app/common/constants/Constant';

@Pipe({
  name: 'filterLicence',
})
export class FilterLicence implements PipeTransform {
  transform(value: any, args1: any): any {
    const resultSearch = [];
    for (const licence of value) {
      if (
        licence.fullName.toString().toLowerCase().indexOf(args1[0].toLowerCase()) > -1
      ) {
        resultSearch.push(licence);
      }
    }
    Constant.REPORT = resultSearch;
    return resultSearch;
  }
}
