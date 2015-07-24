(function () {
    var controllerId = 'app.views.edit.user';
    angular.module('app').controller(controllerId, [
        '$scope', 'UserService', '$location', 'ShareData', 'RedirectUrl', function ($scope, UserService, $location, ShareData, RedirectUrl) {
            var vm = this;            
            function getUser () {
                UserService.getUserById(ShareData.value)
                    .success(function (data) {
                        vm.user = data.result; 
                    })
                    .error(function (error) {
                        vm.status = 'Unable to load user : ' + error;
                        console.log(vm.status);
                    });
            }            
            getUser();
            vm.updateUser = function (user) {
                if (user != null) {
                    UserService.updateUser(user);
                    ShareData.value = null;
                    vm.user = null;
                    RedirectUrl.users();
                }
            }
        }
    ]);
    

    
})();