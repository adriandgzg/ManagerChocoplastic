(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportInventoryStore.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/ReportInventoryStore.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
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
//
//
//
//
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
      enabledStore: false,
      menu1: false,
      menu2: false,
      textMsg: "",
      alert: false,
      valid: false,
      select_stores: 0,
      select_products: '',
      start_date: "",
      end_date: "",
      stores: [],
      products: []
    };
  },
  created: function created() {
    this.getStores();
    this.getUsers();
    this.getProducts();
  },
  methods: {
    getUsers: function getUsers() {
      var _this = this;

      axios.get("/listUser").then(function (response) {
        _this.users = response.data.data;

        if (_this.users.store_id > 0) {
          _this.enabledStore = true;
          _this.select_stores = _this.users.store_id;
        } else _this.enabledStore = false;
      })["catch"](function (e) {
        _this.errors.push(e);
      });
    },
    getStores: function getStores() {
      var _this2 = this;

      axios.get("/storeget").then(function (response) {
        _this2.stores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getProducts: function getProducts() {
      var _this3 = this;

      axios.get("/productList").then(function (response) {
        _this3.products = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    GenerarReporte: function GenerarReporte() {
      axios;

      if (this.select_stores == 0) {
        this.alert = true;
        this.textMsg = "Seleccionar Sucursal";
        return;
      }

      if (this.select_products.prod_pk === undefined) {
        var vprod_pk = '';
      } else {
        var vprod_pk = this.select_products.prod_pk;
      }

      window.open("http://3.217.161.164:777/?pRep=2&pProd_PK=" + //"http://localhost:12345/?pRep=2&pProd_PK=" +
      vprod_pk + "&pStor_PK=" + this.select_stores + "&pUser_PK=" + this.users.id, "_blank");
    },
    hide_alert: function hide_alert(event) {
      var _this4 = this;

      console.log("Hide"); // `event` is the native DOM event

      window.setInterval(function () {
        _this4.alert = false;
      }, 7000);
    }
  },
  mounted: function mounted() {
    if (alert) {
      this.hide_alert();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportInventoryStore.vue?vue&type=template&id=808a4c36&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/ReportInventoryStore.vue?vue&type=template&id=808a4c36& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
        "v-alert",
        {
          attrs: {
            dismissible: "",
            transition: "fade-transition",
            type: "info",
            timeout: "5000"
          },
          model: {
            value: _vm.alert,
            callback: function($$v) {
              _vm.alert = $$v
            },
            expression: "alert"
          }
        },
        [_vm._v(_vm._s(_vm.textMsg))]
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
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        [
                          _c(
                            "v-form",
                            {
                              ref: "form",
                              model: {
                                value: _vm.valid,
                                callback: function($$v) {
                                  _vm.valid = $$v
                                },
                                expression: "valid"
                              }
                            },
                            [
                              _c(
                                "v-card-text",
                                {
                                  staticClass:
                                    "category d-inline-flex font-weight-light"
                                },
                                [
                                  _c("v-select", {
                                    attrs: {
                                      items: _vm.stores,
                                      "item-text": "stor_name",
                                      "item-value": "stor_pk",
                                      filled: "",
                                      chips: "",
                                      label: "Sucursal",
                                      placeholder: "Selecciona Sucursal",
                                      disabled: _vm.enabledStore
                                    },
                                    model: {
                                      value: _vm.select_stores,
                                      callback: function($$v) {
                                        _vm.select_stores = $$v
                                      },
                                      expression: "select_stores"
                                    }
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
                  ),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        [
                          _c(
                            "v-form",
                            {
                              ref: "form",
                              model: {
                                value: _vm.valid,
                                callback: function($$v) {
                                  _vm.valid = $$v
                                },
                                expression: "valid"
                              }
                            },
                            [
                              _c(
                                "v-card-text",
                                {
                                  staticClass:
                                    "category d-inline-flex font-weight-light"
                                },
                                [
                                  _c("v-combobox", {
                                    attrs: {
                                      items: _vm.products,
                                      "item-text": "prod_name_identifier",
                                      "item-value": "prod_identifier",
                                      filled: "",
                                      chips: "",
                                      label: "Producto",
                                      placeholder: "Seleccionar Producto"
                                    },
                                    model: {
                                      value: _vm.select_products,
                                      callback: function($$v) {
                                        _vm.select_products = $$v
                                      },
                                      expression: "select_products"
                                    }
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
              ),
              _vm._v(" "),
              _c(
                "v-card",
                { attrs: { justify: "end" } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "mr-4",
                      attrs: { color: "success", disabled: !_vm.valid },
                      on: { click: _vm.GenerarReporte }
                    },
                    [_vm._v("Generar")]
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

/***/ "./resources/js/components/views/ReportInventoryStore.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/views/ReportInventoryStore.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReportInventoryStore_vue_vue_type_template_id_808a4c36___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReportInventoryStore.vue?vue&type=template&id=808a4c36& */ "./resources/js/components/views/ReportInventoryStore.vue?vue&type=template&id=808a4c36&");
/* harmony import */ var _ReportInventoryStore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReportInventoryStore.vue?vue&type=script&lang=js& */ "./resources/js/components/views/ReportInventoryStore.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReportInventoryStore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReportInventoryStore_vue_vue_type_template_id_808a4c36___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ReportInventoryStore_vue_vue_type_template_id_808a4c36___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/ReportInventoryStore.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/ReportInventoryStore.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/views/ReportInventoryStore.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportInventoryStore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReportInventoryStore.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportInventoryStore.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportInventoryStore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/ReportInventoryStore.vue?vue&type=template&id=808a4c36&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/views/ReportInventoryStore.vue?vue&type=template&id=808a4c36& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportInventoryStore_vue_vue_type_template_id_808a4c36___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReportInventoryStore.vue?vue&type=template&id=808a4c36& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportInventoryStore.vue?vue&type=template&id=808a4c36&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportInventoryStore_vue_vue_type_template_id_808a4c36___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportInventoryStore_vue_vue_type_template_id_808a4c36___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);