(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/MyTransferList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/MyTransferList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      headers: [{
        text: 'ID',
        value: 'prtr_pk',
        width: '10%'
      }, {
        text: 'Identificador',
        value: 'prtr_identifier',
        width: '10%'
      }, {
        text: 'Sucursal Salida',
        value: 'stor_name_output'
      }, {
        text: 'Sucursal Entrada',
        value: 'stor_name_input'
      }, {
        text: 'Observación',
        value: 'prtr_observation'
      }, {
        text: 'Fecha',
        value: 'created_at'
      }, {
        text: 'Estatus',
        value: 'status'
      }, {
        text: '',
        value: 'action',
        width: '20%'
      }],
      select: 0,
      principal: false,
      estado: true,
      editedIndex: -1,
      sales: [],
      sales0: [],
      search: "",
      dialog: false,
      snackbar: false,
      timeout: 2000,
      idUserStore: 0,
      textMsg: "",
      folioRules: [function (value) {
        return !!value || "Requerido.";
      }, function (value) {
        return value && value.length >= 10 || "Min 10 caracter";
      }],
      nameRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value && value.length >= 3 || 'Min 3 caracteres';
      }],
      phoneRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value && value.length == 10 || 'Requiere 10 caracteres';
      }],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: ''
    };
  },
  created: function created() {
    this.getSales();
  },
  methods: {
    getSales: function getSales() {
      var _this = this;

      this.loading = true;
      axios.get("/product/mytransfers").then(function (response) {
        setTimeout(function () {
          return _this.loading = false;
        }, 500);

        if (response.data.data != null) {
          _this.sales = response.data.data;
          console.log(_this.sales);
        } else {
          _this.normal('Notificación', response.data.status.message, "error");
        }
      })["catch"](function (e) {
        console.log(e);

        _this.normal('Notificación', "Error al cargar los datos", "error");
      });
    }
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('auth', ['can']))
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/MyTransferList.vue?vue&type=template&id=2a466aa1&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/MyTransferList.vue?vue&type=template&id=2a466aa1& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
    "v-app",
    [
      _c(
        "v-container",
        [
          _c(
            "v-dialog",
            {
              attrs: { persistent: "", width: "300" },
              model: {
                value: _vm.loading,
                callback: function($$v) {
                  _vm.loading = $$v
                },
                expression: "loading"
              }
            },
            [
              _c(
                "v-card",
                { attrs: { color: "white" } },
                [
                  _c(
                    "v-card-text",
                    [
                      _vm._v(
                        "\r\n                    Cargando\r\n                    "
                      ),
                      _c("v-progress-linear", {
                        staticClass: "mb-0",
                        attrs: { indeterminate: "", color: "green" }
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
            "v-snackbar",
            {
              attrs: { color: "#000000", timeout: _vm.timeout },
              model: {
                value: _vm.snackbar,
                callback: function($$v) {
                  _vm.snackbar = $$v
                },
                expression: "snackbar"
              }
            },
            [
              _vm._v(
                "\r\n            " + _vm._s(_vm.textMsg) + "\r\n            "
              ),
              _c(
                "v-btn",
                {
                  attrs: { color: "blue", text: "" },
                  on: {
                    click: function($event) {
                      _vm.snackbar = false
                    }
                  }
                },
                [_vm._v("\r\n                Cerrar\r\n            ")]
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
                      _c("v-data-table", {
                        staticClass: "elevation-3",
                        attrs: {
                          headers: _vm.headers,
                          items: _vm.sales,
                          search: _vm.search,
                          "sort-by": "id"
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "top",
                            fn: function() {
                              return [
                                _c("v-system-bar", {
                                  attrs: { color: "indigo darken-2", dark: "" }
                                }),
                                _vm._v(" "),
                                _vm.can("transferdetail")
                                  ? _c(
                                      "v-toolbar",
                                      {
                                        attrs: { flat: "", color: "indigo" },
                                        scopedSlots: _vm._u(
                                          [
                                            {
                                              key: "extension",
                                              fn: function() {
                                                return [
                                                  _c(
                                                    "v-btn",
                                                    {
                                                      attrs: {
                                                        fab: "",
                                                        color: "cyan accent-2",
                                                        bottom: "",
                                                        left: "",
                                                        absolute: "",
                                                        href:
                                                          "/transferdetail/0"
                                                      }
                                                    },
                                                    [
                                                      _c("v-icon", [
                                                        _vm._v("mdi-plus")
                                                      ])
                                                    ],
                                                    1
                                                  )
                                                ]
                                              },
                                              proxy: true
                                            }
                                          ],
                                          null,
                                          false,
                                          3082782267
                                        )
                                      },
                                      [
                                        _vm._v(" "),
                                        _c("v-divider", {
                                          staticClass: "mx-4",
                                          attrs: { inset: "", vertical: "" }
                                        }),
                                        _vm._v(" "),
                                        _c("v-spacer")
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12", sm: "12" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        "append-icon": "search",
                                        label: "Buscar",
                                        "single-line": "",
                                        "hide-details": ""
                                      },
                                      model: {
                                        value: _vm.search,
                                        callback: function($$v) {
                                          _vm.search = $$v
                                        },
                                        expression: "search"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]
                            },
                            proxy: true
                          },
                          {
                            key: "item.status",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                item.prtr_status_description == "Pendiente"
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "gray", dark: "" } },
                                      [
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              item.prtr_status_description
                                            ) +
                                            " "
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                item.prtr_status_description == "Solicitado"
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "orange", dark: "" } },
                                      [
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              item.prtr_status_description
                                            ) +
                                            " "
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                item.prtr_status_description == "Finalizado"
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "green", dark: "" } },
                                      [
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              item.prtr_status_description
                                            ) +
                                            " "
                                        )
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            }
                          },
                          {
                            key: "item.action",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                item.prtr_status_description == "Pendiente"
                                  ? _c(
                                      "v-btn",
                                      {
                                        staticClass: "mr-2",
                                        attrs: {
                                          fab: "",
                                          dark: "",
                                          small: "",
                                          color: "pink",
                                          href:
                                            "/transferdetail/" + item.prtr_pk,
                                          title: "Continuar"
                                        }
                                      },
                                      [
                                        _c("v-icon", { attrs: { dark: "" } }, [
                                          _vm._v("mdi-swap-horizontal")
                                        ])
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    staticClass: "mr-2",
                                    attrs: {
                                      fab: "",
                                      dark: "",
                                      small: "",
                                      color: "purple",
                                      title: "Detalle de Traspaso",
                                      href:
                                        "/transferdetailview/" + item.prtr_pk
                                    }
                                  },
                                  [
                                    _c("v-icon", { attrs: { dark: "" } }, [
                                      _vm._v("mdi-eye")
                                    ])
                                  ],
                                  1
                                )
                              ]
                            }
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

/***/ "./resources/js/components/views/MyTransferList.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/views/MyTransferList.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyTransferList_vue_vue_type_template_id_2a466aa1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyTransferList.vue?vue&type=template&id=2a466aa1& */ "./resources/js/components/views/MyTransferList.vue?vue&type=template&id=2a466aa1&");
/* harmony import */ var _MyTransferList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MyTransferList.vue?vue&type=script&lang=js& */ "./resources/js/components/views/MyTransferList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MyTransferList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MyTransferList_vue_vue_type_template_id_2a466aa1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MyTransferList_vue_vue_type_template_id_2a466aa1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/MyTransferList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/MyTransferList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/views/MyTransferList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyTransferList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./MyTransferList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/MyTransferList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyTransferList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/MyTransferList.vue?vue&type=template&id=2a466aa1&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/views/MyTransferList.vue?vue&type=template&id=2a466aa1& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyTransferList_vue_vue_type_template_id_2a466aa1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./MyTransferList.vue?vue&type=template&id=2a466aa1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/MyTransferList.vue?vue&type=template&id=2a466aa1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyTransferList_vue_vue_type_template_id_2a466aa1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyTransferList_vue_vue_type_template_id_2a466aa1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);