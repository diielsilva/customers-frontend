import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input({ required: true }) public totalPages!: number;
  protected actualPage: number = 0;
  @Output() public emitter: EventEmitter<number> = new EventEmitter();


  public goToFirstPage(): void {
    this.actualPage = 0;
    this.emitter.emit(this.actualPage);
  }

  public goToNextPage(): void {
    if (this.actualPage < this.totalPages - 1) {
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
    this.actualPage = this.totalPages - 1;
    this.emitter.emit(this.actualPage);
  }

}
