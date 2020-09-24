(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Purchases.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Purchases.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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
      validProvider: false,
      stores: [],
      providers: [],
      desserts: [],
      products: [],
      selectProv: '',
      selectStore: '',
      payments: [],
      selectpame: '',
      search: '',
      observation: '',
      snackbar: false,
      timeout: 2000,
      subtotal: 0,
      descuento: 0,
      total: 0,
      iva: 0,
      ieps: 0,
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
        prpd_discountrate: 0,
        prod_identifier: 0,
        prod_name: '',
        meas_fk: 0,
        prod_ieps: 0,
        prod_iva: 0,
        syst_ieps: 0,
        syst_iva: 0
      },
      detailDefault: {
        prpo_fk: 0,
        prod_fk: 0,
        prpd_pk: 0,
        prpd_quantity: 0,
        prpd_price: 0,
        prpd_discountrate: 0,
        prod_identifier: 0,
        prod_name: '',
        meas_fk: 0,
        prod_ieps: 0,
        prod_iva: 0,
        syst_ieps: 0,
        syst_iva: 0
      },
      orderHeader: {
        prpu_pk: 0,
        prpo_pk: 0,
        prov_fk: 0,
        stor_fk: 0,
        pame_fk: 0,
        prpu_amount: 0,
        prpu_observation: ''
      },
      users: '',
      enabledStore: false,
      dialogcredito: false,
      dialogcontado: false,
      dialog: false,
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: '',
      dialogAgregar: false,
      measurements: [],
      selectmeas: '',
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
    this.getUsers();
  },
  methods: {
    getUsers: function getUsers() {
      var _this = this;

      axios.get('/listUser').then(function (response) {
        _this.users = response.data.data;

        if (_this.users.store_id > 0) {
          _this.enabledStore = true;
        } else _this.enabledStore = false;

        console.log('this.enabledStore');
        console.log(_this.enabledStore);
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
    getStores: function getStores() {
      var _this2 = this;

      axios.get("/storeget").then(function (response) {
        _this2.stores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getProviders: function getProviders() {
      var _this3 = this;

      axios.get("/providerlist").then(function (response) {
        _this3.providers = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getPayment: function getPayment() {
      var _this4 = this;

      axios.get("/paymentmethodsget").then(function (response) {
        _this4.payments = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getMeasurement: function getMeasurement(id) {
      var _this5 = this;

      axios.get("/product/measurements/" + id).then(function (response) {
        _this5.measurements = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    openAgregar: function openAgregar(item) {
      if (this.desserts.length > 0) {
        this.detail.prpu_pk = this.prpo_pk;
      } else {
        this.detail.prpu_pk = 0;
      }

      this.detail.prod_fk = item.prod_pk;
      this.detail.prpd_quantity = 1;
      this.detail.prpd_price = 0;
      this.detail.prpd_discountrate = 0;
      this.detail.prov_fk = this.selectProv.prov_pk; //this.detail.stor_fk = this.selectStore.stor_pk

      this.detail.pame_fk = this.selectpame.pame_pk;
      if (!this.enabledStore) this.detail.stor_fk = this.selectStore.stor_pk;else this.detail.stor_fk = this.users.store_id;
      this.detail.prod_identifier = item.prod_identifier;
      this.detail.prod_name = item.prod_name;
      this.getMeasurement(item.prod_pk);
      this.dialogAgregar = true;
    },
    agregar: function agregar(item) {
      var _this6 = this;

      if (!this.directa == 2) if (this.selectProv == '' || this.selectProv == null) {
        this.normal('Notificación', "Debe seleccionar un proveedor", "error");
        return;
      } // if (!this.enabledStore)
      //     if (this.selectStore == '' || this.selectStore == null) {
      //         this.normal('Notificación', "Debe seleccionar una sucursal", "error");
      //         return;
      //     }

      if (this.selectpame == '' || this.selectpame == null) {
        this.normal('Notificación', "Debe seleccionar una forma de pago", "error");
        return;
      }

      if (this.selectmeas == '' || this.selectmeas == null) {
        this.normal('Notificación', "Debe seleccionar una unidad de medida", "error");
        return;
      }

      this.detail.meas_fk = this.selectmeas.meas_pk;
      axios.post('/provider/purchase/details', this.detail).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this6.textMsg = "¡Actualizado correctamente!";
          _this6.prpo_pk = response.data.data; //this.normal('Notificación','¡Actualizado correctamente!' ,"success");

          _this6.createCompra();

          _this6.dialogAgregar = false;

          _this6.getTotal();
        } else {
          _this6.normal('Notificación', response.data.message, "error");
        }
      })["catch"](function (e) {
        _this6.errors.push(e);
      });
    },
    borrar: function borrar(item) {
      console.log(item);
      this.editado = Object.assign({}, item);
      this.dialogQuestionDelete = true;
    },
    guardaBorrar: function guardaBorrar() {
      this["delete"]();
      this.dialogQuestionDelete = false;
    },
    "delete": function _delete() {
      var _this7 = this;

      axios.post('/provider/purchase/details/destroy', this.editado).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this7.textMsg = "¡Eliminado correctamente!";

          _this7.normal('Notificación', _this7.textMsg, "success");

          _this7.createCompra();
        } else {
          _this7.normal('Notificación', "Ocurrio un error al eliminar el producto", "error");
        }
      });
    },
    createCompra: function createCompra() {
      var _this8 = this;

      this.loading = true;

      if (this.directa == 1) {
        axios.post('/provider/purchases?prpo_pk=' + this.prpo_pk + '').then(function (response) {
          setTimeout(function () {
            return _this8.loading = false;
          }, 500);

          if (response.data.data != null) {
            console.log(response.data.data);
            _this8.desserts = response.data.data.ProviderPurchaseDetail;

            _this8.getTotal();

            _this8.prpu_pk = response.data.data.ProviderPurchase.prpu_pk; //response.data.data.ProviderPurchaseDetail//

            _this8.editadoHeader = response.data.data.ProviderPurchase;
            var i = 0;

            for (i = 0; i < _this8.providers.length; i++) {
              if (response.data.data.ProviderPurchase.prov_fk == _this8.providers[i].prov_pk) {
                _this8.selectProv = _this8.providers[i];
              }
            }

            for (i = 0; i < _this8.stores.length; i++) {
              if (response.data.data.ProviderPurchase.stor_fk == _this8.stores[i].stor_pk) {
                console.log(i);
                _this8.selectStore = _this8.stores[i];
              }
            }
          } else {
            if (_this8.prpo_pk > 0) _this8.normal('Notificación', response.data.status.message, "error");
          }
        })["catch"](function (e) {
          //this.errors.push(e)
          console.log(e);

          _this8.normal('Notificación', "Error al cargar los datos11", "error");
        });
      } else {
        axios.get('/provider/purchases/' + this.prpo_pk + '').then(function (response) {
          setTimeout(function () {
            return _this8.loading = false;
          }, 500);

          if (response.data.data != null) {
            console.log('response');
            console.log(response);
            _this8.desserts = response.data.data.ProviderPurchaseDetail;

            _this8.getTotal();

            _this8.prpu_pk = response.data.data.ProviderPurchase.prpu_pk; //response.data.data.ProviderPurchaseDetail//

            _this8.editadoHeader = response.data.data.ProviderPurchase;
          } else {
            if (_this8.prpo_pk > 0) _this8.normal('Notificación', response.data.status.message, "error");
          }
        })["catch"](function (e) {
          //this.errors.push(e)
          console.log(e);

          _this8.normal('Notificación', "Error al cargar los datos22", "error");
        });
      }
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    buscar: function buscar() {
      var _this9 = this;

      this.loading = true;
      axios.get('/product/search').then(function (response) {
        setTimeout(function () {
          return _this9.loading = false;
        }, 500);
        _this9.products = response.data.data;
        _this9.dialog = true;
        console.log(response.data);
      })["catch"](function (e) {
        _this9.errors.push(e);
      });
    },
    onQuantityChange: function onQuantityChange(item) {
      var _this10 = this;

      //this.editado = Object.assign({}, item)
      this.detail.prpd_pk = item.prpd_pk, this.detail.prod_fk = item.prod_pk;
      this.detail.prpd_quantity = item.prpd_quantity;
      this.detail.prpd_price = item.prpd_price;
      this.detail.prpd_discountrate = item.prpd_discountrate;
      this.detail.prpd_ieps = item.prpd_ieps;
      this.detail.prpd_iva = item.prpd_iva;
      axios.post('/provider/purchase/details/update', this.detail).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this10.textMsg = "¡Actualizado correctamente!"; //this.normal('Notificación','¡Actualizado correctamente!' ,"success");

          _this10.getTotal();
        } else {
          _this10.normal('Notificación', response.data.status.message, "success");
        }
      })["catch"](function (e) {
        _this10.errors.push(e);
      });
    },
    getTotal: function getTotal() {
      this.subtotal = 0;
      this.descuento = 0;
      this.iva = 0;
      this.ieps = 0;

      for (var i = 0; i < this.desserts.length; i++) {
        var importe = this.desserts[i].prpd_price * this.desserts[i].prpd_quantity;
        var importeDescuento = importe * (1 - this.desserts[i].prpd_discountrate / 100);
        this.descuento = this.descuento + importe * (this.desserts[i].prpd_discountrate / 100);
        this.subtotal = this.subtotal + importeDescuento;
        if (this.desserts[i].prod_iva == 1) this.iva = this.iva + importeDescuento / (1 + this.desserts[i].syst_iva / 100) * (this.desserts[i].syst_iva / 100);
        if (this.desserts[i].prod_ieps == 1) this.ieps = this.ieps + importeDescuento * (this.desserts[i].syst_ieps / 100);
      }

      this.total = this.subtotal + this.ieps;
      console.log('this.total = ' + this.total);
    },
    finalizar: function finalizar() {
      if (this.total <= 0) {
        this.normal('Notificación', "La orden de compra no puede ser menor o igual a cero", "error");
        return;
      }

      if (!this.directa == 2) if (this.selectProv == '' || this.selectProv == null) {
        this.normal('Notificación', "Debe seleccionar un proveedor", "error");
        return;
      }
      if (!this.enabledStore) if (this.selectStore == '' || this.selectStore == null) {
        this.normal('Notificación', "Debe seleccionar una sucursal", "error");
        return;
      }

      if (this.selectpame == '' || this.selectpame == null) {
        this.normal('Notificación', "Debe seleccionar una forma de pago", "error");
        return;
      }

      this.messageQuestion = '¿Está seguro de finalizar la compra?';
      this.dialogQuestion = true;
    },
    guardaFinalizar: function guardaFinalizar() {
      var _this11 = this;

      this.orderHeader.prpu_pk = this.prpu_pk;
      this.orderHeader.prpo_pk = this.prpo_pk;
      this.orderHeader.prov_fk = this.selectProv.prov_pk; //this.orderHeader.stor_fk = this.selectStore.stor_pk

      this.orderHeader.pame_fk = this.selectpame.pame_pk;
      this.orderHeader.prpu_amount = this.total;
      this.orderHeader.prpu_observation = this.observation;
      if (!this.enabledStore) this.orderHeader.stor_fk = this.selectStore.stor_pk;else this.orderHeader.stor_fk = this.users.store_id;
      console.log('this.orderHeader');
      console.log(this.orderHeader);
      axios.post('/provider/purchases/update', this.orderHeader).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this11.textMsg = "¡Actualizado correctamente!";

          _this11.normal('Notificación', '¡Actualizado correctamente!', "success");

          _this11.$router.push('/purchaselist');
        } else {
          _this11.normal('Notificación', response.data.status.code.message, "error");
        }
      })["catch"](function (e) {
        _this11.errors.push(e);
      });
    },
    finalizarVenta: function finalizarVenta() {
      var _this12 = this;

      console.log(this.total + '-' + (this.efectivo + this.tarjeta));
      if (this.editadoSale.pame_fk == 1) if (this.total - this.efectivo - this.tarjeta == 0) {} else {
        this.normal('Notificación', "Los montos de pago deben ser igual al total", "error");
        return;
      }
      var r = confirm("¿Está seguro de finalizar la compra?");

      if (r == true) {
        this.editadoSale.clde_amount = this.total;
        this.editadoSale.clpa_amount_cash = this.efectivo;
        this.editadoSale.clpa_amount_transfer = this.tarjeta;
        axios.post('/clientsales/update', this.editadoSale).then(function (response) {
          console.log(response);

          if (response.data.code == 200) {
            _this12.textMsg = "¡Actualizado correctamente!";

            _this12.normal('Notificación', '¡Actualizado correctamente!', "success");

            _this12.$router.push('/sales');
          } else {
            _this12.normal('Notificación', response.data.message, "error");
          }
        })["catch"](function (e) {
          _this12.errors.push(e);
        });
      }
    },
    actualizar: function actualizar(item) {
      var _this13 = this;

      this.editado = Object.assign({}, item);
      axios.post('/client_sale_details/update', this.editado).then(function (response) {
        _this13.textMsg = "¡Actualizado correctamente!";
      })["catch"](function (e) {
        _this13.errors.push(e);
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
              attrs: { scrollable: "", "max-width": "600" },
              model: {
                value: _vm.dialogAgregar,
                callback: function($$v) {
                  _vm.dialogAgregar = $$v
                },
                expression: "dialogAgregar"
              }
            },
            [
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
                    "v-card",
                    [
                      _c(
                        "v-toolbar",
                        { attrs: { dark: "", color: "cyan" } },
                        [
                          _c("v-toolbar-title", [_vm._v("Agregar producto")]),
                          _vm._v(" "),
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-toolbar-items",
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { icon: "", dark: "" },
                                  on: {
                                    click: function($event) {
                                      _vm.dialogAgregar = false
                                    }
                                  }
                                },
                                [_c("v-icon", [_vm._v("mdi-close")])],
                                1
                              )
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
                        "v-card-text",
                        [
                          _c("v-text-field", {
                            attrs: { label: "ID", disabled: "" },
                            model: {
                              value: _vm.detail.prod_identifier,
                              callback: function($$v) {
                                _vm.$set(_vm.detail, "prod_identifier", $$v)
                              },
                              expression: "detail.prod_identifier"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: { label: "Nombre", disabled: "" },
                            model: {
                              value: _vm.detail.prod_name,
                              callback: function($$v) {
                                _vm.$set(_vm.detail, "prod_name", $$v)
                              },
                              expression: "detail.prod_name"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-combobox", {
                            attrs: {
                              required: "",
                              items: _vm.measurements,
                              label: "Unidad de Medida",
                              "item-text": "meas_name",
                              "item-value": "meas_pk",
                              filled: "",
                              chips: "",
                              placeholder: "Seleccionar una opción"
                            },
                            model: {
                              value: _vm.selectmeas,
                              callback: function($$v) {
                                _vm.selectmeas = $$v
                              },
                              expression: "selectmeas"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Cantidad",
                              type: "number",
                              rules: _vm.minNumberRules,
                              autofocus: "",
                              required: ""
                            },
                            model: {
                              value: _vm.detail.prpd_quantity,
                              callback: function($$v) {
                                _vm.$set(_vm.detail, "prpd_quantity", $$v)
                              },
                              expression: "detail.prpd_quantity"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio",
                              prefix: "$",
                              type: "number",
                              rules: _vm.minNumberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.detail.prpd_price,
                              callback: function($$v) {
                                _vm.$set(_vm.detail, "prpd_price", $$v)
                              },
                              expression: "detail.prpd_price"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: { label: "Descuento(%)", type: "number" },
                            model: {
                              value: _vm.detail.prpd_discountrate,
                              callback: function($$v) {
                                _vm.$set(_vm.detail, "prpd_discountrate", $$v)
                              },
                              expression: "detail.prpd_discountrate"
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
                              on: {
                                click: function($event) {
                                  _vm.dialogAgregar = false
                                }
                              }
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
                              on: {
                                click: function($event) {
                                  return _vm.agregar()
                                }
                              }
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
            "v-dialog",
            {
              attrs: { "max-width": "800px", scrollable: "" },
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
                  _c(
                    "v-toolbar",
                    { attrs: { dark: "", color: "cyan" } },
                    [
                      _c("v-toolbar-title", [_vm._v("Buscar producto")]),
                      _vm._v(" "),
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-toolbar-items",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: { icon: "", dark: "" },
                              on: {
                                click: function($event) {
                                  _vm.dialog = false
                                }
                              }
                            },
                            [_c("v-icon", [_vm._v("mdi-close")])],
                            1
                          )
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
                    "v-card-text",
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
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12", sm: "12" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        autofocus: "",
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
                                      _vm._s(
                                        _vm.formatMoney(item.prod_saleprice)
                                      )
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
                                      {
                                        attrs: { color: "green", outlined: "" }
                                      },
                                      [
                                        _vm._v(
                                          "\r\n                                Granel"
                                        )
                                      ]
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
                                      color: "green",
                                      title: "Agregar producto"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.openAgregar(item)
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
                            { attrs: { cols: "6" } },
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
                                            _vm._s(
                                              _vm.editadoHeader.prov_name
                                            ) +
                                            "\r\n                                "
                                        )
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.directa == 2
                                    ? _c("v-label", [
                                        _c("h4", [_vm._v("Sucursal:")]),
                                        _vm._v(
                                          " " +
                                            _vm._s(_vm.users.stor_name) +
                                            "\r\n                                "
                                        )
                                      ])
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
                            { attrs: { cols: "6" } },
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
                                            _vm._s(
                                              _vm.editadoHeader.stor_name
                                            ) +
                                            "\r\n                                "
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
                                  _c("v-text-field", {
                                    attrs: {
                                      label:
                                        "Número de Nota/Factura de Recepción de Ingreso"
                                    },
                                    model: {
                                      value: _vm.observation,
                                      callback: function($$v) {
                                        _vm.observation = $$v
                                      },
                                      expression: "observation"
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
                              _c(
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
                                    " Buscar Producto\r\n                            "
                                  )
                                ],
                                1
                              ),
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
                                  _vm._v(
                                    " Finalizar\r\n                            "
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
                                      _vm._v("Precio($)")
                                    ]),
                                    _vm._v(" "),
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("Importe")
                                    ]),
                                    _vm._v(" "),
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("Descuento(%)")
                                    ]),
                                    _vm._v(" "),
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("Descuento($)")
                                    ]),
                                    _vm._v(" "),
                                    _c("th", { staticClass: "text-left" }, [
                                      _vm._v("Importe Total")
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
                                        _c("td", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.formatMoney(
                                                item.prpd_quantity *
                                                  item.prpd_price
                                              )
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
                                                      item.prpd_discountrate,
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
                                              : _c("span", [_vm._v("0")])
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.formatMoney(
                                                item.prpd_quantity *
                                                  item.prpd_price *
                                                  (item.prpd_discountrate / 100)
                                              )
                                            )
                                          )
                                        ]),
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
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td"),
                                      _vm._v(" "),
                                      _c("td", [_vm._v("Descuento")]),
                                      _vm._v(" "),
                                      _c("td", [
                                        _vm._v(
                                          "$" +
                                            _vm._s(
                                              _vm.formatMoney(_vm.descuento)
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