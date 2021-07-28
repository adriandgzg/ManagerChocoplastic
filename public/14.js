(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/DetailOrder.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/DetailOrder.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var crip_vue_notice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crip-vue-notice */ "./node_modules/crip-vue-notice/lib/crip-vue-notice.js");
/* harmony import */ var crip_vue_notice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crip_vue_notice__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      validPago: false,
      sales: [],
      stores: [],
      clients: [],
      payments: [],
      paymentsShapes: [],
      paymentsOriginal: [],
      saleHeader: '',
      saleDetail: [],
      desserts: [],
      selectClient: '',
      selectStore: '',
      selectpame: '',
      selectpash: '',
      snackbar: false,
      timeout: 2000,
      subtotal: 0,
      total: 0,
      cambio: 0,
      iva: 0,
      ieps: 0,
      efectivo: 0,
      tarjeta: 0,
      monto: 0,
      referencia: '',
      textMsg: "",
      editadoPago: {
        clsa_fk: 0,
        pash_fk: 0,
        bocu_fk: 0,
        cpam_amount: 0,
        cpam_reference: ''
      },
      editadoPagoDefault: {
        clsa_fk: 0,
        pash_fk: 0,
        bocu_fk: 0,
        cpam_amount: 0,
        cpam_reference: ''
      },
      editado: {
        clsd_pk: 0,
        clsd_quantity: 0,
        clsd_discountrate: 0
      },
      editadoSale: {
        clsa_pk: 0,
        clie_fk: 0,
        pame_fk: 0,
        stor_fk: 0,
        clde_amount: 0,
        clpa_amount_cash: 0,
        clpa_amount_transfer: 0,
        clpa_amount_change: 0
      },
      editadoPash: {
        clsa_fk: 0,
        pash_fk: 0,
        cpam_amount: 0,
        cpam_reference: 0
      },
      enabledStore: false,
      dialogcredito: false,
      dialogcontado: false,
      dialogPago: false,
      storeUser: '',
      minNumberRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value > 0 || 'El número debe ser mayor o igual a cero';
      }],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      dialogQuestionDeletePago: false,
      messageQuestion: '',
      pagos: [],
      montototal: 0,
      othercash: 0,
      bocu_pk: 0,
      boxEnabledDetailOrder: false
    };
  },
  created: function created() {
    var _this = this;

    window.addEventListener('keydown', function (e) {
      console.log(e.key);

      switch (e.key) {
        case 'F8':
          _this.finalizar();

          break;

        case 'F9':
          if (_this.dialogcredito || _this.dialogcontado) {
            _this.abrirPago();
          }

          break;

        case 'Enter':
          if (_this.dialogPago && _this.validPago) {
            _this.agregarPago();
          } else {
            if (!_this.dialogPago && !_this.dialogQuestion && (_this.dialogcredito || _this.dialogcontado)) {
              _this.finalizarVenta();
            } else {
              if (_this.dialogQuestion) {
                _this.guardaFinalizar();
              }
            }
          }

          break;

        case "Escape":
          if (_this.dialogQuestion) {
            _this.dialogQuestion = false;
          }

          break;
      } //   if (e.key == 'Escape') {
      //     this.dialogCaja = !this.dialogCaja;
      //   }

    });
    this.createsale();
    this.getClients();
    this.getPaymentShow();
    this.getStores();
    this.getUsers();
    this.getPaymentShapes();
    this.obtenerCaja();
  },
  methods: {
    obtenerCaja: function obtenerCaja() {
      var _this2 = this;

      axios.get("/boxcut").then(function (response) {
        console.log("/boxcut"); // console.log(response.data.data)

        if (response.data.data == null) {
          _this2.boxEnabledDetailOrder = true;
        } else {
          _this2.boxEnabledDetailOrder = false;
          _this2.bocu_pk = response.data.data.bocu_pk;
        }
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getUsers: function getUsers() {
      var _this3 = this;

      axios.get('/listUser').then(function (response) {
        _this3.users = response.data.data;

        if (_this3.users.store_id > 0) {
          _this3.enabledStore = true;
          _this3.selectStore = _this3.stores.find(function (item) {
            return item.stor_pk == _this3.users.store_id;
          });
        } else _this3.enabledStore = false;
      })["catch"](function (e) {
        console.log(response.data.message);
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
      var _this4 = this;

      this.editado = Object.assign({}, item);
      axios.post('/client_sale_details/update', this.editado).then(function (response) {
        console.log(_this4.editado);
        console.log(response);

        _this4.getTotal();
      })["catch"](function (e) {
        _this4.errors.push(e);
      });
    },
    onChangeClient: function onChangeClient() {
      if (this.selectClient.clie_pk == 1) {
        this.getPaymentShow();
      } else {
        this.getPayment();
      }
    },
    finalizar: function finalizar() {
      this.efectivo = 0;
      this.tarjeta = 0;
      this.getPagos();

      if (this.selectClient == '' || this.selectClient == null) {
        this.normal('Alerta', 'Debe seleccionar un cliente', "warning");
        return;
      }

      if (this.selectpame == '' || this.selectpame == null) {
        this.normal('Alerta', 'Debe seleccionar un método de pago', "warning");
        return;
      }

      if (!this.enabledStore) if (this.selectStore == '' || this.selectStore == null) {
        this.normal('Alerta', 'Debe seleccionar una sucursal', "warning");
        return;
      }
      this.editadoSale.clsa_pk = this.saleHeader.clsa_pk;
      this.editadoSale.clie_fk = this.selectClient.clie_pk;
      this.editadoSale.pame_fk = this.selectpame.pame_pk;
      if (!this.enabledStore) this.editadoSale.stor_fk = this.selectStore.stor_pk;else this.editadoSale.stor_fk = this.users.store_id;

      if (this.editadoSale.pame_fk == 1) {
        this.dialogcontado = true;
        this.getcambio();
      } else this.dialogcredito = true;
    },
    finalizarVenta: function finalizarVenta() {
      if (this.editadoSale.pame_fk == 1) {
        //var montototal = parseFloat(this.efectivo) + parseFloat(this.tarjeta);
        var operacion = parseFloat(this.total) - parseFloat(this.montototal);

        if (operacion <= 0) {} else {
          this.normal('Notificación', 'Los montos de pago deben ser igual al total', "success");
          return;
        }
      }

      if (this.editadoSale.pame_fk == 2) {
        var vValidacionMonto = parseFloat(this.total) - parseFloat(this.montototal);

        if (vValidacionMonto == 0) {
          this.normal('Notificación', 'El Monto de Total Crédito debe de ser mayor a 0, cambiar de Método de Pago', "success");
          return;
        }
      }

      this.messageQuestion = '¿Desea finalizar la Venta?';
      this.dialogQuestion = true;
    },
    guardaFinalizar: function guardaFinalizar() {
      var _this5 = this;

      this.editadoSale.clde_amount = this.total;
      this.editadoSale.clpa_amount_change = this.cambio;
      this.editadoSale.bocu_fk = this.bocu_pk; //console.log(this.editadoSale);
      //return false;

      axios.post('/clientsales/update', this.editadoSale).then(function (response) {
        if (response.data.code == 200) {
          if (_this5.editadoSale.pame_fk == 1) {
            //De Contado Ticket
            var route = _this5.$router.resolve({
              path: "/client/sales/printOrder/" + response.data.data
            });

            var newWin = window.open(route.href, "", "height=600,width=400");
            setTimeout(function () {
              newWin.print();
            }, 1000);
            setTimeout(function () {
              newWin.close();
            }, 50000);
          }

          if (_this5.editadoSale.pame_fk == 2) {
            //A Credito Reporte
            var _route = _this5.$router.resolve({
              path: "/client/sales/printCredit/" + response.data.data
            });

            var newWin = window.open(_route.href, "", "height=600,width=400");
            setTimeout(function () {
              newWin.print();
            }, 1000);
            setTimeout(function () {
              newWin.close();
            }, 50000);
          }

          _this5.normal('Notificación', '¡Actualizado correctamente!', "success");

          _this5.$router.push('/orders');
        } else {
          _this5.normal('Notificación', response.data.message, "error");
        }
      })["catch"](function (e) {
        _this5.errors.push(e);
      });
    },
    createsale: function createsale() {
      var _this6 = this;

      this.loading = true;
      axios.post('/clientsales?clor_pk=' + this.clor_pk + '').then(function (response) {
        setTimeout(function () {
          return _this6.loading = false;
        }, 500);

        if (response.data.data != null) {
          _this6.sales = response.data.data;
          _this6.saleHeader = response.data.data.sale;
          _this6.desserts = _this6.sales.sale_details;
          console.log("this.saleHeader");
          console.log(response.data);

          _this6.getTotal();
        } else {
          _this6.normal('Notificación', response.data.message, "error");
        }
      })["catch"](function (e) {
        //this.errors.push(e)
        console.log(e);

        _this6.normal('Notificación', "Error al cargar los datos", "error");
      });
    },
    abrirPago: function abrirPago() {
      this.editadoPago.cpam_amount = 0;
      this.dialogPago = true;
    },
    agregarPago: function agregarPago() {
      var _this7 = this;

      this.loading = true;
      this.editadoPago.clsa_fk = this.saleHeader.clsa_pk;

      if (this.selectpash == '' || this.selectpash == null) {
        this.normal('Alerta', 'Debe seleccionar una forma de pago', "error");
        return;
      }

      this.editadoPago.pash_fk = this.selectpash.pash_pk;
      this.editadoPago.bocu_fk = this.bocu_pk;
      console.log(this.editadoPago);
      axios.post('/client/payment/amounts', this.editadoPago).then(function (response) {
        setTimeout(function () {
          return _this7.loading = false;
        }, 500);
        console.log(response.data);

        if (response.data.data != null) {
          _this7.textMsg = "¡Actualizado correctamente!";

          _this7.normal('Notificación', '¡Actualizado correctamente!', "success");

          _this7.dialogPago = false;

          _this7.getPagos();
        } else {
          _this7.normal('Notificación', response.data.status.message, "error");
        }
      })["catch"](function (e) {
        //this.errors.push(e)
        console.log(e);

        _this7.normal('Notificación', "Error al cargar los datos", "error");
      });
    },
    getPagos: function getPagos() {
      var _this8 = this;

      this.loading = true;
      axios.get("/client/payment/amounts/" + this.saleHeader.clsa_pk).then(function (response) {
        setTimeout(function () {
          return _this8.loading = false;
        }, 500);

        if (response.data.data != null) {
          _this8.pagos = response.data.data;

          _this8.getEfectivo();
        } else {
          _this8.normal('Notificación', response.data.status.message, "error");
        }
      })["catch"](function (e) {
        console.log("Error al cargar los datos");
        console.log(e);

        _this8.normal('Notificación', "Error al cargar los datos", "error");
      });
    },
    cambioFP: function cambioFP() {
      this.$refs.foobar_x.focus();
      this.$refs.foobar_x.$refs.input.select();
    },
    getcambio: function getcambio() {
      this.cambio = this.efectivo - (this.total - this.othercash);
      if (this.cambio > 0) this.cambio = this.efectivo - (this.total - this.othercash);else this.cambio = 0;
      console.log('Efectivo: ' + this.efectivo + ' Total: ' + this.total + ' Cambio: ' + this.cambio);
    },
    getTotal: function getTotal() {
      this.iva = 0;
      this.ieps = 0;
      this.subtotal = 0;
      this.descuento = 0;

      for (var i = 0; i < this.desserts.length; i++) {
        //this.subtotal = this.subtotal + (this.desserts[i].clsd_price * this.desserts[i].clsd_quantity);
        var importe = this.desserts[i].clsd_price * this.desserts[i].clsd_quantity;
        var importeDescuento = importe * (1 - this.desserts[i].clsd_discountrate / 100);
        this.subtotal = this.subtotal + importeDescuento;
        if (this.desserts[i].prod_iva == 1) this.iva = this.iva + importeDescuento / (1 + this.desserts[i].syst_iva / 100) * (this.desserts[i].syst_iva / 100);
        if (this.desserts[i].prod_ieps == 1) this.ieps = this.ieps + importeDescuento / (1 + this.desserts[i].syst_ieps / 100) * (this.desserts[i].syst_ieps / 100);
      }

      this.total = this.subtotal;
    },
    getEfectivo: function getEfectivo() {
      this.efectivo = 0;
      this.montototal = 0;
      this.othercash = 0;

      for (var i = 0; i < this.pagos.length; i++) {
        console.log(this.pagos[i]);

        if (this.pagos[i].pash_name == 'Efectivo') {
          this.efectivo = parseFloat(this.efectivo) + parseFloat(this.pagos[i].cpam_amount);
        } else {
          this.othercash = this.othercash + parseFloat(this.pagos[i].cpam_amount);
        }

        this.montototal = parseFloat(this.montototal) + parseFloat(this.pagos[i].cpam_amount);
      }

      console.log('Efectivo: ' + this.efectivo + ' Total: ' + this.montototal);
      this.getcambio();
    },
    getClients: function getClients() {
      var _this9 = this;

      axios.get("/clientsget").then(function (response) {
        _this9.clients = response.data.data;
        _this9.selectClient = _this9.clients[0];
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getPaymentShapes: function getPaymentShapes() {
      var _this10 = this;

      axios.get("/paymentshapesget").then(function (response) {
        _this10.paymentsShapes = response.data.data;
        _this10.selectpash = _this10.paymentsShapes[0];
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getPayment: function getPayment() {
      var _this11 = this;

      axios.get("/paymentmethodsget").then(function (response) {
        _this11.payments = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getPaymentShow: function getPaymentShow() {
      var _this12 = this;

      axios.get("/paymentmethodsshow/1").then(function (response) {
        console.log(response.data.data);
        _this12.payments = response.data.data;
        _this12.selectpame = _this12.payments[0];
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getStores: function getStores() {
      var _this13 = this;

      axios.get("/storeget").then(function (response) {
        _this13.stores = response.data.data;
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
    borrarPago: function borrarPago(item) {
      this.editadoPago = Object.assign({}, item);
      this.dialogQuestionDeletePago = true;
    },
    guardaBorrarPago: function guardaBorrarPago() {
      var _this14 = this;

      this.dialogQuestionDeletePago = false;
      axios.post('/client/payment/amounts/destroy', this.editadoPago).then(function (response) {
        _this14.textMsg = "¡Eliminado correctamente!";

        _this14.normal('Notificación', _this14.textMsg, "success");

        _this14.getPagos();
      });
    },
    "delete": function _delete() {
      var _this15 = this;

      axios.post('/client_sale_details/destroy', this.editado).then(function (response) {
        _this15.textMsg = "¡Eliminado correctamente!";

        _this15.normal('Notificación', _this15.textMsg, "success");

        _this15.createsale();
      });
    },
    actualizar: function actualizar(item) {
      var _this16 = this;

      this.editado = Object.assign({}, item);
      axios.post('/client_sale_details/update', this.editado).then(function (response) {
        _this16.textMsg = "¡Actualizado correctamente!";

        _this16.normal('Notificación', _this16.textMsg, "success");
      })["catch"](function (e) {
        _this16.errors.push(e);
      });
    },
    normal: function normal(Title, Description, Type) {
      this.notice = new crip_vue_notice__WEBPACK_IMPORTED_MODULE_1___default.a({
        title: Title,
        description: Description,
        className: "open-normal",
        closable: true,
        duration: 3,
        type: Type
      });
    }
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('auth', ['can']))
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
            "v-alert",
            {
              attrs: { type: "warning" },
              model: {
                value: _vm.boxEnabledDetailOrder,
                callback: function($$v) {
                  _vm.boxEnabledDetailOrder = $$v
                },
                expression: "boxEnabledDetailOrder"
              }
            },
            [
              _vm._v(
                "\r\n            Para realizar una venta, primero debe abrir caja.\r\n        "
              )
            ]
          ),
          _vm._v(" "),
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
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "290" },
              model: {
                value: _vm.dialogQuestionDeletePago,
                callback: function($$v) {
                  _vm.dialogQuestionDeletePago = $$v
                },
                expression: "dialogQuestionDeletePago"
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
                              _vm.dialogQuestionDeletePago = false
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
                          on: { click: _vm.guardaBorrarPago }
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
                                      _c("v-label", [
                                        _c("h4", [_vm._v("Vendedor:")]),
                                        _vm._v(
                                          _vm._s(_vm.saleHeader.user) +
                                            "\r\n                                    "
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
                                          " " +
                                            _vm._s(_vm.saleHeader.stor_name) +
                                            "\r\n                                    "
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
                                          placeholder:
                                            "Seleccionar Método de Pago"
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
                        [_vm._v("FINALIZAR(F8)")]
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
                                      _vm._v("Descuento(%)")
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
                                        _c(
                                          "td",
                                          [
                                            _vm.can("discount")
                                              ? _c("v-text-field", {
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
                                                    value:
                                                      item.clsd_discountrate,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        item,
                                                        "clsd_discountrate",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "item.clsd_discountrate"
                                                  }
                                                })
                                              : _c("span", [_vm._v("0")])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(
                                            "$" +
                                              _vm._s(
                                                _vm.formatMoney(
                                                  item.clsd_quantity *
                                                    item.clsd_price *
                                                    (1 -
                                                      item.clsd_discountrate /
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
                                      _c("td", [_vm._v("IVA")]),
                                      _vm._v(" "),
                                      _c("td", [
                                        _vm._v(
                                          "$" + _vm._s(_vm.formatMoney(_vm.iva))
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
                                      _c("td", [_vm._v("IEPS")]),
                                      _vm._v(" "),
                                      _c("td", [
                                        _vm._v(
                                          "$" +
                                            _vm._s(_vm.formatMoney(_vm.ieps))
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
                        "v-row",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: { color: "warning" },
                              on: {
                                click: function($event) {
                                  return _vm.abrirPago()
                                }
                              }
                            },
                            [_vm._v("Agregar pago(F9)")]
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
                                                _c(
                                                  "th",
                                                  { staticClass: "text-left" },
                                                  [_vm._v("Forma de Pago")]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "th",
                                                  { staticClass: "text-left" },
                                                  [_vm._v("Monto")]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "th",
                                                  { staticClass: "text-left" },
                                                  [_vm._v("Referencia")]
                                                ),
                                                _vm._v(" "),
                                                _c("th")
                                              ])
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "tbody",
                                              _vm._l(_vm.pagos, function(item) {
                                                return _c(
                                                  "tr",
                                                  { key: item.pash_name },
                                                  [
                                                    _c("td", [
                                                      _vm._v(
                                                        _vm._s(item.pash_name)
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _vm._v(
                                                        _vm._s(item.cpam_amount)
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _vm._v(
                                                        _vm._s(
                                                          item.cpam_reference
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
                                                            attrs: {
                                                              small: ""
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.borrarPago(
                                                                  item
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [_vm._v("mdi-delete")]
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  ]
                                                )
                                              }),
                                              0
                                            ),
                                            _vm._v(" "),
                                            _c("tfoot", [
                                              _c("tr", [
                                                _c("td", [_vm._v("Total")]),
                                                _vm._v(" "),
                                                _c("td", [
                                                  _vm._v(
                                                    "$" +
                                                      _vm._s(
                                                        _vm.formatMoney(
                                                          _vm.montototal
                                                        )
                                                      )
                                                  )
                                                ]),
                                                _vm._v(" "),
                                                _c("td"),
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
                        _c("td", [_vm._v("Total IVA")]),
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
                                _vm.formatMoney(_vm.total - _vm.montototal)
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
              attrs: { "max-width": "640" },
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
                        "v-row",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: { color: "warning" },
                              on: {
                                click: function($event) {
                                  return _vm.abrirPago()
                                }
                              }
                            },
                            [_vm._v("Agregar pago(F9)")]
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
                                                _c(
                                                  "th",
                                                  { staticClass: "text-left" },
                                                  [_vm._v("Forma de Pago")]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "th",
                                                  { staticClass: "text-left" },
                                                  [_vm._v("Monto")]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "th",
                                                  { staticClass: "text-left" },
                                                  [_vm._v("Referencia")]
                                                ),
                                                _vm._v(" "),
                                                _c("th")
                                              ])
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "tbody",
                                              _vm._l(_vm.pagos, function(item) {
                                                return _c(
                                                  "tr",
                                                  { key: item.pash_name },
                                                  [
                                                    _c("td", [
                                                      _vm._v(
                                                        _vm._s(item.pash_name)
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _vm._v(
                                                        _vm._s(item.cpam_amount)
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _vm._v(
                                                        _vm._s(
                                                          item.cpam_reference
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
                                                            attrs: {
                                                              small: ""
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.borrarPago(
                                                                  item
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [_vm._v("mdi-delete")]
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  ]
                                                )
                                              }),
                                              0
                                            ),
                                            _vm._v(" "),
                                            _c("tfoot", [
                                              _c("tr", [
                                                _c("td"),
                                                _vm._v(" "),
                                                _c("td", [_vm._v("Total")]),
                                                _vm._v(" "),
                                                _c("td", [
                                                  _vm._v(
                                                    "$" +
                                                      _vm._s(
                                                        _vm.formatMoney(
                                                          _vm.montototal
                                                        )
                                                      )
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
                        _c("td", [_vm._v("Total IVA")]),
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
          ),
          _vm._v(" "),
          _c(
            "v-dialog",
            {
              attrs: { "max-width": "640" },
              model: {
                value: _vm.dialogPago,
                callback: function($$v) {
                  _vm.dialogPago = $$v
                },
                expression: "dialogPago"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", [_vm._v("Agregar pago")]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-form",
                        {
                          model: {
                            value: _vm.validPago,
                            callback: function($$v) {
                              _vm.validPago = $$v
                            },
                            expression: "validPago"
                          }
                        },
                        [
                          _c(
                            "v-row",
                            [
                              _c("v-combobox", {
                                attrs: {
                                  required: "",
                                  items: _vm.paymentsShapes,
                                  label: "Forma de pago",
                                  "item-text": "pash_name",
                                  "item-value": "pash_pk",
                                  filled: "",
                                  chips: "",
                                  placeholder: "Seleccionar una opción"
                                },
                                on: {
                                  change: function($event) {
                                    return _vm.cambioFP()
                                  }
                                },
                                model: {
                                  value: _vm.selectpash,
                                  callback: function($$v) {
                                    _vm.selectpash = $$v
                                  },
                                  expression: "selectpash"
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
                                { attrs: { cols: "6" } },
                                [
                                  _c("v-text-field", {
                                    ref: "foobar_x",
                                    attrs: {
                                      autofocus: "",
                                      id: "montoPago",
                                      required: "",
                                      label: "Monto: ",
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
                                      value: _vm.editadoPago.cpam_amount,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.editadoPago,
                                          "cpam_amount",
                                          $$v
                                        )
                                      },
                                      expression: "editadoPago.cpam_amount"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "6" } },
                                [
                                  _c("v-text-field", {
                                    attrs: { label: "Referencia: " },
                                    model: {
                                      value: _vm.editadoPago.cpam_reference,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.editadoPago,
                                          "cpam_reference",
                                          $$v
                                        )
                                      },
                                      expression: "editadoPago.cpam_reference"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-divider"),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              on: {
                                click: function($event) {
                                  _vm.dialogPago = !_vm.dialogPago
                                }
                              }
                            },
                            [_vm._v("Cancelar")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: {
                                color: "primary",
                                disabled: !_vm.validPago
                              },
                              on: { click: _vm.agregarPago }
                            },
                            [
                              _vm._v(
                                "\r\n                            Agregar\r\n                        "
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