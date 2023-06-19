import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';


describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    userService = TestBed.inject(UserService);
    localStorage.clear(); // Clear local storage before each test
  });

  describe('Positive Tests', () => {
    it('should generate a non-empty user ID if local storage is empty', () => {
      expect(userService.getUserId()).toBeTruthy();
      expect(userService.getUserId().length).toBeGreaterThan(0);
    });

    it('should retrieve the stored user ID correctly', () => {
      const mockUserId = 'mock-user-id';
      (userService as any).userId = mockUserId;
      spyOn(localStorage, 'getItem').and.returnValue(mockUserId);
      expect(userService.getUserId()).toBe(mockUserId);
    });

    it('should generate a new user ID if local storage is empty', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(localStorage, 'setItem');
      (userService as any).userId = null;
      expect(userService.getUserId()).not.toBe('');
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should return the previously generated user ID if it exists', () => {
      const mockUserId = 'mock-user-id';
      userService = TestBed.inject(UserService);
      (userService as any).userId = mockUserId;
      spyOn(localStorage, 'getItem').and.returnValue(mockUserId);
      expect(userService.getUserId()).toBe(mockUserId);
    });
  });

  describe('Negative Tests', () => {
    it('should return an empty string if local storage is full and cannot store additional items', () => {
      (userService as any).userId = null;
      spyOn(localStorage, 'setItem').and.throwError('Local storage is full');
      expect(userService.getUserId()).toBe('');
    });
  });

  describe('Edge Case Tests', () => {
    it('should return the same user ID across multiple instances', () => {
      const userService1 = TestBed.inject(UserService);
      const userService2 = TestBed.inject(UserService);
      expect(userService1.getUserId()).toBe(userService2.getUserId());
    });

    it('should return the correct user ID after clearing local storage and generating a new one', () => {
      const mockUserId = 'mock-user-id';
      spyOn(localStorage, 'getItem').and.returnValue(mockUserId);
      spyOn(localStorage, 'setItem');
      userService = TestBed.inject(UserService);
      localStorage.clear();
      (userService as any).userId = null;
      expect(userService.getUserId()).toBe(mockUserId);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should return the correct user ID after setting a new user ID, refreshing the page, and accessing the same instance', () => {
      const mockUserId = 'mock-user-id';
      userService = TestBed.inject(UserService);
      spyOn(localStorage, 'getItem').and.returnValue(mockUserId);
      localStorage.clear();
      (userService as any).userId = null;
      userService = TestBed.inject(UserService); // Re-initialize the service
      expect(userService.getUserId()).toBe(mockUserId);
    });
  });
});
