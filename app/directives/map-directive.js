appGoogle.directive('map', function() {
    return {
        restrict: 'E',
        scope:{
            markers : '='
        },
        replace: true,
        template     : function (element, attrs, scope) {
                return '<div id="gmaps" style="width:100%; height:600px"></div>';
        },
        controller: function($scope,$element) {
            var map, infoWindow;
            var markers = [];
            
            $scope.$watch('$scope.markers', setMarker);
            
            var mapOptions = {
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: true
            };
            
            // begin init the map
            function initMap() {
                map = new google.maps.Map($element[0], mapOptions);

                // begin drawing
                 var drawingManager = new google.maps.drawing.DrawingManager({
                    drawingMode: google.maps.drawing.OverlayType.POLYGON,
                    drawingControl: true,
                    drawingControlOptions: {
                      position: google.maps.ControlPosition.TOP_CENTER,
                      drawingModes: [
                        google.maps.drawing.OverlayType.MARKER,
                        google.maps.drawing.OverlayType.CIRCLE,
                        google.maps.drawing.OverlayType.POLYGON,
                        google.maps.drawing.OverlayType.POLYLINE,
                        google.maps.drawing.OverlayType.RECTANGLE
                      ]
                    },
                  });
                  drawingManager.setMap(map);
                // end drawing
                
                var polygonArray = [];
                // add event draw complete
                google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {

                    markers.forEach(function(value,key){
                        //check marker inside
                        if( google.maps.geometry.poly.containsLocation( value.getPosition() , polygon) == true ){

                            var latAttr = value.getPosition().lat().toFixed(7);
                            var lngAttr = value.getPosition().lng().toFixed(7);
                            
                            // begin check latlng exist in array                            
                            for(var key in $scope.markers) {

                                if( latAttr == $scope.markers[key].latAttr && lngAttr == $scope.markers[key].lngAttr){
                                    //update data
                                    $scope.$apply(function(){
                                        $scope.markers[key].checked = true;
                                    });
                                }
                            }
                            //end check latlng exist in array         
                        }
                    });
                    polygonArray.push(polygon);
                });
                // end add event draw complete

                function deletePolygon() {
                    for( index in polygonArray ) {

                        polygonArray[index].setMap(null);

                        $scope.$apply(function(){
                             for(var key in $scope.markers) {
                                $scope.markers[key].checked = false;
                             }
                        });
                    }
                }
                google.maps.event.addDomListener(document.getElementById('delete'), 'click', deletePolygon);
            }
            // end init map
            
            //loop all marker from listMarker from controller
            function setMarker() {
                 var bounds = new google.maps.LatLngBounds();

                map.fitBounds(bounds); 

                for(var key in $scope.markers) {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng($scope.markers[key].latAttr, $scope.markers[key].lngAttr),
                        map: map,
                        title: $scope.markers[key].name,
                        animation: google.maps.Animation.DROP,
                    });

                    bounds.extend(marker.getPosition());
 
                     //content info
                    var boxText       = document.createElement("div");

                    boxText.className = 'map-info';
                    
                    boxText.innerHTML = '<span>'+$scope.markers[key].name+'</span>';

                    attachInfoBoxToMarker( marker, boxText );

                    markers.push(marker); // add marker to array
                }
            }
            initMap();

            // init info for marker
            function attachInfoBoxToMarker( marker, infoBox) {
                 var infowindow = new google.maps.InfoWindow({
                    content: infoBox
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(marker.get('map'), marker);
                });
            }
        },
        // end controller
    }
    // end return
});
