'use strict';

angular.module('myApp', [
  'ngRoute'
])
.controller('graphCtrl', ['$scope', function($scope) {
    $scope.arcs = window.arcs;
    $scope.imageSize = window.size;
    $scope.boxSize = boxSize;
    $scope.whiskerSize = whiskerSize;
    $scope.rotation = rotation;

    $scope.update = function(){
        window.size=$scope.imageSize;
        window.whiskerSize=$scope.whiskerSize;
        window.boxSize=$scope.boxSize;
        window.rotation=$scope.rotation;
        window.reload();

        setTimeout(function(){
          $('input[name="daterange"]').daterangepicker({
            locale: {
              format: 'DD/MM'
            },
          });
        },1);
        $('input[name="daterange"]').attr("name", "range");
    }

    $scope.updateDay = function(arc){
        arc.to = getToArc(arc.daterange);
        arc.from = getFromArc(arc.daterange);

        if(arc.isWhiskers){
          arc.toWhirker = getToArc(arc.whiskers);
          arc.fromWhirker = getFromArc(arc.whiskers);

        }
        $scope.update();
    }

    var getFromArc = function(daterange){
      if(!daterange) return;
      return daterange.split("-")[0].split("/")[1]*1-1+(daterange.split("-")[0].split("/")[0]*1)/30
    }

    var getToArc = function(daterange){
      if(!daterange) return;
      return daterange.split("-")[1].split("/")[1]*1-1+(daterange.split("-")[1].split("/")[0]*1)/30
    }

    $scope.addArc = function(){
        var arc = {
            colour : "#"+Math.floor(Math.random()*1000000),
            offset : Math.floor(Math.random()*20)-10,
            isWhiskers : true
        }
        arc.fromMonth = Math.floor(arc.from)+1;
        arc.toMonth = Math.floor(arc.to)+1;
        arc.fromDay = Math.floor((arc.from%1)*30)+1;
        arc.toDay = Math.floor((arc.to%1)*30)+1;

        $scope.arcs[$scope.arcs.length] = arc;
        $scope.updateDay(arc);
        ga('send', 'addArc');
    }

    $scope.remove = function(arc){
        if(window.confirm("czy na pewno chcesz usunąć ten element?")){
            var elem = $scope.arcs.indexOf(arc);
            if(elem>-1){
                $scope.arcs.splice(elem,1);
            }
        }
        $scope.update();
        ga('send', 'removeArc');
    }


}]);
