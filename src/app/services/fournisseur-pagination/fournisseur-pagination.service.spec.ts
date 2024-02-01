import { TestBed } from '@angular/core/testing';

import { FournisseurPaginationService } from './fournisseur-pagination.service';

describe('FournisseurPaginationService', () => {
  let service: FournisseurPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournisseurPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
