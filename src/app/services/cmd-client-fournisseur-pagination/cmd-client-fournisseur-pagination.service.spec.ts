import { TestBed } from '@angular/core/testing';

import { CmdClientFournisseurPaginationService } from './cmd-client-fournisseur-pagination.service';

describe('CmdClientFournisseurPaginationService', () => {
  let service: CmdClientFournisseurPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmdClientFournisseurPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
