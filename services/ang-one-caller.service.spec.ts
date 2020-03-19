import { TestBed } from '@angular/core/testing';

import { AngOneCallerService } from './ang-one-caller.service';

describe('AngOneCallerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngOneCallerService = TestBed.get(AngOneCallerService);
    expect(service).toBeTruthy();
  });
});
