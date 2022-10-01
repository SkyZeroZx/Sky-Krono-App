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

  it('Validate getLocalStorageItem', () => {
    localStorage.setItem('test', null);
    expect(themeService.getLocalStorageItem('test')).toBeFalsy();

    localStorage.setItem('test', 'null');
    expect(themeService.getLocalStorageItem('test')).toBeFalsy();

    localStorage.setItem('test', 'false');
    expect(themeService.getLocalStorageItem('test')).toBeFalsy();

    localStorage.setItem('test', 'thing');
    expect(themeService.getLocalStorageItem('test')).toBeTruthy();
  });

  it('Validate setTheme', () => {
    themeService.setTheme(true);
    expect(localStorage.getItem('darkTheme')).toEqual('true');
    //  expect(themeService.theme.getValue()).toEqual(true);

    themeService.setTheme(false);
    expect(localStorage.getItem('darkTheme')).toEqual('false');
    //  expect(themeService.theme.getValue()).toEqual(false);
  });

  it('Validate setNavBar', () => {
    themeService.setNavBar(true);
    expect(localStorage.getItem('navBar')).toEqual('true');
    // expect(themeService.navBar.getValue()).toEqual(true);

    themeService.setNavBar(false);
    expect(localStorage.getItem('navBar')).toEqual('false');
    // expect(themeService.navBar.getValue()).toEqual(false);
  });
});
