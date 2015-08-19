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

        vm.setPage = setPage;
        vm.pageChanged = function () {
            getAllUsers();
            console.log('Page changed to: ' + vm.currentPage);
        };


        vm.totalItems = 10;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.maxSize = 5;

        getAllUsers();

        function closeAlert(index) {
            alertService.closeAlertIdx(index);
        };
        function createUser() {
            redirectUrl.createUser();
        };
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
            userService.getPaginationAllUsers(vm.currentPage, vm.itemsPerPage)
                .success(function (data, status, headers) {
                    vm.users = data;                    
                    vm.totalItems = angular.fromJson(headers('X-Pagination-Total-Count'));                    
                })
                .error(function (error) {
                    vm.status = 'Unable to load AllUsers data: ' + error;
                    console.log(vm.status);
                });
        };
        function setPage(page) {
            vm.currentPage = page;
            vm.users = null;
            getAllUsers();
        };
       
    };
        
    
    

    
})();