(function () {
	'use strict';

	angular
        .module('app')
        .service('calendarService', calendarService);

	calendarService.$inject = ['$http'];

	function calendarService($http) {
		var calendarService = {};

		calendarService.getAllEvents = function () {
			return $http.get('api/calendar/GetEvents');
		};
		calendarService.createEvent = function (event) {
		    //return $http.post('/home/createUser', user);
		    return $http.post('api/calendar/PostEvent', event);
		};
	    /*
		calendarService.getPaginationAllUsers = function (page, perPage) {
			//return $http.get('/home/users');
			return $http.get('api/users/GetPaginationUsers', {
				params: {
					currentPage: page,
					itemsPerPage: perPage
				}
			});
		};
		calendarService.getUserById = function (id) {
			//return $http.get('/home/getUserById/' + id)
			return $http.get('api/users/GetUser/' + id);
		};
		calendarService.createUser = function (user) {
			//return $http.post('/home/createUser', user);
			return $http.post('api/users/PostUser/' + user);
		};
		calendarService.updateUser = function (userId, modelUser) {
			//return $http.post('/home/updateUser', user);
			return $http.put('api/users/putUsers/' + userId, modelUser); 
		};
		calendarService.deleteUser = function (id) {
			//return $http.post('/home/deleteUser/' + id);
			return $http.delete('api/users/deleteUser/' + id);
		};*/
		return calendarService;
	};


})();







