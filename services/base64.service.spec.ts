import { TestBed } from '@angular/core/testing';

import { Base64Service } from './base64.service';

describe('Base64Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Base64Service = TestBed.get(Base64Service);
    expect(service).toBeTruthy();
  });
});
