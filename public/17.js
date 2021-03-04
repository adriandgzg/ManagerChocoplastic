(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Inventory.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Inventory.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var crip_vue_notice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crip-vue-notice */ "./node_modules/crip-vue-notice/lib/crip-vue-notice.js");
/* harmony import */ var crip_vue_notice__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crip_vue_notice__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        value: 'prod_identifier',
        width: '10%'
      }, {
        text: 'Producto',
        value: 'prod_name'
      }, {
        text: 'Unidad Medida Salida',
        value: 'meas_name'
      }, {
        text: 'Categoria',
        value: 'prca_name'
      }, {
        text: 'Sucursal',
        value: 'stor_name'
      }, {
        text: 'Stock',
        value: 'prin_stock'
      }
      /*,
      {
          text: 'Pedido',
          value: 'stock_order'
      },
      {
          text: 'Stock App',
          value: 'prin_stock' - 'stock_order'
      }*/
      ],
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
      menu1: false,
      stores: [],
      SelectSucursal: "",
      enabledStore: false,
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
    this.getStores();
    this.getUsers();
  },
  methods: {
    getStores: function getStores() {
      var _this = this;

      axios.get("/storeget").then(function (response) {
        _this.stores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getUsers: function getUsers() {
      var _this2 = this;

      axios.get('/listUser').then(function (response) {
        _this2.users = response.data.data;

        if (_this2.users.store_id > 0) {
          _this2.enabledStore = true;
          _this2.SelectSucursal = _this2.stores.find(function (item) {
            return item.stor_pk == _this2.users.store_id;
          });
        } else _this2.enabledStore = false;
      })["catch"](function (e) {
        _this2.errors.push(e);
      });
    },
    getSales: function getSales() {
      var _this3 = this;

      this.loading = true;
      axios.get("/product/inventories").then(function (response) {
        setTimeout(function () {
          return _this3.loading = false;
        }, 500);

        if (response.data.data != null) {
          _this3.sales = response.data.data;
        } else {
          _this3.normal('Notificación', response.data.status.message, "error");

          console.log('Detalle: ' + response.data.status.technicaldetail);
        }
      })["catch"](function (e) {
        console.log('Detalle: ' + response.data.status.technicaldetail);

        _this3.normal('Notificación', "Error al cargar los datos", "error");
      });
    },
    getInventarioSucursal: function getInventarioSucursal() {
      var _this4 = this;

      /*axios
          .get("/shipments/show/transactionsnotify?date=" + this.starttime)
          .then(response => {
              console.log(response.data.data);
              this.stores = response.data.data;
            })
          .catch(e => {
              this.errors.push(e);
          });
      */
      console.log(this.SelectSucursal.stor_pk);

      if (this.SelectSucursal == "") {
        this.normal('Sucursal', "Seleccionar Sucursal", "warning");
        return false;
      }

      this.loading = true;
      axios.get("/product/inventories/" + this.SelectSucursal.stor_pk).then(function (response) {
        setTimeout(function () {
          return _this4.loading = false;
        }, 500);

        if (response.data.data != null) {
          _this4.sales = response.data.data;
        } else {
          _this4.normal('Notificación', response.data.status.message, "error");

          console.log('Detalle: ' + response.data.status.technicaldetail);
        }
      })["catch"](function (e) {
        console.log('Detalle: ' + response.data.status.technicaldetail);

        _this4.normal('Notificación', "Error al cargar los datos", "error");
      });
    },
    normal: function normal(Title, Description, Type) {
      this.notice = new crip_vue_notice__WEBPACK_IMPORTED_MODULE_0___default.a({
        title: Title,
        description: Description,
        className: "open-normal",
        closable: true,
        duration: 3,
        type: Type
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Inventory.vue?vue&type=template&id=28edc5e0&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Inventory.vue?vue&type=template&id=28edc5e0& ***!
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
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-card-text",
                                  [
                                    _c(
                                      "v-row",
                                      [
                                        _c(
                                          "v-col",
                                          { attrs: { cols: "6" } },
                                          [
                                            _c("v-combobox", {
                                              attrs: {
                                                required: "",
                                                items: _vm.stores,
                                                label: "Sucursal",
                                                disabled: _vm.enabledStore,
                                                "item-text": "stor_name",
                                                "item-value": "stor_pk",
                                                filled: "",
                                                chips: "",
                                                placeholder:
                                                  "Seleccionar una sucursal"
                                              },
                                              model: {
                                                value: _vm.SelectSucursal,
                                                callback: function($$v) {
                                                  _vm.SelectSucursal = $$v
                                                },
                                                expression: "SelectSucursal"
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-col",
                                          { attrs: { cols: "4", sm: "4" } },
                                          [
                                            _c(
                                              "v-btn",
                                              {
                                                staticClass: "mr-4",
                                                attrs: { color: "success" },
                                                on: {
                                                  click:
                                                    _vm.getInventarioSucursal
                                                }
                                              },
                                              [_vm._v("Buscar")]
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
                              ]
                            },
                            proxy: true
                          },
                          {
                            key: "item",
                            fn: function(props) {
                              return [
                                _c("tr", [
                                  _c(
                                    "td",
                                    {
                                      staticStyle: {
                                        "font-size": "18px !important",
                                        "font-weight": "600 !important"
                                      }
                                    },
                                    [_vm._v(_vm._s(props.item.prod_identifier))]
                                  ),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(props.item.prod_name))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(props.item.meas_name))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(props.item.prca_name))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(props.item.stor_name))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(props.item.prin_stock))
                                  ])
                                ])
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

/***/ "./resources/js/components/views/Inventory.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/views/Inventory.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Inventory_vue_vue_type_template_id_28edc5e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Inventory.vue?vue&type=template&id=28edc5e0& */ "./resources/js/components/views/Inventory.vue?vue&type=template&id=28edc5e0&");
/* harmony import */ var _Inventory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Inventory.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Inventory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Inventory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Inventory_vue_vue_type_template_id_28edc5e0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Inventory_vue_vue_type_template_id_28edc5e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Inventory.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Inventory.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/views/Inventory.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Inventory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Inventory.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Inventory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Inventory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Inventory.vue?vue&type=template&id=28edc5e0&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/views/Inventory.vue?vue&type=template&id=28edc5e0& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Inventory_vue_vue_type_template_id_28edc5e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Inventory.vue?vue&type=template&id=28edc5e0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Inventory.vue?vue&type=template&id=28edc5e0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Inventory_vue_vue_type_template_id_28edc5e0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Inventory_vue_vue_type_template_id_28edc5e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);