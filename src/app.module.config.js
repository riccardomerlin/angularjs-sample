(function moduleConfig() {
  angular.module('app')
    .config(config);

  config.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$locationProvider',
    'siteRootUrl',
    'blockUIConfig',
  ];

  function config(
    $stateProvider,
    $urlRouterProvider,
    $httpProvider,
    $locationProvider,
    siteRootUrl,
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
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/index.html',
        controller: 'HomeController',
        controllerAs: 'vm',
      })
      .state('list', {
        url: '/list',
        templateUrl: 'list/index.html',
        controller: 'ListController',
        controllerAs: 'vm',
      });
  }
}());
