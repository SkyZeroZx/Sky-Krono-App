import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { labels } from '../../../../../../common/config/charts.config';
import { ChartsAttendanceMock } from '../../charts-attendance.mock.spec';
import { BarAttendanceComponent } from './bar-attendance.component';

fdescribe('BarAttendanceComponent', () => {
  let component: BarAttendanceComponent;
  let fixture: ComponentFixture<BarAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarAttendanceComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        NgChartsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarAttendanceComponent);
    component = fixture.componentInstance;
    component.listChartReport = ChartsAttendanceMock.listChartReport;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnChanges', () => {
    const spyLoadBarChart = spyOn(component, 'loadBarChart').and.callThrough();
    component.ngOnChanges();
    expect(spyLoadBarChart).toHaveBeenCalled();
  });

  it('Validate loadLinearChart', () => {
    const spyChartUpdate = spyOn(component.chart, 'update').and.callThrough();
    component.loadBarChart();
    expect(spyChartUpdate).toHaveBeenCalled();
    expect(component.barChartData.datasets).toEqual([
      {
        data: ChartsAttendanceMock.listChartReport.listAbsent,
        label: labels[0],
        borderWidth: 0.8,
      },
      {
        data: ChartsAttendanceMock.listChartReport.listOnTime,
        label: labels[1],
        borderWidth: 0.8,
      },
      {
        data: ChartsAttendanceMock.listChartReport.listLater,
        label: labels[2],
        borderWidth: 0.8,
      },
      {
        data: ChartsAttendanceMock.listChartReport.listLicence,
        label: labels[3],
        borderWidth: 0.8,
      },
    ]);
  });
});
