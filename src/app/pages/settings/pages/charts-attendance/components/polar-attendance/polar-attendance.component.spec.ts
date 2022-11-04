import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { ChartsAttendanceMock } from '../../charts-attendance.mock.spec';
import { PolarAttendanceComponent } from './polar-attendance.component';

fdescribe('PolarAttendanceComponent', () => {
  let component: PolarAttendanceComponent;
  let fixture: ComponentFixture<PolarAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolarAttendanceComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        NgChartsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarAttendanceComponent);
    component = fixture.componentInstance;
    component.listChartReport = ChartsAttendanceMock.listChartReport;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnChanges', () => {
    const spyLoadPolarChart = spyOn(component, 'loadPolarChart').and.callThrough();
    component.ngOnChanges();
    expect(spyLoadPolarChart).toHaveBeenCalled();
  });

  it('Validate loadPolarChart', () => {
    const spyChartUpdate = spyOn(component.chart, 'update').and.callThrough();
    component.loadPolarChart();
    expect(spyChartUpdate).toHaveBeenCalled();
    expect(component.polarAreaChartData.datasets[0].data).toEqual([
      ChartsAttendanceMock.listChartReport.totalAbsent,
      ChartsAttendanceMock.listChartReport.totalOnTime,
      ChartsAttendanceMock.listChartReport.totalLater,
      ChartsAttendanceMock.listChartReport.totalLicence,
    ]);
  });
});
