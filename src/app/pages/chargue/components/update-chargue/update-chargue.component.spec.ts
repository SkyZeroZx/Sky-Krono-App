import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChargueComponent } from './update-chargue.component';

describe('UpdateChargueComponent', () => {
  let component: UpdateChargueComponent;
  let fixture: ComponentFixture<UpdateChargueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateChargueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChargueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
