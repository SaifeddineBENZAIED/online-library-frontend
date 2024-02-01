import { TestBed } from '@angular/core/testing';

import { ClientPaginationService } from './client-pagination.service';

describe('ClientPaginationService', () => {
  let service: ClientPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
