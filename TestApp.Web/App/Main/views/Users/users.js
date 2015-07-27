(function () {
    var controllerId = 'app.views.users';
    angular.module('app').controller(controllerId, [
        '$scope', 'UserService', 'RedirectUrl', 'ShareData', function ($scope, UserService, RedirectUrl, ShareData) {
            var vm = this;
            vm.editUser = function (userId) {
                ShareData.value = userId;
                RedirectUrl.editUser();
                
            }
            vm.deleteUser = function (userId) {
                vm.alerts[3];
                vm.alerts.push({ type: 'success', msg: 'Пользователь удален.' });
                /*UserService.deleteUser(userId)
                .success(function () {
                    
                    getAllUsers();                    
                    //console.log(vm.users);
                });*/
            }            
            function getAllUsers() {
                UserService.getAllUsers()
                    .success(function (data) {
                        vm.users = data.result;
                        //console.log(vm.users);
                    })
                    .error(function (error) {
                        vm.status = 'Unable to load AllUsers data: ' + error.message;
                        console.log(vm.status);
                    });
            }
            vm.alerts = [
                { type: 'success', msg: 'Пользователь успешно добавлен.' },
                { type: 'success', msg: 'Данные обновлены.' },
                { type: 'success', msg: 'Пользователь удален.' }
            ];

            getAllUsers();

            //About logic...
        }
    ]);
    

    
})();