angular.module('myApp').controller('logController', function($scope, $http, userService, $location) {
	// log in 
	$scope.username = "";
	$scope.password = "";

	// Sing up
	$scope.newEmail = "";
	$scope.newUsername = "";
	$scope.newPassword = "";
	$scope.newName = "";
	$scope.newPhone = "";

	//
	userService.username = "";
	userService.password = "";
	userService.idUser = "";
	userService.typeUser = "";


	$scope.login = function(){
		if($scope.username != "" && $scope.password != ""){

			
			$http.get('https://immense-caverns-45110.herokuapp.com/login/'+$scope.username+"/"+$scope.password)
			//$http.get(' http://0.0.0.0:80/login/'+$scope.username+"/"+$scope.password)
			//$http.get('http://ec2-34-209-10-153.us-west-2.compute.amazonaws.com:80/login/'+$scope.username+"/"+$scope.password)
            .success(function (data, status, headers, config) {
                $scope.details = data;

                if($scope.details.status == "Success"){
                	userService.username = $scope.username;
                	userService.password = $scope.password;
                	userService.idUser =  $scope.details.user_id;
                	userService.typeUser = $scope.details.user_type;
                	userService.name = $scope.details.user_name;
                	userService.option = $scope.details.user_option;
                	userService.optionspre = $scope.details.user_optionspre;

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
				'name':$scope.newName,
				'phone':$scope.newPhone,
				//type_user define the type of the user. type :1 is the standard type
				//Others types of user must be defined later
				'type_user':'1',
				'option': false,
				'optionspre' : false,
			};

			$http({
				method: 'POST',
				//url: 'http://ec2-34-209-10-153.us-west-2.compute.amazonaws.com:80/user/new',
				//url:'http://0.0.0.0:80/user/new',
				url:'https://immense-caverns-45110.herokuapp.com/user/new',
				data: {'user_json':user_json},
			})
            .success(function (data, status, headers, config) {
                $scope.details = data;
                if($scope.details.status == "Success"){

                	userService.username = $scope.newUsername;
                	userService.password = $scope.newPassword;
                	userService.idUser = $scope.details["id"];
                	userService.name = $scope.newName;
                	userService.option = false;
                	userService.optionspre = false;


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