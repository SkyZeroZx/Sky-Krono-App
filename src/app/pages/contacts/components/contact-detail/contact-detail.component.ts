import { Component, OnInit } from '@angular/core';
import { User } from '../../../../common/interfaces';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  contact: User;
  ngOnInit(): void {
    this.contact = JSON.parse(localStorage.getItem('contact-detail'));
  }
}
