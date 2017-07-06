angular.module('myApp').controller('contatosController', function($scope, $http, userService, $location, editService, $uibModal) {

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
		editService.options = contact.options;

		$location.path('/editContact/'+contact._id);
	}

	$scope.newContact = function(){
		$location.path('/newcontact');
	}

	$scope.openDetails = function(contact){

		editService.name  = contact.name;
		editService.apelido = contact.apelido;
		editService.email = contact.email;
		editService.phone = contact.phone;
		editService.dataAniversario = contact.dataAniversario;
		editService.options = contact.options;


		var modalInstance = $uibModal.open({
	      templateUrl: 'modalDetail.html',
	      controller: ModalDetailCtrl,
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

var ModalDetailCtrl = function ($scope, $uibModalInstance, items, editService) {

	$scope.nome = editService.name;

	function tratarOptions(obj){
		for (a in obj){
			var objOption = {
				atributo:a,
				valor: obj[a],
			}
			$scope.atributos.push(objOption);
		}
	}

	$scope.atributos = [];
	tratarOptions(editService.options);
	

	$scope.cancel = function () {
	$uibModalInstance.dismiss('cancel');
	};
};