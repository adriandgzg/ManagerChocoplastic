(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Clients.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Clients.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      headers: [
      /*{
                      text: 'ID',
                      value: 'clie_pk',
                      width: '10%'
                  },*/
      {
        text: "Inden",
        value: "clie_identifier",
        width: "10%"
      }, {
        text: "Nombre",
        value: "clie_name"
      }, {
        text: "Monto Deuda",
        value: "clde_amount_outstanding"
      }, {
        text: "RFC",
        value: "clie_rfc"
      }, {
        text: "Teléfono",
        value: "clie_phone"
      }, {
        text: "Email",
        value: "clie_email"
      }, {
        text: "Dirección",
        value: "clie_addres"
      }, {
        text: "CP",
        value: "clie_cp"
      }, {
        text: "Ciudad",
        value: "clie_city"
      }, {
        text: "Estado",
        value: "feen_name"
      }, {
        text: "Estatus",
        value: "status"
      }, {
        text: "",
        value: "action"
      }],
      select: 0,
      editado: {
        clie_pk: 0,
        feen_fk: 0,
        clie_identifier: "",
        clie_name: "",
        clie_rfc: "",
        clie_phone: "",
        clie_email: "",
        clie_addres: "",
        clie_cp: "",
        clie_city: "",
        clie_status: 0
      },
      defaultItem: {
        clie_pk: 0,
        feen_fk: 0,
        clie_identifier: "",
        clie_name: "",
        clie_rfc: "",
        clie_phone: "",
        clie_email: "",
        clie_addres: "",
        clie_cp: "",
        clie_city: "",
        clie_status: 0
      },
      editedIndex: -1,
      clientes: [],
      entities: [],
      search: "",
      dialog: false,
      snackbar: false,
      timeout: 2000,
      textMsg: "",
      valid: false,
      validProvider: false,
      estado: true,
      folioRules: [function (value) {
        return !!value || "Requerido.";
      }, function (value) {
        return value && value.length >= 10 || "Min 10 caracter";
      }],
      nameRules: [function (value) {
        return !!value || "Requerido.";
      }, function (value) {
        return value && value.length >= 3 || "Min 3 caracteres";
      }],
      phoneRules: [function (value) {
        return !!value || "Requerido.";
      }, function (value) {
        return value && value.length == 10 || "Requiere 10 caracteres";
      }],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: ""
    };
  },
  created: function created() {
    this.getClients();
    this.getEntities();
  },
  methods: {
    getClients: function getClients() {
      var _this = this;

      this.loading = true;
      axios.get("/clientlist").then(function (response) {
        setTimeout(function () {
          return _this.loading = false;
        }, 500);
        _this.clientes = response.data.data;
      })["catch"](function (e) {
        console.log(e);

        _this.normal("Notificación", "Error al cargar los datos", "error");
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
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    edita: function edita(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.editado = Object.assign({}, item);
      this.select = this.editado.feen_fk;
      this.estado = this.editado.clie_status;
      this.dialog = true;
    },
    guardar: function guardar() {
      if (this.estado == true) this.editado.clie_status = 1;else this.editado.clie_status = 0;

      if (this.editedIndex > -1) {
        this.editado.feen_fk = this.select;
        this.editar();
      } else {
        this.editado.feen_fk = this.select.feen_pk;
        this.alta();
      }

      this.cancelar();
    },
    alta: function alta() {
      var _this3 = this;

      axios.post("/clients/add", this.editado).then(function (response) {
        _this3.textMsg = "Guardado Correctamente!";

        _this3.normal("Notificación", _this3.textMsg, "success");

        _this3.getClients();
      });
    },
    editar: function editar() {
      var _this4 = this;

      axios.post("/clients/update", this.editado).then(function (response) {
        _this4.textMsg = "Modificado Correctamente!";

        _this4.normal("Notificación", _this4.textMsg, "success");

        _this4.getClients();
      });
    },
    borrar: function borrar(item) {
      var index = this.clientes.indexOf(item);
      this.editado = Object.assign({}, item);
      this.dialogQuestionDelete = true;
    },
    guardaBorrar: function guardaBorrar() {
      this["delete"]();
      this.dialogQuestionDelete = false;
    },
    "delete": function _delete() {
      var _this5 = this;

      axios.post("/clients/delete", this.editado).then(function (response) {
        _this5.textMsg = "¡Eliminado Correctamente!";

        _this5.normal("Notificación", _this5.textMsg, "success");

        _this5.getClients();
      });
    },
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
        return negativeSign + (j ? i.substr(0, j) + thousands : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e);
      }
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
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Clients.vue?vue&type=template&id=1344078c&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Clients.vue?vue&type=template&id=1344078c& ***!
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
              _vm._v("\n      " + _vm._s(_vm.textMsg) + "\n      "),
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
                [_vm._v("Cerrar")]
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
                              value: _vm.editado.clie_name,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "clie_name", $$v)
                              },
                              expression: "editado.clie_name"
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
                              value: _vm.editado.clie_identifier,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "clie_identifier", $$v)
                              },
                              expression: "editado.clie_identifier"
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
                              value: _vm.editado.clie_rfc,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "clie_rfc", $$v)
                              },
                              expression: "editado.clie_rfc"
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
                              value: _vm.editado.clie_phone,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "clie_phone", $$v)
                              },
                              expression: "editado.clie_phone"
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
                              value: _vm.editado.clie_email,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "clie_email", $$v)
                              },
                              expression: "editado.clie_email"
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
                              value: _vm.editado.clie_addres,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "clie_addres", $$v)
                              },
                              expression: "editado.clie_addres"
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
                              value: _vm.editado.clie_cp,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "clie_cp", $$v)
                              },
                              expression: "editado.clie_cp"
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
                              value: _vm.editado.clie_city,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "clie_city", $$v)
                              },
                              expression: "editado.clie_city"
                            }
                          }),
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
                          _c("v-select", {
                            attrs: {
                              items: _vm.entities,
                              label: "Selecione un estado",
                              "single-line": "",
                              "item-text": "feen_name",
                              "item-value": "feen_pk",
                              "return-object": "",
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
                          items: _vm.clientes,
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
                            key: "item.clde_amount_outstanding",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                _c("v-label", [
                                  _vm._v(
                                    "$" +
                                      _vm._s(
                                        _vm.formatMoney(
                                          item.clde_amount_outstanding
                                        )
                                      )
                                  )
                                ])
                              ]
                            }
                          },
                          {
                            key: "item.status",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                item.clie_status == 1
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "green", dark: "" } },
                                      [_vm._v("Activo")]
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

/***/ "./resources/js/components/views/Clients.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/views/Clients.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Clients_vue_vue_type_template_id_1344078c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clients.vue?vue&type=template&id=1344078c& */ "./resources/js/components/views/Clients.vue?vue&type=template&id=1344078c&");
/* harmony import */ var _Clients_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Clients.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Clients.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Clients_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Clients_vue_vue_type_template_id_1344078c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Clients_vue_vue_type_template_id_1344078c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Clients.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Clients.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/views/Clients.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Clients_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Clients.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Clients.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Clients_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Clients.vue?vue&type=template&id=1344078c&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/views/Clients.vue?vue&type=template&id=1344078c& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Clients_vue_vue_type_template_id_1344078c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Clients.vue?vue&type=template&id=1344078c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Clients.vue?vue&type=template&id=1344078c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Clients_vue_vue_type_template_id_1344078c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Clients_vue_vue_type_template_id_1344078c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);