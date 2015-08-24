(function () {
	'use strict';

	angular
        .module('app')
        .factory('redirectUrl', redirectUrl);
	redirectUrl.$inject =['$window'];

	function redirectUrl($window) {
		var redirectUrl = {};
		redirectUrl.users = function () {
			var url = "#/users";
			$window.location.href = url;
		}
		redirectUrl.createUser = function () {
			var url = "#/createUser";
			$window.location.href = url;
		}
		redirectUrl.editUser = function () {
			var url = "#/editUser";
			$window.location.href = url;
		}
		return redirectUrl;
	}

})();