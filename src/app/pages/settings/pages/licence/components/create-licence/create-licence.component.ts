import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../../../common/interfaces';
import { LicenceService } from '../../../../../../services/licence/licence.service';
import { UserService } from '../../../../../../services/users/user.service';

@Component({
  selector: 'app-create-licence',
  templateUrl: './create-licence.component.html',
  styleUrls: ['./create-licence.component.scss'],
})
export class CreateLicenceComponent implements OnInit {
  @Output() close = new EventEmitter();
  createLicenceForm: FormGroup;
  listUsers: User[] = [];
  minDate: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private licenceService: LicenceService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormCreateLicence();
    this.getAllUsers();
  }

  createFormCreateLicence(): void {
    this.createLicenceForm = this.fb.group({
      codUser: new FormControl(null, Validators.compose([Validators.required])),
      description: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ),
      dateRange: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.listUsers = res;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar los usuarios');
      },
    });
  }

  createLicence(): void {
    this.licenceService.createLicence(this.createLicenceForm.value).subscribe({
      next: (_res) => {
        this.close.emit();
        this.createLicenceForm.reset();
        this.toastrService.success('Se registro exitosamente la licencia');
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al registrar la licencia');
      },
    });
  }
}
