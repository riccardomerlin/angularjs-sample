module.exports = {
  getNewResults: getNewResults,
};

function getNewResults(collection, dataSource, limit) {
  const skip = collection.length;
  const items = dataSource.slice(skip, skip + limit);

  return collection.concat(items);
}
