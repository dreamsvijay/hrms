import { TestBed, inject } from '@angular/core/testing';

import { AuthUserService } from './auth.service';

describe('AuthUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthUserService]
    });
  });

  it('should be created', inject([AuthUserService], (service: AuthUserService) => {
    expect(service).toBeTruthy();
  }));
});
