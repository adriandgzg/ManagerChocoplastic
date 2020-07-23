(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Purchases.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Purchases.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      directa: this.$route.params.directa,
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
        prpu_pk: 0,
        prov_fk: 0,
        prov_name: '',
        prpo_fk: 0,
        stor_fk: 0,
        store_name: '',
        pame_fk: 0,
        pame_name: '',
        prpu_identifier: '',
        prpu_type: 0,
        prpu_status: 0,
        created_at: '',
        updated_at: ''
      },
      editado: {
        prpd_pk: 0,
        prpd_quantity: 0,
        prpd_price: 0,
        prpd_discountrate: 0,
        prod_pk: 0,
        prod_identifier: 0,
        prod_name: '',
        prod_description: '',
        meas_name: ''
      },
      defaultItem: {
        prpd_pk: 0,
        prpd_quantity: 0,
        prpd_price: 0,
        prpd_discountrate: 0,
        prod_pk: 0,
        prod_identifier: 0,
        prod_name: '',
        prod_description: '',
        meas_name: ''
      },
      detail: {
        prpu_pk: 0,
        pame_fk: 0,
        prov_fk: 0,
        stor_fk: 0,
        prpo_fk: 0,
        prod_fk: 0,
        prpd_pk: 0,
        prpd_quantity: 0,
        prpd_price: 0,
        prpd_discountrate: 0
      },
      detailDefault: {
        prpo_fk: 0,
        prod_fk: 0,
        prpd_pk: 0,
        prpd_quantity: 0,
        prpd_price: 0,
        prpd_discountrate: 0
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
    this.getStores();
    this.getProviders();
    this.createCompra();
    this.getPayment();
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

      if (this.selectProv == '' || this.selectProv == null) {
        alert("Debe seleccionar un proveedor");
        return;
      }

      if (this.selectStore == '' || this.selectStore == null) {
        alert("Debe seleccionar una sucursal");
        return;
      }

      if (this.selectpame == '' || this.selectpame == null) {
        alert("Debe seleccionar una forma de pago");
        return;
      }

      if (this.desserts.length > 0) {
        this.detail.prpu_pk = this.prpo_pk;
      } else {
        this.detail.prpu_pk = 0;
      }

      this.detail.prod_fk = item.prod_pk;
      this.detail.prpd_quantity = 1;
      this.detail.prpd_price = 0;
      this.detail.prpd_discountrate = 0;
      this.detail.prov_fk = this.selectProv.prov_pk;
      this.detail.stor_fk = this.selectStore.stor_pk;
      this.detail.pame_fk = this.selectpame.pame_pk;
      axios.post('/provider/purchase/details', this.detail).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this4.snackbar = true;
          _this4.textMsg = "¡Actualizado correctamente!";
          _this4.prpo_pk = response.data.data; //alert("¡Actualizado correctamente!");

          _this4.createCompra();

          _this4.dialog = false;

          _this4.getTotal();
        } else {
          alert(response.data.message);
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
          _this5.snackbar = true;
          _this5.textMsg = "¡Eliminado correctamente!";
          alert(_this5.textMsg);

          _this5.createCompra();
        } else {
          alert("Ocurrio un error al eliminar el producto");
        }
      });
    },
    createCompra: function createCompra() {
      var _this6 = this;

      if (this.directa == 1) {
        axios.post('/provider/purchases?prpo_pk=' + this.prpo_pk + '').then(function (response) {
          _this6.desserts = response.data.data.ProviderPurchaseDetail;

          _this6.getTotal();

          _this6.prpu_pk = response.data.data.ProviderPurchase.prpu_pk; //response.data.data.ProviderPurchaseDetail//

          _this6.editadoHeader = response.data.data.ProviderPurchase;
          var i = 0;

          for (i = 0; i < _this6.providers.length; i++) {
            if (response.data.data.ProviderPurchase.prov_fk == _this6.providers[i].prov_pk) {
              _this6.selectProv = _this6.providers[i];
            }
          }

          for (i = 0; i < _this6.stores.length; i++) {
            if (response.data.data.ProviderPurchase.stor_fk == _this6.stores[i].stor_pk) {
              console.log(i);
              _this6.selectStore = _this6.stores[i];
            }
          }
        })["catch"](function (e) {
          //this.errors.push(e)
          console.log(e);
        });
      } else {
        axios.get('/provider/purchases/' + this.prpo_pk + '').then(function (response) {
          console.log(response);
          _this6.desserts = response.data.data.ProviderPurchaseDetail;

          _this6.getTotal();

          _this6.prpu_pk = response.data.data.ProviderPurchase.prpu_pk; //response.data.data.ProviderPurchaseDetail//

          _this6.editadoHeader = response.data.data.ProviderPurchase;
        })["catch"](function (e) {
          //this.errors.push(e)
          console.log(e);
        });
      }
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
      this.detail.prpd_pk = item.prpd_pk, this.detail.prod_fk = item.prod_pk;
      this.detail.prpd_quantity = item.prpd_quantity;
      this.detail.prpd_price = item.prpd_price;
      this.detail.prpd_discountrate = item.prpd_discountrate;
      axios.post('/provider/purchase/details/update', this.detail).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this8.snackbar = true;
          _this8.textMsg = "¡Actualizado correctamente!"; //alert("¡Actualizado correctamente!");

          _this8.getTotal();
        } else {
          alert(response.data.status.message);
        }
      })["catch"](function (e) {
        _this8.errors.push(e);
      });
    },
    getTotal: function getTotal() {
      this.subtotal = 0;

      for (var i = 0; i < this.desserts.length; i++) {
        this.subtotal = this.subtotal + this.desserts[i].prpd_price * this.desserts[i].prpd_quantity * (1 - this.desserts[i].prpd_discountrate / 100);
        console.log(this.subtotal);
      }

      this.total = this.subtotal + this.iva;
    },
    finalizar: function finalizar() {
      var _this9 = this;

      if (this.selectProv == '' || this.selectProv == null) {
        alert("Debe seleccionar un proveedor");
        return;
      }

      if (this.selectStore == '' || this.selectStore == null) {
        alert("Debe seleccionar una sucursal");
        return;
      }

      if (this.selectpame == '' || this.selectpame == null) {
        alert("Debe seleccionar una forma de pago");
        return;
      }

      var r = confirm("¿Está seguro de finalizar la venta?.");

      if (r == true) {
        this.orderHeader.prpu_pk = this.prpu_pk;
        this.orderHeader.prpo_pk = this.prpo_pk;
        this.orderHeader.prov_fk = this.selectProv.prov_pk;
        this.orderHeader.stor_fk = this.selectStore.stor_pk;
        this.orderHeader.pame_fk = this.selectpame.pame_pk;
        this.orderHeader.prpu_amount = this.total;
        console.log('this.orderHeader');
        console.log(this.orderHeader);
        axios.post('/provider/purchases/update', this.orderHeader).then(function (response) {
          console.log(response);

          if (response.data.status.code == 200) {
            _this9.snackbar = true;
            _this9.textMsg = "¡Actualizado correctamente!";
            alert("¡Actualizado correctamente!");

            _this9.$router.push('/purchaselist');
          } else {
            alert("Ocurrio un error al finalizar la compra");
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
        alert("Los montos de pago deben ser igual al total");
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
            _this10.snackbar = true;
            _this10.textMsg = "¡Actualizado correctamente!";
            alert("¡Actualizado correctamente!");

            _this10.$router.push('/sales');
          } else {
            alert(response.data.message);
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
        _this11.snackbar = true;
        _this11.textMsg = "¡Actualizado correctamente!";
      })["catch"](function (e) {
        _this11.errors.push(e);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Purchases.vue?vue&type=template&id=35fd3d16&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Purchases.vue?vue&type=template&id=35fd3d16& ***!
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
                                  _vm.directa == 1
                                    ? _c("v-label", [
                                        _c("h3", [_vm._v("Proveedor:")]),
                                        _vm._v(
                                          " " +
                                            _vm._s(_vm.editadoHeader.prov_name)
                                        )
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.directa == 2
                                    ? _c("v-combobox", {
                                        attrs: {
                                          required: "",
                                          items: _vm.stores,
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
                                    : _vm._e()
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
                                  _vm.directa == 1
                                    ? _c("v-label", [
                                        _c("h3", [_vm._v("Sucursal:")]),
                                        _vm._v(
                                          " " +
                                            _vm._s(_vm.editadoHeader.stor_name)
                                        )
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.directa == 2
                                    ? _c("v-combobox", {
                                        attrs: {
                                          required: "",
                                          items: _vm.providers,
                                          label: "Proveedor",
                                          "item-text": "prov_name",
                                          "item-value": "prov_pk",
                                          filled: "",
                                          chips: "",
                                          placeholder:
                                            "Seleccionar una proveedor"
                                        },
                                        model: {
                                          value: _vm.selectProv,
                                          callback: function($$v) {
                                            _vm.selectProv = $$v
                                          },
                                          expression: "selectProv"
                                        }
                                      })
                                    : _vm._e()
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
                                  _c("v-combobox", {
                                    attrs: {
                                      required: "",
                                      items: _vm.payments,
                                      label: "Método de pago",
                                      "item-text": "pame_name",
                                      "item-value": "pame_pk",
                                      filled: "",
                                      chips: "",
                                      placeholder: "Seleccionar una opción"
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
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        [
                          _c(
                            "v-col",
                            [
                              _vm.directa == 2
                                ? _c(
                                    "v-btn",
                                    {
                                      staticClass: "ma-2",
                                      attrs: {
                                        tile: "",
                                        outlined: "",
                                        color: "blue"
                                      },
                                      on: { click: _vm.buscar }
                                    },
                                    [
                                      _c("v-icon", { attrs: { left: "" } }, [
                                        _vm._v("mdi-file-find")
                                      ]),
                                      _vm._v(
                                        " Buscar Producto\n                "
                                      )
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    dark: "",
                                    color: "success",
                                    outlined: ""
                                  },
                                  on: { click: _vm.finalizar }
                                },
                                [
                                  _c("v-icon", { attrs: { left: "" } }, [
                                    _vm._v("mdi-checkbox-marked-circle")
                                  ]),
                                  _vm._v(" Finalizar\n                ")
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
                                                value: item.prpd_quantity,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    item,
                                                    "prpd_quantity",
                                                    $$v
                                                  )
                                                },
                                                expression: "item.prpd_quantity"
                                              }
                                            })
                                          ],
                                          1
                                        ),
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
                                                value: item.prpd_price,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    item,
                                                    "prpd_price",
                                                    $$v
                                                  )
                                                },
                                                expression: "item.prpd_price"
                                              }
                                            })
                                          ],
                                          1
                                        ),
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
                                                value: item.prpd_discountrate,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    item,
                                                    "prpd_discountrate",
                                                    $$v
                                                  )
                                                },
                                                expression:
                                                  "item.prpd_discountrate"
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
                                                _vm.formatMoney(
                                                  item.prpd_quantity *
                                                    item.prpd_price *
                                                    (1 -
                                                      item.prpd_discountrate /
                                                        100)
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

/***/ "./resources/js/components/views/Purchases.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/views/Purchases.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Purchases_vue_vue_type_template_id_35fd3d16___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Purchases.vue?vue&type=template&id=35fd3d16& */ "./resources/js/components/views/Purchases.vue?vue&type=template&id=35fd3d16&");
/* harmony import */ var _Purchases_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Purchases.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Purchases.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Purchases_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Purchases_vue_vue_type_template_id_35fd3d16___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Purchases_vue_vue_type_template_id_35fd3d16___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Purchases.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Purchases.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/views/Purchases.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Purchases_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Purchases.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Purchases.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Purchases_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Purchases.vue?vue&type=template&id=35fd3d16&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/views/Purchases.vue?vue&type=template&id=35fd3d16& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Purchases_vue_vue_type_template_id_35fd3d16___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Purchases.vue?vue&type=template&id=35fd3d16& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Purchases.vue?vue&type=template&id=35fd3d16&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Purchases_vue_vue_type_template_id_35fd3d16___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Purchases_vue_vue_type_template_id_35fd3d16___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);