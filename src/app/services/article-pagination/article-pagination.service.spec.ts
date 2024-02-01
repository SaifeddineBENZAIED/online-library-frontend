import { TestBed } from '@angular/core/testing';

import { ArticlePaginationService } from './article-pagination.service';

describe('ArticlePaginationService', () => {
  let service: ArticlePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
