(function () {
    'use strict';

    var controllerId = 'app.views.about';
<<<<<<< HEAD

    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            /* config object */
            var vm = this;

        }
    ]);

=======
    angular.module('app')
    .controller(controllerId, about);
    about.$inject = ['$scope', '$http'];

    function about($scope, $http) {
        var vm = this;
        vm.setPage = setPage;
        vm.pageChanged = pageChanged;

        vm.totalItems = 10;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.maxSize = 5;
       
        getMyData();

        function getMyData() {
            $http.get('api/address/GetPaginationAddress', {
                params: {
                    currentPage: vm.currentPage,
                    itemsPerPage: vm.itemsPerPage,
                    search: vm.searchText
                }
            })
            .success(function (data, status, headers) {
                vm.myData = data;
                vm.totalItems = angular.fromJson(headers('X-Pagination-Total-Count'));
            });
        };

        function pageChanged() {
            getMyData();
        };

        function setPage(page) {
            vm.currentPage = page;
            vm.users = null;
            getMyData();
        };

       
    }
>>>>>>> Immortall08/master
})();