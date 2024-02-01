import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInscriptionClientComponent } from './page-inscription-client.component';

describe('PageInscriptionClientComponent', () => {
  let component: PageInscriptionClientComponent;
  let fixture: ComponentFixture<PageInscriptionClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageInscriptionClientComponent]
    });
    fixture = TestBed.createComponent(PageInscriptionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
