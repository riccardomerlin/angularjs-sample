module.exports = {
  getNewResults: getNewResults,
};

function getNewResults(dataSource, skip, limit, filter) {
  let source = dataSource;
  if (filter) {
    const startsWidthFilter = filter.toLowerCase().slice(0, 1);
    source = dataSource.filter(item =>
      item.nm.toLowerCase().startsWith(startsWidthFilter));
  }

  const items = source.slice(skip, skip + limit);

  return items;
}
