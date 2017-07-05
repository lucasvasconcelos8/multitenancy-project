angular.module('myApp').controller('contatosController', function($scope, $http, userService, $location, editService) {

	$scope.username = userService.username;
	$scope.password = userService.password;
	$scope.userId = userService.idUser;

	$scope.logout = function(){
		$location.path('/');
	}

	if($scope.userId == ""){
		alert("Nenhum usuario logado, Voltaremos para a tela de log in");
		$scope.logout();
	}

	$scope.contatos = [];

	$scope.getContatos = function(){
		$http.get('http://0.0.0.0:80/list/'+$scope.userId)
            .success(function (data, status, headers, config) {
                $scope.contatos = data;
                console.log($scope.contatos);	
            })
            .error(function (data, status, header, config) {
               console.log(status)
            });
	}

	$scope.getContatos();

	$scope.editContact = function(contact){

		editService.name  = contact.name;
		editService.apelido = contact.apelido;
		editService.email = contact.email;
		editService.phone = contact.phone;
		editService.dataAniversario = contact.dataAniversario;
		$location.path('/editContact/'+contact._id);
	}

	$scope.newContact = function(){
		$location.path('/newcontact');
	}


});