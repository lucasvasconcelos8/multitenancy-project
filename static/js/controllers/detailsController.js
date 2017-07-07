angular.module('myApp').controller('detailsController', function($scope, $http, $location, detailsService) {

	$scope.contacts = detailsService.details;

	$scope.voltar = function(){
		$location.path('/contacts');
	}
	
});
