(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/OrderDetail.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/OrderDetail.vue?vue&type=script&lang=js& ***!
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
        text: 'Unidad',
        value: 'meas_fk_input_name'
      }, {
        text: 'Tipo',
        value: 'bulk'
      }, {
        text: '',
        value: 'action',
        width: '20%'
      }],
      prpo_pk: this.$route.params.id,
      prpu_pk: 0,
      valid: false,
      stores: [],
      providers: [],
      desserts: [],
      products: [],
      selectProv: '',
      selectStore: '',
      payments: [],
      selectpame: '',
      search: '',
      snackbar: false,
      timeout: 2000,
      subtotal: 0,
      total: 0,
      iva: 0,
      textMsg: "",
      editadoHeader: {
        created_at: '',
        prov_identifier: '',
        prov_name: '',
        prov_rfc: '',
        prpo_identifier: '',
        prpo_pk: 0,
        prpo_status: 0,
        stor_name: ''
        /* prpu_pk: 0,
         prov_fk:0,
         prov_name:'',
         prpo_fk: 0,
         stor_fk: 0,
         store_name:'',
         pame_fk: 0,
         pame_name:'',
         prpu_identifier: '',
         prpu_type: 0,
         prpu_status:0,
         created_at: '',
         updated_at: '',*/

      },
      editado: {
        ppod_pk: 0,
        ppod_quantity: 0,
        ppod_providerprice: 0,
        ppod_discountrate: 0,
        prod_pk: 0,
        prod_identifier: 0,
        prod_name: '',
        prod_description: '',
        meas_name: ''
      },
      defaultItem: {
        ppod_pk: 0,
        ppod_quantity: 0,
        ppod_providerprice: 0,
        ppod_discountrate: 0,
        prod_pk: 0,
        prod_identifier: 0,
        prod_name: '',
        prod_description: '',
        meas_name: ''
      },
      detail: {
        prpo_fk: 0,
        prod_fk: 0,
        ppod_pk: 0,
        ppod_quantity: 0,
        ppod_providerprice: 0,
        ppod_discountrate: 0
      },
      detailDefault: {
        prpo_fk: 0,
        prod_fk: 0,
        ppod_pk: 0,
        ppod_quantity: 0,
        ppod_providerprice: 0,
        ppod_discountrate: 0
      },
      orderHeader: {
        prpu_pk: 0,
        prpo_pk: 0,
        prov_fk: 0,
        stor_fk: 0,
        pame_fk: 0,
        prpu_amount: 0
      },
      dialogcredito: false,
      dialogcontado: false,
      dialog: false,
      minNumberRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value > 0 || 'El número debe ser mayor o igual a cero';
      }]
    };
  },
  created: function created() {
    /* this.getStores();
     this.getProviders();*/
    this.createCompra(); //this.getPayment();
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
    getStores: function getStores() {
      var _this = this;

      axios.get("/storeget").then(function (response) {
        _this.stores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getProviders: function getProviders() {
      var _this2 = this;

      axios.get("/providerlist").then(function (response) {
        _this2.providers = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getPayment: function getPayment() {
      var _this3 = this;

      axios.get("/paymentmethodsget").then(function (response) {
        _this3.payments = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    agregar: function agregar(item) {
      var _this4 = this;

      if (this.desserts.length > 0) {
        this.detail.prpo_fk = this.prpo_pk;
      } else {
        this.detail.prpo_fk = 0;
      }

      this.detail.prod_fk = item.prod_pk;
      this.detail.ppod_quantity = 1;
      this.detail.ppod_providerprice = 0;
      this.detail.ppod_discountrate = 0;
      axios.post('/provider/purchase/order/details', this.detail).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this4.textMsg = "¡Actualizado correctamente!";

          _this4.normal('Notificación', _this4.textMsg, "success");

          _this4.prpo_pk = response.data.data; //this.normal('Notificación','¡Actualizado correctamente!' ,"success");

          _this4.createCompra();

          _this4.dialog = false;

          _this4.getTotal();
        } else {
          _this4.normal('Notificación', response.data.message, "error");
        }
      })["catch"](function (e) {
        _this4.errors.push(e);
      });
    },
    borrar: function borrar(item) {
      console.log(item);
      this.editado = Object.assign({}, item);
      var r = confirm("¿Está seguro de borrar el registro?");

      if (r == true) {
        this["delete"]();
      }
    },
    "delete": function _delete() {
      var _this5 = this;

      axios.post('/provider/purchase/details/destroy', this.editado).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this5.textMsg = "¡Eliminado correctamente!";

          _this5.normal('Notificación', _this5.textMsg, "error");

          _this5.createCompra();
        } else {
          _this5.normal('Notificación', "Ocurrio un error al eliminar el producto", "error");
        }
      });
    },
    createCompra: function createCompra() {
      var _this6 = this;

      console.log('/provider/purchase/orders/' + this.prpo_pk + '');
      axios.get('/provider/purchase/orders/' + this.prpo_pk + '').then(function (response) {
        console.log(response.data);
        _this6.desserts = response.data.data.provider_purchase_order_details;
        _this6.prpu_pk = response.data.data.provider_purchase_orders.prpu_pk;
        _this6.editadoHeader = response.data.data.provider_purchase_orders[0];
        console.log(_this6.editadoHeader);

        _this6.getTotal();
      })["catch"](function (e) {
        console.log(e);
      });
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    buscar: function buscar() {
      var _this7 = this;

      axios.get('/product/search').then(function (response) {
        _this7.products = response.data.data;
        _this7.dialog = true;
        console.log(response.data);
      })["catch"](function (e) {
        _this7.errors.push(e);
      });
    },
    onQuantityChange: function onQuantityChange(item) {
      var _this8 = this;

      //this.editado = Object.assign({}, item)
      this.detail.ppod_pk = item.ppod_pk, this.detail.prod_fk = item.prod_pk;
      this.detail.ppod_quantity = item.ppod_quantity;
      this.detail.ppod_providerprice = item.ppod_providerprice;
      this.detail.ppod_discountrate = item.ppod_discountrate;
      axios.post('/provider/purchase/details/update', this.detail).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this8.textMsg = "¡Actualizado correctamente!"; //this.normal('Notificación','¡Actualizado correctamente!' ,"success");

          _this8.getTotal();
        } else {
          _this8.normal('Notificación', response.data.status.message, "error");
        }
      })["catch"](function (e) {
        _this8.errors.push(e);
      });
    },
    getTotal: function getTotal() {
      this.subtotal = 0;

      for (var i = 0; i < this.desserts.length; i++) {
        this.subtotal = this.subtotal + this.desserts[i].ppod_providerprice * this.desserts[i].ppod_quantity * (1 - this.desserts[i].ppod_discountrate / 100);
        console.log(this.subtotal);
      }

      this.total = this.subtotal + this.iva;
    },
    finalizar: function finalizar() {
      var _this9 = this;

      if (this.total <= 0) {
        this.normal('Notificación', "La orden de compra no puede ser menor o igual a cero", "error");
        return;
      }

      if (this.selectProv == '' || this.selectProv == null) {
        this.normal('Notificación', "Debe seleccionar un proveedor", "error");
        return;
      }

      if (this.selectStore == '' || this.selectStore == null) {
        this.normal('Notificación', "Debe seleccionar una sucursal", "error");
        return;
      }

      if (this.selectpame == '' || this.selectpame == null) {
        this.normal('Notificación', "Debe seleccionar una forma de pago", "error");
        return;
      }

      var r = confirm("¿Está seguro de finalizar la orden compra?");

      if (r == true) {
        this.orderHeader.prpu_pk = this.prpu_pk;
        this.orderHeader.prpo_pk = this.prpo_pk;
        this.orderHeader.prov_fk = this.selectProv.prov_pk;
        this.orderHeader.stor_fk = this.selectStore.stor_pk;
        this.orderHeader.pame_fk = this.selectpame.pame_pk;
        this.orderHeader.prpu_amount = this.total;
        console.log(this.orderHeader);
        axios.post('/provider/purchases/update', this.orderHeader).then(function (response) {
          console.log(response);

          if (response.data.status.code == 200) {
            _this9.textMsg = "¡Actualizado correctamente!";

            _this9.normal('Notificación', '¡Actualizado correctamente!', "success");

            _this9.$router.push('/purchaselist');
          } else {
            _this9.normal('Notificación', "Ocurrio un error al finalizar la compra", "error");
          }
        })["catch"](function (e) {
          _this9.errors.push(e);
        });
      }
    },
    finalizarVenta: function finalizarVenta() {
      var _this10 = this;

      console.log(this.total + '-' + (this.efectivo + this.tarjeta));
      if (this.editadoSale.pame_fk == 1) if (this.total - this.efectivo - this.tarjeta == 0) {} else {
        this.normal('Notificación', "Los montos de pago deben ser igual al total", "error");
        return;
      }
      var r = confirm("¿Está seguro de finalizar la venta?");

      if (r == true) {
        this.editadoSale.clde_amount = this.total;
        this.editadoSale.clpa_amount_cash = this.efectivo;
        this.editadoSale.clpa_amount_transfer = this.tarjeta;
        axios.post('/clientsales/update', this.editadoSale).then(function (response) {
          console.log(response);

          if (response.data.code == 200) {
            _this10.textMsg = "¡Actualizado correctamente!";

            _this10.normal('Notificación', '¡Actualizado correctamente!', "success");

            _this10.$router.push('/sales');
          } else {
            _this10.normal('Notificación', response.data.message, "error");
          }
        })["catch"](function (e) {
          _this10.errors.push(e);
        });
      }
    },
    actualizar: function actualizar(item) {
      var _this11 = this;

      this.editado = Object.assign({}, item);
      axios.post('/client_sale_details/update', this.editado).then(function (response) {
        _this11.textMsg = "¡Actualizado correctamente!";

        _this11.normal('Notificación', _this11.textMsg, "success");
      })["catch"](function (e) {
        _this11.errors.push(e);
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/OrderDetail.vue?vue&type=template&id=7b481143&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/OrderDetail.vue?vue&type=template&id=7b481143& ***!
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
              attrs: { "max-width": "800px" },
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
                      _vm._v("Buscar producto")
                    ])
                  ]),
                  _vm._v(" "),
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
                        key: "item.prod_saleprice",
                        fn: function(ref) {
                          var item = ref.item
                          return [
                            _c("v-label", [
                              _vm._v(
                                "$" +
                                  _vm._s(_vm.formatMoney(item.prod_saleprice))
                              )
                            ])
                          ]
                        }
                      },
                      {
                        key: "item.bulk",
                        fn: function(ref) {
                          var item = ref.item
                          return [
                            item.prod_bulk == 1
                              ? _c(
                                  "v-chip",
                                  { attrs: { color: "green", outlined: "" } },
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
                                  color: "green"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.agregar(item)
                                  }
                                }
                              },
                              [
                                _c("v-icon", { attrs: { dark: "" } }, [
                                  _vm._v("mdi-checkbox-marked-circle")
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
            "v-row",
            [
              _c(
                "v-col",
                [
                  _c(
                    "v-card",
                    [
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
                                    _c("h3", [_vm._v("Proveedor:")]),
                                    _vm._v(
                                      " " + _vm._s(_vm.editadoHeader.prov_name)
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
                                    _c("h3", [_vm._v("Sucursal:")]),
                                    _vm._v(
                                      " " + _vm._s(_vm.editadoHeader.stor_name)
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
                                      _vm._v("Descuento")
                                    ]),
                                    _vm._v(" "),
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("Importe")
                                    ]),
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
                                          _vm._v(_vm._s(item.ppod_quantity))
                                        ]),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(
                                            _vm._s(item.ppod_providerprice)
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(_vm._s(item.ppod_discountrate))
                                        ]),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(
                                            "$" +
                                              _vm._s(
                                                _vm.formatMoney(
                                                  item.ppod_quantity *
                                                    item.ppod_providerprice *
                                                    (1 -
                                                      item.ppod_discountrate /
                                                        100)
                                                )
                                              )
                                          )
                                        ])
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
                                      ])
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
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td", [_vm._v("I.V.A.")]),
                                      _vm._v(" "),
                                      _c("td", [
                                        _vm._v(
                                          "$" + _vm._s(_vm.formatMoney(_vm.iva))
                                        )
                                      ])
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
                                    _c("td"),
                                    _vm._v(" "),
                                    _c("td", [_vm._v("Total")]),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(
                                        "$" + _vm._s(_vm.formatMoney(_vm.total))
                                      )
                                    ])
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

/***/ "./resources/js/components/views/OrderDetail.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/views/OrderDetail.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderDetail_vue_vue_type_template_id_7b481143___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderDetail.vue?vue&type=template&id=7b481143& */ "./resources/js/components/views/OrderDetail.vue?vue&type=template&id=7b481143&");
/* harmony import */ var _OrderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderDetail.vue?vue&type=script&lang=js& */ "./resources/js/components/views/OrderDetail.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderDetail_vue_vue_type_template_id_7b481143___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OrderDetail_vue_vue_type_template_id_7b481143___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/OrderDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/OrderDetail.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/views/OrderDetail.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderDetail.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/OrderDetail.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/OrderDetail.vue?vue&type=template&id=7b481143&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/views/OrderDetail.vue?vue&type=template&id=7b481143& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderDetail_vue_vue_type_template_id_7b481143___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderDetail.vue?vue&type=template&id=7b481143& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/OrderDetail.vue?vue&type=template&id=7b481143&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderDetail_vue_vue_type_template_id_7b481143___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderDetail_vue_vue_type_template_id_7b481143___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);