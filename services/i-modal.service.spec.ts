import { TestBed } from '@angular/core/testing';

import { IModalService } from './i-modal.service';

describe('IModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IModalService = TestBed.get(IModalService);
    expect(service).toBeTruthy();
  });
});
