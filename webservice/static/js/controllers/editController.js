angular.module('myApp').controller('editController', 
	function($scope, userService, $location, $http, $routeParams, editService) {

	$scope.username = userService.username;
	$scope.password = userService.password;
	$scope.idUser =  userService.idUser	

	if($routeParams.contactId != undefined){
		console.log("Funcionou");
	}

	$scope.logout = function(){
		$location.path('/');
	}

	if($scope.idUser == ""){
		alert("Nenhum usuario logado, Voltaremos para a tela de log in");
		$scope.logout();
	}

	$scope.name = editService.name ;
	$scope.apelido = editService.apelido;
	$scope.email = editService.email ;
	$scope.phone = parseInt(editService.phone);
	$scope.dataAniversario = new Date(editService.dataAniversario);


	$scope.editar = function(){

		contact = {
			'_id':$routeParams.contactId,
			'user_id':$scope.idUser,
			'name':$scope.name,
			'apelido':$scope.apelido,
			'email':$scope.email,
			'phone':$scope.phone.toString(),
			'dataAniversario':$scope.dataAniversario,
		}

		$http({
			method: 'POST',
			url: 'http://0.0.0.0:80/edit/'+userService.idUser,
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

});