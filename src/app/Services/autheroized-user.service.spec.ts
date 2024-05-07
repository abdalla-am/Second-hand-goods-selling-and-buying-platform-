import { TestBed } from '@angular/core/testing';

import { AutheroizedUserService } from './autheroized-user.service';

describe('AutheroizedUserService', () => {
  let service: AutheroizedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutheroizedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
