import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input({ required: true }) public totalPages!: number;
  @Input({ required: true }) public actualPage: number = 0;
  @Output() public emitter: EventEmitter<number> = new EventEmitter();

  public goToFirstPage(): void {
    if (this.actualPage != 0) {
      this.actualPage = 0;
      this.emitter.emit(this.actualPage);
    }
  }

  public goToNextPage(): void {
    if (this.actualPage < this.totalPages - 1 && this.totalPages > 0) {
      this.actualPage++;
      this.emitter.emit(this.actualPage);
    }
  }

  public goToPreviousPage(): void {
    if (this.actualPage > 0) {
      this.actualPage--;
      this.emitter.emit(this.actualPage);
    }
  }

  public goToLastPage(): void {
    if (this.actualPage != this.totalPages - 1 && this.totalPages > 0) {
      this.actualPage = this.totalPages - 1;
      this.emitter.emit(this.actualPage);
    }
  }

}
