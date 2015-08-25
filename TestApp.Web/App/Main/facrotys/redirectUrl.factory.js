(function () {
	'use strict';

	angular
        .module('app')
        .factory('redirectUrl', redirectUrl);
	redirectUrl.$inject = ['$window', '$location'];

	function redirectUrl($window, $location) {
		var redirectUrl = {};
		redirectUrl.users = function () {
			//var url = "#/users";
			//$window.location.href = url;
		    $location.path('/users');
		}
		redirectUrl.createUser = function () {
			//var url = "#/createUser";
			//$window.location.href = url;
		    $location.path('/createUser');
		}
		redirectUrl.editUser = function () {
			//var url = "#/editUser";
			//$window.location.href = url;
		    $location.path('/editUser');
		}
		return redirectUrl;
	}

})();