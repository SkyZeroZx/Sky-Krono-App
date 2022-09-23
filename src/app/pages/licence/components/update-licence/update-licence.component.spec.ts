import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLicenceComponent } from './update-licence.component';

describe('UpdateLicenceComponent', () => {
  let component: UpdateLicenceComponent;
  let fixture: ComponentFixture<UpdateLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLicenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
