(function () {
    'use strict';

    angular
        .module('app')
        .service('alertService', alertService);

    alertService.$inject = ['$rootScope'];

    function alertService($rootScope) {
        var alertService;
        $rootScope.alerts = [];
        return alertService = {
            add: function (type, msg) {
                return $rootScope.alerts.push({
                    type: type,
                    msg: msg,
                    close: function () {
                        return alertService.closeAlert(this);
                    }
                });
            },
            closeAlert: function (alert) {
                return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
            },
            closeAlertIdx: function (index) {
                return $rootScope.alerts.splice(index, 1);
            },
            clear: function () {
                $rootScope.alerts = [];
            }
        };
    }


})();
    
    


   


