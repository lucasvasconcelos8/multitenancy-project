//'use strict';   // See note about 'use strict'; below

var myApp = angular.module('myApp', ['ngRoute', 'ngResource','userAccount', 'editContact']);

myApp.config(['$routeProvider',
     function($routeProvider) {
        

         $routeProvider.
             when('/', {
                 templateUrl: '/static/partials/log.html',
                 controller: 'logController',
             }).
             when('/contacts',{
                templateUrl: '/static/partials/contatos.html',
                controller: 'contatosController',
             }).
             when('/newcontact',{
                templateUrl: '/static/partials/new.html',
                controller: 'newController',
             }).
             when('/newcontact/:contactId',{
                templateUrl: '/static/partials/edit.html',
                controller: 'editController',
             }).
             otherwise({
                 redirectTo: '/'
             });
    }]);