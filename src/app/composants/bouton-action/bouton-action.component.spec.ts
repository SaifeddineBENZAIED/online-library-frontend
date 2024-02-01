import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonActionComponent } from './bouton-action.component';

describe('BoutonActionComponent', () => {
  let component: BoutonActionComponent;
  let fixture: ComponentFixture<BoutonActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoutonActionComponent]
    });
    fixture = TestBed.createComponent(BoutonActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
