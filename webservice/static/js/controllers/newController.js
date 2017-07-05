angular.module('myApp').controller('newController', 
	function($scope, userService, $location, $http, $routeParams) {

	$scope.username = userService.username;
	$scope.password = userService.password;
	$scope.idUser =  userService.idUser

	$scope.logout = function(){
		$location.path('/');
	}

	if($scope.idUser == ""){
		alert("Nenhum usuario logado, Voltaremos para a tela de log in");
		$scope.logout();
	}

	$scope.name = "";
	$scope.apelido = "";
	$scope.email = "";
	$scope.phone = "";
	$scope.dataAniversario = "";


	$scope.salvar = function(){

		contact = {
			'name':$scope.name,
			'apelido':$scope.apelido,
			'email':$scope.email,
			'phone':$scope.phone.toString(),
			'dataAniversario':$scope.dataAniversario,
		}

		$http({
			method: 'POST',
			url: 'http://0.0.0.0:80/insert/'+userService.idUser,
			data: {'contact_json':contact},
		})
        .success(function (data, status, headers, config) {
            $scope.details = data;
            if($scope.details == "Success"){
            	$scope.voltar();
            }else{
            	alert("Erro no banco ao inserir");
            }
            
        })
        .error(function (data, status, header, config) {
           console.log(status)
        });

	}

	$scope.voltar = function(){
		$location.path('/contacts');
	}

	console.log("testando");
});