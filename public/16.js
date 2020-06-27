(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Product.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Product.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    var _editado, _defaultItem;

    return {
      headers: [{
        text: 'Identificador',
        value: 'prod_identifier'
      }, {
        text: 'Nombre',
        value: 'prod_name'
      }, {
        text: 'Categoria',
        value: 'prca_name'
      }, {
        text: 'Unidad Entrada',
        value: 'meas_fk_input_name'
      }, {
        text: 'Unidad Salida',
        value: 'meas_fk_output_name'
      }, {
        text: 'Precio Actual',
        value: 'prod_actualprice'
      }, {
        text: 'Precio Eventual',
        value: 'prod_eventualprice'
      }, {
        text: 'Precio Preferencial',
        value: 'prod_preferentialprice'
      }, {
        text: 'Cantidad por Paquete',
        value: 'prod_packingquantity'
      }, {
        text: 'Estatus',
        value: 'status'
      }, {
        text: '',
        value: 'action',
        width: '20%'
      }],
      select: 0,
      selectCat: 0,
      selectMeasIn: 0,
      selectMeasOut: 0,
      principal: false,
      estado: true,
      imageUrl: '',
      editado: (_editado = {
        prod_pk: 0,
        prca_fk: 0,
        prca_name: '',
        meas_fk_input: 0,
        meas_fk_input_name: '',
        meas_fk_output: 0,
        meas_fk_output_name: '',
        prod_identifier: '',
        prod_name: ''
      }, _defineProperty(_editado, "prod_name", ''), _defineProperty(_editado, "prod_actualprice", 0), _defineProperty(_editado, "prod_eventualprice", 0), _defineProperty(_editado, "prod_preferentialprice", 0), _defineProperty(_editado, "prod_packingquantity", 0), _defineProperty(_editado, "prod_status", 0), _defineProperty(_editado, "is_mod", false), _defineProperty(_editado, "imageUrl", this.imageUrl), _editado),
      defaultItem: (_defaultItem = {
        prod_pk: 0,
        prca_fk: 0,
        prca_fk_name: '',
        prod_name: '',
        meas_fk_input: 0,
        meas_fk_input_name: '',
        meas_fk_output: 0,
        meas_fk_output_name: '',
        prod_identifier: ''
      }, _defineProperty(_defaultItem, "prod_name", ''), _defineProperty(_defaultItem, "prod_actualprice", 0), _defineProperty(_defaultItem, "prod_eventualprice", 0), _defineProperty(_defaultItem, "prod_preferentialprice", 0), _defineProperty(_defaultItem, "prod_packingquantity", 0), _defineProperty(_defaultItem, "prod_status", 0), _defineProperty(_defaultItem, "is_mod", false), _defineProperty(_defaultItem, "imageUrl", this.imageUrl), _defaultItem),
      editedIndex: -1,
      products: [],
      categories: [],
      measurements: [],
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
      }]
    };
  },
  created: function created() {
    this.getProducts();
    this.getCategories();
    this.getMeasurements();
  },
  methods: {
    getProducts: function getProducts() {
      var _this = this;

      axios.get("/productList").then(function (response) {
        console.log(response.data);
        _this.products = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getCategories: function getCategories() {
      var _this2 = this;

      axios.get("/categories").then(function (response) {
        _this2.categories = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getMeasurements: function getMeasurements() {
      var _this3 = this;

      axios.get("/measurements").then(function (response) {
        _this3.measurements = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    edita: function edita(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editado = Object.assign({}, item);
      this.estado = this.editado.prod_status;
      this.selectCat = this.editado.prca_fk;
      this.selectMeasIn = this.editado.meas_fk_input;
      this.selectMeasOut = this.editado.meas_fk_output;
      this.imageUrl = this.editado.prod_image;
      this.dialog = true;
    },
    guardar: function guardar() {
      if (this.estado == true) this.editado.prod_status = 1;else this.editado.prod_status = 0;
      this.editado.prca_fk = this.selectCat;
      this.editado.meas_fk_input = this.selectMeasIn;
      this.editado.meas_fk_output = this.selectMeasOut;
      console.log(this.editado);

      if (this.editedIndex > -1) {
        this.editar();
      } else {
        this.alta();
      }

      this.cancelar();
    },
    alta: function alta() {
      var _this4 = this;

      axios.post('/product/add', this.editado).then(function (response) {
        _this4.snackbar = true;
        _this4.textMsg = '¡Alta exitosa!';

        _this4.getProducts();
      });
    },
    editar: function editar() {
      var _this5 = this;

      axios.put('/product/update', this.editado).then(function (response) {
        _this5.snackbar = true;
        _this5.textMsg = '¡Actualización Exitosa!';

        _this5.getProducts();
      });
    },
    borrar: function borrar(item) {
      var index = this.products.indexOf(item);
      this.editado = Object.assign({}, item);
      var r = confirm("¿Está seguro de borrar el registro?");

      if (r == true) {
        this["delete"]();
      }
    },
    "delete": function _delete() {
      var _this6 = this;

      axios.put('/product/delete', this.editado).then(function (response) {
        _this6.snackbar = true;
        _this6.textMsg = "¡Eliminado correctamente!";

        _this6.getProducts();
      });
    },
    onPickFileProduct: function onPickFileProduct() {
      this.$refs.fileInput.click();
    },
    onFilePickedProduct: function onFilePickedProduct(event) {
      var _this7 = this;

      var files = event.target.files;
      var filename = files[0].name;
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        _this7.imageUrl = fileReader.result;
        _this7.editado.imageUrl = fileReader.result;
        _this7.editado.is_mod = true;
        console.log(_this7.editado);
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  },
  computed: {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro';
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a& ***!
  \****************************************************************************************************************************************************************************************************************/
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
                              value: _vm.editado.prod_name,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_name", $$v)
                              },
                              expression: "editado.prod_name"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Nombre",
                              maxlength: "300",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_identifier,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_identifier", $$v)
                              },
                              expression: "editado.prod_identifier"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.categories,
                              label: "Selecione una categoría",
                              "single-line": "",
                              "item-text": "prca_name",
                              "item-value": "prca_pk",
                              "persistent-hint": ""
                            },
                            model: {
                              value: _vm.selectCat,
                              callback: function($$v) {
                                _vm.selectCat = $$v
                              },
                              expression: "selectCat"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.measurements,
                              label: "Selecione una Unidad Entrada",
                              "single-line": "",
                              "item-text": "meas_name",
                              "item-value": "meas_pk",
                              "persistent-hint": ""
                            },
                            model: {
                              value: _vm.selectMeasIn,
                              callback: function($$v) {
                                _vm.selectMeasIn = $$v
                              },
                              expression: "selectMeasIn"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.measurements,
                              label: "Selecione una Unidad Salida",
                              "single-line": "",
                              "item-text": "meas_name",
                              "item-value": "meas_pk",
                              "persistent-hint": ""
                            },
                            model: {
                              value: _vm.selectMeasOut,
                              callback: function($$v) {
                                _vm.selectMeasOut = $$v
                              },
                              expression: "selectMeasOut"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio Actual",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_actualprice,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_actualprice", $$v)
                              },
                              expression: "editado.prod_actualprice"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio Eventual",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_eventualprice,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_eventualprice", $$v)
                              },
                              expression: "editado.prod_eventualprice"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio Preferencial",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_preferentialprice,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editado,
                                  "prod_preferentialprice",
                                  $$v
                                )
                              },
                              expression: "editado.prod_preferentialprice"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Stock",
                              type: "number",
                              rules: _vm.numberRules
                            },
                            model: {
                              value: _vm.editado.prod_packingquantity,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editado,
                                  "prod_packingquantity",
                                  $$v
                                )
                              },
                              expression: "editado.prod_packingquantity"
                            }
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v("Activo/Inactivo")]),
                          _vm._v(" "),
                          _c("v-switch", {
                            model: {
                              value: _vm.estado,
                              callback: function($$v) {
                                _vm.estado = $$v
                              },
                              expression: "estado"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "v-card-text",
                            [
                              _c(
                                "v-btn",
                                {
                                  staticClass: "primary",
                                  attrs: { raised: "" },
                                  on: { click: _vm.onPickFileProduct }
                                },
                                [_vm._v("Subir imagen")]
                              ),
                              _vm._v(" "),
                              _c("input", {
                                ref: "fileInput",
                                staticStyle: { display: "none" },
                                attrs: {
                                  type: "file",
                                  accept: "image/jpeg",
                                  required: "",
                                  rules: _vm.rulesImage
                                },
                                on: { change: _vm.onFilePickedProduct }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-layout", [
                            _c("img", {
                              attrs: { src: this.imageUrl, height: "150" }
                            })
                          ])
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
                          items: _vm.products,
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
                                      [_vm._v("Lista de Productos")]
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
                                item.prod_status == 1
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

/***/ "./resources/js/components/views/Product.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/views/Product.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Product.vue?vue&type=template&id=78aafa1a& */ "./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a&");
/* harmony import */ var _Product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Product.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Product.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Product.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Product.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/views/Product.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Product.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Product.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Product.vue?vue&type=template&id=78aafa1a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);