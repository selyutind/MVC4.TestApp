(function () {
    var controllerId = 'app.views.edit.user';
    angular.module('app').controller(controllerId, [
        '$scope', 'UserService','$location', 'ShareData', function ($scope, UserService, $location, ShareData) {
            var vm = this;            
            function editUser () {
                UserService.editUser(ShareData.value)
                    .success(function (data) {
                        vm.user = data.result;
                        //console.log(vm.user);
                    })
                    .error(function (error) {
                        vm.status = 'Unable to load user data: ';
                        console.log(vm.status);
                    });
            }
            editUser();
           

            //About logic...
        }
    ]);
    

    
})();