export function paginate<T>(items: T[], requestedPage: number) {
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(Math.max(1, Math.trunc(requestedPage) || 1), totalPages);
  return { page, totalPages, items: items.slice((page - 1) * pageSize, page * pageSize) };
}
