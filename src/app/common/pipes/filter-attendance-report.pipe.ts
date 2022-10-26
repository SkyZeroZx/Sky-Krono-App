import { Pipe, PipeTransform } from '@angular/core';
import { Constant } from 'src/app/common/constants/Constant';

@Pipe({
  name: 'filterAttendanceReport',
})
export class filterAttendanceReport implements PipeTransform {
  transform(value: any, args1: any): any {
    const resultSearch = [];
    for (const reportAttendance of value) {
      if (reportAttendance.status === args1[0] || args1[0] === '') {
        resultSearch.push(reportAttendance);
      }
    }
    Constant.REPORT = resultSearch;
    return resultSearch;
  }
}
