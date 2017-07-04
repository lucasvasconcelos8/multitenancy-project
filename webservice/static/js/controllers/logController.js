angular.module('myApp').controller('logController', function($scope, $http, userService, $location) {
	// log in 
	$scope.username = "";
	$scope.password = "";

	// Sing up
	$scope.newEmail = "";
	$scope.newUsername = "";
	$scope.newPassword = "";


	$scope.login = function(){
		if($scope.username != "" && $scope.password != ""){

			$http.get(' http://0.0.0.0:80/login/'+$scope.username+"/"+$scope.password)
            .success(function (data, status, headers, config) {
                $scope.Details = data;
                userService.username = $scope.username;
                userService.password = $scope.password;
                //other proprietes of user
                console.log($scope.Details)

                $location.path('/contacts');

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
                }
                
            })
            .error(function (data, status, header, config) {
               console.log(status)
            });
		}
		
	}

	$scope.initiate = function(){
		$location.path("/contatos");
	}
});