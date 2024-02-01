import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStockArticleComponent } from './detail-stock-article.component';

describe('DetailStockArticleComponent', () => {
  let component: DetailStockArticleComponent;
  let fixture: ComponentFixture<DetailStockArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailStockArticleComponent]
    });
    fixture = TestBed.createComponent(DetailStockArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
