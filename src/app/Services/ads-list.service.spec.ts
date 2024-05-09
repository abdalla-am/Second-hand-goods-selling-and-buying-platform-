import { TestBed } from '@angular/core/testing';

import { AdsListService } from './ads-list.service';

describe('AdsListService', () => {
  let service: AdsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
