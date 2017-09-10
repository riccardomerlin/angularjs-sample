(function listController() {
  angular
    .module('app')
    .controller('ListController', ListController);

  ListController.$inject = ['$stateParams', 'listService'];

  function ListController($stateParams, listService) {
    const vm = this;

    activate();

    function activate() {
      vm.pageSize = 20;
      vm.fetch = fetchData;
      vm.alphabet = getAlphabet();
      // watch the service data source to update
      // the view if the collection gets changed
      // in the service instance
      vm.data = listService.getData();
      vm.select = select;

      fetchData();
    }

    function fetchData() {
      vm.appliedFilter = $stateParams.filter;
      listService.fetch(vm.pageSize, $stateParams.filter);
    }

    function getAlphabet() {
      const a = [];
      let i = 'A'.charCodeAt(0);
      const j = 'Z'.charCodeAt(0);

      for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
      }

      return a;
    }

    function select(item) {
      item.selected = !item.selected;
    }
  }
}());
