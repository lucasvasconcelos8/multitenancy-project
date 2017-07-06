angular.module('editContact', ['ngResource'])
    .factory('editService', function() {
        

        var contact = {
           idContact: '',
           name: '',
           apelido: '',
           email: '',
           phone: '',
           dataAniversario: '',
           options: {},
        }

        return contact;
        
    });