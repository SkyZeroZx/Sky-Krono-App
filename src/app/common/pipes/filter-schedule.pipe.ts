import { Pipe, PipeTransform } from '@angular/core';
import { Constant } from 'src/app/common/constants/Constant';

@Pipe({
  name: 'filterSchedule',
})
export class FilterSchedule implements PipeTransform {
  transform(value: any, args1: any): any {
    const resultSearch = [];
    for (const schedule of value) {
      if (schedule.name.toLowerCase().indexOf(args1[0].toLowerCase()) > -1) {
        resultSearch.push(schedule);
      }
    }
    Constant.REPORT = resultSearch;
    return resultSearch;
  }
}
