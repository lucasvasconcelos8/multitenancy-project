angular.module('detailsContact', ['ngResource'])
    .factory('detailsService', function() {
        

        var contacts = {
          details :[],
        };

        return contacts;
        
    });