import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChargueComponent } from './create-chargue.component';

describe('CreateChargueComponent', () => {
  let component: CreateChargueComponent;
  let fixture: ComponentFixture<CreateChargueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChargueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChargueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
