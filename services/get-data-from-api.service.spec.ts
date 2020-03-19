import { TestBed } from '@angular/core/testing';

import { GetDataFromApiService } from './get-data-from-api.service';

describe('GetDataFromApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDataFromApiService = TestBed.get(GetDataFromApiService);
    expect(service).toBeTruthy();
  });
});
