(function listController() {
  angular
    .module('app')
    .controller('ListController', ListController);

  function ListController() {
    const vm = this;

    activate();

    function activate() {
      vm.title = 'List page';
    }
  }
}());
