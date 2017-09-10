module.exports = {
  getNewResults: getNewResults,
};

function getNewResults(dataSource, skip, limit, filter) {
  let source = dataSource;
  let total = dataSource.length;

  if (filter) {
    const startsWidthFilter = filter.toLowerCase().slice(0, 1);
    source = dataSource.filter(item =>
      item.nm.toLowerCase().startsWith(startsWidthFilter));
    total = source.length;
  }

  const items = source.slice(skip, skip + limit);

  return { items, total };
}
