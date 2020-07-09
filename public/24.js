(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/UserList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/UserList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      dialogForm: false,
      statuses: [{
        name: 'Cliente',
        id: 1
      }, {
        name: 'Repartidor',
        id: 2
      }],
      status: '',
      headers: [{
        text: 'ID',
        value: 'id',
        width: '10%'
      }, {
        text: 'Nombre',
        value: 'name'
      }, {
        text: 'Correo Electrónico',
        value: 'email'
      }, {
        text: 'Teléfono',
        value: 'phone_number'
      }, {
        text: 'Tipo Usuario',
        value: 'user_type'
      }, {
        text: '',
        value: 'action'
      }],
      usuarios: [],
      editado: {
        email: '',
        id: '',
        name: '',
        phone_number: '',
        user_type: '',
        user_type_id: 0
      },
      defaultItem: {
        email: '',
        id: '',
        name: '',
        phone_number: '',
        user_type: '',
        user_type_id: 0
      }
    };
  },
  created: function created() {
    this.getUser();
  },
  methods: {
    getUser: function getUser() {
      var _this = this;

      axios.get('/listUsers').then(function (response) {
        _this.usuarios = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    editarTipo: function editarTipo(item) {
      //this.editedIndexNeg = this.business.indexOf(item)
      console.log(item);
      this.editado = Object.assign({}, item);
      this.status = this.editado.user_type_id;
      console.log(this.editado);
      this.dialogForm = true;
    },
    cancelar: function cancelar() {
      this.dialogForm = false;
      this.editado = Object.assign({}, this.defaultItem);
    },
    guardar: function guardar() {
      var _this2 = this;

      //                console.log(this.status)
      this.editado.user_type_id = this.status;
      axios.put('/user/updateStatus', this.editado).then(function (response) {
        var statusObj = _this2.statuses.find(function (item) {
          return item.id === _this2.status;
        });

        _this2.usuarios.find(function (item) {
          return item.id === _this2.editado.id;
        }).user_type = statusObj.name;
        _this2.dialogForm = false;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/UserList.vue?vue&type=template&id=cb86f896&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/UserList.vue?vue&type=template&id=cb86f896& ***!
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
    "v-container",
    [
      _c(
        "v-row",
        [
          _c(
            "v-col",
            [
              _c("v-data-table", {
                staticClass: "elevation-3",
                attrs: {
                  headers: _vm.headers,
                  items: _vm.usuarios,
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
                            _c(
                              "v-toolbar-title",
                              { staticClass: "white--text" },
                              [_vm._v("Usuarios")]
                            ),
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
                              color: "green"
                            },
                            on: {
                              click: function($event) {
                                return _vm.editarTipo(item)
                              }
                            }
                          },
                          [
                            _c("v-icon", { attrs: { dark: "" } }, [
                              _vm._v("mdi-account-arrow-right")
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
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "1024px" },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on
                return undefined
              }
            }
          ]),
          model: {
            value: _vm.dialogForm,
            callback: function($$v) {
              _vm.dialogForm = $$v
            },
            expression: "dialogForm"
          }
        },
        [
          _vm._v(" "),
          _c(
            "v-card",
            [
              _c("v-card-title", { staticClass: "cyan white--text" }, [
                _c("span", { staticClass: "headline" }, [
                  _vm._v("Tipo de usuario")
                ])
              ]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-container",
                    [
                      _c("v-select", {
                        attrs: {
                          items: _vm.statuses,
                          "item-text": "name",
                          "item-value": "id",
                          filled: "",
                          chips: "",
                          label: "Tienda",
                          placeholder: "Selecciona sucursal"
                        },
                        model: {
                          value: _vm.status,
                          callback: function($$v) {
                            _vm.status = $$v
                          },
                          expression: "status"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-2 white--text",
                          attrs: { color: "blue-grey" },
                          on: { click: _vm.cancelar }
                        },
                        [
                          _vm._v(
                            "\n                    Cancelar\n                "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-2 white--text",
                          attrs: { color: "teal accent-4" },
                          on: { click: _vm.guardar }
                        },
                        [
                          _vm._v(
                            "\n                    Guardar\n                "
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/views/UserList.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/views/UserList.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserList_vue_vue_type_template_id_cb86f896___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserList.vue?vue&type=template&id=cb86f896& */ "./resources/js/components/views/UserList.vue?vue&type=template&id=cb86f896&");
/* harmony import */ var _UserList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserList.vue?vue&type=script&lang=js& */ "./resources/js/components/views/UserList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserList_vue_vue_type_template_id_cb86f896___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserList_vue_vue_type_template_id_cb86f896___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/UserList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/UserList.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/views/UserList.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/UserList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/UserList.vue?vue&type=template&id=cb86f896&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/views/UserList.vue?vue&type=template&id=cb86f896& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserList_vue_vue_type_template_id_cb86f896___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserList.vue?vue&type=template&id=cb86f896& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/UserList.vue?vue&type=template&id=cb86f896&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserList_vue_vue_type_template_id_cb86f896___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserList_vue_vue_type_template_id_cb86f896___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);