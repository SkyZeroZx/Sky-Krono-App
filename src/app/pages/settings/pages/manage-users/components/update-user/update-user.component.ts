import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users/user.service';
import { Chargue, Schedule, User } from '../../../../../../common/interfaces';
import { ChargueService } from '../../../../../../services/chargue/chargue.service';
import { ScheduleService } from '../../../../../../services/schedule/schedule.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup;
  listChargue: Chargue[] = [];
  listSchedule: Schedule[] = [];
  @Input() inputUser: User;
  @Output() close = new EventEmitter();

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private scheduleService: ScheduleService,
    private chargueService: ChargueService,
  ) {}

  ngOnInit(): void {
    this.createFormUpdateUser();
    this.getAllSchedule();
    this.getAllCargues();
  }

  createFormUpdateUser(): void {
    this.updateUserForm = this.fb.group({
      id: new FormControl(this.inputUser.id),
      codChargue: new FormControl(this.inputUser.codChargue, Validators.required),
      codSchedule: new FormControl(this.inputUser.codSchedule, Validators.required),
      createdAt: new FormControl(this.inputUser.createdAt),
      updateAt: new FormControl(this.inputUser.updateAt),
      phone: new FormControl(
        this.inputUser.phone,
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.pattern('[0-9]+'),
        ]),
      ),
      username: new FormControl(
        this.inputUser.username,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(120),
          Validators.email,
        ]),
      ),
      name: new FormControl(
        this.inputUser.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ),
      status: new FormControl(this.inputUser.status, Validators.required),
      fatherLastName: new FormControl(
        this.inputUser.fatherLastName,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ),
      motherLastName: new FormControl(
        this.inputUser.motherLastName,
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

  updateUser() {
    this.userService.updateUser(this.updateUserForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('Se actualizo exitosamente el usuario');
        this.close.emit();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al actualizar el usuario');
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
