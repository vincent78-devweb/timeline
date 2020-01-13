import { TestBed } from '@angular/core/testing';

import { TimelinesService } from './timelines.service';

describe('TimelinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimelinesService = TestBed.get(TimelinesService);
    expect(service).toBeTruthy();
  });
});
