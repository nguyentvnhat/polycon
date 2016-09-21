appGoogle.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: '/templates/map.html',
      controller: 'polygonCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    