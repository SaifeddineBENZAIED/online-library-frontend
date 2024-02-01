import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoginClientComponent } from './page-login-client.component';

describe('PageLoginClientComponent', () => {
  let component: PageLoginClientComponent;
  let fixture: ComponentFixture<PageLoginClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageLoginClientComponent]
    });
    fixture = TestBed.createComponent(PageLoginClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
