(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[41],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      menu1: false,
      menu2: false,
      textMsg: "",
      alert: false,
      valid: false,
      enabledStore: false,
      start_date: "",
      end_date: "",
      select_stores: 0,
      stores: []
    };
  },
  created: function created() {
    this.getStores();
    this.getUsers();
  },
  methods: {
    getUsers: function getUsers() {
      var _this = this;

      axios.get("/listUser").then(function (response) {
        _this.users = response.data.data;
      })["catch"](function (e) {
        _this.errors.push(e);
      });
    },
    getFilterClear: function getFilterClear() {
      this.start_date = "";
      this.end_date = "";
    },
    getStores: function getStores() {
      var _this2 = this;

      axios.get("/storeget").then(function (response) {
        _this2.stores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    GenerarReporte: function GenerarReporte() {
      axios;

      if (this.select_stores == 0) {
        this.select_stores = "";
      }

      if (this.start_date != "" && this.end_date == "") {
        this.alert = true;
        this.textMsg = "Seleccionar Fecha Fin";
        return;
      }

      if (this.end_date != "" && this.start_date == "") {
        this.alert = true;
        this.textMsg = "Seleccionar Fecha Inicio";
        return;
      }

      window.open("http://3.217.161.164:777/?pRep=11&pStor_PK=" + this.select_stores + "&pDateStart=" + this.start_date + "&pDateEnd=" + this.end_date + "&pUser_PK=" + this.users.id, "_blank");
    },
    hide_alert: function hide_alert(event) {
      var _this3 = this;

      console.log("Hide"); // `event` is the native DOM event

      window.setInterval(function () {
        _this3.alert = false;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=template&id=315e42e8&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=template&id=315e42e8& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
                        { attrs: { cols: "12" } },
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
                        { attrs: { cols: "12", lg: "6" } },
                        [
                          _c(
                            "v-menu",
                            {
                              attrs: {
                                "close-on-content-click": false,
                                "nudge-right": 40,
                                transition: "scale-transition",
                                "offset-y": "",
                                "min-width": "290px"
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "activator",
                                  fn: function(ref) {
                                    var on = ref.on
                                    return [
                                      _c(
                                        "v-text-field",
                                        _vm._g(
                                          {
                                            attrs: {
                                              label: "Fecha Inicio",
                                              "prepend-icon": "event",
                                              readonly: ""
                                            },
                                            model: {
                                              value: _vm.start_date,
                                              callback: function($$v) {
                                                _vm.start_date = $$v
                                              },
                                              expression: "start_date"
                                            }
                                          },
                                          on
                                        )
                                      )
                                    ]
                                  }
                                }
                              ]),
                              model: {
                                value: _vm.menu2,
                                callback: function($$v) {
                                  _vm.menu2 = $$v
                                },
                                expression: "menu2"
                              }
                            },
                            [
                              _vm._v(" "),
                              _c("v-date-picker", {
                                on: {
                                  input: function($event) {
                                    _vm.menu2 = false
                                  }
                                },
                                model: {
                                  value: _vm.start_date,
                                  callback: function($$v) {
                                    _vm.start_date = $$v
                                  },
                                  expression: "start_date"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", lg: "6" } },
                        [
                          _c(
                            "v-menu",
                            {
                              attrs: {
                                "close-on-content-click": false,
                                "nudge-right": 40,
                                transition: "scale-transition",
                                "offset-y": "",
                                "min-width": "290px"
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "activator",
                                  fn: function(ref) {
                                    var on = ref.on
                                    return [
                                      _c(
                                        "v-text-field",
                                        _vm._g(
                                          {
                                            attrs: {
                                              label: "Fecha Fin",
                                              "prepend-icon": "event",
                                              readonly: ""
                                            },
                                            model: {
                                              value: _vm.end_date,
                                              callback: function($$v) {
                                                _vm.end_date = $$v
                                              },
                                              expression: "end_date"
                                            }
                                          },
                                          on
                                        )
                                      )
                                    ]
                                  }
                                }
                              ]),
                              model: {
                                value: _vm.menu1,
                                callback: function($$v) {
                                  _vm.menu1 = $$v
                                },
                                expression: "menu1"
                              }
                            },
                            [
                              _vm._v(" "),
                              _c("v-date-picker", {
                                attrs: { min: _vm.start_date },
                                on: {
                                  input: function($event) {
                                    _vm.menu1 = false
                                  }
                                },
                                model: {
                                  value: _vm.end_date,
                                  callback: function($$v) {
                                    _vm.end_date = $$v
                                  },
                                  expression: "end_date"
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
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "mr-4",
                      attrs: { color: "blue" },
                      on: { click: _vm.getFilterClear }
                    },
                    [_vm._v("Limpiar")]
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

/***/ "./resources/js/components/views/ReportClientReturnDetail.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/views/ReportClientReturnDetail.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReportClientReturnDetail_vue_vue_type_template_id_315e42e8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReportClientReturnDetail.vue?vue&type=template&id=315e42e8& */ "./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=template&id=315e42e8&");
/* harmony import */ var _ReportClientReturnDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReportClientReturnDetail.vue?vue&type=script&lang=js& */ "./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReportClientReturnDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReportClientReturnDetail_vue_vue_type_template_id_315e42e8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ReportClientReturnDetail_vue_vue_type_template_id_315e42e8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/ReportClientReturnDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportClientReturnDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReportClientReturnDetail.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportClientReturnDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=template&id=315e42e8&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=template&id=315e42e8& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportClientReturnDetail_vue_vue_type_template_id_315e42e8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReportClientReturnDetail.vue?vue&type=template&id=315e42e8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportClientReturnDetail.vue?vue&type=template&id=315e42e8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportClientReturnDetail_vue_vue_type_template_id_315e42e8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportClientReturnDetail_vue_vue_type_template_id_315e42e8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);