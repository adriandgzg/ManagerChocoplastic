<template>
    <v-container>
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
                <div class="box-body">
                  <div class="form-group">
                    <label>Sucursal</label>
                    <v-select
                            @change="initMap"
                            v-model="store"
                            :items="stores"
                            item-text="name"
                            item-value="id"
                            filled
                            chips
                            label="Tienda"
                            placeholder="Selecciona sucursal"
                    ></v-select>
                  </div>
                  <div id="map" style=" height: 500px;"></div>
                </div>
                <!-- /.box-body -->
            </div>
          </div>
        </div>
      </div>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                map: {},
                drawingManager: {},
                stores:[],
                store:''
            }
        },
      created() {
          this.getCoverages()
      },
      mounted() {
            let mapsScript = document.createElement('script')
            mapsScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4P8sBXqyMQpCqYbmnrV5WeHYgz9ukRSg&libraries=drawing,geometry&sensor=false')
            document.head.appendChild(mapsScript)

        },
        methods: {
          getCoverages() {
            axios.get('/coverages')
                    .then(response => {
                      this.stores = response.data.data
                    })
                    .catch(e => {
                      console.log(e);
                    })
          },
            initMap() {
              let self=this
                this.map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 17.988073, lng: -92.940934},
                    zoom: 15
                });
                this.drawingManager = new google.maps.drawing.DrawingManager({
                    drawingControl: true,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: ['polygon']
                    }
                });
                this.drawingManager.setMap(this.map);
                self.loadPolygons(this.map);
                google.maps.event.addListener(this.drawingManager, 'polygoncomplete', function (polygon) {
                  self.savePolygon(polygon);
                  self.setPolygonEvents(polygon);

                });
            },
            setPolygonEvents(polygon) {
              let self=this;
                google.maps.event.addListener(polygon,
                    'click', function (event) {
                        console.log(this);
                    });
                google.maps.event.addListener(polygon,
                    'rightclick', function (e) {
                        if (e.vertex == undefined) {
                            var res = confirm("¿Desea eliminar esta cobertura? Este cambio no se puede deshacer.");
                            if (res) {
                                this.setMap(null);
                              self.destroyPolygon(polygon, this)
                            }
                        } else {
                            polygon.getPath().removeAt(e.vertex);
                          self.updatePolygon(polygon);
                        }
                    });
                google.maps.event.addListener(polygon.getPath(), 'set_at', function (event) {
                  self.updatePolygon(polygon);
                });
                google.maps.event.addListener(polygon.getPath(), 'insert_at', function () {
                  self.updatePolygon(polygon);
                });
            },
            savePolygon(polygon) {
              let self=this;
              let encode = google.maps.geometry.encoding.encodePath(polygon.getPath());
              let store= this.stores.find(item => item.id == this.store)
              axios.put('/coverages',
                {
                    id: self.store,
                    name: store.name,
                    store_id: store.id,
                    polygon: polygon.getPath().getArray().toString(),
                    encode: encode
                }).then (response=> {
                    polygon.id = response.data.data.id;
                    self.drawingManager.setDrawingMode(null)
                });
            },
            updatePolygon(polygon) {
                var encode = google.maps.geometry.encoding.encodePath(polygon.getPath());
                axios.post('/coverages/' + polygon.id,{
                        polygon: polygon.getPath().getArray().toString(),
                        encode: encode
                    }).then(response=> {
                        console.log("Poligono actualizado")
                    });
            },
            destroyPolygon(polygon, t) {
                axios.get('/coverages/destroy/' + polygon.id).then(response=> {
                        t.setMap(null);
                });
            },
            loadPolygons(map) {
              let self=this;
              axios.get('/coverages/' + this.store) // $("#sucCobertura").val(),
                .then(response=> {
                  if (response.data.data.length <= 0) {
                      return;
                  }
                  var c = 0;
                  response.data.data.forEach(function (polyg) {
                    if (c == 0) {
                      if (polyg!=null){
                        self.drawPolygonWithEvents(polyg)
                      }
                    } else {
                      self.drawPolygon(polyg)
                    }
                    c = c + 1;
                  })
              });
            },
            drawPolygon(polyg) {
                this.drawingManager.drawingControl = true;
                this.drawingManager.polygonOptions = {
                    editable: false,
                    clickable: false,
                };
                this.drawingManager.setMap(this.map);
                var decodePath = google.maps.geometry.encoding.decodePath(polyg.encode);
                var polygon = new google.maps.Polygon(
                    {
                        path: decodePath,
                        map: this.map,
                        editable: false,
                        clickable: false,
                        strokeWeight: 0.6,
                        strokeColor: '#002266',
                        fillColor: '#002266'
                    }
                );
                polygon.id = polyg.id;
            },
            drawPolygonWithEvents(polyg) {
                var decodePath = google.maps.geometry.encoding.decodePath(polyg.encode);
                var polygon = new google.maps.Polygon(
                    {
                        path: decodePath,
                        map: this.map,
                        editable: true,
                        strokeWeight: 0.8,
                        strokeColor: '#992200',
                        fillColor: '#e00'
                    }
                );
                polygon.id = polyg.id;
                this.map.setCenter(decodePath[0]);
                this.setPolygonEvents(polygon);
            },
        }
    }
</script>