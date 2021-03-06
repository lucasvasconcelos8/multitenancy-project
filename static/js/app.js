//'use strict';   // See note about 'use strict'; below

var myApp = angular.module('myApp', ['ngRoute','userAccount', 'editContact', 'ui.bootstrap', 'detailsContact']);

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
             when('/editContact',{
                templateUrl: '/static/partials/edit.html',
                controller: 'editController',
             }).
             when('/details',{
                templateUrl: '/static/partials/details.html',
                controller: 'detailsController',
             }).
             otherwise({
                 redirectTo: '/'
             });
    }]);