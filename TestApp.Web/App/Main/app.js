(function () {
    'use strict';

    var app = angular.module('app', [
        'ngAnimate',
        'ngSanitize',

        'ui.router',
        'ui.bootstrap',
        'ui.jq',

        'abp'
    ]);
    angular.module('app').factory('UserService', ['$http', '$location', '$window', 'ShareData', function ($http, $location, $window, ShareData) {

        var UserService = {};
        UserService.getUsers = function () {
            return $http.get('/home/users');
        };
        UserService.editUser = function (id) {
            //console.log(id);
            return $http.get('/home/editUser/' + id)
        };
        UserService.showUser = function (id) {
            var url = "#/editUser";
            ShareData.value = id;
            $window.location.href = url;   
            
        };
        UserService.showAllUsers = function () {
            var url = "#/users";            
            $window.location.href = url;

        };        
        UserService.createUser = function (user) {
            //console.log(user);
            return $http.post('/home/createUser', user);
        };
        UserService.updateUser = function (user) {
            //console.log(user);
            return $http.post('/home/updateUser', user);
        };
        UserService.deleteUser = function (id) {
            //console.log(user);
            return $http.post('/home/deleteUser/'+ id);
        };
        
        return UserService;


    }]);
    angular.module('app').factory('ShareData', function () {
        return { value: 0 };
    })
    //Configuration for Angular UI routing.
    app.config([
        '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/App/Main/views/home/home.cshtml',
                    menu: 'Home' //Matches to name of 'Home' menu in TestAppNavigationProvider,
                    
                })
                .state('about', {
                    url: '/about',
                    templateUrl: '/App/Main/views/about/about.cshtml',
                    menu: 'About' //Matches to name of 'About' menu in TestAppNavigationProvider
                })
                .state('users', {
                    url: '/users',
                    templateUrl: '/App/Main/views/users/users.cshtml',
                    menu: 'Users', //Matches to name of 'Users' menu in TestAppNavigationProvider
                })
                .state('edit', {
                    url: '/editUser',
                    templateUrl: '/App/Main/views/users/editUser/editUser.cshtml',
                    menu: 'Edit', //Matches to name of 'Edit' menu in TestAppNavigationProvider
                })
                .state('create', {
                    url: '/createUser',
                    templateUrl: '/App/Main/views/users/createUser/createUser.cshtml',
                    menu: 'Create', //Matches to name of 'Edit' menu in TestAppNavigationProvider
                })

            ;           
        }
    ]);
   
})();