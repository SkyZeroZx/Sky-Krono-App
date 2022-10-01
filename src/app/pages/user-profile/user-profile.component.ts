import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  photoUser: string;

  userProfileForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createUserProfileForm();
    this.getProfile();
  }

  createUserProfileForm() {
    this.userProfileForm = this.fb.group({
      id: null,
      username: null,
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ),
      role: null,
      status: null,
      motherLastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ),
      fatherLastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ),
      createAt: null,
      updateAt: null,
    });
  }

  getProfile() {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.userProfileForm.patchValue(res);
        this.photoUser = res.photo;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al obtener el perfil');
      },
    });
  }

  updateProfile() {
    this.userService.updateUser(this.userProfileForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('Se actualizo exitosamente su perfil');
      },
      error: (_err) => {
        this.toastrService.error('Error al actualizar su perfil');
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
  }
}
