import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCmdForClientComponent } from './page-cmd-for-client.component';

describe('PageCmdForClientComponent', () => {
  let component: PageCmdForClientComponent;
  let fixture: ComponentFixture<PageCmdForClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCmdForClientComponent]
    });
    fixture = TestBed.createComponent(PageCmdForClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
