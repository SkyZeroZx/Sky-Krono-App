import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
 
fdescribe('ThemeService', () => {
  let themeService: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    themeService = TestBed.inject(ThemeService);
  });

  it('ThemeService be created', () => {
    expect(themeService).toBeTruthy();
  });
});
