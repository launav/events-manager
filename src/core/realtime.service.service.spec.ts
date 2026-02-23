import { TestBed } from '@angular/core/testing';

import { RealtimeServiceService } from './realtime.service.service';

describe('RealtimeServiceService', () => {
  let service: RealtimeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
