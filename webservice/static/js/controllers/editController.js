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

	function tratarOptions(obj){

		for (a in obj){
			var objOption = {
				atributo:a,
				valor: obj[a],
			}
			$scope.atributos.push(objOption);
		}

	}


	$scope.name = editService.name ;
	$scope.apelido = editService.apelido;
	$scope.email = editService.email ;
	$scope.phone = parseInt(editService.phone);
	$scope.dataAniversario = new Date(editService.dataAniversario);
	$scope.atributos = [];
	tratarOptions(editService.options);


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

	$scope.openModal = function(){
	    var modalInstance = $uibModal.open({
	      templateUrl: 'myModalContentEdit.html',
	      controller: ModalInstanceCtrlEdit,
	      resolve: {
	        items: function () {
	          return  $scope.obj;
	        }
	      }
	    });

	    modalInstance.result.then(function (obj) {
	      $scope.atributos.push(obj);
	    }, function () {});
  	}

});

var ModalInstanceCtrlEdit = function ($scope, $uibModalInstance, items) {

  $scope.atributo = " ";
  $scope.valor = "";
  $scope.obj = {
  	atributo:"",
  	valor:"",
  };
  $scope.ok = function () {
  	$scope.obj = {
  		atributo: $scope.atributo,
  		valor: $scope.valor,
  	}
    $uibModalInstance.close($scope.obj);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};