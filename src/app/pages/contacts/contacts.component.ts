import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../common/interfaces/user';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, AfterContentInit {
  height: number;
  listUsers: User[] = [];
  filters: string[] = ['name', 'motherLastName', 'fatherLastName'];

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  ngAfterContentInit(): void {
    this.height = window.innerHeight * 0.9052734;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.listUsers = res;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar los contactos');
      },
    });
  }

  selected(event: any): void {
    localStorage.setItem('contact-detail', JSON.stringify(event));
    this.router.navigate(['/contacts/contact-detail']);
  }

  imageExist(item) {
    if (item.image == '' || item.image == null) {
      return ' ../assets/img/none.png';
    }
    return item.image;
  }

  onSwipe(event : Event) {
    event.preventDefault();
    
  }
}
