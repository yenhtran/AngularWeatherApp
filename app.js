//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
});

//SERVICES
weatherApp.service('cityService', function(){
    this.city = 'San Francisco, CA';
});

//CONTROLLER
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
	$scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });                                                                           
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
	$scope.city = cityService.city;
                                             
    $scope.days = $routeParams.days || '2';
                                             
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?appid=308dcfe9525d86be8bd566abd5ef6236', { callback: 'JSON_CALLBACK'}, { get: { method: 'JSONP'}});
                                             
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    $scope.convertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273) +32));
    }
    
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);

