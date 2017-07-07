angular.module('myApp').controller('contatosController', function($scope, $http, userService, $location, editService, $uibModal, detailsService) {

	$scope.username = userService.username;
	$scope.password = userService.password;
	$scope.userId = userService.idUser;
	$scope.optionspre = userService.optionspre;
	$scope.name = userService.name;
	if(userService.option){
		$scope.option = true;
		$scope.campos = ["Name", "Apelido", "Email", "Phone", "Data de Aniversario", "Edit", "Details", "Deletar"];
		/*
		<th>Name</th>
        <th>Apelido</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Data de Aniversario</th>
        <th>Edit</th>
		 */
	}else{
		$scope.option = undefined;
		$scope.campos = ["Name", "Apelido", "Email", "Phone", "Data de Aniversario", "Edit","Deletar"];
	}


	$scope.mostrarOption = function(){
		if($scope.optionspre){
			$scope.showing = true;
		}else{
			$scope.showing = false;
		}
	}

	$scope.showing = false;
	$scope.mostrarOption();

	$scope.openFxedDetails = function(){
		$scope.detailsContact = [];

		for(c in $scope.contatos){
			if($scope.contatos[c].optionspre.facebook == ""){
				var facebook = "-";
			}else{
				var facebook = $scope.contatos[c].optionspre.facebook;
			}

			if($scope.contatos[c].optionspre.linkedin == ""){
				var linkedin = "-";
			}else{
				var linkedin = $scope.contatos[c].optionspre.linkedin;
			}

			if(c.optionspre.twitter == ""){
				var twitter = "-";
			}else{
				var twitter = $scope.contatos[c].optionspre.twitter;
			}

			if(c.optionspre.instagram == ""){
				var instagram = "-";
			}else{
				var instagram = $scope.contatos[c].optionspre.instagram;
			}

			var obj = {
				name: $scope.contatos[c].name,
				facebook : facebook,
				linkedin : linkedin,
				twitter : twitter,
				instagram : instagram,

			}

			$scope.detailsContact.push(obj);
		}

		detailsService.details = $scope.detailsContact;

		$location.path('/details');
	}

	

	$scope.logout = function(){
		$location.path('/');
	}

	if($scope.userId == ""){
		alert("Nenhum usuario logado, Voltaremos para a tela de log in");
		$scope.logout();
	}

	$scope.contatos = [];

	$scope.getContatos = function(){
		$http.get('https://immense-caverns-45110.herokuapp.com/list/'+$scope.userId)
		//$http.get('http://0.0.0.0:80/list/'+$scope.userId)
		//$http.get('http://ec2-34-209-10-153.us-west-2.compute.amazonaws.com:80/list/'+$scope.userId)
            .success(function (data, status, headers, config) {
                $scope.contatos = data;
            })
            .error(function (data, status, header, config) {
               console.log(status)
            });
	}

	$scope.getContatos();

	$scope.editContact = function(contact){

		editService.idContact = contact._id;
		editService.name  = contact.name;
		editService.apelido = contact.apelido;
		editService.email = contact.email;
		editService.phone = contact.phone;
		editService.dataAniversario = contact.dataAniversario;
		editService.options = contact.options;

		$location.path('/editContact');
		return '';
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

	$scope.deleteContact = function(contact){

		$http.get('https://immense-caverns-45110.herokuapp.com/remove/'+contact._id+'/'+$scope.userId)
		//$http.get('http://0.0.0.0:80/remove/'+contact._id+'/'+$scope.userId)
		//$http.get('http://ec2-34-209-10-153.us-west-2.compute.amazonaws.com:80/remove/'+contact._id+'/'+$scope.userId)
            .success(function (data, status, headers, config) {
                if(data == 'Success'){
                	$scope.getContatos();

                }else{
                	alert("Erro no acesso a Banco");
                } 
            })
            .error(function (data, status, header, config) {
               console.log(status)
            });

	}

	$scope.remove = function(item) { 
	  var index = $scope.contatos.indexOf(item);
	  $scope.contatos.splice(index, 1);     
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