(function () {
    'use strict';

    angular
        .module('app')
        .service('userService', userService);

    userService.$inject = ['$http'];

    function userService($http) {
        var userService = {};
        userService.getAllUsers = function () {
            //return $http.get('/home/users');
            return $http.get('api/users/GetUsers');
        };
        userService.getUserById = function (id) {
            //return $http.get('/home/getUserById/' + id)
            return $http.get('api/users/GetUser/'+ id);
        };
        userService.createUser = function (user) {
            //return $http.post('/home/createUser', user);
            return $http.post('api/users/PostUser/' + user);
        };
        userService.updateUser = function (user) {
            //return $http.post('/home/updateUser', user);
            return $http.post('api/users/putUsers/' + user);
        };
        userService.deleteUser = function (id) {
            //return $http.post('/home/deleteUser/' + id);
            return $http.post('api/users/deleteUser/' + user);
        };
        return userService;
    };


})();
    
    


   


