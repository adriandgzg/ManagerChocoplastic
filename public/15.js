(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Frequents.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Frequents.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        text: 'Ident',
        value: 'prod_identifier'
      }, {
        text: 'Nombre',
        value: 'prod_name'
      }, {
        text: 'Categoria',
        value: 'prca_name'
      }, {
        text: 'Precio Venta',
        value: 'prod_saleprice'
      }, {
        text: 'Sucursal',
        value: 'stor_name'
      }, {
        text: 'Tipo',
        value: 'bulk'
      }, {
        text: '',
        value: 'action',
        width: '10%'
      }],
      select: 0,
      selectCat: 0,
      selectMeasIn: 0,
      selectMeasOut: 0,
      principal: false,
      estado: true,
      estadoGranel: true,
      imageUrl: '',
      editado: {
        prod_fk: 0,
        stor_fk: 0,
        prfr_pk: 0
      },
      defaultItem: {
        prod_fk: 0,
        stor_fk: 0,
        prfr_pk: 0
      },
      editedIndex: -1,
      categories: [],
      measurements: [],
      stores: [],
      store: '',
      frequents: [],
      products: [],
      product: '',
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
      }],
      numberRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value > 0 || 'El número debe ser mayor a cero';
      }],
      rulesImage: [function (value) {
        return !!value || 'Archivo requerido';
      }, function (value) {
        return !value || value.size < 2000000 || 'La imagen tiene que ser menor a 2 MB!';
      }],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: ''
    };
  },
  created: function created() {
    this.getFrequents();
    this.getStores();
    this.getProducts();
  },
  methods: {
    formatMoney: function formatMoney(amount) {
      var decimalCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var decimal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".";
      var thousands = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ",";

      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
        var negativeSign = amount < 0 ? "-" : "";
        var i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        var j = i.length > 3 ? i.length % 3 : 0;
        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e);
      }
    },
    getFrequents: function getFrequents() {
      var _this = this;

      axios.get("/product/frequents").then(function (response) {
        console.log(response.data);
        _this.frequents = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getStores: function getStores() {
      var _this2 = this;

      axios.get('/storeget').then(function (response) {
        _this2.stores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getProducts: function getProducts() {
      var _this3 = this;

      this.loading = true;
      axios.get("/productList").then(function (response) {
        setTimeout(function () {
          return _this3.loading = false;
        }, 2000);

        if (response.data.data != null) {
          _this3.products = response.data.data;
        } else {
          _this3.normal('Notificación', 'Ocurrio un error al cargar los datos.', "error");
        }
      })["catch"](function (e) {
        console.log(e);
      });
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.store = '';
      this.product = '';
    },
    guardar: function guardar() {
      var _this4 = this;

      console.log(this.product);
      console.log(this.store);
      this.editado.prod_fk = this.product.prod_pk;
      this.editado.stor_fk = this.store;
      axios.post('/product/frequents', this.editado).then(function (response) {
        console.log(response.data);

        if (response.data.status.code == 200) {
          _this4.snackbar = true;
          _this4.textMsg = response.data.status.message;

          _this4.cancelar();

          _this4.getFrequents();
        } else {
          _this4.normal('Notificación', 'Ocurrio un error al guardar. Contacte a su administrador.', "error");
        }
      })["catch"](function (e) {
        //this.errors.push(e)
        console.log(e);
      });
    },
    borrar: function borrar(item) {
      var index = this.products.indexOf(item);
      this.editado = Object.assign({}, item);
      this.dialogQuestionDelete = true;
    },
    guardaBorrar: function guardaBorrar() {
      this["delete"]();
      this.dialogQuestionDelete = false;
    },
    "delete": function _delete() {
      var _this5 = this;

      axios.put('/product/delete', this.editado).then(function (response) {
        _this5.textMsg = "¡Eliminado correctamente!";

        _this5.normal('Notificación', _this5.textMsg, "success");

        _this5.getFrequents();
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
  },
  computed: {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro';
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Frequents.vue?vue&type=template&id=5b6df12e&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Frequents.vue?vue&type=template&id=5b6df12e& ***!
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
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "290" },
              model: {
                value: _vm.dialogQuestionDelete,
                callback: function($$v) {
                  _vm.dialogQuestionDelete = $$v
                },
                expression: "dialogQuestionDelete"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", { staticClass: "headline" }, [
                    _vm._v("Alerta")
                  ]),
                  _vm._v(" "),
                  _c("v-card-text", [
                    _vm._v("¿Está seguro de borrar el registro?")
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "green darken-1", text: "" },
                          on: {
                            click: function($event) {
                              _vm.dialogQuestionDelete = false
                            }
                          }
                        },
                        [_vm._v("Cancelar")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "green darken-1", text: "" },
                          on: { click: _vm.guardaBorrar }
                        },
                        [_vm._v("Continuar")]
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
                          _c("v-select", {
                            attrs: {
                              items: _vm.stores,
                              "item-text": "stor_name",
                              "item-value": "stor_pk",
                              filled: "",
                              chips: "",
                              label: "Sucursal",
                              placeholder: "Selecciona sucursal"
                            },
                            model: {
                              value: _vm.store,
                              callback: function($$v) {
                                _vm.store = $$v
                              },
                              expression: "store"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-combobox", {
                            attrs: {
                              items: _vm.products,
                              "item-text": "prod_name",
                              "item-value": "prod_pk",
                              filled: "",
                              chips: "",
                              label: "Producto",
                              placeholder: "Selecciona producto"
                            },
                            model: {
                              value: _vm.product,
                              callback: function($$v) {
                                _vm.product = $$v
                              },
                              expression: "product"
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
                              attrs: { color: "teal accent-4" },
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
                          items: _vm.frequents,
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
                            key: "item.bulk",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                item.prod_bulk == 1
                                  ? _c(
                                      "v-chip",
                                      {
                                        attrs: { color: "green", outlined: "" }
                                      },
                                      [_vm._v(" \n                    Granel")]
                                    )
                                  : _c(
                                      "v-chip",
                                      { attrs: { color: "red", outlined: "" } },
                                      [_vm._v("NA Granel")]
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

/***/ "./resources/js/components/views/Frequents.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/views/Frequents.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Frequents_vue_vue_type_template_id_5b6df12e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Frequents.vue?vue&type=template&id=5b6df12e& */ "./resources/js/components/views/Frequents.vue?vue&type=template&id=5b6df12e&");
/* harmony import */ var _Frequents_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Frequents.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Frequents.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Frequents_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Frequents_vue_vue_type_template_id_5b6df12e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Frequents_vue_vue_type_template_id_5b6df12e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Frequents.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Frequents.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/views/Frequents.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Frequents_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Frequents.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Frequents.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Frequents_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Frequents.vue?vue&type=template&id=5b6df12e&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/views/Frequents.vue?vue&type=template&id=5b6df12e& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Frequents_vue_vue_type_template_id_5b6df12e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Frequents.vue?vue&type=template&id=5b6df12e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Frequents.vue?vue&type=template&id=5b6df12e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Frequents_vue_vue_type_template_id_5b6df12e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Frequents_vue_vue_type_template_id_5b6df12e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);