import { TestBed } from '@angular/core/testing';

import { StockPaginationService } from './stock-pagination.service';

describe('StockPaginationService', () => {
  let service: StockPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
