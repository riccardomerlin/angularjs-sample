const processData = require('../list/processData');

(function listFactory() {
  angular
    .module('app')
    .factory('listService', listService);

  listService.$inject = ['$http'];

  function listService($http) {
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

    function fetch(limit) {
      $http({
        method: 'GET',
        url: 'db/names.json',
        cache: true,
      })
        .success(success)
        .error(error);

      function success(data) {
        if (data) {
          results.items = processData.getNewResults(results.items, data.names, limit);
          if (results.total !== data.names.length) {
            results.total = data.names.length;
          }
        }
      }

      function error() {
        throw new Error('An error occured while fetching the data source.');
      }
    }
  }
}());
