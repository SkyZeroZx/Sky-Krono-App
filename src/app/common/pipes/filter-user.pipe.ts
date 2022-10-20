import { Pipe, PipeTransform } from '@angular/core';
import { Constant } from 'src/app/common/constants/Constant';

@Pipe({
  name: 'filterUsers',
})
export class FilterPipeUser implements PipeTransform {
  transform(value: any, args1: any): any {
    const resultSearch = [];
    for (const user of value) {
      if (
        user.id.toString().toLowerCase().indexOf(args1[0].toLowerCase()) > -1 ||
        user.username.toLowerCase().indexOf(args1[0].toLowerCase()) > -1 ||
        user.role.toLowerCase().indexOf(args1[0].toLowerCase()) > -1 ||
        user.name.toLowerCase().indexOf(args1[0].toLowerCase()) > -1 ||
        user.fatherLastName.toLowerCase().indexOf(args1[0].toLowerCase()) > -1 ||
        user.motherLastName.toLowerCase().indexOf(args1[0].toLowerCase()) > -1 ||
        user.chargue.toLowerCase().indexOf(args1[0].toLowerCase()) > -1 ||
        user.schedule.toLowerCase().indexOf(args1[0].toLowerCase()) > -1
      ) {
        if (user.status === args1[1] || args1[1] === '') {
          resultSearch.push(user);
        }
      }
    }
    Constant.REPORT = resultSearch;
    return resultSearch;
  }
}
