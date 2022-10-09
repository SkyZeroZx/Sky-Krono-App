import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../common/interfaces';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, AfterContentInit {
  @ViewChild('swalPreviewContact')
  readonly swalPreviewContact: SwalComponent;
  height: number;
  listUsers: User[] = [];
  filters: string[] = ['name', 'motherLastName', 'fatherLastName'];
  userPreview: User;
  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    public readonly swalPortalTargets: SwalPortalTargets,
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

  selected(user: User): void {
    localStorage.setItem('contact-detail', JSON.stringify(user));
    this.router.navigate(['/contacts/contact-detail']);
  }

  previewContact(event: Event, user: User): void {
    event.preventDefault();
    event.stopPropagation();
    this.userPreview = user;
    this.swalPreviewContact.fire();
  }

  isImage({ photo }: User): string {
    if (photo == '' || photo == null) {
      return './assets/img/none.png';
    }
    return photo;
  }
}
