import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  getPaginationArray(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  setCurrentPage(pageNumber: number, event: Event): void {
    event.preventDefault();
    this.pageChange.emit(pageNumber);
    this.currentPage = pageNumber;
  }

  previousPage(event: Event): void {
    if (this.currentPage > 1) {
      event.preventDefault();
      this.pageChange.emit(this.currentPage - 1);
      this.currentPage = this.currentPage - 1;
    }
  }

  nextPage(event: Event): void {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < pageCount) {
      event.preventDefault();
      this.pageChange.emit(this.currentPage + 1);
      this.currentPage = this.currentPage + 1;
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return this.currentPage === pageCount;
  }
}
