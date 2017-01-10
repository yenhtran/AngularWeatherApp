//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})

	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})

});

//CONTROLLER
weatherApp.controller('homeController', ['$scope', '$log', function($scope, $log){
	$scope.name = 'Home';
}]);

weatherApp.controller('forecastController', ['$scope', function($scope, $log){
	$scope.name = 'Forecast';
}]);