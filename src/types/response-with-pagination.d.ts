type ResponseWithPagination<Key extends string, T> = {
  [K in Key]: T[]
} & {
  pagination: FirebasePaginationType
}
