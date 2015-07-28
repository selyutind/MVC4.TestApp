(function () {
    var controllerId = 'app.views.users';
    angular.module('app').controller(controllerId, [
        '$scope', 'UserService', 'RedirectUrl', 'ShareData', 'AlertService', function ($scope, UserService, RedirectUrl, ShareData, AlertService) {
            var vm = this;            
            vm.createUser = function () {
                RedirectUrl.createUser();
            }
            vm.editUser = function (userId) {
                ShareData.value = userId;
                RedirectUrl.editUser();
                
            }
            vm.deleteUser = function (userId) {                
                UserService.deleteUser(userId)
                .success(function () {
                    AlertService.add('success', 'Пользователь успешно удален.');
                    getAllUsers();  
                });
            }
            /*vm.addAlert = function (type, msg) {
                AlertService.add(type, msg);
            }*/
            vm.closeAlert = function (index) {
                AlertService.closeAlertIdx(index);
            }
            function getAllUsers() {
                UserService.getAllUsers()
                    .success(function (data) {
                        vm.users = data.result;                        
                    })
                    .error(function (error) {
                        vm.status = 'Unable to load AllUsers data: ' + error.message;
                        console.log(vm.status);
                    });
            }    
            getAllUsers();
            //About logic...
        }
    ]);
    

    
})();