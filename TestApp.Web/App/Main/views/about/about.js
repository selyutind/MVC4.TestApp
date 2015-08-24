(function () {
    'use strict';

    var controllerId = 'app.views.about';
    angular.module('app')
        .controller(controllerId, about);
    about.$inject = ['$scope', '$http'];

    function about($scope, $http) {
        var vm = this;

        function getMyData() {
            $http.get('http://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
            .success(function (data) {
                vm.myData = data;
            });
        }

        getMyData();
    }
})();



    