(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[54],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/SalesDay.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/SalesDay.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var crip_vue_notice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crip-vue-notice */ "./node_modules/crip-vue-notice/lib/crip-vue-notice.js");
/* harmony import */ var crip_vue_notice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crip_vue_notice__WEBPACK_IMPORTED_MODULE_1__);
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
        text: "Venta",
        value: "clsa_identifier",
        width: "10%"
      }, {
        text: "Pedido",
        value: "clor_identifier",
        width: "10%"
      }, {
        text: "Cliente",
        value: "clie_name"
      }, {
        text: "Sucursal",
        value: "stor_name"
      }, {
        text: "Método Pago",
        value: "pame_name"
      }, {
        text: "Fecha",
        value: "created_at"
      }, {
        text: "Estatus",
        value: "status"
      }, {
        text: "",
        value: "action",
        width: "20%"
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
      boxEnabled: false,
      folioRules: [function (value) {
        return !!value || "Requerido.";
      }, function (value) {
        return value && value.length >= 10 || "Min 10 caracter";
      }],
      nameRules: [function (value) {
        return !!value || "Requerido.";
      }, function (value) {
        return value && value.length >= 3 || "Min 3 caracteres";
      }],
      phoneRules: [function (value) {
        return !!value || "Requerido.";
      }, function (value) {
        return value && value.length == 10 || "Requiere 10 caracteres";
      }],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: ""
    };
  },
  created: function created() {
    this.getSales();
    this.obtenerCaja();
  },
  methods: {
    obtenerCaja: function obtenerCaja() {
      var _this = this;

      axios.get("/boxcut").then(function (response) {
        if (response.data.data == null) {
          _this.boxEnabled = true;
        } else {
          _this.boxEnabled = false;
        }

        console.log("boxEnabled -->" + _this.boxEnabled);
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getSales: function getSales() {
      var _this2 = this;

      this.loading = true;
      axios.get("/clientsales").then(function (response) {
        setTimeout(function () {
          return _this2.loading = false;
        }, 500);

        if (response.data.data != null) {
          //console.log(response.data.data)
          _this2.sales = response.data.data;
        } else {
          _this2.normal("Notificación", response.data.status.message, "error");
        }
      })["catch"](function (e) {
        console.log(e);

        _this2.normal("Notificación", "Error al cargar los datos", "error");
      });
    },
    printTicket: function printTicket(url) {
      var newWin = window.open(url, "Imprimir orden", "height=400,width=600");
      setTimeout(function () {
        newWin.print();
      }, 1000);
      setTimeout(function () {
        newWin.close();
      }, 50000);
      return true;
    },
    normal: function normal(Title, Description, Type) {
      this.notice = new crip_vue_notice__WEBPACK_IMPORTED_MODULE_1___default.a({
        title: Title,
        description: Description,
        className: "open-normal",
        closable: true,
        duration: 3,
        type: Type
      });
    }
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("auth", ["can"]))
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/SalesDay.vue?vue&type=template&id=48e39c1c&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/SalesDay.vue?vue&type=template&id=48e39c1c& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
            "v-alert",
            {
              attrs: { type: "warning" },
              model: {
                value: _vm.boxEnabled,
                callback: function($$v) {
                  _vm.boxEnabled = $$v
                },
                expression: "boxEnabled"
              }
            },
            [
              _vm._v(
                "\n      Para realizar una venta, primero debe abrir caja.\n    "
              )
            ]
          ),
          _vm._v(" "),
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
                      _vm._v("\n          Cargando\n          "),
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
              _vm._v("\n      " + _vm._s(_vm.textMsg) + "\n      "),
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
                [_vm._v(" Cerrar ")]
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
                          "sort-by": ["created_at"],
                          "sort-desc": [true]
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
                                _c(
                                  "v-toolbar",
                                  { attrs: { flat: "", color: "indigo" } },
                                  [
                                    _c("v-divider", {
                                      staticClass: "mx-4",
                                      attrs: { inset: "", vertical: "" }
                                    }),
                                    _vm._v(" "),
                                    _c("v-spacer")
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12", sm: "12" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        autofocus: "",
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
                                item.clsa_status == "Pendiente"
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "gray", dark: "" } },
                                      [
                                        _vm._v(
                                          "\n                " +
                                            _vm._s(item.clsa_status) +
                                            "\n              "
                                        )
                                      ]
                                    )
                                  : _c(
                                      "v-chip",
                                      { attrs: { color: "green", dark: "" } },
                                      [_vm._v(_vm._s(item.clsa_status))]
                                    )
                              ]
                            }
                          },
                          {
                            key: "item.action",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                item.clsa_status != "Pendiente" &&
                                item.cantreturn == 0 &&
                                _vm.can("clientreturn")
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
                                            "/clientsreturn/" + item.clsa_pk,
                                          title: "Devolución"
                                        }
                                      },
                                      [
                                        _c("v-icon", { attrs: { dark: "" } }, [
                                          _vm._v("mdi-arrow-left-bold-circle")
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
                                      title: "Detalle de venta",
                                      href: "/salesdetail/" + item.clsa_pk
                                    }
                                  },
                                  [
                                    _c("v-icon", { attrs: { dark: "" } }, [
                                      _vm._v("mdi-eye")
                                    ])
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                item.clsa_status != "Pendiente"
                                  ? _c(
                                      "v-btn",
                                      {
                                        staticClass: "mr-2",
                                        attrs: {
                                          fab: "",
                                          dark: "",
                                          small: "",
                                          color: "orange",
                                          title: "Imprimir ticket"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.printTicket(
                                              "/client/sales/printOrder/" +
                                                item.clsa_pk
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c("v-icon", { attrs: { dark: "" } }, [
                                          _vm._v("mdi-printer")
                                        ])
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                item.clsa_status == "Pendiente" &&
                                _vm.boxEnabled != true
                                  ? _c(
                                      "v-btn",
                                      {
                                        staticClass: "mr-2",
                                        attrs: {
                                          fab: "",
                                          dark: "",
                                          small: "",
                                          color: "cyan",
                                          title: "Continuar venta",
                                          href: "/detaiorder/" + item.clor_pk
                                        }
                                      },
                                      [
                                        _c("v-icon", { attrs: { dark: "" } }, [
                                          _vm._v("mdi-cash-register")
                                        ])
                                      ],
                                      1
                                    )
                                  : _vm._e()
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

/***/ "./resources/js/components/views/SalesDay.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/views/SalesDay.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SalesDay_vue_vue_type_template_id_48e39c1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SalesDay.vue?vue&type=template&id=48e39c1c& */ "./resources/js/components/views/SalesDay.vue?vue&type=template&id=48e39c1c&");
/* harmony import */ var _SalesDay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SalesDay.vue?vue&type=script&lang=js& */ "./resources/js/components/views/SalesDay.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SalesDay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SalesDay_vue_vue_type_template_id_48e39c1c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SalesDay_vue_vue_type_template_id_48e39c1c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/SalesDay.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/SalesDay.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/views/SalesDay.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesDay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./SalesDay.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/SalesDay.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesDay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/SalesDay.vue?vue&type=template&id=48e39c1c&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/views/SalesDay.vue?vue&type=template&id=48e39c1c& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesDay_vue_vue_type_template_id_48e39c1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./SalesDay.vue?vue&type=template&id=48e39c1c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/SalesDay.vue?vue&type=template&id=48e39c1c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesDay_vue_vue_type_template_id_48e39c1c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesDay_vue_vue_type_template_id_48e39c1c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);