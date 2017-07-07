angular.module('myApp').controller('editController', 
	function($scope, userService, $location, $http, editService, $uibModal) {

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
	$scope.contactId = editService.idContact;


	$scope.editar = function(){


		if($scope.atributos.length > 0){
			var options = { };

			for(a in $scope.atributos){
				options[$scope.atributos[a].atributo] =  $scope.atributos[a].valor;
			}

			contact = {
				'_id':$scope.contactId,
				'name':$scope.name,
				'apelido':$scope.apelido,
				'email':$scope.email,
				'phone':$scope.phone.toString(),
				'dataAniversario':$scope.dataAniversario,
				'options':options,
			}

		}else{

			contact = {
				'_id':$scope.contactId,
				'name':$scope.name,
				'apelido':$scope.apelido,
				'email':$scope.email,
				'phone':$scope.phone.toString(),
				'dataAniversario':$scope.dataAniversario,
			}

		}

		$http({
			method: 'POST',
			url:'https://immense-caverns-45110.herokuapp.com'+userService.idUser,
			//url: 'http://ec2-34-209-10-153.us-west-2.compute.amazonaws.com:80/edit/'+userService.idUser,
			//url: 'http://0.0.0.0:80/edit/'+userService.idUser,
			data: {'contact_json':contact},
		})
        .success(function (data, status, headers, config) {
            $scope.details = data;
            if($scope.details == "Success"){
            	if($scope.atributos.length > 0){
            		userService.option = true;
            	}
            	$scope.voltar();
            }else{
            	alert("Erro no banco ao inserir");
            }
            
        })
        .error(function (data, status, header, config) {
           console.log(status)
        });

	}

	$scope.deletarAtr = function(index){
		//var index = $scope.atributos.indexOf(atr);
		$scope.atributos.splice(index, 1);
		var options = { };

		for(a in $scope.atributos){
			options[$scope.atributos[a].atributo] =  $scope.atributos[a].valor;
		}

		editService.options = options;

		$location.path('/editContact');
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