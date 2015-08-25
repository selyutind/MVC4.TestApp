(function () {
    'use strict';

    angular.module('app', [
        'ngAnimate',
        'ngCookies',        
        'ngSanitize',

        'ui.router',
        'ui.bootstrap',
        'ui.grid',
        'ui.jq',
        'ui.calendar',

        'abp'
    ]);
    angular
       .module('app')
       .config(configure);
    angular
      .module('app')
      .run(configureRun);
    configure.$inject = ['$stateProvider', '$urlRouterProvider'];
    configureRun.$inject = ['$rootScope', '$location', '$cookies', '$http'];

    function configure($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'app.views.home',
                templateUrl: '/App/Main/views/home/home.cshtml',
                menu: 'Home' //Matches to name of 'Home' menu in TestAppNavigationProvider,                    
            })
            .state('login', {
                url: '/login',
                controller: 'Login',
                templateUrl: '/App/Main/views/login/login.cshtml'                                  
            })
            .state('about', {
                url: '/about',
                controller: 'app.views.about',
                templateUrl: '/App/Main/views/about/about.cshtml',
                menu: 'About' //Matches to name of 'About' menu in TestAppNavigationProvider
            })
            .state('calendar', {
                url: '/calendar',
                controller: 'app.views.calendar',
                templateUrl: '/App/Main/views/calendar/calendar.cshtml',
                menu: 'Calendar'
            })
            .state('users', {
                url: '/users',
                controller: 'app.views.showUsers',
                templateUrl: '/App/Main/views/users/showUsers/showUsers.cshtml',
                menu: 'Users', //Matches to name of 'Users' menu in TestAppNavigationProvider
            })
            .state('edit', {
                url: '/editUser',
                controller: 'app.views.edit.user',
                templateUrl: '/App/Main/views/users/editUser/editUser.cshtml'
            })
            .state('create', {
                url: '/createUser',
                controller: 'app.views.create.user',
                templateUrl: '/App/Main/views/users/createUser/createUser.cshtml'
            })
        ;
    };

    function configureRun($rootScope, $location, $cookies, $http) {

        $http.defaults.headers.common['X-Pagination-Current-Page'];
        $http.defaults.headers.common['X-Pagination-Page-Count'] ;
        $http.defaults.headers.common['X-Pagination-Per-Page'] ;
        $http.defaults.headers.common['X-Pagination-Total-Count'];
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    };


})();