'use strict';

appGoogle.controller('polygonCtrl',['$scope','markerService',googleDraw]);

function googleDraw($scope, markerService){
	// init list marker
	$scope.listMarker = markerService;
}
