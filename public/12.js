(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Product.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Product.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        value: 'id',
        width: '5%'
      }, {
        text: 'Nombre',
        value: 'name',
        width: '35%'
      }, {
        text: 'Descripción',
        value: 'description',
        width: '20%'
      }, {
        text: 'Key',
        value: 'long_key',
        width: '20%'
      }, {
        text: 'Precio',
        value: 'price',
        width: '10%'
      }, {
        text: 'Contenido',
        value: 'content',
        width: '10%'
      }, {
        text: 'Unidad',
        value: 'unit',
        width: '10%'
      }, {
        text: 'Marca',
        value: 'brand',
        width: '10%'
      }, {
        text: "Image",
        value: "image",
        sortable: false,
        width: '15%'
      }, {
        text: '',
        value: 'action',
        width: '20%'
      }],
      nameRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value && value.length >= 3 || 'Min 3 caracteres';
      }],
      unidadRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value && value.length >= 1 || 'Min 1 caracter';
      }],
      numberRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value > 0 || 'El número debe ser mayor a cero';
      }],
      valid: true,
      products: [],
      search: '',
      //para el cuadro de búsqueda de datatables  
      dialog: false,
      //para que la ventana de dialogo o modal no aparezca automáticamente 
      imageUrl: '',
      select: {
        id: 0
      },
      selectinput: {
        id: 0
      },
      selectSub: {
        id: 0
      },
      categories: [],
      subcategories: [],
      editado: {
        id: '',
        name: '',
        description: '',
        long_key: '',
        price: '',
        content: '',
        unit: '',
        brand: '',
        sales_unit: '',
        bulk: '',
        imageUrl: this.imageUrl,
        idsubcategoria: 0,
        select: 0
      },
      defaultItem: {
        id: '',
        name: '',
        description: '',
        long_key: '',
        price: '',
        content: '',
        unit: '',
        brand: '',
        imageUrl: this.imageUrl,
        sales_unit: '',
        bulk: '',
        idsubcategoria: 0
      }
    };
  },
  created: function created() {
    this.getProducts();
    this.getCategories();
  },
  methods: {
    changeRoute: function changeRoute(a) {
      //this.$router.push({path: a.src })
      console.log(a);
      this.getSubCategories(a);
      console.log(this.select);
    },
    changeRouteSub: function changeRouteSub(a) {
      //this.$router.push({path: a.src })
      this.idsubcategoria = a;
      this.editado.category_id = this.idsubcategoria;
      console.log('ID sub ' + this.idsubcategoria + ' --> ' + this.editado.category_id); // getSubCategories(a)
    },
    validate: function validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    getProducts: function getProducts() {
      var _this = this;

      axios.get('/productList').then(function (response) {
        _this.products = response.data.data;
      })["catch"](function (e) {
        _this.errors.push(e);
      });
    },
    getCategories: function getCategories() {
      var _this2 = this;

      axios.get('/CategoriesCbx').then(function (response) {
        _this2.categories = response.data.data;
        console.log(_this2.categories);
      })["catch"](function (e) {
        _this2.errors.push(e);
      });
    },
    getSubCategories: function getSubCategories(id) {
      var _this3 = this;

      axios.get('/subcategories/' + id).then(function (response) {
        _this3.subcategories = response.data.data;
      })["catch"](function (e) {
        _this3.errors.push(e);
      });
    },
    guardar: function guardar() {
      if (!this.$refs.form.validate()) {
        this.snackbar = true;
      } else {
        if (this.editedIndex > -1) {
          //Guarda en caso de Edición
          this.textSnack = '¡Actualización Exitosa!';
          this.editarProduct();
        } else {
          //Guarda el registro en caso de Alta  
          if (this.editado.marca == "" || this.editado.modelo == "" || this.editado.stock == 0) {
            this.snackbar = true;
            this.textSnack = 'Datos incompletos.';
          } else {
            this.textSnack = '¡Alta exitosa!';
            this.addProduct();
          }
        }

        this.cancelar();
      }
    },
    editarProduct: function editarProduct() {
      var _this4 = this;

      console.log(this.editado);
      axios.put('/product/update', this.editado).then(function (response) {
        _this4.getProducts();
      });
      this.name = "", this.description = "";
    },
    editar: function editar(item) {
      this.getCategories();
      this.editedIndex = this.products.indexOf(item);
      this.editado = Object.assign({}, item);
      this.select.id = parseInt(this.editado.select);

      if (this.editado.select != null) {
        this.getSubCategories(this.select.id);

        if (this.selectSub != null) {
          this.selectSub.id = this.editado.category_id;
        }
      }

      this.dialog = true;
    },
    borrar: function borrar(item) {
      var index = this.products.indexOf(item);
      this.editado = Object.assign({}, item);
      console.log(this.products[index].id); //capturo el id de la fila seleccionada 

      var r = confirm("¿Está seguro de borrar el registro?");

      if (r == true) {
        this.deleteProduct();
        this.snackbar = true;
        this.textSnack = 'Se eliminó el registro.';
      } else {
        this.snackbar = true;
        this.textSnack = 'Operación cancelada.';
      }
    },
    addProduct: function addProduct() {
      var _this5 = this;

      axios.post('/product/add', this.editado).then(function (response) {
        _this5.getProducts();
      });
      this.name = "", this.description = "";
    },
    deleteProduct: function deleteProduct() {
      var _this6 = this;

      axios.put('/product/delete', this.editado).then(function (response) {
        _this6.getProducts();
      });
      this.name = "", this.description = "";
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    onPickFile: function onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked: function onFilePicked(event) {
      var _this7 = this;

      var files = event.target.files;
      var filename = files[0].name;
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        _this7.imageUrl = fileReader.result;
        _this7.editado.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  },
  computed: {
    // ...mapGetters('auth', ['can'])
    //Dependiendo si es Alta o Edición cambia el título del modal  
    formTitle: function formTitle() {
      //operadores condicionales "condición ? expr1 : expr2"
      // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>    
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
                                      [_c("v-icon", [_vm._v("mdi-plus")])],
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
                              [_vm._v("Productos")]
                            ),
                            _vm._v(" "),
                            _c("v-divider", {
                              staticClass: "mx-4",
                              attrs: { inset: "", vertical: "" }
                            }),
                            _vm._v(" "),
                            _c("v-spacer"),
                            _vm._v(" "),
                            _c(
                              "v-dialog",
                              {
                                attrs: { "max-width": "500px" },
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
                                  value: _vm.dialog,
                                  callback: function($$v) {
                                    _vm.dialog = $$v
                                  },
                                  expression: "dialog"
                                }
                              },
                              [
                                _vm._v(" "),
                                _c(
                                  "v-form",
                                  {
                                    ref: "form",
                                    attrs: { "lazy-validation": "" },
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
                                      "v-card",
                                      [
                                        _c(
                                          "v-card-title",
                                          { staticClass: "cyan white--text" },
                                          [
                                            _c(
                                              "span",
                                              { staticClass: "headline" },
                                              [_vm._v(_vm._s(_vm.formTitle))]
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-card-text",
                                          [
                                            _c(
                                              "v-container",
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Nombre",
                                                    rules: _vm.nameRules,
                                                    required: ""
                                                  },
                                                  model: {
                                                    value: _vm.editado.name,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editado,
                                                        "name",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "editado.name"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Descripción",
                                                    rules: _vm.nameRules,
                                                    required: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editado.description,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editado,
                                                        "description",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editado.description"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Key",
                                                    rules: _vm.nameRules,
                                                    required: ""
                                                  },
                                                  model: {
                                                    value: _vm.editado.long_key,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editado,
                                                        "long_key",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editado.long_key"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Precio",
                                                    prefix: "$",
                                                    type: "number",
                                                    rules: _vm.numberRules,
                                                    required: ""
                                                  },
                                                  model: {
                                                    value: _vm.editado.price,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editado,
                                                        "price",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "editado.price"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Contenido",
                                                    type: "number",
                                                    rules: _vm.numberRules
                                                  },
                                                  model: {
                                                    value: _vm.editado.content,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editado,
                                                        "content",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editado.content"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Unidad",
                                                    rules: _vm.unidadRules
                                                  },
                                                  model: {
                                                    value: _vm.editado.unit,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editado,
                                                        "unit",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "editado.unit"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Marca",
                                                    rules: _vm.nameRules
                                                  },
                                                  model: {
                                                    value: _vm.editado.brand,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editado,
                                                        "brand",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "editado.brand"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("v-select", {
                                                  attrs: {
                                                    items: _vm.categories,
                                                    label: "Select",
                                                    "single-line": "",
                                                    "item-text": "name",
                                                    "item-value": "id",
                                                    "return-object": "",
                                                    "persistent-hint": ""
                                                  },
                                                  on: {
                                                    change: function($event) {
                                                      return _vm.changeRoute(
                                                        "" + _vm.select.id
                                                      )
                                                    }
                                                  },
                                                  model: {
                                                    value: _vm.select,
                                                    callback: function($$v) {
                                                      _vm.select = $$v
                                                    },
                                                    expression: "select"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("v-select", {
                                                  attrs: {
                                                    items: _vm.subcategories,
                                                    label: "Select",
                                                    "single-line": "",
                                                    "item-text": "name",
                                                    "item-value": "id",
                                                    "return-object": "",
                                                    "persistent-hint": ""
                                                  },
                                                  on: {
                                                    change: function($event) {
                                                      return _vm.changeRouteSub(
                                                        "" + _vm.selectSub.id
                                                      )
                                                    }
                                                  },
                                                  model: {
                                                    value: _vm.selectSub,
                                                    callback: function($$v) {
                                                      _vm.selectSub = $$v
                                                    },
                                                    expression: "selectSub"
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
                                                        on: {
                                                          click: _vm.onPickFile
                                                        }
                                                      },
                                                      [_vm._v("Subir imagen")]
                                                    ),
                                                    _vm._v(" "),
                                                    _c("input", {
                                                      ref: "fileInput",
                                                      staticStyle: {
                                                        display: "none"
                                                      },
                                                      attrs: {
                                                        type: "file",
                                                        accept: "image/jpeg"
                                                      },
                                                      on: {
                                                        change: _vm.onFilePicked
                                                      }
                                                    })
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _c("v-layout", [
                                                  _c("img", {
                                                    attrs: {
                                                      src: _vm.imageUrl,
                                                      height: "150"
                                                    }
                                                  })
                                                ])
                                              ],
                                              1
                                            )
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
                            )
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
                    key: "item.image",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _c(
                          "div",
                          { staticClass: "p-2" },
                          [
                            _c("v-img", {
                              attrs: {
                                src: item.image,
                                alt: item.name,
                                "aspect-ratio": "1"
                              }
                            })
                          ],
                          1
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
                                return _vm.editar(item)
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