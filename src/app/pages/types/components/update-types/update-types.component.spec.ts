import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypesComponent } from './update-types.component';

describe('UpdateTypesComponent', () => {
  let component: UpdateTypesComponent;
  let fixture: ComponentFixture<UpdateTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
