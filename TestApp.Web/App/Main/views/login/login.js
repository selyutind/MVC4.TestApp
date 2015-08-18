(function () {
    'use strict';

    angular.module('app')

    .controller('Login', Login);
    Login.$inject = ['$scope', '$rootScope', '$location', 'AuthenticationService'];
    function Login($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        var vm = this;
        AuthenticationService.ClearCredentials();

        vm.login = function () {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    vm.error = response.message;
                    vm.dataLoading = false;
                }
            });
        };
    };
        
    
    

    
})();