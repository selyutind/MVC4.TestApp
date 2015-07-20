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
    angular.module('app').factory('UserService', ['$http', function ($http) {

        var UserService = {};
        UserService.getUsers = function () {
            return $http.get('/home/users');
        };
        UserService.editUser = function (id) {
            return $http.get('/home/users/' || id);
        };
        UserService.createUser = function (user) {
            console.log(user);
            return $http.post('/home/createUser', user);
        };
        return UserService;


    }]);
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
                    url: '/users/:id',
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