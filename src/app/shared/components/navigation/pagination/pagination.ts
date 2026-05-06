import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { TuiPagination } from '@taiga-ui/kit';
import { Select } from '../../form/select/select';
import { PaginationState } from './model';

@Component({
  selector: 'app-pagination',
  imports: [Select, TuiPagination],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {
  currentPage = model(0);
  pageSize = model(10);
  pageSizeOptions = input([5, 10, 25, 50]);
  totalElements = input.required<number>();
  totalPages = computed(() => Math.ceil(this.totalElements() / this.pageSize()));

  private paginationState = computed<PaginationState>(() => ({
    currentPage: this.currentPage(),
    pageSize: this.pageSize(),
    totalPages: this.totalPages(),
    totalElements: this.totalElements(),
  }));

  pageChange = output<PaginationState>();

  onIndexChange = (newIndex: number) => {
    this.currentPage.set(newIndex);
    this.pageChange.emit(this.paginationState());
  };

  onPageSizeChange = (newPageSize: number | null) => {
    this.pageSize.set(newPageSize ?? this.pageSizeOptions()[0] ?? 5);
    this.currentPage.set(0);
    this.pageChange.emit(this.paginationState());
  };
}
