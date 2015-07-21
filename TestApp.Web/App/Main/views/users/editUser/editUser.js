(function () {
    var controllerId = 'app.views.edit.user';
    angular.module('app').controller(controllerId, [
        '$scope', 'UserService','$location', function ($scope, UserService, $location) {
            var vm = this;
            vm.location = $location.href;
            console.log($location);
            function showUser() {
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
            vm.editUser = function () {
                UserService.editUser(vm.user)
                    .success(function (data) {
                        vm.users = data.result;
                        console.log(vm.users);
                    })
                    .error(function (error) {
                        vm.status = 'Unable to load customer data: ';
                        console.log(vm.status);
                    });
            }
            
           

            //About logic...
        }
    ]);
    

    
})();