export interface Pageable<T> {
    totalPages: number,
    content: T[]
}