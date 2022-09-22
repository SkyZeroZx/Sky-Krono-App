import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTypesComponent } from './create-types.component';

describe('CreateTypeComponent', () => {
  let component: CreateTypesComponent;
  let fixture: ComponentFixture<CreateTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTypesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('CreateTypesComponent create', () => {
    expect(component).toBeTruthy();
  });
});
