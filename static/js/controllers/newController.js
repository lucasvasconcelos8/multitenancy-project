angular.module('myApp').controller('newController', 
	function($scope, userService, $location, $http, $routeParams, $uibModal) {

	$scope.username = userService.username;
	$scope.password = userService.password;
	$scope.idUser =  userService.idUser;
	$scope.facebook = "";
	$scope.linkedin = "";
	$scope.twitter = "";
	$scope.instagram = "";

	$scope.atributos = [];

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


		if($scope.facebook != "" || $scope.linkedin != "" || $scope.twitter != "" || $scope.instagram != ""){
			var obj = {'facebook' :$scope.facebook, 
				'linkedin': $scope.linkedin, 
				'twitter':$scope.twitter, 
				'instagram':$scope.instagram}



		}else{
			var obj = {'facebook' :"", 
				'linkedin':"", 
				'twitter':"", 
				'instagram':""}

		}

		
		if($scope.atributos.length > 0 ){
			var options = { };

			for(a in $scope.atributos){
				options[$scope.atributos[a].atributo] =  $scope.atributos[a].valor;
			}

			

			contact = {
				'name':$scope.name,
				'apelido':$scope.apelido,
				'email':$scope.email,
				'phone':$scope.phone.toString(),
				'dataAniversario':$scope.dataAniversario,
				'options':options,
				'optionspre':obj,
			}

		}else{

			contact = {
				'name':$scope.name,
				'apelido':$scope.apelido,
				'email':$scope.email,
				'phone':$scope.phone.toString(),
				'dataAniversario':$scope.dataAniversario,
				'optionspre':obj,
			}

		}

		$http({
			method: 'POST',
			//url: 'http://ec2-34-209-10-153.us-west-2.compute.amazonaws.com:80/insert/'+userService.idUser,
			//url: 'http://0.0.0.0:80/insert/'+userService.idUser,
			url:'https://immense-caverns-45110.herokuapp.com/insert/'+userService.idUser,
			data: {'contact_json':contact},
		})
        .success(function (data, status, headers, config) {
            $scope.details = data;
            if($scope.details == "Success"){
            	
            	if($scope.atributos.length > 0){
            		userService.option = true;
            	}

            	if($scope.facebook != "" || $scope.linkedin != "" || $scope.twitter != "" || $scope.instagram != ""){

            		userService.optionspre = true;
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

	$scope.voltar = function(){
		$location.path('/contacts');
	}

	$scope.deletarAtr = function(index){
		//var index = $scope.atributos.indexOf(atr);
		var atr = $scope.atributos;
		atr.splice(index, 1);
		//$scope.atributos.splice(index, 1);
		$scope.atributos = atr;
		console.log($scope.atributos);
		return '';
	}	

	$scope.openModal = function(){
	    var modalInstance = $uibModal.open({
	      templateUrl: 'myModalContent.html',
	      controller: ModalInstanceCtrl,
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

var ModalInstanceCtrl = function ($scope, $uibModalInstance, items) {

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