(function () {
    'use strict';    
    angular
        .module('app')
        .controller('app.views.create.user', createUser);
    createUser.$inject = ['$scope', 'userService', 'redirectUrl', 'alertService'];
    function createUser($scope, userService, redirectUrl, alertService) {

        var vm = this;
        vm.createUser = createUser;
        
        function createUser () {
            if (vm.user != "null") {
                userService.createUser(vm.user)
                    .success(function () {
                        vm.user = null;
                        redirectUrl.users();
                        alertService.add('success', 'Новый пользователь успешно создан.');
                    })
                    .error(function (error) {
                        vm.status = 'Unable to create new user: ' + error;
                        console.log(vm.status);
                    });
            }
        }
    }  
    
})();