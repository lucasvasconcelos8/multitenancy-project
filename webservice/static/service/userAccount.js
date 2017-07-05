angular.module('userAccount', ['ngResource'])
    .factory('userService', function() {
        

        var user = {
            username: "",
            password: "",
            idUser: "",
            typeUser: "",
            //proprietes from user account
        }

        return user;
        
    });
