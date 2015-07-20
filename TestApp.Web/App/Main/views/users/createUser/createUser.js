(function () {
    var controllerId = 'app.views.create.user';
    angular.module('app').controller(controllerId, [
        '$scope', '$http', 'UserService', function ($scope, $http, UserService) {
            var vm = this;
            /*var user = {
                name: vm.name,
                login: vm.login,
                password: vm.password,
                email: vm.email
            };*/
           /* var res = $http.post('/createUser', user);
            res.success(function (data, status, headers, config) {
                vm.message = data;
            });
            res.error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({ data: data }));
            });*/
            vm.createUser = function () {
                UserService.createUser(vm.user)
                    .success(function (data) {
                        vm.users = data.result;
                        console.log(vm.users);
                    })
                    .error(function (error) {
                        vm.status = 'Unable to load customer data: ';
                        console.log(vm.status);
                    });
               /* var res = $http.post('home/createUser', vm.user);
                res.success(function (data, status, headers, config) {
                    vm.message = data;
                });
                res.error(function (data, status, headers, config) {
                    alert("failure message: " + JSON.stringify({ data: data }));
                });*/

            }

           
           
            //About logic...
        }
    ]);
    

    
})();