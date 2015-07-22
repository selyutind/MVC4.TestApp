(function () {
    var controllerId = 'app.views.create.user';
    angular.module('app').controller(controllerId, [
        '$scope', 'UserService', function ($scope, UserService) {
            var vm = this;
          
            vm.createUser = function () {
                UserService.createUser(vm.user)
                    .success(function (data) {
                        vm.users = data.result;
                        //console.log(vm.users);
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