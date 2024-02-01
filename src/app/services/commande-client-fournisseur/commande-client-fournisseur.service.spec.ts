import { TestBed } from '@angular/core/testing';

import { CommandeClientFournisseurService } from './commande-client-fournisseur.service';

describe('CommandeClientFournisseurService', () => {
  let service: CommandeClientFournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeClientFournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
