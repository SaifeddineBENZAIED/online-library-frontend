import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFournisseurComponent } from './detail-fournisseur.component';

describe('DetailFournisseurComponent', () => {
  let component: DetailFournisseurComponent;
  let fixture: ComponentFixture<DetailFournisseurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFournisseurComponent]
    });
    fixture = TestBed.createComponent(DetailFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
