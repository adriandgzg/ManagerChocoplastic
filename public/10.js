(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ClientsReturn.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/ClientsReturn.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      alert: false,
      alertError: false,
      clsa_pk: this.$route.params.id,
      clre_observation: "",
      valid: false,
      sales: [],
      stores: [],
      returns: [],
      payments: [],
      saleHeader: "",
      saleDetail: [],
      desserts: [],
      selectReturn: "",
      selectStore: "",
      selectpame: "",
      snackbar: false,
      timeout: 2000,
      subtotal: 0,
      total: 0,
      bocu_pk: 0,
      iva: 0,
      efectivo: 0,
      tarjeta: 0,
      textMsg: "",
      editado: {
        clrd_pk: 0,
        clrd_quantity: 0
      },
      editadoSale: {
        clre_pk: 0,
        remo_fk: 0,
        bocu_fk: 0,
        clre_observation: ""
      },
      dialogcredito: false,
      dialogcontado: false,
      minNumberRules: [function (value) {
        return !!value || "Requerido.";
      }, function (value) {
        return value > 0 || "El número debe ser mayor o igual a cero";
      }],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: ""
    };
  },
  created: function created() {
    this.createsale();
    this.getMotivos();
    this.obtenerCaja();
  },
  methods: {
    obtenerCaja: function obtenerCaja() {
      var _this = this;

      axios.get("/boxcut").then(function (response) {
        console.log("/boxcut"); // console.log(response.data.data)

        if (response.data.data == null) {
          _this.boxEnabledDetailOrder = true;
        } else {
          _this.boxEnabledDetailOrder = false;
          _this.bocu_pk = response.data.data.bocu_pk;
        }
      })["catch"](function (e) {
        console.log(e);
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
    getMotivos: function getMotivos() {
      var _this2 = this;

      axios.get("/return/motives").then(function (response) {
        _this2.returns = response.data.data;
        _this2.selectReturn = _this2.returns[0];
      })["catch"](function (e) {
        console.log(e);
      });
    },
    finalizar: function finalizar() {
      if (this.selectReturn == "" || this.selectReturn == null) {
        this.normal("Notificación", "Debe seleccionar un motivo de devolución", "error");
        return;
      }

      this.messageQuestion = "¿Desea finalizar la devolución?";
      this.dialogQuestion = true;
    },
    guardaFinalizar: function guardaFinalizar() {
      var _this3 = this;

      this.editadoSale.clre_pk = this.saleHeader.clre_pk;
      this.editadoSale.remo_fk = this.selectReturn.remo_pk;
      this.editadoSale.clre_observation = this.clre_observation;
      this.editadoSale.bocu_fk = this.bocu_pk;
      axios.post("/client/returns/update", this.editadoSale).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this3.textMsg = "¡Actualizado correctamente!";

          _this3.normal("Notificación", _this3.textMsg, "success");

          _this3.$router.push("/clientsreturnlist");
        } else {
          _this3.normal("Notificación", response.data.status.message, "error");

          console.log("Error Finalizar:" + response.data.status.technicaldetail);
        }
      })["catch"](function (e) {
        _this3.normal("Notificación", response.data.status.message, "error");

        console.log("Error Finalizar:" + response.data.status.technicaldetail);
      });
    },
    finalizarVenta: function finalizarVenta() {
      var _this4 = this;

      console.log(this.total + "-" + (this.efectivo + this.tarjeta));
      if (this.editadoSale.pame_fk == 1) if (this.total - this.efectivo - this.tarjeta == 0) {} else {
        this.normal("Notificación", "Los montos de pago deben ser igual al total", "error");
        return;
      }
      var r = confirm("¿Está seguro de finalizar la venta?");

      if (r == true) {
        this.editadoSale.clde_amount = this.total;
        this.editadoSale.clpa_amount_cash = this.efectivo;
        this.editadoSale.clpa_amount_transfer = this.tarjeta;
        axios.post("/clientsales/update", this.editadoSale).then(function (response) {
          console.log(response);

          if (response.data.code == 200) {
            _this4.textMsg = "¡Actualizado correctamente!";

            _this4.normal("Notificación", textMsg, "success");

            _this4.$router.push("/sales");
          } else {
            _this4.normal("Notificación", response.data.message, "error");
          }
        })["catch"](function (e) {
          _this4.errors.push(e);
        });
      }
    },
    onQuantityChange: function onQuantityChange(item) {
      var _this5 = this;

      this.editado = Object.assign({}, item);
      console.log(this.editado);
      console.log("this.editado");

      if (this.editado.clrd_quantity > this.editado.clrd_quantity_sale) {
        this.textMsg = "¡El cantidad devuelta no puede ser mayor a la cantidad comprada!";
        this.alertError = true;
        setTimeout(function () {
          _this5.alertError = false;
        }, 3000);
        this.createsale();
        return;
      }

      axios.post("/client/return/details/update", this.editado).then(function (response) {
        console.log(response);
        console.log("¡Actualizado correctamente!");

        _this5.getTotal();
      })["catch"](function (e) {
        _this5.errors.push(e);
      });
    },
    createsale: function createsale() {
      var _this6 = this;

      this.loading = true;
      axios.post("/client/returns?clsa_pk=" + this.clsa_pk + "").then(function (response) {
        setTimeout(function () {
          return _this6.loading = false;
        }, 500);

        if (response.data.data != null) {
          _this6.sales = response.data.data;
          _this6.saleHeader = response.data.data.ClientReturns;
          _this6.desserts = _this6.sales.ClientReturnDetails;

          _this6.getTotal();
        } else {
          _this6.normal("Notificación", response.data.status.message, "error");
        }
      })["catch"](function (e) {
        //this.errors.push(e)
        console.log(e);

        _this6.normal("Notificación", "Error al cargar los datos", "error");
      });
    },
    getTotal: function getTotal() {
      for (var i = 0; i < this.desserts.length; i++) {
        this.subtotal = this.subtotal + this.desserts[i].clrd_price * this.desserts[i].clrd_quantity;
      } //this.iva =  this.subtotal * 0.16;


      this.total = this.subtotal + this.iva;
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
      var _this7 = this;

      axios.post("/client/return/details/destroy", this.editado).then(function (response) {
        _this7.textMsg = "¡Eliminado correctamente!";

        _this7.normal("Notificación", _this7.textMsg, "error");

        _this7.createsale();
      });
    },
    actualizar: function actualizar(item) {
      var _this8 = this;

      this.editado = Object.assign({}, item);
      axios.post("/client_sale_details/update", this.editado).then(function (response) {
        _this8.textMsg = "¡Actualizado correctamente!";

        _this8.normal("Notificación", _this8.textMsg, "error");
      })["catch"](function (e) {
        _this8.errors.push(e);
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ClientsReturn.vue?vue&type=template&id=0a78fc48&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/ClientsReturn.vue?vue&type=template&id=0a78fc48& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
                [_vm._v(" Cerrar ")]
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
                              _c("H2", [
                                _vm._v(_vm._s(_vm.saleHeader.clsa_identifier))
                              ])
                            ],
                            1
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
                                      _c("v-label", [
                                        _c("h4", [_vm._v("Cliente:")]),
                                        _vm._v(
                                          "\n                    " +
                                            _vm._s(_vm.saleHeader.clie_name)
                                        )
                                      ])
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
                                      _c("v-label", [
                                        _c("h4", [_vm._v("Sucursal:")]),
                                        _vm._v(
                                          "\n                    " +
                                            _vm._s(_vm.saleHeader.stor_name)
                                        )
                                      ])
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
                                      _c("v-label", [
                                        _c("h4", [_vm._v("Fecha:")]),
                                        _vm._v(
                                          "\n                    " +
                                            _vm._s(_vm.saleHeader.created_at)
                                        )
                                      ])
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
                                          required: "",
                                          items: _vm.returns,
                                          label: "Motivo de devolución",
                                          "item-text": "remo_description",
                                          "item-value": "remo_pk",
                                          filled: "",
                                          chips: "",
                                          placeholder: "Seleccionar Cliente"
                                        },
                                        model: {
                                          value: _vm.selectReturn,
                                          callback: function($$v) {
                                            _vm.selectReturn = $$v
                                          },
                                          expression: "selectReturn"
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
                                { attrs: { cols: "8" } },
                                [
                                  _c(
                                    "v-card-text",
                                    {
                                      staticClass:
                                        "category d-inline-flex font-weight-light"
                                    },
                                    [
                                      _c("v-textarea", {
                                        attrs: {
                                          "auto-grow": "",
                                          filled: "",
                                          color: "deep-purple",
                                          label: "Observaciones",
                                          rows: "3"
                                        },
                                        model: {
                                          value: _vm.clre_observation,
                                          callback: function($$v) {
                                            _vm.clre_observation = $$v
                                          },
                                          expression: "clre_observation"
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
                "v-alert",
                {
                  attrs: {
                    dismissible: "",
                    transition: "fade-transition",
                    type: "error",
                    timeout: "400"
                  },
                  model: {
                    value: _vm.alertError,
                    callback: function($$v) {
                      _vm.alertError = $$v
                    },
                    expression: "alertError"
                  }
                },
                [_vm._v("\n        " + _vm._s(_vm.textMsg) + "\n      ")]
              ),
              _vm._v(" "),
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
                                      _vm._v("Cantidad Devuelta")
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
                                        _c("td", [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(item.clrd_quantity_sale) +
                                              "\n                  "
                                          )
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
                                                value: item.clrd_quantity,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    item,
                                                    "clrd_quantity",
                                                    $$v
                                                  )
                                                },
                                                expression: "item.clrd_quantity"
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
                                                _vm.formatMoney(item.clrd_price)
                                              )
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(
                                            "\n                    $" +
                                              _vm._s(
                                                _vm.formatMoney(
                                                  item.clrd_quantity *
                                                    item.clrd_price
                                                )
                                              ) +
                                              "\n                  "
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
                          _vm._v("$" + _vm._s(_vm.formatMoney(_vm.subtotal)))
                        ]),
                        _vm._v(" "),
                        _c("td")
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Total I.V.A.")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v("$" + _vm._s(_vm.formatMoney(_vm.iva)))
                        ]),
                        _vm._v(" "),
                        _c("td")
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Total")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v("$" + _vm._s(_vm.formatMoney(_vm.total)))
                        ])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Total Crédito")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            "$" +
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
                          required: "",
                          rules: _vm.minNumberRules,
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
                          required: "",
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
                        _c("td", [_vm._v("Subtotal")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v("$" + _vm._s(_vm.formatMoney(_vm.subtotal)))
                        ]),
                        _vm._v(" "),
                        _c("td")
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Total I.V.A.")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v("$" + _vm._s(_vm.formatMoney(_vm.iva)))
                        ]),
                        _vm._v(" "),
                        _c("td")
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Total")]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v("$" + _vm._s(_vm.formatMoney(_vm.total)))
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

/***/ "./resources/js/components/views/ClientsReturn.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/views/ClientsReturn.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ClientsReturn_vue_vue_type_template_id_0a78fc48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientsReturn.vue?vue&type=template&id=0a78fc48& */ "./resources/js/components/views/ClientsReturn.vue?vue&type=template&id=0a78fc48&");
/* harmony import */ var _ClientsReturn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientsReturn.vue?vue&type=script&lang=js& */ "./resources/js/components/views/ClientsReturn.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ClientsReturn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ClientsReturn_vue_vue_type_template_id_0a78fc48___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ClientsReturn_vue_vue_type_template_id_0a78fc48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/ClientsReturn.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/ClientsReturn.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/views/ClientsReturn.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsReturn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ClientsReturn.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ClientsReturn.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsReturn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/ClientsReturn.vue?vue&type=template&id=0a78fc48&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/views/ClientsReturn.vue?vue&type=template&id=0a78fc48& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsReturn_vue_vue_type_template_id_0a78fc48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ClientsReturn.vue?vue&type=template&id=0a78fc48& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ClientsReturn.vue?vue&type=template&id=0a78fc48&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsReturn_vue_vue_type_template_id_0a78fc48___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsReturn_vue_vue_type_template_id_0a78fc48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);