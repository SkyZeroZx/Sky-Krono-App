import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLicenceComponent } from './create-licence.component';

describe('CreateLicenceComponent', () => {
  let component: CreateLicenceComponent;
  let fixture: ComponentFixture<CreateLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLicenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
