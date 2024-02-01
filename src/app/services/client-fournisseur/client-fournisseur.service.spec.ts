import { TestBed } from '@angular/core/testing';

import { ClientFournisseurService } from './client-fournisseur.service';

describe('ClientFournisseurService', () => {
  let service: ClientFournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientFournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
