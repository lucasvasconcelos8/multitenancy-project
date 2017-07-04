angular.module('myApp').controller('newController', function($scope, userService) {

	$scope.username = userService.username;
	$scope.password = userService.password;

	$scope.contatos = [];

	console.log("testando");
});