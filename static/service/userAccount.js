angular.module('userAccount', ['ngResource'])
    .factory('userService', function() {
        

        var user = {
            username: "",
            password: "",
            idUser: "",
            typeUser: "",
            name:"",
            phone:"",
            option:"",
            //proprietes from user account
        }

        return user;
        
    });