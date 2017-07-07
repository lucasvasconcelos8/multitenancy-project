angular.module('myApp').controller('detailsController', function($scope, $http, $location, detailsService) {

	$scope.contatos = detailsService.details;

	$scope.voltar = function(){
		$location.path('/contacts');
	}

	$scope.logout = function(){
		$location.path('/');
	}

});

