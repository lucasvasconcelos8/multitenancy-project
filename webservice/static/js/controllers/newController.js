angular.module('myApp').controller('newController', function($scope, userService, $location) {

	$scope.username = userService.username;
	$scope.password = userService.password;

	$scope.contatos = [];

	$scope.voltar = function(){
		$location.path('/contacts');
	}

	console.log("testando");
});