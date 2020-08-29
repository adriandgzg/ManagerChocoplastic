(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/DetailOrder.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/DetailOrder.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
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
//
//
//
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
      clor_pk: this.$route.params.id,
      valid: false,
      sales: [],
      stores: [],
      clients: [],
      payments: [],
      paymentsOriginal: [],
      saleHeader: '',
      saleDetail: [],
      desserts: [],
      selectClient: '',
      selectStore: '',
      selectpame: '',
      snackbar: false,
      timeout: 2000,
      subtotal: 0,
      total: 0,
      cambio: 0,
      iva: 0,
      efectivo: 0,
      tarjeta: 0,
      textMsg: "",
      editado: {
        clsd_pk: 0,
        clsd_quantity: 0
      },
      editadoSale: {
        clsa_pk: 0,
        clie_fk: 0,
        pame_fk: 0,
        stor_fk: 0,
        clde_amount: 0,
        clpa_amount_cash: 0,
        clpa_amount_transfer: 0
      },
      enabledStore: false,
      dialogcredito: false,
      dialogcontado: false,
      storeUser: '',
      minNumberRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value > 0 || 'El número debe ser mayor o igual a cero';
      }],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: ''
    };
  },
  created: function created() {
    this.createsale();
    this.getClients();
    this.getPaymentShow();
    this.getStores();
    this.getUsers();
  },
  methods: {
    getUsers: function getUsers() {
      var _this = this;

      axios.get('/listUser').then(function (response) {
        _this.users = response.data.data;

        if (_this.users.store_id > 0) {
          _this.enabledStore = true;
          _this.selectStore = _this.stores.find(function (item) {
            return item.stor_pk == _this.users.store_id;
          });
        } else _this.enabledStore = false;
      })["catch"](function (e) {
        _this.errors.push(e);
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
        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e);
      }
    },
    formatPrice: function formatPrice(value) {
      var val = (value / 1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    onQuantityChange: function onQuantityChange(item) {
      var _this2 = this;

      this.editado = Object.assign({}, item);
      axios.post('/client_sale_details/update', this.editado).then(function (response) {
        _this2.textMsg = "¡Actualizado correctamente!";
        console.log("¡Actualizado correctamente!");

        _this2.getTotal();
      })["catch"](function (e) {
        _this2.errors.push(e);
      });
    },
    onChangeClient: function onChangeClient() {
      if (this.selectClient.clie_pk == 1) {
        console.log('getPaymentShow');
        this.getPaymentShow();
      } else {
        console.log('getPayment');
        this.getPayment();
      }
    },
    finalizar: function finalizar() {
      console.log(this.selectClient);
      this.efectivo = 0;
      this.tarjeta = 0;

      if (this.selectClient == '' || this.selectClient == null) {
        this.normal('Alerta', 'Debe seleccionar un cliente', "error");
        return;
      }

      if (this.selectpame == '' || this.selectpame == null) {
        this.normal('Alerta', 'Debe seleccionar un método de pago', "error");
        return;
      }

      if (!this.enabledStore) if (this.selectStore == '' || this.selectStore == null) {
        this.normal('Alerta', 'Debe seleccionar una sucursal', "error");
        return;
      }
      this.editadoSale.clsa_pk = this.saleHeader.clsa_pk;
      this.editadoSale.clie_fk = this.selectClient.clie_pk;
      this.editadoSale.pame_fk = this.selectpame.pame_pk;
      if (!this.enabledStore) this.editadoSale.stor_fk = this.selectStore.stor_pk;else this.editadoSale.stor_fk = this.users.store_id;
      console.log(this.editadoSale);

      if (this.editadoSale.pame_fk == 1) {
        this.dialogcontado = true;
        this.getcambio();
      } else this.dialogcredito = true;
    },
    finalizarVenta: function finalizarVenta() {
      console.log(this.total + '-' + (this.efectivo + this.tarjeta));

      if (this.editadoSale.pame_fk == 1) {
        var montototal = parseFloat(this.efectivo) + parseFloat(this.tarjeta);
        var operacion = parseFloat(this.total) - montototal;

        if (operacion <= 0) {} else {
          this.normal('Notificación', 'Los montos de pago deben ser igual al total', "success");
          return;
        }
      }

      this.messageQuestion = '¿Desea finalizar la Venta?';
      this.dialogQuestion = true;
    },
    guardaFinalizar: function guardaFinalizar() {
      var _this3 = this;

      this.editadoSale.clde_amount = this.total;
      this.editadoSale.clpa_amount_cash = this.efectivo;
      this.editadoSale.clpa_amount_transfer = this.tarjeta;
      axios.post('/clientsales/update', this.editadoSale).then(function (response) {
        console.log(response);

        if (response.data.code == 200) {
          _this3.textMsg = "¡Actualizado correctamente!";

          _this3.normal('Notificación', '¡Actualizado correctamente!', "success");

          _this3.$router.push('/client/sales/printOrder/' + response.data.data);

          _this3.$router.push('/sales');
        } else {
          _this3.normal('Notificación', response.data.message, "error");
        }
      })["catch"](function (e) {
        _this3.errors.push(e);
      });
    },
    createsale: function createsale() {
      var _this4 = this;

      this.loading = true;
      axios.post('/clientsales?clor_pk=' + this.clor_pk + '').then(function (response) {
        setTimeout(function () {
          return _this4.loading = false;
        }, 2000);
        console.log(response.data);

        if (response.data.data != null) {
          console.log(response.data);
          _this4.sales = response.data.data;
          _this4.saleHeader = response.data.data.sale;
          _this4.desserts = _this4.sales.sale_details;

          _this4.getTotal();
        } else {
          _this4.normal('Notificación', response.data.message, "error");
        }
      })["catch"](function (e) {
        //this.errors.push(e)
        console.log(e);

        _this4.normal('Notificación', "Error al cargar los datos", "error");
      });
    },
    getcambio: function getcambio() {
      if (this.efectivo - this.total > 0) this.cambio = this.efectivo - this.total;else this.cambio = 0;
    },
    getTotal: function getTotal() {
      for (var i = 0; i < this.desserts.length; i++) {
        this.subtotal = this.subtotal + this.desserts[i].clsd_price * this.desserts[i].clsd_quantity;
      } //this.iva =  this.subtotal * 0.16;


      this.total = this.subtotal + this.iva;
    },
    getClients: function getClients() {
      var _this5 = this;

      axios.get("/clientsget").then(function (response) {
        _this5.clients = response.data.data;
        _this5.selectClient = _this5.clients[0];
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getPayment: function getPayment() {
      var _this6 = this;

      axios.get("/paymentmethodsget").then(function (response) {
        _this6.payments = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getPaymentShow: function getPaymentShow() {
      var _this7 = this;

      axios.get("/paymentmethodsshow/1").then(function (response) {
        _this7.payments = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getStores: function getStores() {
      var _this8 = this;

      axios.get("/storeget").then(function (response) {
        _this8.stores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    borrar: function borrar(item) {
      this.editado = Object.assign({}, item);
      this.dialogQuestionDelete = true;
    },
    guardaBorrar: function guardaBorrar() {
      this["delete"]();
      this.dialogQuestionDelete = false;
    },
    "delete": function _delete() {
      var _this9 = this;

      axios.post('/client_sale_details/destroy', this.editado).then(function (response) {
        _this9.textMsg = "¡Eliminado correctamente!";

        _this9.normal('Notificación', _this9.textMsg, "success");

        _this9.createsale();
      });
    },
    actualizar: function actualizar(item) {
      var _this10 = this;

      this.editado = Object.assign({}, item);
      axios.post('/client_sale_details/update', this.editado).then(function (response) {
        _this10.textMsg = "¡Actualizado correctamente!";

        _this10.normal('Notificación', _this10.textMsg, "success");
      })["catch"](function (e) {
        _this10.errors.push(e);
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
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/DetailOrder.vue?vue&type=template&id=2bff1afe&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/DetailOrder.vue?vue&type=template&id=2bff1afe& ***!
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
                      _vm._v(
                        "\r\n                    Cargando\r\n                    "
                      ),
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
                value: _vm.dialogQuestion,
                callback: function($$v) {
                  _vm.dialogQuestion = $$v
                },
                expression: "dialogQuestion"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", { staticClass: "headline" }, [
                    _vm._v("Información")
                  ]),
                  _vm._v(" "),
                  _c("v-card-text", [
                    _vm._v(_vm._s(_vm.messageQuestion) + ".")
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
                              _vm.dialogQuestion = false
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
                          on: { click: _vm.guardaFinalizar }
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
                "\r\n            " + _vm._s(_vm.textMsg) + "\r\n            "
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
                [_vm._v("\r\n                Cerrar\r\n            ")]
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
                            "v-card-title",
                            { staticClass: "subheading font-weight-bold" },
                            [
                              _vm._v(
                                "No. Pedido: " + _vm._s(_vm.saleHeader.clor_fk)
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("v-divider"),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c(
                                    "v-card-text",
                                    {
                                      staticClass:
                                        "category d-inline-flex font-weight-light"
                                    },
                                    [
                                      _c("v-combobox", {
                                        attrs: {
                                          items: _vm.clients,
                                          label: "Cliente",
                                          "item-text": "clie_name",
                                          "item-value": "clie_pk",
                                          filled: "",
                                          chips: "",
                                          placeholder: "Seleccionar Cliente"
                                        },
                                        on: {
                                          change: function($event) {
                                            return _vm.onChangeClient()
                                          }
                                        },
                                        model: {
                                          value: _vm.selectClient,
                                          callback: function($$v) {
                                            _vm.selectClient = $$v
                                          },
                                          expression: "selectClient"
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c(
                                    "v-card-text",
                                    {
                                      staticClass:
                                        "category d-inline-flex font-weight-light"
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "subheading font-weight-bold"
                                        },
                                        [_vm._v("Vendedor:")]
                                      ),
                                      _vm._v(
                                        "  Carlos Jiménez Martinez\r\n                                "
                                      )
                                    ]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c(
                                    "v-card-text",
                                    {
                                      staticClass:
                                        "category d-inline-flex font-weight-light"
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "subheading font-weight-bold"
                                        },
                                        [_vm._v("Fecha:")]
                                      ),
                                      _vm._v(
                                        "  10/10/2020\r\n                                "
                                      )
                                    ]
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
                                { attrs: { cols: "6" } },
                                [
                                  _c(
                                    "v-card-text",
                                    {
                                      staticClass:
                                        "category d-inline-flex font-weight-light"
                                    },
                                    [
                                      _vm.enabledStore
                                        ? _c("v-label", [
                                            _vm._v(
                                              "\r\n                                        Sucursal: " +
                                                _vm._s(_vm.users.stor_name) +
                                                "\r\n                                    "
                                            )
                                          ])
                                        : _c("v-combobox", {
                                            attrs: {
                                              required: "",
                                              items: _vm.stores,
                                              disabled: _vm.enabledStore,
                                              label: "Sucursal",
                                              "item-text": "stor_name",
                                              "item-value": "stor_pk",
                                              filled: "",
                                              chips: "",
                                              placeholder:
                                                "Seleccionar una sucursal"
                                            },
                                            model: {
                                              value: _vm.selectStore,
                                              callback: function($$v) {
                                                _vm.selectStore = $$v
                                              },
                                              expression: "selectStore"
                                            }
                                          })
                                    ],
                                    1
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "6" } },
                                [
                                  _c(
                                    "v-card-text",
                                    {
                                      staticClass:
                                        "category d-inline-flex font-weight-light"
                                    },
                                    [
                                      _c("v-combobox", {
                                        attrs: {
                                          required: "",
                                          items: _vm.payments,
                                          label: "Métodos de pago",
                                          "item-text": "pame_name",
                                          "item-value": "pame_pk",
                                          filled: "",
                                          chips: "",
                                          placeholder: "Seleccionar Cliente"
                                        },
                                        model: {
                                          value: _vm.selectpame,
                                          callback: function($$v) {
                                            _vm.selectpame = $$v
                                          },
                                          expression: "selectpame"
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
                    "v-card",
                    { attrs: { justify: "end" } },
                    [
                      _c(
                        "v-btn",
                        {
                          attrs: {
                            disabled: !_vm.valid,
                            dark: "",
                            color: "success"
                          },
                          on: { click: _vm.finalizar }
                        },
                        [_vm._v("FINALIZAR")]
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
                      _c("v-simple-table", {
                        scopedSlots: _vm._u([
                          {
                            key: "default",
                            fn: function() {
                              return [
                                _c("thead", [
                                  _c("tr", [
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("ID")
                                    ]),
                                    _vm._v(" "),
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("Producto")
                                    ]),
                                    _vm._v(" "),
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("Unidad Medida")
                                    ]),
                                    _vm._v(" "),
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("Cantidad")
                                    ]),
                                    _vm._v(" "),
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("Precio")
                                    ]),
                                    _vm._v(" "),
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("Importe")
                                    ]),
                                    _vm._v(" "),
                                    _c("th"),
                                    _vm._v(" "),
                                    _c("th")
                                  ])
                                ]),
                                _vm._v(" "),
                                _c(
                                  "tbody",
                                  [
                                    _vm._l(_vm.desserts, function(item) {
                                      return _c("tr", { key: item.prod_name }, [
                                        _c("td", [
                                          _vm._v(_vm._s(item.prod_identifier))
                                        ]),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(_vm._s(item.prod_name))
                                        ]),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(_vm._s(item.meas_name))
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          [
                                            _c("v-text-field", {
                                              attrs: {
                                                label: "",
                                                required: ""
                                              },
                                              on: {
                                                change: function($event) {
                                                  return _vm.onQuantityChange(
                                                    item
                                                  )
                                                }
                                              },
                                              model: {
                                                value: item.clsd_quantity,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    item,
                                                    "clsd_quantity",
                                                    $$v
                                                  )
                                                },
                                                expression: "item.clsd_quantity"
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(
                                            "$" +
                                              _vm._s(
                                                _vm.formatMoney(item.clsd_price)
                                              )
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(
                                            "$" +
                                              _vm._s(
                                                _vm.formatMoney(
                                                  item.clsd_quantity *
                                                    item.clsd_price
                                                )
                                              )
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          [
                                            _c(
                                              "v-icon",
                                              {
                                                attrs: { small: "" },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.borrar(item)
                                                  }
                                                }
                                              },
                                              [_vm._v("mdi-delete")]
                                            )
                                          ],
                                          1
                                        )
                                      ])
                                    }),
                                    _vm._v(" "),
                                    _c("tr", [
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td", [_vm._v("Subtotal")]),
                                      _vm._v(" "),
                                      _c("td", [
                                        _vm._v(
                                          "$" +
                                            _vm._s(
                                              _vm.formatMoney(_vm.subtotal)
                                            )
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("td")
                                    ]),
                                    _vm._v(" "),
                                    _c("tr", [
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td", [_vm._v("I.V.A.")]),
                                      _vm._v(" "),
                                      _c("td", [
                                        _vm._v(
                                          "$" + _vm._s(_vm.formatMoney(_vm.iva))
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("td")
                                    ])
                                  ],
                                  2
                                ),
                                _vm._v(" "),
                                _c("tfoot", [
                                  _c("tr", [
                                    _c("td"),
                                    _vm._v(" "),
                                    _c("td"),
                                    _vm._v(" "),
                                    _c("td"),
                                    _vm._v(" "),
                                    _c("td"),
                                    _vm._v(" "),
                                    _c("td", [_vm._v("Total")]),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(
                                        "$" + _vm._s(_vm.formatMoney(_vm.total))
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("td")
                                  ])
                                ])
                              ]
                            },
                            proxy: true
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
          ),
          _vm._v(" "),
          _c(
            "v-dialog",
            {
              attrs: { "max-width": "500" },
              model: {
                value: _vm.dialogcredito,
                callback: function($$v) {
                  _vm.dialogcredito = $$v
                },
                expression: "dialogcredito"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", [_vm._v("Crédito:")]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "span",
                        { staticClass: "subheading font-weight-bold" },
                        [_vm._v("Forma de Pago:")]
                      ),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          label: "Efectivo: ",
                          prefix: "$",
                          type: "number"
                        },
                        model: {
                          value: _vm.efectivo,
                          callback: function($$v) {
                            _vm.efectivo = $$v
                          },
                          expression: "efectivo"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          label: "Transferencia: ",
                          prefix: "$",
                          type: "number"
                        },
                        model: {
                          value: _vm.tarjeta,
                          callback: function($$v) {
                            _vm.tarjeta = $$v
                          },
                          expression: "tarjeta"
                        }
                      }),
                      _vm._v(" "),
                      _c("br"),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Subtotal")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(" $" + _vm._s(_vm.formatMoney(_vm.subtotal)))
                        ]),
                        _vm._v(" "),
                        _c("td")
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Total I.V.A.")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(" $" + _vm._s(_vm.formatMoney(_vm.iva)))
                        ]),
                        _vm._v(" "),
                        _c("td")
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Total")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(" $" + _vm._s(_vm.formatMoney(_vm.total)))
                        ])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Total Crédito")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            " $" +
                              _vm._s(
                                _vm.formatMoney(
                                  _vm.total - _vm.efectivo - _vm.tarjeta
                                )
                              )
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          on: {
                            click: function($event) {
                              _vm.dialogcredito = !_vm.dialogcredito
                            }
                          }
                        },
                        [_vm._v("Cancelar")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "warning" },
                          on: { click: _vm.finalizarVenta }
                        },
                        [_vm._v("Confirmar")]
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
              attrs: { "max-width": "500" },
              model: {
                value: _vm.dialogcontado,
                callback: function($$v) {
                  _vm.dialogcontado = $$v
                },
                expression: "dialogcontado"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", [_vm._v("Contado")]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "span",
                        { staticClass: "subheading font-weight-bold" },
                        [_vm._v("Forma de Pago:")]
                      ),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          label: "Efectivo: ",
                          rules: _vm.minNumberRules,
                          prefix: "$",
                          type: "number"
                        },
                        on: {
                          change: function($event) {
                            return _vm.getcambio()
                          }
                        },
                        model: {
                          value: _vm.efectivo,
                          callback: function($$v) {
                            _vm.efectivo = $$v
                          },
                          expression: "efectivo"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          label: "Transferencia: ",
                          rules: _vm.minNumberRules,
                          prefix: "$",
                          type: "number"
                        },
                        model: {
                          value: _vm.tarjeta,
                          callback: function($$v) {
                            _vm.tarjeta = $$v
                          },
                          expression: "tarjeta"
                        }
                      }),
                      _vm._v(" "),
                      _c("br"),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Cambio")]),
                        _vm._v(" "),
                        _c("td", [
                          _c("span", [
                            _vm._v(
                              "$" + _vm._s(_vm.formatMoney(_vm.cambio)) + " "
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("td")
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Subtotal")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(" $" + _vm._s(_vm.formatMoney(_vm.subtotal)))
                        ]),
                        _vm._v(" "),
                        _c("td")
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Total I.V.A.")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(" $" + _vm._s(_vm.formatMoney(_vm.iva)))
                        ]),
                        _vm._v(" "),
                        _c("td")
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Total")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(" $" + _vm._s(_vm.formatMoney(_vm.total)))
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          on: {
                            click: function($event) {
                              _vm.dialogcontado = !_vm.dialogcontado
                            }
                          }
                        },
                        [_vm._v("Cancelar")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "success" },
                          on: { click: _vm.finalizarVenta }
                        },
                        [_vm._v("Confirmar")]
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

/***/ "./resources/js/components/views/DetailOrder.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/views/DetailOrder.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DetailOrder_vue_vue_type_template_id_2bff1afe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DetailOrder.vue?vue&type=template&id=2bff1afe& */ "./resources/js/components/views/DetailOrder.vue?vue&type=template&id=2bff1afe&");
/* harmony import */ var _DetailOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DetailOrder.vue?vue&type=script&lang=js& */ "./resources/js/components/views/DetailOrder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DetailOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DetailOrder_vue_vue_type_template_id_2bff1afe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DetailOrder_vue_vue_type_template_id_2bff1afe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/DetailOrder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/DetailOrder.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/views/DetailOrder.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DetailOrder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/DetailOrder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/DetailOrder.vue?vue&type=template&id=2bff1afe&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/views/DetailOrder.vue?vue&type=template&id=2bff1afe& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailOrder_vue_vue_type_template_id_2bff1afe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DetailOrder.vue?vue&type=template&id=2bff1afe& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/DetailOrder.vue?vue&type=template&id=2bff1afe&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailOrder_vue_vue_type_template_id_2bff1afe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DetailOrder_vue_vue_type_template_id_2bff1afe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);