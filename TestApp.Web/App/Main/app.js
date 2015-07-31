(function () {
    'use strict';

    angular.module('app', [
        'ngAnimate',
        'ngSanitize',

        'ui.router',
        'ui.bootstrap',
        'ui.jq',

        'abp'
    ]);
    angular
       .module('app')
       .config(configure);
    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {
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
                templateUrl: '/App/Main/views/users/showUsers/showUsers.cshtml',
                menu: 'Users', //Matches to name of 'Users' menu in TestAppNavigationProvider
            })
            .state('edit', {
                url: '/editUser',
                templateUrl: '/App/Main/views/users/editUser/editUser.cshtml'
            })
            .state('create', {
                url: '/createUser',
                templateUrl: '/App/Main/views/users/createUser/createUser.cshtml'
            })
        ;
    };


})();