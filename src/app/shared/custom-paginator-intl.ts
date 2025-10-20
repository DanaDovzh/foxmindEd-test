import { MatPaginatorIntl } from '@angular/material/paginator';

export function getUkrPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Кількість на сторінці:';
  paginatorIntl.nextPageLabel = 'Наступна сторінка';
  paginatorIntl.previousPageLabel = 'Попередня сторінка';
  paginatorIntl.firstPageLabel = 'Перша сторінка';
  paginatorIntl.lastPageLabel = 'Остання сторінка';
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 з ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} – ${endIndex} з ${length}`;
  };

  return paginatorIntl;
}
