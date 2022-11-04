import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { ChartsAttendanceMock } from '../../charts-attendance.mock.spec';
import { CardsAttendanceComponent } from './cards-attendance.component';

describe('CardsAttendanceComponent', () => {
  let component: CardsAttendanceComponent;
  let fixture: ComponentFixture<CardsAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsAttendanceComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        NgChartsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsAttendanceComponent);
    component = fixture.componentInstance;
    component.listChartReport = ChartsAttendanceMock.listChartReport;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnChanges', () => {
    const spyLoadPolarChart = spyOn(component, 'loadCards').and.callThrough();
    component.ngOnChanges();
    expect(spyLoadPolarChart).toHaveBeenCalled();
  });

  it('Validate loadCards', () => {
    component.loadCards();
    expect(component.cardsAttendance).toEqual({
      totalAbsent: ChartsAttendanceMock.listChartReport.totalAbsent,
      totalOnTime: ChartsAttendanceMock.listChartReport.totalOnTime,
      totalLater: ChartsAttendanceMock.listChartReport.totalLater,
      totalLicence: ChartsAttendanceMock.listChartReport.totalLicence,
    });
  });
});
