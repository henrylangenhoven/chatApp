import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { User } from './user.model';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserService', () => {
  let userService: UserService;
  let localStore: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [UserService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });
    userService = TestBed.inject(UserService);

    spyOn(window, 'prompt').and.returnValue('test');

    localStore = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key) => (key in localStore ? localStore[key] : null));
    spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (localStore[key] = value + ''));
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
  });

  describe('Positive Tests', () => {
    it('should login if current user exists', (done: DoneFn) => {
      window.localStorage.setItem('currentUserId', 'test-id');
      spyOn((userService as any).http, 'get').and.returnValue(of({ id: 'test-id' }));

      userService.login().subscribe((user) => {
        expect(user).toBeTruthy();
        expect(user.id).toBe('test-id');
        done();
      });
      expect((userService as any).http.get).toHaveBeenCalledWith('/api/users/test-id');
    });

    it('should logout', () => {
      spyOn(userService as any, 'reloadWindow').and.callFake(function () {});
      userService.logout();
      expect((userService as any).reloadWindow).toHaveBeenCalled();
    });

    it('should create a new user', (done: DoneFn) => {
      spyOn((userService as any).http, 'post').and.returnValue(of({ id: 'test-id' }));

      userService.createNewUser('', '', false).subscribe((user) => {
        expect(user).toBeTruthy();
        expect(user.id).toBeTruthy();
        done();
      });
      expect((userService as any).http.post).toHaveBeenCalledWith('/api/users', jasmine.any(Object));
    });

    it('should create a new current user', (done: DoneFn) => {
      spyOn(userService, 'createNewUser').and.returnValue(of({ id: 'test-id' }));
      (userService as any).createNewCurrentUser().subscribe((user: User) => {
        expect(user).toBeTruthy();
        expect(user.id).toBeTruthy();
        expect(window.localStorage.setItem).toHaveBeenCalledWith('currentUserId', user.id!);
        expect(userService.createNewUser).toHaveBeenCalled();
        done();
      });
    });

    it('should  generate random numbers between the specified range', () => {
      const randomNumber = (userService as any).getRandomNumberBetween(1, 8);
      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(8);
    });

    it('should not generate random numbers beyond the specified range', () => {
      const randomNumber = (userService as any).getRandomNumberBetween(1, 8);
      expect(randomNumber).not.toBeLessThan(1);
      expect(randomNumber).not.toBeGreaterThan(8);
    });

    it('should get current userId', () => {
      window.localStorage.setItem('currentUserId', 'test-id');
      expect(userService.getCurrentUserId()).toBe('test-id');
    });
  });

  describe('Negative Tests', () => {
    it('should login if no current user exists', (done: DoneFn) => {
      window.localStorage.clear();
      spyOn((userService as any).http, 'get');
      spyOn(userService, 'createNewUser').and.returnValue(of({ id: 'test-id' }));

      userService.login().subscribe((user) => {
        expect(user).toBeTruthy();
        expect(user.id).toBe('test-id');
        expect(window.localStorage.setItem).toHaveBeenCalledWith('currentUserId', 'test-id');
        done();
      });
      expect((userService as any).http.get).not.toHaveBeenCalled();
    });

    it("should login if current user id can't be found", (done: DoneFn) => {
      window.localStorage.setItem('currentUserId', 'test-id');
      spyOn((userService as any).http, 'get').and.callFake(() => throwError(() => new Error('test')));
      spyOn(userService as any, 'createNewCurrentUser').and.returnValue(of({ id: 'test-id' }));

      userService.login().subscribe((user) => {
        expect(user).toBeTruthy();
        expect(user.id).toBe('test-id');
        expect(window.localStorage.setItem).toHaveBeenCalledWith('currentUserId', 'test-id');
        expect((userService as any).createNewCurrentUser).toHaveBeenCalled();
        done();
      });
    });
  });
});
