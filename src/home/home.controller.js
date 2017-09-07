(function homeController() {
  angular
    .module('app')
    .controller('HomeController', HomeController);

  function HomeController() {
    const vm = this;

    activate();

    function activate() {
      vm.title = 'Home page';
    }
  }
}());
