(function () {
    var controllerId = 'app.views.users';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.time = new Date();
            vm.users = {
                name: 'vasa',
                login: 'Vas',
                password: 'qwerty',
                email: 'vasa@gmail.com'
            };          

            //About logic...
        }
    ]);

    
})();