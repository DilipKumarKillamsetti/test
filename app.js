var app = angular.module('App', ['ui.calendar', 'ui.bootstrap'])
app.controller("calenderCtrl",function($scope,$http,$compile,uiCalendarConfig){

    $http(
        {
          url: "http://192.168.1.158/myproject/mentee_calendar_event.php",
          method:"GET",
          params:{phone_no:7903038806}
        })
        .then(function(response){
           $scope.events=response.data;
          
           console.log( $scope.events)
           $scope.goals =  $scope.events.mentee_goals;
           $scope.meetings = $scope.events.meeting_schedule;
           $scope.tasks = $scope.events.mentee_tasks;
            $scope.fun();
        })
        $scope.fun=function() {
            $scope.eventSources = [[]]
           for (var i=0;i<$scope.goals.length;i++)
        {
            console.log($scope.goals[i].due_date)
            var date = new Date($scope.goals[i].due_date);
            console.log("before splitting " +date)
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            $scope.addEvent("Goal Due Date",y,m+1,d)
        }
        for (var i=0;i<$scope.meetings.length;i++)
        {
            var date = new Date($scope.meetings[i].date);
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var start_time = $scope.meetings[i].start_time;
            var arr = start_time.split(':');
            var sth = parseInt(arr[0]) ;
            var stm = parseInt(arr[1]) ;
            var sts = parseInt(arr[2]) + " seconds";
            var end_time = $scope.meetings[i].end_time;
            var arr = end_time.split(':');
            var eth = parseInt(arr[0]) ;
            var etm = parseInt(arr[1]) ;
            var ets = parseInt(arr[2]) + " seconds";
            $scope.addEvent1("meeting",y,m+1,d,sth,stm,eth,etm)
        }
        for (var i=0;i<$scope.tasks.length;i++)
        {
            var date = new Date($scope.tasks[i].due_date);
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            $scope.addEvent("Task Due Date",y,m+1,d)
        }
        console.log($scope.eventSources)
    }
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
        $scope.eventSources = [
            [{ 
                    title:"Long Event",
                start: new Date(y, m, d,19,00),
                end: new Date(y, m, d,19,30)
                    }]
            ];
            console.log( $scope.eventSources)
            $scope.eventFunction = function(dtitle, dy, dm, dd, dsth, dstm, deth, detm)
            {
                console.log(dtitle, dy, dm, dd, dsth, dstm, deth, detm)
                var temp ={
                    title:"Long Event12",
                    start: new Date(y, m, d),
                    allDay : true
                    }
                var arr = [temp];
                $scope.eventSources.push(arr);
                 console.log( $scope.eventSources);
            }
    
    
    $scope.uiConfig = {
        "calendar":{
          height: 450,
          editable: true,
          header:{
            left: 'month basicWeek basicDay agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          "eventClick": $scope.alertOnEventClick,
          "eventDrop": $scope.alertOnDrop,
          "eventResize": $scope.alertOnResize
        }
      };
      $scope.addEvent1 = function(title,y,m,d,sth,stm,fth,ftm) {
        console.log(title,y,m,d,sth,stm,fth,ftm)
        var temp ={
          title :title,
          start: new Date(y, m, d, sth, stm),
          end: new Date(y, m, d, fth, ftm),
          allDay :false
      }
      var arr =[temp];
      $scope.eventSources.push(arr)
    };
    $scope.addEvent = function(title,y,m,d) {
        console.log(title,y,m,d)
      var temp ={
          title :title,
          start: new Date(y, m, d),
          allDay :true }
      var arr =[temp];
      $scope.eventFunction(title,y,m,d)
    };
     
      
})