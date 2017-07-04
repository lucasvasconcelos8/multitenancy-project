angular.module('myApp').controller('contatosController', function($scope, $http, userService, $location) {

	$scope.username = userService.username;
	$scope.password = userService.password;
	$scope.userId = userService.idUser;

	$scope.contatos = [];

	$scope.getContatos = function(){
		$http.get('http://0.0.0.0:80/list')
            .success(function (data, status, headers, config) {
                $scope.contatos = data;
                console.log($scope.contatos);	
            })
            .error(function (data, status, header, config) {
               console.log(status)
            });
	}

	$scope.getContatos();

	$scope.newContact = function(){
		$location.path('/newcontact');
	}


});