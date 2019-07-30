export interface Paged<T> {
  data: T[];
  total: number;
  total_pages: number;
  per_page: number;
  page: number;
}
