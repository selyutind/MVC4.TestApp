(function () {
    var controllerId = 'app.views.create.user';
    angular.module('app').controller(controllerId, [
        '$scope', 'UserService', 'RedirectUrl', function ($scope, UserService, RedirectUrl) {
            var vm = this;
          
            vm.createUser = function () {
                if (vm.user != "null") {
                    UserService.createUser(vm.user)
                        .success(function () {
                            vm.user = null;
                            RedirectUrl.users();
                        })
                        .error(function (error) {
                            vm.status = 'Unable to create new user: ' + error;
                            console.log(vm.status);
                        });
                }
            }
        }
    ]);
    

    
})();