import { TestBed } from '@angular/core/testing';

import { ForwardGuardService } from './forward-guard.service';

describe('ForwardGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForwardGuardService = TestBed.get(ForwardGuardService);
    expect(service).toBeTruthy();
  });
});
