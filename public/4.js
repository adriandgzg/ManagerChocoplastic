(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Business.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Business.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        width: '10%'
      }, {
        text: 'Nombre',
        value: 'name'
      }, {
        text: 'Descripción',
        value: 'description'
      },, {
        text: '',
        value: 'action'
      }],
      business: [],
      businessNode: [],
      errors: [],
      editingText: '',
      file: '',
      editingMode: false,
      action: null,
      selectedModel: null,
      selectedRole: null,
      selectedUser: null,
      assignRole: false,
      chosenFile: null,
      select: [],
      search: '',
      //para el cuadro de búsqueda de datatables  
      snackbar: false,
      //para el mensaje del snackbar   
      textSnack: 'texto snackbar',
      //texto que se ve en el snackbar 
      dialog: false,
      //para que la ventana de dialogo o modal no aparezca automáticamente 
      editedIndex: -1,
      imageUrl: '',
      image: '',
      editado: {
        id: '',
        name: '',
        description: '',
        imageUrl: this.imageUrl,
        file: '',
        select: '',
        is_mod: false
      },
      defaultItem: {
        id: '',
        name: '',
        description: '',
        file: '',
        imageUrl: '',
        is_mod: false
      }
    };
  },
  created: function created() {
    this.getbusiness();
    this.getbusinessNode();
  },
  methods: {
    getbusiness: function getbusiness() {
      var _this = this;

      axios.get('/businessList').then(function (response) {
        _this.business = response.data.data;
      })["catch"](function (e) {
        _this.errors.push(e);
      });
    },
    getbusinessNode: function getbusinessNode() {
      var _this2 = this;

      axios.get('/businessNode').then(function (response) {
        _this2.businessNode = response.data.data;
      })["catch"](function (e) {
        _this2.errors.push(e);
      });
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    editar: function editar(item) {
      this.editedIndex = this.business.indexOf(item);
      this.editado = Object.assign({}, item);
      this.editado.is_mod = false;
      this.dialog = true;
    },
    borrar: function borrar(item) {
      var index = this.business.indexOf(item);
      this.editado = Object.assign({}, item);
      console.log(this.business[index].id); //capturo el id de la fila seleccionada 

      var r = confirm("¿Está seguro de borrar el registro?");

      if (r == true) {
        this.deleteCat();
        this.snackbar = true;
        this.textSnack = 'Se eliminó el registro.';
      } else {
        this.snackbar = true;
        this.textSnack = 'Operación cancelada.';
      }
    },
    guardar: function guardar() {
      if (this.editedIndex > -1) {
        //Guarda en caso de Edición
        this.id = this.editado.id;
        this.marca = this.editado.marca;
        this.modelo = this.editado.modelo;
        this.stock = this.editado.stock;
        this.snackbar = true;
        this.textSnack = '¡Actualización Exitosa!';
        this.editarCat();
      } else {
        //Guarda el registro en caso de Alta  
        if (this.editado.marca == "" || this.editado.modelo == "" || this.editado.stock == 0) {
          this.snackbar = true;
          this.textSnack = 'Datos incompletos.';
        } else {
          this.name = this.editado.name;
          this.description = this.editado.description;
          this.snackbar = true;
          this.textSnack = '¡Alta exitosa!';
          this.altaMovil();
        }
      }

      this.cancelar();
    },
    //Procedimiento Alta de moviles.
    altaMovil: function altaMovil() {
      var _this3 = this;

      axios.post('/business/add', this.editado).then(function (response) {
        _this3.getbusiness();
      });
      this.name = "", this.description = "";
    },
    editarCat: function editarCat() {
      var _this4 = this;

      console.log(this.editado);
      axios.put('/business/update', this.editado).then(function (response) {
        _this4.getbusiness();
      });
      this.name = "", this.description = "";
    },
    deleteCat: function deleteCat() {
      var _this5 = this;

      axios.put('/business/delete', this.editado).then(function (response) {
        _this5.getbusiness();
      });
      this.name = "", this.description = "";
    },
    handleFileUpload: function handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.editado.file = this.$refs.file.files[0];
      console.log(this.editado.file);
    },
    onPickFile: function onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked: function onFilePicked(event) {
      var _this6 = this;

      var files = event.target.files;
      var filename = files[0].name;
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        _this6.imageUrl = fileReader.result;
        _this6.editado.is_mod = true;
        _this6.editado.imageUrl = fileReader.result;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Business.vue?vue&type=template&id=4fb3dcec&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Business.vue?vue&type=template&id=4fb3dcec& ***!
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
                  items: _vm.business,
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
                                  "v-form",
                                  {
                                    ref: "form",
                                    scopedSlots: _vm._u([
                                      {
                                        key: "activator",
                                        fn: function(ref) {
                                          var on = ref.on
                                          return undefined
                                        }
                                      }
                                    ])
                                  },
                                  [
                                    _vm._v(" "),
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
                                                _c(
                                                  "v-row",
                                                  [
                                                    _c("v-text-field", {
                                                      attrs: {
                                                        label: "Nombre",
                                                        required: ""
                                                      },
                                                      model: {
                                                        value: _vm.editado.name,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.editado,
                                                            "name",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "editado.name"
                                                      }
                                                    }),
                                                    _vm._v(" "),
                                                    _c("v-text-field", {
                                                      attrs: {
                                                        label: "Descripción",
                                                        required: ""
                                                      },
                                                      model: {
                                                        value:
                                                          _vm.editado
                                                            .description,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.editado,
                                                            "description",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "editado.description"
                                                      }
                                                    })
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "v-row",
                                                  [
                                                    _c(
                                                      "v-col",
                                                      {
                                                        attrs: {
                                                          cols: "12",
                                                          sm: "6",
                                                          md: "4"
                                                        }
                                                      },
                                                      [
                                                        _c("v-combobox", {
                                                          attrs: {
                                                            items:
                                                              _vm.businessNode,
                                                            label:
                                                              "(Seleccione una opción)",
                                                            "item-text": "name",
                                                            outlined: "",
                                                            dense: "",
                                                            required: ""
                                                          },
                                                          model: {
                                                            value:
                                                              _vm.editado
                                                                .select,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.$set(
                                                                _vm.editado,
                                                                "select",
                                                                $$v
                                                              )
                                                            },
                                                            expression:
                                                              "editado.select"
                                                          }
                                                        })
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "v-col",
                                                      {
                                                        attrs: {
                                                          cols: "12",
                                                          sm: "6",
                                                          md: "4"
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-card-text",
                                                          [
                                                            _c(
                                                              "v-btn",
                                                              {
                                                                staticClass:
                                                                  "primary",
                                                                attrs: {
                                                                  raised: ""
                                                                },
                                                                on: {
                                                                  click:
                                                                    _vm.onPickFile
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "Subir imagen"
                                                                )
                                                              ]
                                                            ),
                                                            _vm._v(" "),
                                                            _c("input", {
                                                              ref: "fileInput",
                                                              staticStyle: {
                                                                display: "none"
                                                              },
                                                              attrs: {
                                                                type: "file",
                                                                accept:
                                                                  "image/jpeg",
                                                                required: ""
                                                              },
                                                              on: {
                                                                change:
                                                                  _vm.onFilePicked
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
                    key: "item.action",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _c("img", {
                          staticStyle: { width: "50px", height: "50px" },
                          attrs: { src: "" + item.image }
                        }),
                        _vm._v(" "),
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

/***/ "./resources/js/components/views/Business.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/views/Business.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Business_vue_vue_type_template_id_4fb3dcec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Business.vue?vue&type=template&id=4fb3dcec& */ "./resources/js/components/views/Business.vue?vue&type=template&id=4fb3dcec&");
/* harmony import */ var _Business_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Business.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Business.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Business_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Business_vue_vue_type_template_id_4fb3dcec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Business_vue_vue_type_template_id_4fb3dcec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Business.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Business.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/views/Business.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Business_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Business.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Business.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Business_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Business.vue?vue&type=template&id=4fb3dcec&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/views/Business.vue?vue&type=template&id=4fb3dcec& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Business_vue_vue_type_template_id_4fb3dcec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Business.vue?vue&type=template&id=4fb3dcec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Business.vue?vue&type=template&id=4fb3dcec&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Business_vue_vue_type_template_id_4fb3dcec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Business_vue_vue_type_template_id_4fb3dcec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);