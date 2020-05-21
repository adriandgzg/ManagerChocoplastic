<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4P8sBXqyMQpCqYbmnrV5WeHYgz9ukRSg&libraries=drawing,geometry&sensor=false" async defer></script>



</head>
<body>











<div class="container-fluid spark-screen">
		<div class="row">
			<div class="col-md-12 col-sm6">
				<div class="box box-primary collapsed-box">
					<div class="box-header with-border">
						<h3 class="box-title">Nueva cobertura de entrega</h3>
						<div class="box-tools pull-right">
							<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Abrir">
								<i class="fa fa-plus"></i></button>
						</div>
					</div>
					<!-- /.box-header -->
					<!-- form start -->
					<form role="form" action="/zonas" method="post">
						<div class="box-body">
							{{ csrf_field() }}
							
							<div id="map" style=" height: 500px;"></div>
							<div class="checkbox">
								<label>
									<input type="checkbox" name="activo" value="1">Activo
								</label>
							</div>
						</div>
						<!-- /.box-body -->

						<div class="box-footer">
							<button type="button" id="addCobertura" onclick="savePolygon();" class="btn btn-primary">Crear</button>
						</div>
					</form>
				</div>
				<!-- Default box -->
				<div class="box">
					<div class="box-header with-border">
						<h3 class="box-title">Coberturas de entrega existentes</h3>

						<div class="box-tools pull-right">
							<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
								<i class="fa fa-minus"></i></button>
								</div>
							</div>

						
							<!-- /.box-body -->
						</div>
						<!-- /.box -->

					</div>
				</div>
			</div>
            <script type="text/javascript" >

                    window.onload = function() {
                        initMap();
                    };
                    function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 8
  });

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    },
    markerOptions: {
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    },
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);

  var shapeID = 1;

  google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
    drawingManager.setDrawingMode(null);

    polygon.setOptions({
      id: shapeID,
      editable: true,
      draggable: true
    });

    google.maps.event.addListener(polygon, 'click', function() {
      //console.log(this.id + ' ' + this.getPath().getArray().toString());
    });

    google.maps.event.addListener(polygon, 'dragend', function() {
      //console.log(this.id + ' *** ' + this.getPath().getArray().toString());
    });
    
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
        //console.log(this.id + ' *** ' + this.getPath().getArray().toString());
    });
    google.maps.event.addListener(polygon.getPath(), "insert_at", getPath);
    google.maps.event.addListener(polygon.getPath(), "remove_at", getPath);
    google.maps.event.addListener(polygon.getPath(), "set_at", getPath);
    google.maps.event.addListener(polygon.getPath(), "coordinates_changed", getPath);
    
    function getPath() {
      var path = polygon.getPath();
      var len = path.getLength();
      var coordStr = 'id: ' + polygon.id + '\n';
      for (var i = 0; i < len; i++) {
        coordStr += this.getAt(i).toUrlValue(6) + "\n";
      }
      console.log(coordStr);
    }

    shapeID++;
  });
}
            </script>
</body>
</html>
