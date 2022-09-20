import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/common/constants/Constant';
import Swal from 'sweetalert2';
import { ReporteService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/users/user.service';
import { User } from '../../common/interfaces/user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  userForm: FormGroup;
  listUsers: User[];
  userSelected: User;
  listUsersOk: boolean = false;
  createUserOk: boolean = false;
  editUserOk: boolean = false;
  p = 1;
  @ViewChild('modalUpdateUser', { static: false })
  modalUpdateUser: ModalDirective;
  @ViewChild('modalCreateUser', { static: false })
  modalCreateUser: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private reporteService: ReporteService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.createFormFilterUsers();
    this.getAllUsers();
  }

  createFormFilterUsers() {
    this.userForm = this.fb.group({
      codUser: new FormControl(''),
      username: new FormControl(''),
      role: new FormControl(''),
      name: new FormControl(''),
      fatherLastName: new FormControl(''),
      motherLastName: new FormControl(''),
      status: new FormControl(''),
      chargue: new FormControl(''),
      schedule: new FormControl(''),
    });
  }

  exportPdf() {
    Constant.REPORT.forEach((res) => delete res.firstLogin);
    const headers = [
      'CODIGO',
      'EMAIL',
      'ROL',
      'CREACION',
      'MODIFICACION',
      'NOMBRES',
      'APELLIDO PATERNO',
      'APELLIDO MATERNO',
      'ESTADO',
    ];
    this.reporteService.exportAsPDF('REPORTE USUARIOS', headers);
  }

  showModalUpdateUser(user: User) {
    this.userSelected = user;
    this.modalUpdateUser.show();
    this.editUserOk = true;
  }

  onChangeForm() {
    this.p = 1;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.listUsersOk = true;
        this.listUsers = res;
      },
      error: (_err) => {
        this.toastrService.error('Error al listar usuarios');
      },
    });
  }

  resetUserPassword(username: string) {
    this.userService.resetUserPassword(username).subscribe({
      next: (_res) => {
        this.getAllUsers();
        this.toastrService.success('Se reseteo exitosamente la contraseña');
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al resetear el usuario');
      },
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (_res) => {
        this.getAllUsers();
        this.p = 1;
        this.toastrService.success('Se elimino exitosamente el usuario');
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al eliminar el usuario');
      },
    });
  }

  showModalCreateUser() {
    this.createUserOk = true;
    this.modalCreateUser.show();
  }

  alertResetUser(username: string) {
    Swal.fire({
      title: 'Reseteo de contraseña de usuario',
      text: `Se va resetear la contraseña del usuario ${username} ¿Esta seguro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.resetUserPassword(username);
      }
    });
  }

  alertDeleteUser(user: User) {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: `Se va eliminar al usuario  ${user.username} ¿Esta seguro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.deleteUser(user.id);
      }
    });
  }
}
