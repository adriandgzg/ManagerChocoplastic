(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Proveedores.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Proveedores.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      headers: [{
        text: 'ID',
        value: 'prov_pk',
        width: '10%'
      }, {
        text: 'Id Proveedor',
        value: 'prov_identifier'
      }, {
        text: 'Nombre',
        value: 'prov_name'
      }, {
        text: 'RFC',
        value: 'prov_rfc'
      }, {
        text: 'Teléfono',
        value: 'prov_phone'
      }, {
        text: 'Email',
        value: 'prov_email'
      }, {
        text: 'Dirección',
        value: 'prov_addres'
      }, {
        text: 'CP',
        value: 'prov_cp'
      }, {
        text: 'Ciudad',
        value: 'prov_city'
      }, {
        text: 'Estado',
        value: 'feen_name'
      }, {
        text: 'Estatus',
        value: 'status'
      }, {
        text: '',
        value: 'action',
        width: '20%'
      }],
      select: 0,
      editadoProveedor: {
        prov_pk: 0,
        feen_fk: 0,
        prov_identifier: '',
        prov_name: '',
        prov_rfc: '',
        prov_phone: '',
        prov_email: '',
        prov_addres: '',
        prov_cp: '',
        prov_city: '',
        prov_status: 0
      },
      defaultItem: {
        prov_pk: 0,
        feen_fk: 0,
        prov_identifier: '',
        prov_name: '',
        prov_rfc: '',
        prov_phone: '',
        prov_email: '',
        prov_addres: '',
        prov_cp: '',
        prov_city: '',
        prov_status: 0
      },
      editedIndex: -1,
      proveedores: [],
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
    this.getProviders();
    this.getEntities();
  },
  methods: {
    getProviders: function getProviders() {
      var _this = this;

      axios.get("/providerlist").then(function (response) {
        console.log(response.data);
        _this.proveedores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getEntities: function getEntities() {
      var _this2 = this;

      axios.get("/entitieslist").then(function (response) {
        console.log(response.data);
        _this2.entities = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editadoProveedor = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    edita: function edita(item) {
      this.editedIndex = this.proveedores.indexOf(item);
      this.editadoProveedor = Object.assign({}, item);
      this.select = this.editadoProveedor.feen_fk;
      this.dialog = true;
    },
    guardar: function guardar() {
      this.editadoProveedor.feen_fk = this.select;

      if (this.editedIndex > -1) {
        this.editar();
      } else {
        this.alta();
      }

      this.cancelar();
    },
    alta: function alta() {
      var _this3 = this;

      axios.post('/providers/add', this.editadoProveedor).then(function (response) {
        _this3.snackbar = true;
        _this3.textMsg = '¡Alta exitosa!';

        _this3.getProviders();
      });
    },
    editar: function editar() {
      var _this4 = this;

      axios.put('/providers/update', this.editadoProveedor).then(function (response) {
        _this4.snackbar = true;
        _this4.textMsg = '¡Actualización Exitosa!';

        _this4.getProviders();
      });
    },
    borrar: function borrar(item) {
      var index = this.proveedores.indexOf(item);
      this.editadoProveedor = Object.assign({}, item);
      console.log('capturo el id de la fila seleccionada');
      console.log(item); //capturo el id de la fila seleccionada

      var r = confirm("¿Está seguro de borrar el registro?");

      if (r == true) {
        this["delete"]();
      }
    },
    "delete": function _delete() {
      var _this5 = this;

      axios.put('/providers/delete', this.editadoProveedor).then(function (response) {
        _this5.snackbar = true;
        _this5.textMsg = "¡Eliminado correctamente!";

        _this5.getProviders();
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Proveedores.vue?vue&type=template&id=669a2190&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Proveedores.vue?vue&type=template&id=669a2190& ***!
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
            "v-dialog",
            {
              attrs: { "max-width": "500px", persistent: "" },
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", { staticClass: "cyan white--text" }, [
                    _c("span", { staticClass: "headline" }, [
                      _vm._v(_vm._s(_vm.formTitle))
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-form",
                    {
                      model: {
                        value: _vm.validProvider,
                        callback: function($$v) {
                          _vm.validProvider = $$v
                        },
                        expression: "validProvider"
                      }
                    },
                    [
                      _c(
                        "v-card-text",
                        [
                          _c("v-text-field", {
                            attrs: {
                              label: "Nombre",
                              maxlength: "300",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProveedor.prov_name,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProveedor, "prov_name", $$v)
                              },
                              expression: "editadoProveedor.prov_name"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Identificar",
                              maxlength: "300",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProveedor.prov_identifier,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editadoProveedor,
                                  "prov_identifier",
                                  $$v
                                )
                              },
                              expression: "editadoProveedor.prov_identifier"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "RFC",
                              maxlength: "15",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProveedor.prov_rfc,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProveedor, "prov_rfc", $$v)
                              },
                              expression: "editadoProveedor.prov_rfc"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Teléfono",
                              maxlength: "10",
                              rules: _vm.phoneRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProveedor.prov_phone,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editadoProveedor,
                                  "prov_phone",
                                  $$v
                                )
                              },
                              expression: "editadoProveedor.prov_phone"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Correo Electrónico",
                              maxlength: "50",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProveedor.prov_email,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editadoProveedor,
                                  "prov_email",
                                  $$v
                                )
                              },
                              expression: "editadoProveedor.prov_email"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Dirección",
                              maxlength: "1000",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProveedor.prov_addres,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editadoProveedor,
                                  "prov_addres",
                                  $$v
                                )
                              },
                              expression: "editadoProveedor.prov_addres"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "C.P.",
                              maxlength: "5",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProveedor.prov_cp,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProveedor, "prov_cp", $$v)
                              },
                              expression: "editadoProveedor.prov_cp"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Ciudad",
                              maxlength: "300",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProveedor.prov_city,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProveedor, "prov_city", $$v)
                              },
                              expression: "editadoProveedor.prov_city"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-switch", {
                            model: {
                              value: _vm.editadoProveedor.prov_status,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editadoProveedor,
                                  "prov_status",
                                  $$v
                                )
                              },
                              expression: "editadoProveedor.prov_status"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.entities,
                              label: "Selecione un estado",
                              "single-line": "",
                              "item-text": "feen_name",
                              "item-value": "feen_pk",
                              "persistent-hint": ""
                            },
                            model: {
                              value: _vm.select,
                              callback: function($$v) {
                                _vm.select = $$v
                              },
                              expression: "select"
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
                            [_vm._v("Cancelar")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "ma-2 white--text",
                              attrs: {
                                disabled: !_vm.validProvider,
                                color: "teal accent-4"
                              },
                              on: { click: _vm.guardar }
                            },
                            [_vm._v("Guardar")]
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
                          items: _vm.proveedores,
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
                                  {
                                    attrs: { flat: "", color: "indigo" },
                                    scopedSlots: _vm._u([
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
                                                  absolute: ""
                                                },
                                                on: {
                                                  click: function($event) {
                                                    _vm.dialog = !_vm.dialog
                                                  }
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
                                    ])
                                  },
                                  [
                                    _vm._v(" "),
                                    _c(
                                      "v-toolbar-title",
                                      { staticClass: "white--text" },
                                      [_vm._v("Lista de Proveedores")]
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
                            key: "item.status",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                item.prov_status == 1
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "green", dark: "" } },
                                      [_vm._v("  Activo  ")]
                                    )
                                  : _c(
                                      "v-chip",
                                      { attrs: { color: "red", dark: "" } },
                                      [_vm._v("Inactivo")]
                                    )
                              ]
                            }
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
                                      color: "cyan"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.edita(item)
                                      }
                                    }
                                  },
                                  [
                                    _c("v-icon", { attrs: { dark: "" } }, [
                                      _vm._v("mdi-pencil")
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

/***/ "./resources/js/components/views/Proveedores.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/views/Proveedores.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Proveedores_vue_vue_type_template_id_669a2190___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Proveedores.vue?vue&type=template&id=669a2190& */ "./resources/js/components/views/Proveedores.vue?vue&type=template&id=669a2190&");
/* harmony import */ var _Proveedores_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Proveedores.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Proveedores.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Proveedores_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Proveedores_vue_vue_type_template_id_669a2190___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Proveedores_vue_vue_type_template_id_669a2190___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Proveedores.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Proveedores.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/views/Proveedores.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Proveedores_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Proveedores.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Proveedores.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Proveedores_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Proveedores.vue?vue&type=template&id=669a2190&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/views/Proveedores.vue?vue&type=template&id=669a2190& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Proveedores_vue_vue_type_template_id_669a2190___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Proveedores.vue?vue&type=template&id=669a2190& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Proveedores.vue?vue&type=template&id=669a2190&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Proveedores_vue_vue_type_template_id_669a2190___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Proveedores_vue_vue_type_template_id_669a2190___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);