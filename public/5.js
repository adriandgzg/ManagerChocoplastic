(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Categorie.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Categorie.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        value: 'name',
        width: '20%'
      }, {
        text: 'Descripción',
        value: 'description',
        width: '35%'
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
      categories: [],
      subcategories: [],
      categoriesNode: [],
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
      dialogSub: false,
      dialogAddSub: false,
      editedIndex: -1,
      editedSubIndex: -1,
      editedAddSubIndex: -1,
      imageUrl: '',
      image: '',
      editado: {
        id: '',
        name: '',
        description: '',
        imageUrl: this.imageUrl,
        file: '',
        select: ''
      },
      editadoSub: {
        id: '',
        name: '',
        description: '',
        category_id: '',
        imageUrl: this.imageUrl,
        file: '',
        select: ''
      },
      defaultItem: {
        id: '',
        name: '',
        description: '',
        file: '',
        imageUrl: ''
      }
    };
  },
  created: function created() {
    this.getCategories();
    this.getCategoriesNode();
    /* this.getcategories();
     this.getRoles();
     this.getPermissions();*/
  },
  methods: {
    getCategories: function getCategories() {
      var _this = this;

      axios.get('/categoriesList').then(function (response) {
        _this.categories = response.data.data;
      })["catch"](function (e) {
        _this.errors.push(e);
      });
    },
    getSubcategories: function getSubcategories() {
      var _this2 = this;

      axios.get('/subcategoriesList?id=' + this.editado.id).then(function (response) {
        _this2.subcategories = response.data.data;
      })["catch"](function (e) {
        _this2.errors.push(e);
      });
    },
    getCategoriesNode: function getCategoriesNode() {
      var _this3 = this;

      axios.get('/categoriesNode').then(function (response) {
        _this3.categoriesNode = response.data.data;
      })["catch"](function (e) {
        _this3.errors.push(e);
      });
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    cancelarSub: function cancelarSub() {
      this.dialogAddSub = false;
      this.editadoSub = Object.assign({}, this.defaultItem);
      this.editedAddSubIndex = -1;
    },
    editar: function editar(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editado = Object.assign({}, item);
      this.dialog = true;
    },
    editarSub: function editarSub(item) {
      this.editedSubIndex = this.subcategories.indexOf(item);
      this.editado = Object.assign({}, item);
      this.dialogSub = true;
      this.getSubcategories();
    },
    editarAddSub: function editarAddSub(item) {
      console.log(item);
      this.editedAddSubIndex = this.subcategories.indexOf(item);
      this.editadoSub = Object.assign({}, item);
      this.dialogAddSub = true;
    },
    borrar: function borrar(item) {
      var index = this.categories.indexOf(item);
      this.editado = Object.assign({}, item);
      console.log(this.categories[index].id); //capturo el id de la fila seleccionada

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
    borrarSub: function borrarSub(item) {
      var index = this.subcategories.indexOf(item);
      this.editadoSub = Object.assign({}, item);
      console.log(this.subcategories[index].id); //capturo el id de la fila seleccionada

      var r = confirm("¿Está seguro de borrar el registro?");

      if (r == true) {
        this.deleteSubCat();
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
        this.textSnack = '¡Actualización Exitosa!';
        this.editarCat();
      } else {
        //Guarda el registro en caso de Alta
        if (this.editado.marca == "" || this.editado.modelo == "" || this.editado.stock == 0) {
          this.snackbar = true;
          this.textSnack = 'Datos incompletos.';
        } else {
          this.textSnack = '¡Alta exitosa!';
          this.imageUrl = '';
          this.altaMovil();
        }
      }

      this.cancelar();
    },
    guardarSub: function guardarSub() {
      console.log(this.editedAddSubIndex);

      if (this.editedAddSubIndex > -1) {
        //Guarda en caso de Edición
        this.textSnack = '¡Actualización Exitosa!';
        this.imageUrl = '';
        this.editarSubCat();
      } else {
        this.altaSubCat();
      }

      this.cancelarSub();
    },
    //Procedimiento Alta de moviles.
    altaMovil: function altaMovil() {
      var _this4 = this;

      axios.post('/categories/add', this.editado).then(function (response) {
        _this4.getCategories();
      });
      this.name = "", this.description = "";
    },
    altaSubCat: function altaSubCat() {
      var _this5 = this;

      console.log(this.editado.id);
      this.editadoSub.category_id = this.editado.id;
      axios.post('/categories/addSub', this.editadoSub).then(function (response) {
        _this5.getSubcategories();

        _this5.imageUrl = '';
      });
      this.name = "", this.description = "";
    },
    editarCat: function editarCat() {
      var _this6 = this;

      axios.put('/categories/update', this.editado).then(function (response) {
        _this6.getCategories();

        _this6.imageUrl = '';
      });
      this.name = "", this.description = "";
    },
    editarSubCat: function editarSubCat() {
      var _this7 = this;

      console.log(this.editado.id);
      this.editadoSub.category_id = this.editado.id;
      axios.put('/categories/updateSub', this.editadoSub).then(function (response) {
        _this7.getSubcategories();

        _this7.imageUrl = '';
      });
      this.name = "", this.description = "";
    },
    deleteCat: function deleteCat() {
      var _this8 = this;

      axios.put('/categories/delete', this.editado).then(function (response) {
        _this8.getCategories();
      });
      this.name = "", this.description = "";
    },
    deleteSubCat: function deleteSubCat() {
      var _this9 = this;

      console.log(this.editadoSub);
      axios.put('/categories/deleteSub', this.editadoSub).then(function (response) {
        _this9.getSubcategories();
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
      var _this10 = this;

      var files = event.target.files;
      var filename = files[0].name;
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        _this10.imageUrl = fileReader.result;
        _this10.editado.imageUrl = fileReader.result;
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
    },
    formTitleSub: function formTitleSub() {
      //operadores condicionales "condición ? expr1 : expr2"
      // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
      return this.editedSubIndex === -1 ? 'Nuevo Registro' : 'Subcategorías';
    },
    formTitleAddSub: function formTitleAddSub() {
      //operadores condicionales "condición ? expr1 : expr2"
      // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
      return this.editedSubIndex === -1 ? 'Nuevo Registro' : 'Subcategorías';
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Categorie.vue?vue&type=template&id=7d05283b&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Categorie.vue?vue&type=template&id=7d05283b& ***!
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
                  items: _vm.categories,
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
                              [_vm._v("Categorías")]
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
                                attrs: { "max-width": "800px" },
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
                                  value: _vm.dialogSub,
                                  callback: function($$v) {
                                    _vm.dialogSub = $$v
                                  },
                                  expression: "dialogSub"
                                }
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
                                          [_vm._v(_vm._s(_vm.formTitleSub))]
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-card-text",
                                      {
                                        staticStyle: {
                                          height: "40px",
                                          position: "relative"
                                        }
                                      },
                                      [
                                        _c(
                                          "v-btn",
                                          {
                                            attrs: {
                                              absolute: "",
                                              dark: "",
                                              fab: "",
                                              top: "",
                                              right: "",
                                              color: "green"
                                            },
                                            on: {
                                              click: function($event) {
                                                _vm.dialogAddSub = !_vm.dialogAddSub
                                              }
                                            }
                                          },
                                          [_c("v-icon", [_vm._v("mdi-plus")])],
                                          1
                                        )
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-card-text",
                                      [
                                        _c(
                                          "v-container",
                                          [
                                            _c("v-data-table", {
                                              staticClass: "elevation-3",
                                              attrs: {
                                                headers: _vm.headers,
                                                items: _vm.subcategories,
                                                search: _vm.search,
                                                "sort-by": "id"
                                              },
                                              scopedSlots: _vm._u([
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
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.editarAddSub(
                                                                item
                                                              )
                                                            }
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "v-icon",
                                                            {
                                                              attrs: {
                                                                dark: ""
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                "mdi-pencil"
                                                              )
                                                            ]
                                                          )
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
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.borrarSub(
                                                                item
                                                              )
                                                            }
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "v-icon",
                                                            {
                                                              attrs: {
                                                                dark: ""
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                "mdi-delete"
                                                              )
                                                            ]
                                                          )
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
                            ),
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
                                              attrs: { label: "Nombre" },
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
                                              attrs: { label: "Descripción" },
                                              model: {
                                                value: _vm.editado.description,
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
                                          [
                                            _vm._v(
                                              "Cancelar\n                                    "
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
                                              "Guardar\n                                    "
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
                            ),
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
                                  value: _vm.dialogAddSub,
                                  callback: function($$v) {
                                    _vm.dialogAddSub = $$v
                                  },
                                  expression: "dialogAddSub"
                                }
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
                                          [_vm._v(_vm._s(_vm.formTitleAddSub))]
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
                                              attrs: { label: "Nombre" },
                                              model: {
                                                value: _vm.editadoSub.name,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.editadoSub,
                                                    "name",
                                                    $$v
                                                  )
                                                },
                                                expression: "editadoSub.name"
                                              }
                                            }),
                                            _vm._v(" "),
                                            _c("v-text-field", {
                                              attrs: { label: "Descripción" },
                                              model: {
                                                value:
                                                  _vm.editadoSub.description,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.editadoSub,
                                                    "description",
                                                    $$v
                                                  )
                                                },
                                                expression:
                                                  "editadoSub.description"
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
                                            on: { click: _vm.cancelarSub }
                                          },
                                          [
                                            _vm._v(
                                              "\n                                        Cancelar\n                                    "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-btn",
                                          {
                                            staticClass: "ma-2 white--text",
                                            attrs: { color: "teal accent-4" },
                                            on: { click: _vm.guardarSub }
                                          },
                                          [
                                            _vm._v(
                                              "\n                                        Guardar\n                                    "
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
                                return _vm.editarSub(item)
                              }
                            }
                          },
                          [
                            _c("v-icon", { attrs: { dark: "" } }, [
                              _vm._v("mdi-eye")
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

/***/ "./resources/js/components/views/Categorie.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/views/Categorie.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Categorie_vue_vue_type_template_id_7d05283b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Categorie.vue?vue&type=template&id=7d05283b& */ "./resources/js/components/views/Categorie.vue?vue&type=template&id=7d05283b&");
/* harmony import */ var _Categorie_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Categorie.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Categorie.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Categorie_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Categorie_vue_vue_type_template_id_7d05283b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Categorie_vue_vue_type_template_id_7d05283b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Categorie.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Categorie.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/views/Categorie.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categorie_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Categorie.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Categorie.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categorie_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Categorie.vue?vue&type=template&id=7d05283b&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/views/Categorie.vue?vue&type=template&id=7d05283b& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categorie_vue_vue_type_template_id_7d05283b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Categorie.vue?vue&type=template&id=7d05283b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Categorie.vue?vue&type=template&id=7d05283b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categorie_vue_vue_type_template_id_7d05283b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categorie_vue_vue_type_template_id_7d05283b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);