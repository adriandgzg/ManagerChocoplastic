(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportCientCatalog.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/ReportCientCatalog.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      enabledStore: false,
      menu1: false,
      menu2: false,
      textMsg: "",
      alert: false
    };
  },
  created: function created() {
    this.getUsers();
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
    GenerarReporte: function GenerarReporte() {
      axios;
      window.open("http://3.217.161.164:777/?pRep=3" + "&pUser_PK=" + this.users.id, "_blank");
    },
    hide_alert: function hide_alert(event) {
      var _this2 = this;

      console.log("Hide"); // `event` is the native DOM event

      window.setInterval(function () {
        _this2.alert = false;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportCientCatalog.vue?vue&type=template&id=f6e6fdd8&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/ReportCientCatalog.vue?vue&type=template&id=f6e6fdd8& ***!
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
                { attrs: { justify: "end" } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "mr-4",
                      attrs: { color: "success" },
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

/***/ "./resources/js/components/views/ReportCientCatalog.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/views/ReportCientCatalog.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReportCientCatalog_vue_vue_type_template_id_f6e6fdd8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReportCientCatalog.vue?vue&type=template&id=f6e6fdd8& */ "./resources/js/components/views/ReportCientCatalog.vue?vue&type=template&id=f6e6fdd8&");
/* harmony import */ var _ReportCientCatalog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReportCientCatalog.vue?vue&type=script&lang=js& */ "./resources/js/components/views/ReportCientCatalog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReportCientCatalog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReportCientCatalog_vue_vue_type_template_id_f6e6fdd8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ReportCientCatalog_vue_vue_type_template_id_f6e6fdd8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/ReportCientCatalog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/ReportCientCatalog.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/views/ReportCientCatalog.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportCientCatalog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReportCientCatalog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportCientCatalog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportCientCatalog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/ReportCientCatalog.vue?vue&type=template&id=f6e6fdd8&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/views/ReportCientCatalog.vue?vue&type=template&id=f6e6fdd8& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportCientCatalog_vue_vue_type_template_id_f6e6fdd8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReportCientCatalog.vue?vue&type=template&id=f6e6fdd8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ReportCientCatalog.vue?vue&type=template&id=f6e6fdd8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportCientCatalog_vue_vue_type_template_id_f6e6fdd8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportCientCatalog_vue_vue_type_template_id_f6e6fdd8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);