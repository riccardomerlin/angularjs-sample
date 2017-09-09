(function listController() {
  angular
    .module('app')
    .controller('ListController', ListController);

  ListController.$inject = ['listService'];

  function ListController(listService) {
    const vm = this;

    activate();

    function activate() {
      vm.title = 'List page';
      vm.pageSize = 50;
      vm.fetch = fetchData;

      // watch the service data source to update
      // the view if the collection gets changed
      // in the service instance
      vm.data = listService.getData();

      fetchData();
    }

    function fetchData() {
      listService.fetch(vm.pageSize);
    }
  }
}());
