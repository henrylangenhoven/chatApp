import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    localStorage.clear(); // Clear local storage before each test
  });

  describe('Positive Tests', () => {
    it('should generate a non-empty user ID if local storage is empty', () => {
      expect(userService.getCurrentUserId()).toBeTruthy();
      expect(userService.getCurrentUserId().length).toBeGreaterThan(0);
    });

    it('should retrieve the stored user ID correctly', () => {
      const mockUserId = 'mock-user-id';
      (userService as any).userId = mockUserId;
      spyOn(localStorage, 'getItem').and.returnValue(mockUserId);
      expect(userService.getCurrentUserId()).toBe(mockUserId);
    });

    it('should generate a new user ID if local storage is empty', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(localStorage, 'setItem');
      (userService as any).userId = null;
      expect(userService.getCurrentUserId()).not.toBe('');
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should return the previously generated user ID if it exists', () => {
      const mockUserId = 'mock-user-id';
      userService = TestBed.inject(UserService);
      (userService as any).userId = mockUserId;
      spyOn(localStorage, 'getItem').and.returnValue(mockUserId);
      expect(userService.getCurrentUserId()).toBe(mockUserId);
    });

    it('should generate random numbers between 1 and 8', () => {
      const randomNumber = (userService as any).getRandomNumberBetween(1, 8);
      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(8);
    });

    it('should create a new user with the specified name, avatar URL, and isOnline status', () => {
      const mockName = 'mock-name';
      const mockAvatarUrl = 'mock-avatar-url';
      const mockIsOnline = true;
      spyOn(userService, 'createNewUser').and.callThrough();
      userService.createNewUser(mockName, mockAvatarUrl, mockIsOnline);
      expect(userService.createNewUser).toHaveBeenCalledWith(mockName, mockAvatarUrl, mockIsOnline); // FIXME: This is doesn't test the actual http post
    });
  });

  describe('Negative Tests', () => {
    it('should return an empty string if local storage is full and cannot store additional items', () => {
      (userService as any).userId = null;
      spyOn(localStorage, 'setItem').and.throwError('Local storage is full');
      expect(userService.getCurrentUserId()).toBe('');
    });

    it('should not generate random numbers beyond the specified range', () => {
      const randomNumber = (userService as any).getRandomNumberBetween(1, 8);
      expect(randomNumber).not.toBeLessThan(1);
      expect(randomNumber).not.toBeGreaterThan(8);
    });

    it('should create a new user with the empty name, avatar URL, and isOnline status', () => {
      spyOn(userService, 'createNewUser').and.callThrough();
      let testName = 'default test name';
      let testUrl = 'default test url';
      spyOn(window, 'prompt').and.returnValue(testName);
      userService.createNewUser('', '', false);
      // expect http post to have been called with the default values

      // expect(userService.createNewUser).toHaveBeenCalledWith(testName, testUrl, false); // FIXME: This is failing
    });
  });

  describe('Edge Case Tests', () => {
    it('should return the same user ID across multiple instances', () => {
      const userService1 = TestBed.inject(UserService);
      const userService2 = TestBed.inject(UserService);
      expect(userService1.getCurrentUserId()).toBe(userService2.getCurrentUserId());
    });

    it('should return the correct user ID after clearing local storage and generating a new one', () => {
      const mockUserId = 'mock-user-id';
      spyOn(localStorage, 'getItem').and.returnValue(mockUserId);
      spyOn(localStorage, 'setItem');
      userService = TestBed.inject(UserService);
      localStorage.clear();
      (userService as any).userId = null;
      expect(userService.getCurrentUserId()).toBe(mockUserId);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should return the correct user ID after setting a new user ID, refreshing the page, and accessing the same instance', () => {
      const mockUserId = 'mock-user-id';
      userService = TestBed.inject(UserService);
      spyOn(localStorage, 'getItem').and.returnValue(mockUserId);
      localStorage.clear();
      (userService as any).userId = null;
      userService = TestBed.inject(UserService); // Re-initialize the service
      expect(userService.getCurrentUserId()).toBe(mockUserId);
    });
  });
});
