import { TestBed, inject } from '@angular/core/testing';

import { OshaService } from './osha.service';

describe('OshaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OshaService]
    });
  });

  it('should be created', inject([OshaService], (service: OshaService) => {
    expect(service).toBeTruthy();
  }));
});
