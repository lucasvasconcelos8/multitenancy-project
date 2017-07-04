angular.module('userAccount', ['ngResource'])
    .factory('userService', function() {
        

        var user = {
            username: "",
            password: "",
            idUser: ""
            //proprietes from user account
        }

        return user;
        
    });