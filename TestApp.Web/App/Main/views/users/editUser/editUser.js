(function () {
    'use strict';    
    angular
        .module('app')
        .controller('app.views.edit.user', editUser);
    editUser.$inject = ['$scope', 'userService', 'redirectUrl', 'ShareData', 'alertService'];

    function editUser($scope, userService, redirectUrl, ShareData, alertService) {

        var vm = this;
        vm.updateUser = updateUser;
        vm.closeAlert = closeAlert;
        getUser();

        function closeAlert(index) {
            alertService.closeAlert(index);
        }
        function getUser() {
            userService.getUserById(ShareData.value)
                .success(function (data) {
                    vm.user = data.result;                    
                })
                .error(function (error) {
                    vm.status = 'Unable to load user : ' + error;
                    console.log(vm.status);
                });
        }
        
        function updateUser (user) {
            if (user != null) {
                userService.updateUser(user)
                    .success(function (data) {                        
                        alertService.add('success', 'Данные сохранены.');
                    })
                    .error(function (error) {
                        vm.status = 'Не удалось сохранить данные ' + error;
                        console.log(vm.status);
                    });
                ShareData.value = null;
                vm.user = null;
                redirectUrl.users();
            }
        }
    }
    
        
            

    

    
})();