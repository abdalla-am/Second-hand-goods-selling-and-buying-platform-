import { TestBed } from '@angular/core/testing';

import { UserAdsService } from './user-ads.service';

describe('UserAdsService', () => {
  let service: UserAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
