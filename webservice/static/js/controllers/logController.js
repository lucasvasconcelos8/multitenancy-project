angular.module('myApp').controller('logController', function($scope, $http, userService, $location) {
	// log in 
	$scope.username = "";
	$scope.password = "";

	// Sing up
	$scope.newEmail = "";
	$scope.newUsername = "";
	$scope.newPassword = "";

	//
	userService.username = "";
	userService.password = "";
	userService.idUser = "";
	userService.typeUser = "";


	$scope.login = function(){
		if($scope.username != "" && $scope.password != ""){

			$http.get(' http://0.0.0.0:80/login/'+$scope.username+"/"+$scope.password)
            .success(function (data, status, headers, config) {
                $scope.details = data;

                if($scope.details.status == "Success"){
                	userService.username = $scope.username;
                	userService.password = $scope.password;
                	userService.idUser =  $scope.details.user_id;
                	userService.typeUser = $scope.details.user_type;

                	$scope.initiate();
                }else{

                	alert("Username ou Password inválidos")
                }
               
            })
            .error(function (data, status, header, config) {
               console.log(status)
            });
		}
		
	}


	$scope.singup = function(){
		if($scope.newUsername != "" && $scope.newPassword != "" && $scope.newEmail != ""){
			user_json = {
				'username':$scope.newUsername,
				'password':$scope.newPassword,
				'email':$scope.newEmail,
				//type_user define the type of the user. type :1 is the standard type
				//Others types of user must be defined later
				'type_user':'1',
			};

			$http({
				method: 'POST',
				url: 'http://0.0.0.0:80/user/new',
				data: {'user_json':user_json},
			})
            .success(function (data, status, headers, config) {
                $scope.details = data;
                if($scope.details.status == "Success"){
                	var id = $scope.details["id"] 

                	userService.username = $scope.username;
                	userService.password = $scope.password;
                	userService.idUser = id;

                	console.log("Sucesso");
                	// Open new the system.
                	$scope.initiate();
                }else if($scope.details.msg = "user alredy exists"){
                	alert("Usuario já existe");
                }else{
                	alert("Erro no acesso a Banco");
                }
                
            })
            .error(function (data, status, header, config) {
               console.log(status)
            });
		}
		
	}

	$scope.initiate = function(){
		$location.path('/contacts');
	}
});