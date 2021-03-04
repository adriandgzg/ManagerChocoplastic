(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[44],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/TransferDetailFin.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/TransferDetailFin.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var crip_vue_notice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crip-vue-notice */ "./node_modules/crip-vue-notice/lib/crip-vue-notice.js");
/* harmony import */ var crip_vue_notice__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crip_vue_notice__WEBPACK_IMPORTED_MODULE_0__);
var _methods;

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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var _ref;

    return _ref = {
      headers: [{
        text: "Ident",
        value: "prod_identifier"
      }, {
        text: "Nombre Producto",
        value: "prod_name"
      }, {
        text: "Unidad Salida",
        value: "meas_fk_input_name"
      }, {
        text: "Tipo",
        value: "bulk"
      }, {
        text: "",
        value: "action",
        width: "20%"
      }],
      prtr_pk: this.$route.params.id,
      directa: this.$route.params.directa,
      prtr_observation: "",
      prpu_pk: 0,
      valid: false,
      stores: [],
      providers: [],
      desserts: [],
      products: [],
      selectProv: "",
      selectStore: "",
      payments: [],
      selectpame: "",
      search: "",
      snackbar: false,
      timeout: 2000,
      subtotal: 0,
      total: 0,
      iva: 0,
      textMsg: "",
      editadoHeader: {
        prpu_pk: 0,
        prov_fk: 0,
        prov_name: "",
        prpo_fk: 0,
        stor_fk: 0,
        store_name: "",
        pame_fk: 0,
        pame_name: "",
        prpu_identifier: "",
        prpu_type: 0,
        prpu_status: 0,
        created_at: "",
        updated_at: ""
      },
      editado: {
        prtd_pk: 0,
        prtd_quantity: 0,
        prtd_price: 0,
        prtd_discountrate: 0,
        prod_pk: 0,
        prod_identifier: 0,
        prod_name: "",
        prod_description: "",
        meas_name: ""
      },
      defaultItem: {
        prtd_pk: 0,
        prtd_quantity: 0,
        prtd_price: 0,
        prtd_discountrate: 0,
        prod_pk: 0,
        prod_identifier: 0,
        prod_name: "",
        prod_description: "",
        meas_name: ""
      },
      detail: {
        prpu_pk: 0,
        prtr_fk: 0,
        pame_fk: 0,
        prov_fk: 0,
        stor_fk: 0,
        prpo_fk: 0,
        prod_fk: 0,
        prtd_pk: 0,
        prtd_quantity: 0,
        prtd_price: 0,
        prtd_discountrate: 0
      },
      detailDefault: {
        prpo_fk: 0,
        prod_fk: 0,
        prtd_pk: 0,
        prtd_quantity: 0,
        prtd_price: 0,
        prtd_discountrate: 0
      },
      orderHeader: {
        prpu_pk: 0,
        prtr_pk: 0,
        prov_fk: 0,
        stor_fk_input: 0,
        pame_fk: 0,
        prpu_amount: 0,
        prtr_observation: ""
      },
      enabledStore: false,
      dialogcredito: false,
      dialogcontado: false,
      dialog: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: "",
      minNumberRules: [function (value) {
        return !!value || "Requerido.";
      }, function (value) {
        return value > 0 || "El número debe ser mayor o igual a cero";
      }],
      loading: false
    }, _defineProperty(_ref, "dialogQuestion", false), _defineProperty(_ref, "dialogQuestionDelete", false), _defineProperty(_ref, "messageQuestion", ""), _ref;
  },
  created: function created() {
    //this.getStores();
    //this.getProviders();
    this.createCompra(); //this.getPayment();
    //this.getUsers();
  },
  methods: (_methods = {
    getUsers: function getUsers() {
      var _this = this;

      axios.get("/users").then(function (response) {
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
        return negativeSign + (j ? i.substr(0, j) + thousands : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
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
    agregar: function agregar(item) {
      var _this5 = this;

      if (this.desserts.length > 0) {
        this.detail.prtr_fk = this.prtr_pk;
      } else {
        this.detail.prtr_fk = 0;
      }

      this.detail.prod_fk = item.prod_pk;
      this.detail.prtd_quantity = 1;
      this.detail.prtd_price = 0;
      this.detail.prtd_discountrate = 0;
      this.detail.prov_fk = this.selectProv.prov_pk;
      this.detail.stor_fk = this.selectStore.stor_pk;
      this.detail.pame_fk = this.selectpame.pame_pk;
      axios.post("/product/transfer/details", this.detail).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this5.textMsg = "¡Actualizado correctamente!";
          _this5.prtr_pk = response.data.data; //this.normal('Notificación','¡Actualizado correctamente!' ,"success");

          _this5.createCompra();

          _this5.dialog = false; //this.getTotal();
        } else {
          _this5.normal("Notificación", response.data.message, "error");
        }
      })["catch"](function (e) {
        _this5.errors.push(e);
      });
    },
    borrar: function borrar(item) {
      console.log(item);
      this.editado = Object.assign({}, item);
      this.dialogQuestionDelete = true;
    },
    createCompra: function createCompra() {
      var _this6 = this;

      this.loading = true;
      axios.get("/product/transfers/" + this.prtr_pk + "").then(function (response) {
        setTimeout(function () {
          return _this6.loading = false;
        }, 500);

        if (response.data.data != null) {
          console.log(response);
          _this6.desserts = response.data.data.ProductTransferDetails;
          _this6.prtr_pk = response.data.data.ProductTransfers.prtr_pk;
          _this6.editadoHeader = response.data.data.ProductTransfers;
        } else {
          if (_this6.prtr_pk > 0) _this6.normal("Notificación", response.data.status.message, "error");
        }
      })["catch"](function (e) {
        console.log(e);

        _this6.normal("Notificación", "Error al cargar los datos", "error");
      });
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    buscar: function buscar() {
      var _this7 = this;

      this.loading = true;
      axios.get("/product/search").then(function (response) {
        setTimeout(function () {
          return _this7.loading = false;
        }, 500);
        _this7.products = response.data.data;
        _this7.dialog = true;
      })["catch"](function (e) {
        setTimeout(function () {
          return _this7.loading = false;
        }, 500);

        _this7.normal("Notificación", "Error al cargar los datos", "error");
      });
    },
    guardaBorrar: function guardaBorrar() {
      this["delete"]();
      this.dialogQuestionDelete = false;
    },
    "delete": function _delete() {
      var _this8 = this;

      axios.post("/product/transfer/details/destroy", this.editado).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this8.textMsg = "¡Eliminado correctamente!";

          _this8.normal("Notificación", _this8.textMsg, "success");

          _this8.createCompra();
        } else {
          _this8.normal("Notificación", "Ocurrio un error al eliminar el producto", "error");
        }
      });
    }
  }, _defineProperty(_methods, "createCompra", function createCompra() {
    var _this9 = this;

    this.loading = true;
    axios.get("/product/transfers/" + this.prtr_pk + "").then(function (response) {
      setTimeout(function () {
        return _this9.loading = false;
      }, 2000);

      if (response.data.data != null) {
        console.log(response);
        _this9.desserts = response.data.data.ProductTransferDetails;
        _this9.prtr_pk = response.data.data.ProductTransfers.prtr_pk;
        _this9.editadoHeader = response.data.data.ProductTransfers;
      } else {
        if (_this9.prtr_pk > 0) _this9.normal("Notificación", response.data.status.message, "error");
      }
    })["catch"](function (e) {
      console.log(e);

      _this9.normal("Notificación", "Error al cargar los datos", "error");
    });
  }), _defineProperty(_methods, "cancelar", function cancelar() {
    this.dialog = false;
    this.editado = Object.assign({}, this.defaultItem);
    this.editedIndex = -1;
  }), _defineProperty(_methods, "buscar", function buscar() {
    var _this10 = this;

    axios.get("/product/search").then(function (response) {
      _this10.products = response.data.data;
      _this10.dialog = true;
      console.log(response.data);
    })["catch"](function (e) {
      _this10.errors.push(e);
    });
  }), _defineProperty(_methods, "onQuantityChange", function onQuantityChange(item) {
    var _this11 = this;

    this.detail.prtd_pk = item.prtd_pk, this.detail.prod_fk = item.prod_pk;
    this.detail.prtd_quantity = item.prtd_quantity;
    this.detail.prtd_price = item.prtd_price;
    this.detail.prtd_discountrate = item.prtd_discountrate;
    axios.post("/product/transfer/details/update", this.detail).then(function (response) {
      console.log(response);

      if (response.data.status.code == 200) {
        _this11.textMsg = "¡Actualizado correctamente!";
      } else {
        _this11.normal("Notificación", response.data.status.message, "success");
      }
    })["catch"](function (e) {
      _this11.errors.push(e);
    });
  }), _defineProperty(_methods, "getTotal", function getTotal() {
    this.subtotal = 0;

    for (var i = 0; i < this.desserts.length; i++) {
      this.subtotal = this.subtotal + this.desserts[i].prtd_price * this.desserts[i].prtd_quantity * (1 - this.desserts[i].prtd_discountrate / 100);
      console.log(this.subtotal);
    }

    this.total = this.subtotal + this.iva;
  }), _defineProperty(_methods, "finalizar", function finalizar() {
    this.messageQuestion = "¿Está seguro de finalizar el traspaso?";
    this.dialogQuestion = true;
  }), _defineProperty(_methods, "guardaFinalizar", function guardaFinalizar() {
    var _this12 = this;

    this.orderHeader.prtr_pk = this.prtr_pk;
    this.orderHeader.stor_fk_input = this.selectStore.stor_pk;
    this.orderHeader.prtr_observation = this.prtr_observation;
    console.log(this.orderHeader);
    axios.post("/product/transfers/update/finalize", this.orderHeader).then(function (response) {
      console.log(response);
      var vMessage = response.data.status.message;

      if (response.data.status.code == 200) {
        //this.textMsg = "¡Actualizado correctamente!";
        _this12.normal("Notificación", vMessage, "success");

        var route = _this12.$router.resolve({
          path: '/product/transfers/printTraspaso/' + response.data.data
        });

        window.open(route.href, '_blank');

        _this12.$router.push("/transferlist");
      } else {
        _this12.normal("Notificación", vMessage, "error");

        console.log(response.data.status.technicaldetail);
      }
    })["catch"](function (e) {
      _this12.errors.push(e);
    });
  }), _defineProperty(_methods, "normal", function normal(Title, Description, Type) {
    this.notice = new crip_vue_notice__WEBPACK_IMPORTED_MODULE_0___default.a({
      title: Title,
      description: Description,
      className: "open-normal",
      closable: true,
      duration: 3,
      type: Type
    });
  }), _methods)
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/TransferDetailFin.vue?vue&type=template&id=cbcb855a&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/TransferDetailFin.vue?vue&type=template&id=cbcb855a& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
                [_vm._v("Cerrar")]
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
                      _vm._v("Buscar Productos")
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
                        key: "item.bulk",
                        fn: function(ref) {
                          var item = ref.item
                          return [
                            item.prod_bulk == 1
                              ? _c(
                                  "v-chip",
                                  { attrs: { color: "green", outlined: "" } },
                                  [_vm._v("Granel")]
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
                            { attrs: { cols: "6" } },
                            [
                              _c(
                                "v-card-text",
                                {
                                  staticClass:
                                    "category d-inline-flex font-weight-light"
                                },
                                [
                                  _c(
                                    "v-list-item",
                                    { attrs: { "three-line": "" } },
                                    [
                                      _c(
                                        "v-list-item-content",
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "overline mb-4" },
                                            [_vm._v("SUCURSAL DE SALIDA")]
                                          ),
                                          _vm._v(" "),
                                          _c("v-list-item-title", [
                                            _vm._v(
                                              _vm._s(
                                                _vm.editadoHeader
                                                  .stor_name_output
                                              )
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
                                  _c(
                                    "v-list-item",
                                    { attrs: { "three-line": "" } },
                                    [
                                      _c(
                                        "v-list-item-content",
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "overline mb-4" },
                                            [_vm._v("SUCURSAL DE ENTRADA")]
                                          ),
                                          _vm._v(" "),
                                          _c("v-list-item-title", [
                                            _vm._v(
                                              _vm._s(
                                                _vm.editadoHeader
                                                  .stor_name_input
                                              )
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
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        [
                          _c(
                            "v-col",
                            [
                              _c(
                                "v-card-text",
                                {
                                  staticClass:
                                    "category d-inline-flex font-weight-light"
                                },
                                [
                                  _c(
                                    "v-list-item",
                                    { attrs: { "three-line": "" } },
                                    [
                                      _c(
                                        "v-list-item-content",
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "overline mb-4" },
                                            [_vm._v("OBSERVACIONES")]
                                          ),
                                          _vm._v(" "),
                                          _c("v-list-item-title", [
                                            _vm._v(
                                              _vm._s(
                                                _vm.editadoHeader
                                                  .prtr_observation
                                              )
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
                                    "Buscar Producto\r\n                            "
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
                                    "Finalizar\r\n                            "
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
                                      _vm._v("Unidad Medida Salida")
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "th",
                                      {
                                        staticClass: "text-left",
                                        staticStyle: { width: "200px" }
                                      },
                                      [_vm._v("Cantidad a traspasar")]
                                    ),
                                    _vm._v(" "),
                                    _c("th")
                                  ])
                                ]),
                                _vm._v(" "),
                                _c(
                                  "tbody",
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
                                            attrs: { label: "", required: "" },
                                            on: {
                                              change: function($event) {
                                                return _vm.onQuantityChange(
                                                  item
                                                )
                                              }
                                            },
                                            model: {
                                              value: item.prtd_quantity,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  item,
                                                  "prtd_quantity",
                                                  $$v
                                                )
                                              },
                                              expression: "item.prtd_quantity"
                                            }
                                          })
                                        ],
                                        1
                                      ),
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
                                  0
                                )
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

/***/ "./resources/js/components/views/TransferDetailFin.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/views/TransferDetailFin.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TransferDetailFin_vue_vue_type_template_id_cbcb855a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransferDetailFin.vue?vue&type=template&id=cbcb855a& */ "./resources/js/components/views/TransferDetailFin.vue?vue&type=template&id=cbcb855a&");
/* harmony import */ var _TransferDetailFin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransferDetailFin.vue?vue&type=script&lang=js& */ "./resources/js/components/views/TransferDetailFin.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TransferDetailFin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TransferDetailFin_vue_vue_type_template_id_cbcb855a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TransferDetailFin_vue_vue_type_template_id_cbcb855a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/TransferDetailFin.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/TransferDetailFin.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/views/TransferDetailFin.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferDetailFin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TransferDetailFin.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/TransferDetailFin.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferDetailFin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/TransferDetailFin.vue?vue&type=template&id=cbcb855a&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/views/TransferDetailFin.vue?vue&type=template&id=cbcb855a& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferDetailFin_vue_vue_type_template_id_cbcb855a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./TransferDetailFin.vue?vue&type=template&id=cbcb855a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/TransferDetailFin.vue?vue&type=template&id=cbcb855a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferDetailFin_vue_vue_type_template_id_cbcb855a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferDetailFin_vue_vue_type_template_id_cbcb855a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);