module.exports = (objectPagination, query, totalDocuments) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }
  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;
  objectPagination.totalPage = Math.ceil(
    totalDocuments / objectPagination.limitItem
  );
  return objectPagination;
};
