import { TestBed } from '@angular/core/testing';

import { CoutriesService } from './coutries.service';

describe('CoutriesService', () => {
  let service: CoutriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoutriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
