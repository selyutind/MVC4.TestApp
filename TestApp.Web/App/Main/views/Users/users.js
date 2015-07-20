(function () {
    var controllerId = 'app.views.users';
    angular.module('app').controller(controllerId, [
        '$scope', 'UserService', function ($scope, UserService) {
            var vm = this;           
            function getUsers() {
                UserService.getUsers()
                    .success(function (data) {
                        vm.users = data.result;
                        console.log(vm.users);
                    })
                    .error(function (error) {
                        vm.status = 'Unable to load customer data: ' + error.message;
                        console.log(vm.status);
                    });
            }
            vm.time = new Date().toString();
            getUsers();

            //About logic...
        }
    ]);
    

    
})();