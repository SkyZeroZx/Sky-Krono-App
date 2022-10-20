import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users/user.service';
import { Chargue, Schedule } from '../../../../../../common/interfaces';
import { ChargueService } from '../../../../../../services/chargue/chargue.service';
import { ScheduleService } from '../../../../../../services/schedule/schedule.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  @Output() close = new EventEmitter();
  createUserForm: FormGroup;
  listChargue: Chargue[] = [];
  listSchedule: Schedule[] = [];
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private scheduleService: ScheduleService,
    private chargueService: ChargueService,
  ) {}

  ngOnInit(): void {
    this.createFormCreateUser();
    this.getAllSchedule();
    this.getAllCargues();
  }

  createFormCreateUser() {
    this.createUserForm = this.fb.group({
      codChargue: new FormControl(null, Validators.required),
      codSchedule: new FormControl(null, Validators.required),
      phone: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.pattern('[0-9]+'),
        ]),
      ),
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(120),
          Validators.email,
        ]),
      ),
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80),
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
      motherLastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ),
      role: new FormControl('admin'),
    });
  }

  createUser() {
    this.userService.createUser(this.createUserForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('Se creo exitosamente el usuario');
        this.createUserForm.reset();
        this.close.emit();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al crear al usuario');
      },
    });
  }

  getAllCargues() {
    this.chargueService.getAllChargue().subscribe({
      next: (res) => {
        this.listChargue = res;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar los cargos');
      },
    });
  }

  getAllSchedule() {
    this.scheduleService.getAllSchedule().subscribe({
      next: (res) => {
        this.listSchedule = res;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar los horarios');
      },
    });
  }
}
