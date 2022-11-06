import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { labels } from '../../../../../../common/config/charts.config';
import { ChartsAttendanceMock } from '../../charts-attendance.mock.spec';
import { LinearAttendanceComponent } from './linear-attendance.component';

fdescribe('LinearAttendanceComponent', () => {
  let component: LinearAttendanceComponent;
  let fixture: ComponentFixture<LinearAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinearAttendanceComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        NgChartsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearAttendanceComponent);
    component = fixture.componentInstance;
    component.listChartReport = ChartsAttendanceMock.listChartReport;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnChanges', () => {
    const spyLoadLinearChart = spyOn(component, 'loadLinearChart').and.callThrough();
    component.ngOnChanges();
    expect(spyLoadLinearChart).toHaveBeenCalled();
  });

  it('Validate loadLinearChart', () => {
    const spyChartUpdate = spyOn(component.chart, 'update').and.callThrough();
    component.loadLinearChart();
    expect(spyChartUpdate).toHaveBeenCalled();
    expect(component.lineChartData.datasets).toEqual([
      {
        data: ChartsAttendanceMock.listChartReport.listAbsent,
        label: labels[0],
        fill: 'origin',
      },
      {
        data: ChartsAttendanceMock.listChartReport.listOnTime,
        label: labels[1],
        fill: 'origin',
      },
      {
        data: ChartsAttendanceMock.listChartReport.listLater,
        label: labels[2],
        fill: 'origin',
      },
      {
        data: ChartsAttendanceMock.listChartReport.listLicence,
        label: labels[3],
        fill: 'origin',
      },
    ]);
  });


  
});
