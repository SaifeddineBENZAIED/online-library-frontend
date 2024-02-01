import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogoutClientComponent } from './page-logout-client.component';

describe('PageLogoutClientComponent', () => {
  let component: PageLogoutClientComponent;
  let fixture: ComponentFixture<PageLogoutClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageLogoutClientComponent]
    });
    fixture = TestBed.createComponent(PageLogoutClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
