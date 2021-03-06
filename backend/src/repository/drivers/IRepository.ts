export interface IRepository<T> {
  fetch(): Promise<T[]>;
}
