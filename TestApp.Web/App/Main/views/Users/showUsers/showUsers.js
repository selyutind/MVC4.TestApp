(function () {
    'use strict';

    angular
        .module('app')
        .controller('app.views.showUsers', users);
    users.$inject = ['$scope', 'userService', 'redirectUrl', 'ShareData', 'alertService'];
    function users($scope, userService, redirectUrl, ShareData, alertService) {

        var vm = this;

        vm.closeAlert = closeAlert;
        vm.createUser = createUser;
        vm.deleteUser = deleteUser;
        vm.editUser = editUser;

        getAllUsers();
        
        function closeAlert(index) {
            alertService.closeAlertIdx(index);
        };
        function createUser() {
            redirectUrl.createUser();
        }
        function deleteUser(userId) {
            userService.deleteUser(userId)
            .success(function () {
                alertService.add('success', 'Пользователь успешно удален.');
                getAllUsers();
            });
        };

        function editUser(userId) {
            ShareData.value = userId;
            redirectUrl.editUser();
        };

        function getAllUsers() {
            userService.getAllUsers()
                .success(function (data) {
                    vm.users = data.result;
                })
                .error(function (error) {
                    vm.status = 'Unable to load AllUsers data: ' + error.message;
                    console.log(vm.status);
                });
        };
    }
        
    
    

    
})();