import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfilClientComponent } from './page-profil-client.component';

describe('PageProfilClientComponent', () => {
  let component: PageProfilClientComponent;
  let fixture: ComponentFixture<PageProfilClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageProfilClientComponent]
    });
    fixture = TestBed.createComponent(PageProfilClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
