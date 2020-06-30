(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Coverages.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Coverages.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      map: {},
      drawingManager: {},
      stores: [],
      store: ''
    };
  },
  created: function created() {
    this.getCoverages();
  },
  mounted: function mounted() {
    var mapsScript = document.createElement('script');
    mapsScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4P8sBXqyMQpCqYbmnrV5WeHYgz9ukRSg&libraries=drawing,geometry&sensor=false');
    document.head.appendChild(mapsScript);
  },
  methods: {
    getCoverages: function getCoverages() {
      var _this = this;

      axios.get('/coverages').then(function (response) {
        _this.stores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    initMap: function initMap() {
      var self = this;
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 17.988073,
          lng: -92.940934
        },
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
    setPolygonEvents: function setPolygonEvents(polygon) {
      var self = this;
      google.maps.event.addListener(polygon, 'click', function (event) {
        console.log(this);
      });
      google.maps.event.addListener(polygon, 'rightclick', function (e) {
        if (e.vertex == undefined) {
          var res = confirm("¿Desea eliminar esta cobertura? Este cambio no se puede deshacer.");

          if (res) {
            this.setMap(null);
            self.destroyPolygon(polygon, this);
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
    savePolygon: function savePolygon(polygon) {
      var _this2 = this;

      var self = this;
      var encode = google.maps.geometry.encoding.encodePath(polygon.getPath());
      var store = this.stores.find(function (item) {
        return item.id == _this2.store;
      });
      axios.put('/coverages', {
        id: self.store,
        name: store.name,
        store_id: store.id,
        polygon: polygon.getPath().getArray().toString(),
        encode: encode
      }).then(function (response) {
        polygon.id = response.data.data.id;
        self.drawingManager.setDrawingMode(null);
      });
    },
    updatePolygon: function updatePolygon(polygon) {
      var encode = google.maps.geometry.encoding.encodePath(polygon.getPath());
      axios.post('/coverages/' + polygon.id, {
        polygon: polygon.getPath().getArray().toString(),
        encode: encode
      }).then(function (response) {
        console.log("Poligono actualizado");
      });
    },
    destroyPolygon: function destroyPolygon(polygon, t) {
      axios.get('/coverages/destroy/' + polygon.id).then(function (response) {
        t.setMap(null);
      });
    },
    loadPolygons: function loadPolygons(map) {
      var self = this;
      axios.get('/coverages/' + this.store) // $("#sucCobertura").val(),
      .then(function (response) {
        if (response.data.data.length <= 0) {
          return;
        }

        var c = 0;
        response.data.data.forEach(function (polyg) {
          if (c == 0) {
            if (polyg != null) {
              self.drawPolygonWithEvents(polyg);
            }
          } else {
            self.drawPolygon(polyg);
          }

          c = c + 1;
        });
      });
    },
    drawPolygon: function drawPolygon(polyg) {
      this.drawingManager.drawingControl = true;
      this.drawingManager.polygonOptions = {
        editable: false,
        clickable: false
      };
      this.drawingManager.setMap(this.map);
      var decodePath = google.maps.geometry.encoding.decodePath(polyg.encode);
      var polygon = new google.maps.Polygon({
        path: decodePath,
        map: this.map,
        editable: false,
        clickable: false,
        strokeWeight: 0.6,
        strokeColor: '#002266',
        fillColor: '#002266'
      });
      polygon.id = polyg.id;
    },
    drawPolygonWithEvents: function drawPolygonWithEvents(polyg) {
      var decodePath = google.maps.geometry.encoding.decodePath(polyg.encode);
      var polygon = new google.maps.Polygon({
        path: decodePath,
        map: this.map,
        editable: true,
        strokeWeight: 0.8,
        strokeColor: '#992200',
        fillColor: '#e00'
      });
      polygon.id = polyg.id;
      this.map.setCenter(decodePath[0]);
      this.setPolygonEvents(polygon);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Coverages.vue?vue&type=template&id=7733448f&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Coverages.vue?vue&type=template&id=7733448f& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-container", [
    _c("div", { staticClass: "container-fluid spark-screen" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-12 col-sm6" }, [
          _c("div", { staticClass: "box box-primary collapsed-box" }, [
            _c("div", { staticClass: "box-header with-border" }, [
              _c("h3", { staticClass: "box-title" }, [
                _vm._v("Nueva cobertura de entrega")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "box-tools pull-right" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-box-tool",
                    attrs: {
                      type: "button",
                      "data-widget": "collapse",
                      "data-toggle": "tooltip",
                      title: "Abrir"
                    }
                  },
                  [_c("i", { staticClass: "fa fa-plus" })]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "box-body" }, [
              _c(
                "div",
                { staticClass: "form-group" },
                [
                  _c("label", [_vm._v("Sucursal")]),
                  _vm._v(" "),
                  _c("v-select", {
                    attrs: {
                      items: _vm.stores,
                      "item-text": "name",
                      "item-value": "id",
                      filled: "",
                      chips: "",
                      label: "Tienda",
                      placeholder: "Selecciona sucursal"
                    },
                    on: { change: _vm.initMap },
                    model: {
                      value: _vm.store,
                      callback: function($$v) {
                        _vm.store = $$v
                      },
                      expression: "store"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("div", {
                staticStyle: { height: "500px" },
                attrs: { id: "map" }
              })
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/views/Coverages.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/views/Coverages.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Coverages_vue_vue_type_template_id_7733448f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coverages.vue?vue&type=template&id=7733448f& */ "./resources/js/components/views/Coverages.vue?vue&type=template&id=7733448f&");
/* harmony import */ var _Coverages_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Coverages.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Coverages.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Coverages_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Coverages_vue_vue_type_template_id_7733448f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Coverages_vue_vue_type_template_id_7733448f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Coverages.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Coverages.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/views/Coverages.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Coverages_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Coverages.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Coverages.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Coverages_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Coverages.vue?vue&type=template&id=7733448f&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/views/Coverages.vue?vue&type=template&id=7733448f& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Coverages_vue_vue_type_template_id_7733448f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Coverages.vue?vue&type=template&id=7733448f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Coverages.vue?vue&type=template&id=7733448f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Coverages_vue_vue_type_template_id_7733448f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Coverages_vue_vue_type_template_id_7733448f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);