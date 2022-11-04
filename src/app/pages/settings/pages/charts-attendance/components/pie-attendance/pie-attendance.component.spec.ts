import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { ChartsAttendanceMock } from '../../charts-attendance.mock.spec';
import { PieAttendanceComponent } from './pie-attendance.component';

fdescribe('PieAttendanceComponent', () => {
  let component: PieAttendanceComponent;
  let fixture: ComponentFixture<PieAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieAttendanceComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        NgChartsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieAttendanceComponent);
    component = fixture.componentInstance;
    component.listChartReport = ChartsAttendanceMock.listChartReport;
    fixture.detectChanges();
  });

  it('Validate ngOnChanges', () => {
    const spyLoadPolarChart = spyOn(component, 'loadPieChart').and.callThrough();
    component.ngOnChanges();
    expect(spyLoadPolarChart).toHaveBeenCalled();
  });

  it('Validate loadPieChart', () => {
    const spyChartUpdate = spyOn(component.chart, 'update').and.callThrough();
    component.loadPieChart();
    expect(spyChartUpdate).toHaveBeenCalled();
    expect(component.pieChartData.datasets[0].data).toEqual([
      ChartsAttendanceMock.listChartReport.totalAbsent,
      ChartsAttendanceMock.listChartReport.totalOnTime,
      ChartsAttendanceMock.listChartReport.totalLater,
      ChartsAttendanceMock.listChartReport.totalLicence,
    ]);
  });
});
