import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Constant } from '../../common/constants/Constant';
import { ReporteService } from './report.service';

fdescribe('ReportService', () => {
  let reporteService: ReporteService;
  let toastrService: ToastrService;
  const listUsers = [
    {
      id: 1,
      username: 'skyzerobot64@gmail.com',
      role: 'admin',
      createdAt: '2022-09-05T11:23:27.399Z',
      updateAt: '2022-10-24T03:58:14.000Z',
      name: 'SkyBot',
      fatherLastName: 'paterno',
      motherLastName: 'materno',
      status: 'HABILITADO',
      photo: 'https://skykrono.s3.us-east-1.amazonaws.com/skyzerobot64%40gmail.com.jpeg',
      phone: '961008127',
      codChargue: 1,
      chargue: 'admin',
      codSchedule: 1,
      schedule: 'NAME1',
    },
    {
      id: 3,
      username: 'skyzerobot641@gmail.com',
      role: 'admin',
      createdAt: '2022-09-07T11:18:41.643Z',
      updateAt: '2022-10-23T20:49:22.000Z',
      name: 'Demo',
      fatherLastName: 'paterno',
      motherLastName: 'materno',
      status: 'HABILITADO',
      photo: 'https://skykrono.s3.us-east-1.amazonaws.com/skyzerobot641%40gmail.com.jpeg',
      phone: '961008127',
      codChargue: 1,
      chargue: 'admin',
      codSchedule: 2,
      schedule: 'Schedule Test',
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [{ provide: ToastrService, useClass: ToastrService }],
    }).compileComponents();
    reporteService = TestBed.inject(ReporteService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('ReportService be created', () => {
    expect(reporteService).toBeTruthy();
  });

  it('Generate Report', () => {
    Constant.REPORT = listUsers;
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
    const spyToastService = spyOn(toastrService, 'info').and.callThrough();
    reporteService.exportAsPDF('GenerateMock', headers);
    expect(spyToastService).toHaveBeenCalled();
  });
});
