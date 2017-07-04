angular.module('userAccount', ['ngResource'])
    .factory('userService', function() {
        

        var user = {
            username: 'igorteste',
            password: 'senhateste'
            //proprietes from user account
        }

        return user;
        
    });