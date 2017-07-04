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
			$http.get(' http://0.0.0.0:80/user/new')
            .success(function (data, status, headers, config) {
                $scope.Details = data;
                console.log($scope.Details)
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