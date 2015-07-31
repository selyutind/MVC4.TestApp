(function () {
    'use strict';

    angular
        .module('app')
        .service('userService', userService);

    userService.$inject = ['$http'];

    function userService($http) {
        var userService = {};
        userService.getAllUsers = function () {
            return $http.get('/home/users');
        };
        userService.getUserById = function (id) {
            return $http.get('/home/getUserById/' + id)
        };
        userService.createUser = function (user) {
            return $http.post('/home/createUser', user);
        };
        userService.updateUser = function (user) {
            return $http.post('/home/updateUser', user);
        };
        userService.deleteUser = function (id) {
            return $http.post('/home/deleteUser/' + id);
        };
        return userService;
    };


})();
    
    


   


