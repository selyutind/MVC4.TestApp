(function () {
    var controllerId = 'app.views.calendar';

    angular.module('app').controller(controllerId, CalendarCtrl);

    CalendarCtrl.$inject = ['$scope', '$compile', 'uiCalendarConfig', 'calendarService'];

    function CalendarCtrl($scope, $compile, uiCalendarConfig, calendarService) {
        var vm = this;

        vm.date = new Date();
        var d = vm.date.getDate();
        var m = vm.date.getMonth();
        var y = vm.date.getFullYear();
        vm.changeTo = 'English';
        vm.events = [];
        vm.event = {};

        /* event source that pulls from google.com */
        /*$scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };*/

        

        

        /* event source that contains custom events on the scope */
        /*vm.events = [
          { title: 'All Day Event', start: new Date(y, m, 1) },
          { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
          { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
          { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
          { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
          { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
        ];
        */

        function getAllEvents() {
            vm.events = [];

            calendarService.getAllEvents()
                .success(function (data, status, headers) {
                    var loadEvents = data;

                    loadEvents.forEach(function (event) {
                        allDayFlag = false;
                        if (event.allday == 1) { allDayFlag = true; };

                        vm.events.push({
                            id: event.id,
                            title: event.title,
                            start: new Date(event.starT_DATE),
                            end: new Date(event.enD_DATE),
                            allDay: allDayFlag,
                            url: event.url,
                            __id : event.object_id
                        });
                    });
                })
                .error(function (error) {
                    vm.status = 'Unable to load AllEvents data: ' + error;
                    console.log(vm.status);
                });

            

        };
        getAllEvents();

        /* event source that calls a function on every view switch */
        vm.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{ title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed'] }];
            callback(events);
        };

        vm.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
               { type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
               { type: 'party', title: 'Lunch 2', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
               { type: 'party', title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
            ]
        };
        /* alert on eventClick */
        vm.alertOnEventClick = function (date, jsEvent, view) {
            //vm.alertMessage = (date.title + ' was clicked ');
            //vm.event  = date;
            alert('123');
        };
        /* alert on Drop */
        vm.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            vm.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        vm.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            vm.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        vm.addRemoveEventSource = function (sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function (value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
                sources.push(source);
            }
        };

        /* add custom event*/
        vm.addEvent = function () {
            allDayFlag = 0;

            if (vm.event.allday) { allDayFlag = 1; };

            var eventLoad = {
                title: vm.event.title,
                start_date: vm.event.start,
                enD_DATE: vm.event.end,
                allDay: allDayFlag,
                url: vm.event.url
            };

            calendarService.createEvent(eventLoad)
                .success(function (data, status, headers) {
                    vm.events.push(vm.event);
                })
                .error(function (error) {
                    vm.status = 'Unable to create Events: ' + error;
                    console.log(vm.status);
                });
        };
        /* remove event */
        vm.remove = function (index) {
            vm.events.splice(index, 1);
        };
        /* Change View */
        vm.changeView = function (view, calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };
        /* Change View */
        vm.renderCalender = function (calendar) {
            if (uiCalendarConfig.calendars[calendar]) {
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };
        /* Render Tooltip */
        vm.eventRender = function (event, element, view) {
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)(vm);
        };

        /* config object */
        vm.uiConfig = {
            calendar: {
                height: 800,
                editable: true,
                firstDay: 1,
                header: {
                    
                    left: 'title',
                    center: '',
                    right: 'today prev,next'/*
                    left: 'month,agendaWeek,agendaDay',
                    center: 'title',
                    right: 'today prev,next'*/
                },
                eventClick: vm.alertOnEventClick,
                eventDrop: vm.alertOnDrop,
                eventResize: vm.alertOnResize,
                eventRender: vm.eventRender
            }
        };

        /*Локализация*/
        vm.uiConfig.calendar.dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Субботка"];
        vm.uiConfig.calendar.dayNamesShort = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
        vm.uiConfig.calendar.monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        vm.uiConfig.calendar.monthNamesShort = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нбр", "Дек"];

        vm.changeLang = function () {
            if (vm.changeTo === 'Русский') {
                vm.uiConfig.calendar.dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Субботка"];
                vm.uiConfig.calendar.dayNamesShort = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
                vm.changeTo = 'English';
            } else {
                vm.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                vm.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                vm.changeTo = 'Русский';
            }
        };
        /* event sources array*/
        vm.eventSources = [vm.events, vm.eventSource, vm.eventsF];
        vm.eventSources2 = [vm.calEventsExt, vm.eventsF, vm.events];
    }
})();