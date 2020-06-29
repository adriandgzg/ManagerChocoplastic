(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/UserProfile.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/UserProfile.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      user: {}
    };
  },
  beforeMount: function beforeMount() {
    var _this = this;

    axios.get('/auth/user').then(function (response) {
      return _this.user = response.data;
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/UserProfile.vue?vue&type=template&id=9c22083c&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/UserProfile.vue?vue&type=template&id=9c22083c& ***!
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
    { attrs: { "fill-height": "", fluid: "", "grid-list-xl": "" } },
    [
      _c(
        "v-layout",
        { attrs: { "justify-center": "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", md8: "" } },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", { attrs: { color: "green" } }, [
                    _c("h3", { staticClass: "title font-weight-light" }, [
                      _vm._v("Edit Profile\n          "),
                      _c("h5", { staticClass: "subtitle" }, [
                        _vm._v("Complete your profile")
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-form",
                        [
                          _c(
                            "v-container",
                            { attrs: { "py-0": "" } },
                            [
                              _c(
                                "v-layout",
                                { attrs: { wrap: "" } },
                                [
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "", md4: "" } },
                                    [
                                      _c("v-text-field", {
                                        attrs: {
                                          label: "Company (disabled)",
                                          disabled: ""
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "", md4: "" } },
                                    [
                                      _c("v-text-field", {
                                        staticClass: "purple-input",
                                        attrs: { label: "User Name" }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "", md4: "" } },
                                    [
                                      _c("v-text-field", {
                                        staticClass: "purple-input",
                                        attrs: { label: "Email Address" }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "", md6: "" } },
                                    [
                                      _c("v-text-field", {
                                        staticClass: "purple-input",
                                        attrs: { label: "First Name" }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "", md6: "" } },
                                    [
                                      _c("v-text-field", {
                                        staticClass: "purple-input",
                                        attrs: { label: "Last Name" }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "", md12: "" } },
                                    [
                                      _c("v-text-field", {
                                        staticClass: "purple-input",
                                        attrs: { label: "Adress" }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "", md4: "" } },
                                    [
                                      _c("v-text-field", {
                                        staticClass: "purple-input",
                                        attrs: { label: "City" }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "", md4: "" } },
                                    [
                                      _c("v-text-field", {
                                        staticClass: "purple-input",
                                        attrs: { label: "Country" }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "", md4: "" } },
                                    [
                                      _c("v-text-field", {
                                        staticClass: "purple-input",
                                        attrs: {
                                          label: "Postal Code",
                                          type: "number"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "" } },
                                    [
                                      _c("v-textarea", {
                                        staticClass: "purple-input",
                                        attrs: {
                                          label: "About Me",
                                          value:
                                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: { xs12: "", "text-xs-right": "" }
                                    },
                                    [
                                      _c(
                                        "v-btn",
                                        {
                                          staticClass: "mx-0 font-weight-light",
                                          attrs: { color: "success" }
                                        },
                                        [
                                          _vm._v(
                                            "\n                  Update Profile\n                "
                                          )
                                        ]
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
            { attrs: { xs12: "", md4: "" } },
            [
              _c(
                "v-card",
                { staticClass: "v-card-profile" },
                [
                  _c(
                    "v-card-title",
                    [
                      _c(
                        "v-avatar",
                        {
                          staticClass: "mx-auto d-block",
                          attrs: { slot: "offset", size: "130" },
                          slot: "offset"
                        },
                        [
                          _c("img", {
                            attrs: {
                              src:
                                "https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
                            }
                          })
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-card-text", { staticClass: "text-xs-center" }, [
                    _c(
                      "h6",
                      {
                        staticClass: "category text-gray font-weight-thin mb-3"
                      },
                      [_vm._v(_vm._s(_vm.user.email))]
                    ),
                    _vm._v(" "),
                    _c("h4", { staticClass: "card-title font-weight-light" }, [
                      _vm._v(_vm._s(_vm.user.name))
                    ]),
                    _vm._v(" "),
                    _c(
                      "p",
                      { staticClass: "card-description font-weight-light" },
                      [
                        _vm._v(
                          "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is..."
                        )
                      ]
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/views/UserProfile.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/views/UserProfile.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserProfile_vue_vue_type_template_id_9c22083c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserProfile.vue?vue&type=template&id=9c22083c& */ "./resources/js/components/views/UserProfile.vue?vue&type=template&id=9c22083c&");
/* harmony import */ var _UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserProfile.vue?vue&type=script&lang=js& */ "./resources/js/components/views/UserProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserProfile_vue_vue_type_template_id_9c22083c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserProfile_vue_vue_type_template_id_9c22083c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/UserProfile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/UserProfile.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/views/UserProfile.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/UserProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/UserProfile.vue?vue&type=template&id=9c22083c&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/views/UserProfile.vue?vue&type=template&id=9c22083c& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_template_id_9c22083c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserProfile.vue?vue&type=template&id=9c22083c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/UserProfile.vue?vue&type=template&id=9c22083c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_template_id_9c22083c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserProfile_vue_vue_type_template_id_9c22083c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);