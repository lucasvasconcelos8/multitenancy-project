angular.module('editContact', ['ngResource'])
    .factory('editService', function() {
        

        var contact = {
           name: '',
           apelido: '',
           email: '',
           phone: '',
           dataAniversario: '',
        }

        return contact;
        
    });