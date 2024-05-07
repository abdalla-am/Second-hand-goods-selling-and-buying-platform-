import { TestBed } from '@angular/core/testing';

import { DynamicComponentLoaderService } from './dynamic-component-loader.service';

describe('DynamicComponentLoaderService', () => {
  let service: DynamicComponentLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicComponentLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
