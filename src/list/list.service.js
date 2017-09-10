const processData = require('../list/processData');

(function listFactory() {
  angular
    .module('app')
    .factory('listService', listService);

  listService.$inject = ['$http'];

  function listService($http) {
    let currentFilter;
    const results = {
      total: 0,
      items: [],
    };

    const service = {
      fetch: fetch,
      getData: getData,
    };

    return service;

    function getData() {
      return results;
    }

    function fetch(limit, filter) {
      $http({
        method: 'GET',
        url: 'db/names.json',
        cache: true,
      })
        .success(success)
        .error(error);

      function success(data) {
        if (!data) { return; }

        let { items } = results;
        if (currentFilter !== filter) {
          items = [];
        }

        const newResults = processData.getNewResults(
          data.names,
          items.length,
          limit,
          filter
        );

        results.items = items.concat(newResults.items);
        if (results.total !== newResults.total) {
          results.total = newResults.total;
        }

        currentFilter = filter;
      }

      function error() {
        throw new Error('An error occured while fetching the data source.');
      }
    }
  }
}());
