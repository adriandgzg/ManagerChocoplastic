(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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
//
//
//
//
//
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
        text: 'No. ID',
        value: 'prpo_identifier'
      }, {
        text: 'Proveedor',
        value: 'prov_name'
      }, {
        text: 'Sucursal',
        value: 'stor_name'
      }, {
        text: 'Fecha',
        value: 'created_at'
      }, {
        text: '',
        value: 'action',
        width: '20%'
      }],
      select: 0,
      principal: false,
      estado: true,
      editado: {
        clor_pk: 0,
        clor_name: '',
        clor_status: 0
      },
      defaultItem: {
        clor_pk: 0,
        clor_name: '',
        clor_status: 0
      },
      editedIndex: -1,
      sales: [],
      ordenescompra: [],
      entities: [],
      search: "",
      dialog: false,
      snackbar: false,
      timeout: 2000,
      textMsg: "",
      valid: false,
      validProvider: false,
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
      }]
    };
  },
  created: function created() {
    this.getCategories();
  },
  methods: {
    getCategories: function getCategories() {
      var _this = this;

      axios.get("/provider/purchase/orders").then(function (response) {
        console.log(response.data);
        _this.ordenescompra = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    ventas: function ventas(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editado = Object.assign({}, item);
      this.createsale(item.clor_pk);
    },
    createsale: function createsale(id) {
      var _this2 = this;

      axios.post('/clientsales?clor_pk=' + id + '').then(function (response) {
        _this2.sales = response.data;
        console.log(response.data);
      })["catch"](function (e) {
        _this2.errors.push(e);
      });
    },
    borrar: function borrar(item) {
      var index = this.categories.indexOf(item);
      this.editado = Object.assign({}, item);
      var r = confirm("¿Está seguro de borrar el registro?--");

      if (r == true) {
        this["delete"]();
      }
    },
    "delete": function _delete() {
      var _this3 = this;

      axios.post('/provider/purchase/orders/destroy', this.editado).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this3.snackbar = true;
          _this3.textMsg = "¡Eliminado correctamente!";
          alert(_this3.textMsg);

          _this3.getCategories();
        } else {
          alert("Ocurrio un error al eliminar el producto");
        }
      });
    }
  },
  computed: {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro';
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
                "\n                " +
                  _vm._s(_vm.textMsg) +
                  "\n                "
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
                [_vm._v("\n                    Cerrar\n                ")]
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
                          items: _vm.ordenescompra,
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
                            key: "item.action",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                _c(
                                  "v-btn",
                                  {
                                    staticClass: "mr-2",
                                    attrs: {
                                      fab: "",
                                      dark: "",
                                      small: "",
                                      color: "cyan",
                                      href: "/purchaseorder/" + item.prpo_pk
                                    }
                                  },
                                  [
                                    _c("v-icon", { attrs: { dark: "" } }, [
                                      _vm._v("mdi-cash-register")
                                    ])
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    staticClass: "mr-2",
                                    attrs: {
                                      fab: "",
                                      dark: "",
                                      small: "",
                                      color: "error"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.borrar(item)
                                      }
                                    }
                                  },
                                  [
                                    _c("v-icon", { attrs: { dark: "" } }, [
                                      _vm._v("mdi-delete")
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

/***/ "./resources/js/components/views/PurchaseOrdersList.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/views/PurchaseOrdersList.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0& */ "./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0&");
/* harmony import */ var _PurchaseOrdersList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PurchaseOrdersList.vue?vue&type=script&lang=js& */ "./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PurchaseOrdersList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/PurchaseOrdersList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PurchaseOrdersList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PurchaseOrdersList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PurchaseOrdersList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);