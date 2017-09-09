(function moduleConfig() {
  angular.module('app')
    .config(config);

  config.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$locationProvider',
    'blockUIConfig',
  ];

  function config(
    $stateProvider,
    $urlRouterProvider,
    $httpProvider,
    $locationProvider,
    blockUIConfig,
  ) {
    /* BlockUI Configuration */

    // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 200;

    // Disable automatically blocking of the user interface
    blockUIConfig.autoBlock = false;

    // Disable auto body block
    blockUIConfig.autoInjectBodyBlock = false;

    // routing
    $urlRouterProvider.otherwise('/list');

    $stateProvider
      .state('list', {
        url: '/list',
        templateUrl: 'list/index.html',
        controller: 'ListController',
        controllerAs: 'vm',
      });
  }
}());
