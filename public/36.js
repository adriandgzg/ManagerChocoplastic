(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[36],{

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      dialog: false,
      dialogPassword: false,
      show1: false,
      statuses: [{
        name: 'Cliente',
        id: 1
      }, {
        name: 'Repartidor',
        id: 2
      }],
      valid: false,
      validUpdate: false,
      validPassword: false,
      genders: [],
      gender: '',
      store: '',
      stores: [],
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
        text: 'No. Empleado',
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
        id: '',
        name: '',
        email: '',
        password: '',
        phone_number: '',
        birthday: '',
        gender: '',
        profile_picture: '',
        user_type: '',
        user_type_id: 0,
        stor_fk: 0
      },
      defaultItem: {
        id: '',
        name: '',
        email: '',
        password: '',
        phone_number: '',
        birthday: '',
        gender: '',
        profile_picture: '',
        user_type: '',
        user_type_id: 0,
        stor_fk: 0
      },
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
      rules: {
        required: function required(value) {
          return !!value || 'Requiredo.';
        },
        min: function min(v) {
          return v.length >= 8 || 'Min 8 caracteres';
        },
        email: function email(value) {
          var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'E-mail inválido.';
        }
      }
    };
  },
  created: function created() {
    this.getUser();
    this.getGenders();
    this.getStores();
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
    getGenders: function getGenders() {
      var _this2 = this;

      axios.get('/clients/genders').then(function (response) {
        _this2.genders = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getStores: function getStores() {
      var _this3 = this;

      axios.get('/storeget').then(function (response) {
        _this3.stores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    editarTipo: function editarTipo(item) {
      //this.editedIndexNeg = this.business.indexOf(item)
      console.log(item);
      this.editado = Object.assign({}, item);
      this.gender = this.editado.gender;
      this.store = this.editado.stor_fk;
      console.log(this.editado);
      this.dialog = true;
    },
    editarPassword: function editarPassword(item) {
      this.editado = Object.assign({}, item);
      this.dialogPassword = true;
    },
    cancelar: function cancelar() {
      this.dialogForm = false;
      this.editado = Object.assign({}, this.defaultItem);
    },
    guardar: function guardar() {
      var _this4 = this;

      this.editado.gender = this.gender;
      this.editado.stor_fk = this.store;
      console.log(this.editado); //this.editado.user_type_id = this.status

      axios.post('signup', this.editado).then(function (response) {
        if (response.data.status.code == 200) {
          alert(response.data.status.message);
          _this4.dialogForm = false;

          _this4.getUser();
        } else {
          alert(response.data.status.message);
        }
      });
    },
    actualizar: function actualizar() {
      var _this5 = this;

      this.editado.gender = this.gender;
      this.editado.stor_fk = this.store;
      console.log(this.editado);
      axios.post('/user/update', this.editado).then(function (response) {
        if (response.data.status.code == 200) {
          alert(response.data.status.message);
          _this5.dialog = false;

          _this5.getUser();
        } else {
          alert(response.data.status.message);
        }
      });
    },
    actualizarPassword: function actualizarPassword() {
      var _this6 = this;

      axios.post('/user/password/change', this.editado).then(function (response) {
        if (response.data.status.code == 200) {
          alert(response.data.status.message);
          _this6.dialogPassword = false;

          _this6.getUser();
        } else {
          alert(response.data.status.message);
        }
      });
    },
    cancelarupdate: function cancelarupdate() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
    },
    cancelarPassword: function cancelarPassword() {
      this.dialogPassword = false;
      this.editado = Object.assign({}, this.defaultItem);
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
                                            _vm.dialogForm = !_vm.dialogForm
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
                              color: "blue"
                            },
                            on: {
                              click: function($event) {
                                return _vm.editarPassword(item)
                              }
                            }
                          },
                          [
                            _c("v-icon", { attrs: { dark: "" } }, [
                              _vm._v("mdi-account-key")
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
                _c("span", { staticClass: "headline" }, [_vm._v("Usuario")])
              ]),
              _vm._v(" "),
              _c(
                "v-form",
                {
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
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        [
                          _c("v-text-field", {
                            attrs: {
                              label: "Nombre",
                              maxlength: "300",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.name,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "name", $$v)
                              },
                              expression: "editado.name"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Email",
                              maxlength: "300",
                              rules: [_vm.rules.required, _vm.rules.email],
                              required: ""
                            },
                            model: {
                              value: _vm.editado.email,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "email", $$v)
                              },
                              expression: "editado.email"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "No. Empleado",
                              maxlength: "300",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.phone_number,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "phone_number", $$v)
                              },
                              expression: "editado.phone_number"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Contraseña",
                              maxlength: "300",
                              rules: [_vm.rules.required, _vm.rules.min],
                              "append-icon": _vm.show1
                                ? "mdi-eye"
                                : "mdi-eye-off",
                              type: _vm.show1 ? "text" : "password"
                            },
                            on: {
                              "click:append": function($event) {
                                _vm.show1 = !_vm.show1
                              }
                            },
                            model: {
                              value: _vm.editado.password,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "password", $$v)
                              },
                              expression: "editado.password"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.genders,
                              "item-text": "name",
                              "item-value": "name",
                              filled: "",
                              chips: "",
                              label: "Genero",
                              placeholder: "Selecciona su genero"
                            },
                            model: {
                              value: _vm.gender,
                              callback: function($$v) {
                                _vm.gender = $$v
                              },
                              expression: "gender"
                            }
                          }),
                          _vm._v(" "),
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
                              attrs: {
                                disabled: !_vm.valid,
                                color: "teal accent-4"
                              },
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
      ),
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
              _c("v-card-title", { staticClass: "cyan white--text" }, [
                _c("span", { staticClass: "headline" }, [_vm._v("Usuario")])
              ]),
              _vm._v(" "),
              _c(
                "v-form",
                {
                  model: {
                    value: _vm.validUpdate,
                    callback: function($$v) {
                      _vm.validUpdate = $$v
                    },
                    expression: "validUpdate"
                  }
                },
                [
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        [
                          _c("v-text-field", {
                            attrs: {
                              label: "Nombre",
                              maxlength: "300",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.name,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "name", $$v)
                              },
                              expression: "editado.name"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Email",
                              maxlength: "300",
                              rules: [_vm.rules.required, _vm.rules.email],
                              required: ""
                            },
                            model: {
                              value: _vm.editado.email,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "email", $$v)
                              },
                              expression: "editado.email"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "No. Empleado",
                              maxlength: "300",
                              disabled: ""
                            },
                            model: {
                              value: _vm.editado.phone_number,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "phone_number", $$v)
                              },
                              expression: "editado.phone_number"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.genders,
                              "item-text": "name",
                              "item-value": "name",
                              filled: "",
                              chips: "",
                              label: "Genero",
                              placeholder: "Selecciona su genero"
                            },
                            model: {
                              value: _vm.gender,
                              callback: function($$v) {
                                _vm.gender = $$v
                              },
                              expression: "gender"
                            }
                          }),
                          _vm._v(" "),
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
                              on: { click: _vm.cancelarupdate }
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
                              attrs: {
                                disabled: !_vm.validUpdate,
                                color: "teal accent-4"
                              },
                              on: { click: _vm.actualizar }
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
      ),
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
            value: _vm.dialogPassword,
            callback: function($$v) {
              _vm.dialogPassword = $$v
            },
            expression: "dialogPassword"
          }
        },
        [
          _vm._v(" "),
          _c(
            "v-card",
            [
              _c("v-card-title", { staticClass: "cyan white--text" }, [
                _c("span", { staticClass: "headline" }, [
                  _vm._v("Cambio de Contraseña")
                ])
              ]),
              _vm._v(" "),
              _c(
                "v-form",
                {
                  model: {
                    value: _vm.validPassword,
                    callback: function($$v) {
                      _vm.validPassword = $$v
                    },
                    expression: "validPassword"
                  }
                },
                [
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        [
                          _c("v-text-field", {
                            attrs: {
                              label: "Contraseña",
                              maxlength: "300",
                              rules: [_vm.rules.required, _vm.rules.min],
                              "append-icon": _vm.show1
                                ? "mdi-eye"
                                : "mdi-eye-off",
                              type: _vm.show1 ? "text" : "password"
                            },
                            on: {
                              "click:append": function($event) {
                                _vm.show1 = !_vm.show1
                              }
                            },
                            model: {
                              value: _vm.editado.password,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "password", $$v)
                              },
                              expression: "editado.password"
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
                              on: { click: _vm.cancelarPassword }
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
                              attrs: {
                                disabled: !_vm.validPassword,
                                color: "teal accent-4"
                              },
                              on: { click: _vm.actualizarPassword }
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