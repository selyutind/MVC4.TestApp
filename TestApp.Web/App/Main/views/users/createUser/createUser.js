(function () {
    var controllerId = 'app.views.create.user';
    angular.module('app').controller(controllerId, [
        '$scope', 'UserService', function ($scope, UserService) {
            var vm = this;
          
            vm.createUser = function () {
                if (vm.user != null) {
                    UserService.createUser(vm.user)
                        .success(function () {
                            vm.user = null;
                            UserService.showAllUsers();

                        })
                        .error(function (error) {
                            vm.status = 'Unable to load customer data: ';
                            console.log(vm.status);
                        });
                }
                
            }
            //About logic...
        }
    ]);
    

    
})();