(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PointOfSale.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/PointOfSale.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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
      dialog: false,
      desserts: [{
        id: 1000,
        name: 'Frozen Yogurt',
        um: 'CI',
        cantidad: 13,
        precio: '100.00',
        importe: '1,300.00'
      }, {
        id: 1001,
        name: 'Ice cream sandwich',
        um: 'CI',
        cantidad: 13,
        precio: '100.00',
        importe: '1,300.00'
      }, {
        id: 1002,
        name: 'Eclair',
        um: 'CI',
        cantidad: 13,
        precio: '100.00',
        importe: '1,300.00'
      }]
    };
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PointOfSale.vue?vue&type=template&id=097a461c&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/PointOfSale.vue?vue&type=template&id=097a461c& ***!
  \********************************************************************************************************************************************************************************************************************/
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
  return _c(
    "v-container",
    [
      _c(
        "v-row",
        [
          _c(
            "v-col",
            [
              _c(
                "v-card",
                [
                  _c(
                    "v-card-title",
                    { staticClass: "subheading font-weight-bold" },
                    [_vm._v("No. Pedido: 10000003251")]
                  ),
                  _vm._v(" "),
                  _c("v-divider"),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    { staticClass: "category d-inline-flex font-weight-light" },
                    [
                      _c(
                        "span",
                        { staticClass: "subheading font-weight-bold" },
                        [_vm._v("Nombre")]
                      ),
                      _vm._v("  Juan Pérez López\r\n                ")
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    { staticClass: "category d-inline-flex font-weight-light" },
                    [
                      _c(
                        "span",
                        { staticClass: "subheading font-weight-bold" },
                        [_vm._v("Vendedor")]
                      ),
                      _vm._v("  Carlos Jiménez Martinez\r\n                ")
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    { staticClass: "category d-inline-flex font-weight-light" },
                    [
                      _c(
                        "span",
                        { staticClass: "subheading font-weight-bold" },
                        [_vm._v("Fecha")]
                      ),
                      _vm._v("  10/10/2020\r\n                ")
                    ]
                  ),
                  _vm._v(" "),
                  _c("br")
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card",
                { attrs: { justify: "end" } },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { dark: "", color: "danger" },
                      on: {
                        click: function($event) {
                          _vm.dialog = !_vm.dialog
                        }
                      }
                    },
                    [_vm._v("CANCELAR PEDIDO")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { dark: "", color: "warning" },
                      on: {
                        click: function($event) {
                          _vm.dialog = !_vm.dialog
                        }
                      }
                    },
                    [_vm._v("CREDITO")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { dark: "", color: "success" },
                      on: {
                        click: function($event) {
                          _vm.dialog = !_vm.dialog
                        }
                      }
                    },
                    [_vm._v("CONTADO")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-row",
        [
          _c(
            "v-col",
            [
              _c(
                "v-card",
                [
                  _c("v-simple-table", {
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function() {
                          return [
                            _c("thead", [
                              _c("tr", [
                                _c("th", { staticClass: "text-left" }, [
                                  _vm._v("ID")
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-left" }, [
                                  _vm._v("Producto")
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-left" }, [
                                  _vm._v("Unidad de medida")
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-left" }, [
                                  _vm._v("Cantidad")
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-left" }, [
                                  _vm._v("Precio de venta")
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-left" }, [
                                  _vm._v("Importe")
                                ]),
                                _vm._v(" "),
                                _c("th"),
                                _vm._v(" "),
                                _c("th")
                              ])
                            ]),
                            _vm._v(" "),
                            _c(
                              "tbody",
                              [
                                _vm._l(_vm.desserts, function(item) {
                                  return _c("tr", { key: item.name }, [
                                    _c("td", [_vm._v(_vm._s(item.id))]),
                                    _vm._v(" "),
                                    _c("td", [_vm._v(_vm._s(item.name))]),
                                    _vm._v(" "),
                                    _c("td", [_vm._v(_vm._s(item.um))]),
                                    _vm._v(" "),
                                    _c("td", [_vm._v(_vm._s(item.cantidad))]),
                                    _vm._v(" "),
                                    _c("td", [_vm._v(_vm._s(item.precio))]),
                                    _vm._v(" "),
                                    _c("td", [_vm._v(_vm._s(item.importe))]),
                                    _vm._v(" "),
                                    _c(
                                      "td",
                                      [
                                        _c(
                                          "v-icon",
                                          {
                                            staticClass: "mr-2",
                                            attrs: { small: "" }
                                          },
                                          [_vm._v("mdi-pencil")]
                                        ),
                                        _vm._v(" "),
                                        _c("v-icon", { attrs: { small: "" } }, [
                                          _vm._v("mdi-delete")
                                        ])
                                      ],
                                      1
                                    )
                                  ])
                                }),
                                _vm._v(" "),
                                _c("tr", [
                                  _c("td"),
                                  _vm._v(" "),
                                  _c("td"),
                                  _vm._v(" "),
                                  _c("td"),
                                  _vm._v(" "),
                                  _c("td"),
                                  _vm._v(" "),
                                  _c("td", [_vm._v(" Subtotal")]),
                                  _vm._v(" "),
                                  _c("td", [_vm._v("$950.00")]),
                                  _vm._v(" "),
                                  _c("td")
                                ]),
                                _vm._v(" "),
                                _c("tr", [
                                  _c("td"),
                                  _vm._v(" "),
                                  _c("td"),
                                  _vm._v(" "),
                                  _c("td"),
                                  _vm._v(" "),
                                  _c("td"),
                                  _vm._v(" "),
                                  _c("td", [_vm._v(" Envio")]),
                                  _vm._v(" "),
                                  _c("td", [_vm._v("$50.00")]),
                                  _vm._v(" "),
                                  _c("td")
                                ])
                              ],
                              2
                            ),
                            _vm._v(" "),
                            _c("tfoot", [
                              _c("tr", [
                                _c("td"),
                                _vm._v(" "),
                                _c("td"),
                                _vm._v(" "),
                                _c("td"),
                                _vm._v(" "),
                                _c("td"),
                                _vm._v(" "),
                                _c("td", [_vm._v(" Total a Pagar")]),
                                _vm._v(" "),
                                _c("td", [_vm._v("$1,000.00")])
                              ])
                            ])
                          ]
                        },
                        proxy: true
                      }
                    ])
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "500" },
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _c(
            "v-card",
            [
              _c("v-card-title", [
                _vm._v(
                  "\r\n                    Motivo de cancelación\r\n                "
                )
              ]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c("v-select", {
                    attrs: {
                      flat: "",
                      "hide-details": "",
                      small: "",
                      clearable: "",
                      "item-text": "name",
                      "item-value": "id",
                      label: "Seleccione una opción"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      on: {
                        click: function($event) {
                          _vm.dialog = !_vm.dialog
                        }
                      }
                    },
                    [_vm._v("Cancelar")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "primary" },
                      on: {
                        click: function($event) {
                          _vm.dialog = !_vm.dialog
                        }
                      }
                    },
                    [_vm._v("Confirmar")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/views/PointOfSale.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/views/PointOfSale.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PointOfSale_vue_vue_type_template_id_097a461c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PointOfSale.vue?vue&type=template&id=097a461c& */ "./resources/js/components/views/PointOfSale.vue?vue&type=template&id=097a461c&");
/* harmony import */ var _PointOfSale_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PointOfSale.vue?vue&type=script&lang=js& */ "./resources/js/components/views/PointOfSale.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PointOfSale_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PointOfSale_vue_vue_type_template_id_097a461c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PointOfSale_vue_vue_type_template_id_097a461c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/PointOfSale.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/PointOfSale.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/views/PointOfSale.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PointOfSale_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PointOfSale.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PointOfSale.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PointOfSale_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/PointOfSale.vue?vue&type=template&id=097a461c&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/views/PointOfSale.vue?vue&type=template&id=097a461c& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PointOfSale_vue_vue_type_template_id_097a461c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PointOfSale.vue?vue&type=template&id=097a461c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PointOfSale.vue?vue&type=template&id=097a461c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PointOfSale_vue_vue_type_template_id_097a461c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PointOfSale_vue_vue_type_template_id_097a461c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);