import { TestBed } from '@angular/core/testing';

import { VatcheckService } from './vatcheck.service';

describe('VatcheckService', () => {
  let service: VatcheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatcheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
