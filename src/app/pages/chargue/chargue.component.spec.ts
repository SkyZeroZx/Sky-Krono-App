import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargueComponent } from './chargue.component';

describe('ChargueComponent', () => {
  let component: ChargueComponent;
  let fixture: ComponentFixture<ChargueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
