import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarAttendanceComponent } from './bar-attendance.component';

describe('BarAttendanceComponent', () => {
  let component: BarAttendanceComponent;
  let fixture: ComponentFixture<BarAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
