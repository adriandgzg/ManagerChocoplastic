(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Dashboard.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Dashboard.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50,
          // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000,
          // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function labelInterpolationFnc(value) {
              return value[0];
            }
          }
        }]]
      },
      headers: [{
        sortable: false,
        text: 'ID',
        value: 'id'
      }, {
        sortable: false,
        text: 'Name',
        value: 'name'
      }, {
        sortable: false,
        text: 'Salary',
        value: 'salary',
        align: 'right'
      }, {
        sortable: false,
        text: 'Country',
        value: 'country',
        align: 'right'
      }, {
        sortable: false,
        text: 'City',
        value: 'city',
        align: 'right'
      }],
      items: [{
        name: 'Dakota Rice',
        country: 'Niger',
        city: 'Oud-Tunrhout',
        salary: '$35,738'
      }, {
        name: 'Minerva Hooper',
        country: 'Curaçao',
        city: 'Sinaai-Waas',
        salary: '$23,738'
      }, {
        name: 'Sage Rodriguez',
        country: 'Netherlands',
        city: 'Overland Park',
        salary: '$56,142'
      }, {
        name: 'Philip Chanley',
        country: 'Korea, South',
        city: 'Gloucester',
        salary: '$38,735'
      }, {
        name: 'Doris Greene',
        country: 'Malawi',
        city: 'Feldkirchen in Kārnten',
        salary: '$63,542'
      }],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    };
  },
  methods: {
    complete: function complete(index) {
      this.list[index] = !this.list[index];
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Dashboard.vue?vue&type=template&id=5a2d3b18&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Dashboard.vue?vue&type=template&id=5a2d3b18& ***!
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
    "v-container",
    { attrs: { "fill-height": "", fluid: "", "grid-list-xl": "" } },
    [
      _c(
        "v-layout",
        { attrs: { wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { md4: "", sm12: "", lg4: "" } },
            [
              _c(
                "v-card",
                [
                  _c(
                    "v-card",
                    { attrs: { color: "info", tile: "" } },
                    [
                      _c("chartist", {
                        attrs: {
                          ratio: "ct-major-second",
                          data: _vm.dailySalesChart.data,
                          options: _vm.dailySalesChart.options,
                          type: "Line"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card",
                    { attrs: { tile: "" } },
                    [
                      _c("v-card-title", [_vm._v("Transacciones por días")]),
                      _vm._v(" "),
                      _c(
                        "v-card-text",
                        {
                          staticClass:
                            "category d-inline-flex font-weight-light"
                        },
                        [
                          _c(
                            "v-icon",
                            { attrs: { color: "green", small: "" } },
                            [_vm._v("\n             mdi-arrow-up\n           ")]
                          ),
                          _vm._v(" "),
                          _c("span", { staticClass: "green--text" }, [
                            _vm._v("55%")
                          ]),
                          _vm._v(
                            " \n           increase in today's sales\n         "
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c(
                            "v-icon",
                            { staticClass: "mr-2", attrs: { small: "" } },
                            [
                              _vm._v(
                                "\n             mdi-clock-outline\n           "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass:
                                "caption grey--text font-weight-light"
                            },
                            [_vm._v("updated 4 minutes ago")]
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
            "v-flex",
            { attrs: { md4: "", sm12: "", lg4: "" } },
            [
              _c(
                "v-card",
                [
                  _c(
                    "v-card",
                    { attrs: { color: "info" } },
                    [
                      _c("chartist", {
                        attrs: {
                          ratio: "ct-major-second",
                          type: "Bar",
                          data: _vm.emailsSubscriptionChart.data,
                          options: _vm.emailsSubscriptionChart.options,
                          "responsive-options":
                            _vm.emailsSubscriptionChart.responsiveOptions
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card",
                    { attrs: { tile: "" } },
                    [
                      _c("v-card-title", [_vm._v("Transacciones por mes")]),
                      _vm._v(" "),
                      _c(
                        "v-card-text",
                        {
                          staticClass:
                            "category d-inline-flex font-weight-light"
                        },
                        [
                          _vm._v(
                            "\n            Resultados de ultima campaña\n          "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c(
                            "v-icon",
                            { staticClass: "mr-2", attrs: { small: "" } },
                            [
                              _vm._v(
                                "\n              mdi-clock-outline\n            "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass:
                                "caption grey--text font-weight-light"
                            },
                            [_vm._v("updated 14 minutes ago")]
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
            "v-flex",
            { attrs: { md4: "", sm12: "", lg4: "" } },
            [
              _c(
                "v-card",
                [
                  _c(
                    "v-card",
                    { attrs: { color: "info" } },
                    [
                      _c("chartist", {
                        attrs: {
                          ratio: "ct-major-second",
                          data: _vm.dataCompletedTasksChart.data,
                          options: _vm.dataCompletedTasksChart.options,
                          type: "Line"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card",
                    { attrs: { tile: "" } },
                    [
                      _c("v-card-title", [_vm._v("Promedio por hora")]),
                      _vm._v(" "),
                      _c(
                        "v-card-text",
                        {
                          staticClass:
                            "category d-inline-flex font-weight-light"
                        },
                        [
                          _vm._v(
                            "\n            Resultados de ultima campaña\n          "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c(
                            "v-icon",
                            { staticClass: "mr-2", attrs: { small: "" } },
                            [
                              _vm._v(
                                "\n              mdi-clock-outline\n            "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass:
                                "caption grey--text font-weight-light"
                            },
                            [_vm._v("updated 14 minutes ago")]
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
            "v-flex",
            { attrs: { sm6: "", xs6: "", md6: "", lg6: "" } },
            [
              _c("v-card", [
                _c(
                  "div",
                  { staticClass: "d-flex flex-no-wrap justify-space-between" },
                  [
                    _c(
                      "div",
                      [
                        _c("v-card-title", { staticClass: "headline" }, [
                          _vm._v("$34,245.00")
                        ]),
                        _vm._v(" "),
                        _c("v-card-subtitle", [_vm._v("Ultimas 24 hrs")])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-icon",
                      {
                        staticClass: "ma-3",
                        attrs: { color: "info", size: "60", tile: "" }
                      },
                      [_vm._v("mdi-currency-usd")]
                    )
                  ],
                  1
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { sm6: "", xs6: "", md6: "", lg6: "" } },
            [
              _c("v-card", [
                _c(
                  "div",
                  { staticClass: "d-flex flex-no-wrap justify-space-between" },
                  [
                    _c(
                      "div",
                      [
                        _c("v-card-title", { staticClass: "headline" }, [
                          _vm._v("$1,325.00")
                        ]),
                        _vm._v(" "),
                        _c("v-card-subtitle", [
                          _vm._v("Transacciones canceladas")
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-icon",
                      {
                        staticClass: "ma-3",
                        attrs: { color: "info", size: "60", tile: "" }
                      },
                      [_vm._v("mdi-cancel")]
                    )
                  ],
                  1
                )
              ])
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

/***/ "./resources/js/components/views/Dashboard.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/views/Dashboard.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_5a2d3b18___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=5a2d3b18& */ "./resources/js/components/views/Dashboard.vue?vue&type=template&id=5a2d3b18&");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_5a2d3b18___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_5a2d3b18___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Dashboard.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/views/Dashboard.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Dashboard.vue?vue&type=template&id=5a2d3b18&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/views/Dashboard.vue?vue&type=template&id=5a2d3b18& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_5a2d3b18___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=5a2d3b18& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Dashboard.vue?vue&type=template&id=5a2d3b18&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_5a2d3b18___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_5a2d3b18___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);