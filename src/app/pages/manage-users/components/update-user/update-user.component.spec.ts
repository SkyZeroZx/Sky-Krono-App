import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { Constant } from "src/app/common/constants/Constant";
import { ServiciosService } from "src/app/services/servicios.service";

import { UpdateUserComponent } from "./update-user.component";

fdescribe("EditUserComponent", () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  let servicio: ServiciosService;
  let toastrService: ToastrService;
  let MockUserEdit: any = {
    id: "15    ",
    username: "SkyZeroZx      ",
    nombre: "sky      ",
    apellidoPaterno: "zero     ",
    apellidoMaterno: "sky     ",
    role: "admin",
    estado: "HABILITADO",
    createdAt: "25/02/2022",
    updateAt: "20/05/2022",
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateUserComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        TabsModule.forRoot(),
        ToastrModule.forRoot(),
      ],
      providers: [
        ServiciosService,
        ToastrService,
        FormBuilder,
        NgbActiveModal,
        NgbModal,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    servicio = TestBed.inject(ServiciosService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    // Seteamos el valor de entra de nuestro component en este caso MockUserEdit
    component.in_user = MockUserEdit;
  });

  it("EditUserComponent creado correctamente", () => {
    expect(component).toBeTruthy();
  });

  it("Verificamos ngOnInit()", () => {
    const spycrearFormularioEditarUser = spyOn(
      component,
      "crearFormularioEditarUser"
    ).and.callThrough();
    const spydetalleUsuario = spyOn(
      component,
      "detalleUsuario"
    ).and.callThrough();
    component.ngOnInit();
    expect(spydetalleUsuario).toHaveBeenCalled();
    expect(spycrearFormularioEditarUser).toHaveBeenCalled();
  });

  it("Verificamos ngOnChanges()", () => {
    let simpleChanges: any;
    const spycrearFormularioEditarUser = spyOn(
      component,
      "crearFormularioEditarUser"
    ).and.callThrough();
    const spydetalleUsuario = spyOn(
      component,
      "detalleUsuario"
    ).and.callThrough();
    component.ngOnChanges(simpleChanges);
    expect(spydetalleUsuario).toHaveBeenCalled();
    expect(spycrearFormularioEditarUser).toHaveBeenCalled();
  });

  it("Verificamos actualizarUsuario()", () => {
    // Preparamos la data de nuestro formulario para invocar la funcion
    component.crearFormularioEditarUser();
    component.detalleUsuario();
    // Espiamos y retornamos un MENSAJE_OK para el servicio updateUser
    const mockResOK: any = {
      message: Constant.MENSAJE_OK,
    };
    const spyupdateUser = spyOn(servicio, "updateUser").and.returnValue(
      of(mockResOK)
    );
    const spytoastrSuccess = spyOn(toastrService, "success").and.callThrough();
    component.actualizarUsuario();
    expect(spyupdateUser).toHaveBeenCalled();
    expect(spytoastrSuccess).toHaveBeenCalled();

    // Espiamos y retornamos un diferente de MENSAJE_OK para el servicio updateUser
    const mockResDif: any = {
      message: "Something",
    };
    const spyupdateUsertDif = spyOn(servicio, "updateUser").and.returnValue(
      of(mockResDif)
    );
    const spytoastrErr = spyOn(toastrService, "success").and.callThrough();
    component.actualizarUsuario();
    expect(spyupdateUsertDif).toHaveBeenCalled();
    expect(spytoastrErr).toHaveBeenCalled();

    // Validamos para el caso que el servicio nos retorne un error
    const spyUserDocMockErr = spyOn(servicio, "updateUser").and.returnValue(
      throwError(() => new Error("Error en el servicio"))
    );
    const spyToastError = spyOn(toastrService, "error").and.callThrough();
    component.actualizarUsuario();
    expect(spyUserDocMockErr).toHaveBeenCalled();
    expect(spyToastError).toHaveBeenCalled();
  });

  it("Verificamos trimEditarUserForm()", () => {
    component.crearFormularioEditarUser();
    // Preparamos los valores a evaluar
    component.editarUserForm.controls.id.setValue(MockUserEdit.id);
    component.editarUserForm.controls.username.setValue(MockUserEdit.username);
    component.editarUserForm.controls.nombre.setValue(MockUserEdit.nombre);
    component.editarUserForm.controls.apellidoPaterno.setValue(
      MockUserEdit.apellidoPaterno
    );
    component.editarUserForm.controls.apellidoMaterno.setValue(
      MockUserEdit.apellidoMaterno
    );
    // Llamamos nuestra funcion
    component.trimEditarUserForm();
    expect(component.editarUserForm.getRawValue().username).toEqual(
      MockUserEdit.username.trim()
    );
    expect(component.editarUserForm.getRawValue().nombre).toEqual(
      MockUserEdit.nombre.trim()
    );
    expect(component.editarUserForm.getRawValue().apellidoPaterno).toEqual(
      MockUserEdit.apellidoPaterno.trim()
    );
    expect(component.editarUserForm.getRawValue().apellidoMaterno).toEqual(
      MockUserEdit.apellidoMaterno.trim()
    );
  });
});
