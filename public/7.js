(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ClientSalesFiltered.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/ClientSalesFiltered.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      headers: [{
        text: "Venta",
        value: "clsa_identifier"
      }, {
        text: "Pedido",
        value: "clor_identifier"
      }, {
        text: "Cliente",
        value: "clie_name"
      }, {
        text: "Sucursal",
        value: "stor_name"
      }, {
        text: "Método Pago",
        value: "pame_name"
      }, {
        text: "Fecha",
        value: "created_at"
      }, {
        text: "Estatus",
        value: "status"
      }, {
        text: "",
        value: "action"
      }],
      menu2: false,
      select: 0,
      selectClient: "",
      selectpame: "",
      payments: [],
      clients: [],
      paymentsShapes: [],
      principal: false,
      estado: true,
      editedIndex: -1,
      data_order: [],
      search: "",
      dialog: false,
      snackbar: false,
      timeout: 2000,
      idUserStore: 0,
      textMsg: "",
      menu1: false,
      stores: [],
      SelectSucursal: "",
      enabledStore: false,
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: "",
      data_filter: {
        stor_pk: 0,
        clor_status: -1,
        start_date: "",
        end_date: "",
        clie_pk: 0,
        pame_pk: 0
      },
      boxEnabled: false,
      select_status: "",
      start_date: "",
      end_date: "",
      data_status: [{
        name_status: "Mostrar Todo",
        pk_status: -1
      }, {
        name_status: "Pendiente",
        pk_status: 0
      }, {
        name_status: "En Proceso de Pago",
        pk_status: 2
      }, {
        name_status: "Pagado",
        pk_status: 3
      }]
    };
  },
  created: function created() {
    this.getStores();
    this.getUsers();
    this.obtenerCaja();
    this.getClients();
    this.getPayment();
  },
  methods: {
    getPayment: function getPayment() {
      var _this = this;

      axios.get("/paymentmethodsget").then(function (response) {
        _this.payments = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getClients: function getClients() {
      var _this2 = this;

      axios.get("/clientsget").then(function (response) {
        _this2.clients = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getStores: function getStores() {
      var _this3 = this;

      axios.get("/storeget").then(function (response) {
        _this3.stores = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getUsers: function getUsers() {
      var _this4 = this;

      axios.get("/listUser").then(function (response) {
        _this4.users = response.data.data;

        if (_this4.users.store_id > 0) {
          _this4.enabledStore = true;
          _this4.SelectSucursal = _this4.stores.find(function (item) {
            return item.stor_pk == _this4.users.store_id;
          });
        } else _this4.enabledStore = false;
      })["catch"](function (e) {
        _this4.errors.push(e);
      });
    },
    obtenerCaja: function obtenerCaja() {
      var _this5 = this;

      axios.get("/boxcut").then(function (response) {
        if (response.data.data == null) {
          _this5.boxEnabled = true;
        } else {
          _this5.boxEnabled = false;
        }

        console.log("boxEnabled -->" + _this5.boxEnabled);
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getSaleFilterClear: function getSaleFilterClear() {
      this.start_date = "";
      this.end_date = ""; //this.getOrderFilter();
    },
    getSaleFilter: function getSaleFilter() {
      var _this6 = this;

      if (this.SelectSucursal == "") {
        this.normal("Sucursal", "Seleccionar Sucursal", "warning");
        return false;
      }

      if (this.select_status == null || this.select_status === undefined || this.select_status == "" || this.select_status.pk_status == -1) {
        var vStatus = -1;
      } else {
        var vStatus = this.select_status.pk_status;
      }

      if (this.selectClient == null || this.selectClient === undefined || this.selectClient == "" || this.selectClient.clie_pk == -1) {
        var vClient = -1;
      } else {
        var vClient = this.selectClient.clie_pk;
      }

      if (this.selectpame == null || this.selectpame === undefined || this.selectpame == "" || this.selectpame.pame_pk == -1) {
        var vPayment = -1;
      } else {
        var vPayment = this.selectpame.pame_pk;
      }

      this.data_filter.stor_pk = this.SelectSucursal.stor_pk;
      this.data_filter.clor_status = vStatus;
      this.data_filter.start_date = this.start_date;
      this.data_filter.end_date = this.end_date;
      this.data_filter.clie_pk = vClient;
      this.data_filter.pame_pk = vPayment;

      if (this.start_date != "" && this.end_date == "") {
        this.normal("Fecha Fin", "Seleccionar Fecha Fin", "warning");
        return false;
      }

      if (this.end_date != "" && this.start_date == "") {
        this.normal("Fecha Inicio", "Seleccionar Fecha Inicio", "warning");
        return false;
      }

      console.log("data_filter.stor_pk: " + this.data_filter.stor_pk + "_____ data_filter.clor_status: " + this.data_filter.clor_status + "_____ data_filter.start_date: " + this.data_filter.start_date + "_____ data_filter.end_date: " + this.data_filter.end_date + "_____ data_filter.clie_pk: " + this.data_filter.clie_pk + "_____ data_filter.pame_pk: " + this.data_filter.pame_pk);
      this.loading = true;
      axios.post("/clientsales/filtered", this.data_filter).then(function (response) {
        setTimeout(function () {
          return _this6.loading = false;
        }, 500);

        if (response.data.data != null) {
          _this6.data_order = response.data.data;
        } else {
          _this6.normal("Notificación", response.data.status.message, "error");

          console.log("Detalle: " + response.data.status.technicaldetail);
        }
      })["catch"](function (e) {
        _this6.normal("Notificación", e, "error");
      });
    },
    printTicket: function printTicket(url) {
      var newWin = window.open(url, "Imprimir orden", "height=400,width=600");
      setTimeout(function () {
        newWin.print();
      }, 1000);
      setTimeout(function () {
        newWin.close();
      }, 50000);
      return true;
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
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("auth", ["can"]))
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ClientSalesFiltered.vue?vue&type=template&id=3e5520bc&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/ClientSalesFiltered.vue?vue&type=template&id=3e5520bc& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
                value: _vm.boxEnabled,
                callback: function($$v) {
                  _vm.boxEnabled = $$v
                },
                expression: "boxEnabled"
              }
            },
            [
              _vm._v(
                "\n      Para realizar una venta, primero debe abrir caja.\n    "
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
                      _c("v-data-table", {
                        staticClass: "elevation-3",
                        attrs: {
                          headers: _vm.headers,
                          items: _vm.data_order,
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
                                  { attrs: { flat: "", color: "indigo" } },
                                  [
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
                                  "v-card-text",
                                  [
                                    _c(
                                      "v-row",
                                      [
                                        _c(
                                          "v-col",
                                          { attrs: { cols: "6" } },
                                          [
                                            _c("v-combobox", {
                                              attrs: {
                                                required: "",
                                                items: _vm.stores,
                                                label: "Sucursal",
                                                disabled: _vm.enabledStore,
                                                "item-text": "stor_name",
                                                "item-value": "stor_pk",
                                                filled: "",
                                                chips: "",
                                                placeholder:
                                                  "Seleccionar una sucursal"
                                              },
                                              model: {
                                                value: _vm.SelectSucursal,
                                                callback: function($$v) {
                                                  _vm.SelectSucursal = $$v
                                                },
                                                expression: "SelectSucursal"
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
                                            _c("v-combobox", {
                                              attrs: {
                                                items: _vm.data_status,
                                                "item-text": "name_status",
                                                "item-value": "pk_status",
                                                filled: "",
                                                chips: "",
                                                label: "Estatus",
                                                placeholder:
                                                  "Seleccionar Estatus"
                                              },
                                              model: {
                                                value: _vm.select_status,
                                                callback: function($$v) {
                                                  _vm.select_status = $$v
                                                },
                                                expression: "select_status"
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
                                      "v-row",
                                      [
                                        _c(
                                          "v-col",
                                          { attrs: { cols: "6" } },
                                          [
                                            _c("v-combobox", {
                                              attrs: {
                                                items: _vm.clients,
                                                label: "Cliente",
                                                "item-text": "clie_name",
                                                "item-value": "clie_pk",
                                                filled: "",
                                                chips: "",
                                                placeholder:
                                                  "Seleccionar Cliente"
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
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-col",
                                          { attrs: { cols: "6" } },
                                          [
                                            _c("v-combobox", {
                                              attrs: {
                                                items: _vm.payments,
                                                label: "Métodos de pago",
                                                "item-text": "pame_name",
                                                "item-value": "pame_pk",
                                                filled: "",
                                                chips: "",
                                                placeholder:
                                                  "Seleccionar Método Pago"
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
                                      "v-row",
                                      [
                                        _c(
                                          "v-col",
                                          { attrs: { cols: "12", lg: "6" } },
                                          [
                                            _c(
                                              "v-menu",
                                              {
                                                attrs: {
                                                  "close-on-content-click": false,
                                                  "nudge-right": 40,
                                                  transition:
                                                    "scale-transition",
                                                  "offset-y": "",
                                                  "min-width": "290px"
                                                },
                                                scopedSlots: _vm._u([
                                                  {
                                                    key: "activator",
                                                    fn: function(ref) {
                                                      var on = ref.on
                                                      return [
                                                        _c(
                                                          "v-text-field",
                                                          _vm._g(
                                                            {
                                                              attrs: {
                                                                label:
                                                                  "Fecha Inicio",
                                                                "prepend-icon":
                                                                  "event",
                                                                readonly: ""
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm.start_date,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  _vm.start_date = $$v
                                                                },
                                                                expression:
                                                                  "start_date"
                                                              }
                                                            },
                                                            on
                                                          )
                                                        )
                                                      ]
                                                    }
                                                  }
                                                ]),
                                                model: {
                                                  value: _vm.menu2,
                                                  callback: function($$v) {
                                                    _vm.menu2 = $$v
                                                  },
                                                  expression: "menu2"
                                                }
                                              },
                                              [
                                                _vm._v(" "),
                                                _c("v-date-picker", {
                                                  on: {
                                                    input: function($event) {
                                                      _vm.menu2 = false
                                                    }
                                                  },
                                                  model: {
                                                    value: _vm.start_date,
                                                    callback: function($$v) {
                                                      _vm.start_date = $$v
                                                    },
                                                    expression: "start_date"
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
                                          { attrs: { cols: "12", lg: "6" } },
                                          [
                                            _c(
                                              "v-menu",
                                              {
                                                attrs: {
                                                  "close-on-content-click": false,
                                                  "nudge-right": 40,
                                                  transition:
                                                    "scale-transition",
                                                  "offset-y": "",
                                                  "min-width": "290px"
                                                },
                                                scopedSlots: _vm._u([
                                                  {
                                                    key: "activator",
                                                    fn: function(ref) {
                                                      var on = ref.on
                                                      return [
                                                        _c(
                                                          "v-text-field",
                                                          _vm._g(
                                                            {
                                                              attrs: {
                                                                label:
                                                                  "Fecha Fin",
                                                                "prepend-icon":
                                                                  "event",
                                                                readonly: ""
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm.end_date,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  _vm.end_date = $$v
                                                                },
                                                                expression:
                                                                  "end_date"
                                                              }
                                                            },
                                                            on
                                                          )
                                                        )
                                                      ]
                                                    }
                                                  }
                                                ]),
                                                model: {
                                                  value: _vm.menu1,
                                                  callback: function($$v) {
                                                    _vm.menu1 = $$v
                                                  },
                                                  expression: "menu1"
                                                }
                                              },
                                              [
                                                _vm._v(" "),
                                                _c("v-date-picker", {
                                                  attrs: {
                                                    min: _vm.start_date
                                                  },
                                                  on: {
                                                    input: function($event) {
                                                      _vm.menu1 = false
                                                    }
                                                  },
                                                  model: {
                                                    value: _vm.end_date,
                                                    callback: function($$v) {
                                                      _vm.end_date = $$v
                                                    },
                                                    expression: "end_date"
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
                                                staticClass: "mr-4",
                                                attrs: { color: "success" },
                                                on: { click: _vm.getSaleFilter }
                                              },
                                              [_vm._v("Buscar")]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-col",
                                          [
                                            _c(
                                              "v-btn",
                                              {
                                                staticClass: "mr-4",
                                                attrs: { color: "blue" },
                                                on: {
                                                  click: _vm.getSaleFilterClear
                                                }
                                              },
                                              [_vm._v("Limpiar")]
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
                            key: "item",
                            fn: function(props) {
                              return [
                                _c("tr", [
                                  _c(
                                    "td",
                                    {
                                      staticStyle: {
                                        "font-weight": "600 !important"
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                  " +
                                          _vm._s(props.item.clsa_identifier) +
                                          "\n                "
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(props.item.clor_identifier))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(props.item.clie_name))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(props.item.stor_name))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(props.item.pame_name))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s(props.item.created_at))
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    [
                                      props.item.clsa_status == 0
                                        ? _c(
                                            "v-chip",
                                            {
                                              attrs: { color: "red", dark: "" }
                                            },
                                            [
                                              _vm._v(
                                                "\n                    Pendiente"
                                              )
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      props.item.clsa_status == 2
                                        ? _c(
                                            "v-chip",
                                            {
                                              attrs: { color: "blue", dark: "" }
                                            },
                                            [
                                              _vm._v(
                                                "\n                    En Proceso de Pago"
                                              )
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      props.item.clsa_status == 3
                                        ? _c(
                                            "v-chip",
                                            {
                                              attrs: {
                                                color: "green",
                                                dark: ""
                                              }
                                            },
                                            [_vm._v("Pagado")]
                                          )
                                        : _vm._e()
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    [
                                      props.item.clsa_status_description !=
                                        "Pendiente" &&
                                      props.item.cantreturn == 0 &&
                                      _vm.can("clientreturn")
                                        ? _c(
                                            "v-btn",
                                            {
                                              staticClass: "mr-2",
                                              attrs: {
                                                fab: "",
                                                dark: "",
                                                small: "",
                                                color: "pink",
                                                href:
                                                  "/clientsreturn/" +
                                                  props.item.clsa_pk,
                                                title: "Devolución"
                                              }
                                            },
                                            [
                                              _c(
                                                "v-icon",
                                                { attrs: { dark: "" } },
                                                [
                                                  _vm._v(
                                                    "mdi-arrow-left-bold-circle"
                                                  )
                                                ]
                                              )
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c(
                                        "v-btn",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            fab: "",
                                            dark: "",
                                            small: "",
                                            color: "purple",
                                            title: "Detalle de venta",
                                            href:
                                              "/salesdetail/" +
                                              props.item.clsa_pk
                                          }
                                        },
                                        [
                                          _c(
                                            "v-icon",
                                            { attrs: { dark: "" } },
                                            [_vm._v("mdi-eye")]
                                          )
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      props.item.clsa_status_description !=
                                      "Pendiente"
                                        ? _c(
                                            "v-btn",
                                            {
                                              staticClass: "mr-2",
                                              attrs: {
                                                fab: "",
                                                dark: "",
                                                small: "",
                                                color: "orange",
                                                title: "Imprimir ticket"
                                              },
                                              on: {
                                                click: function($event) {
                                                  return _vm.printTicket(
                                                    "/client/sales/printOrder/" +
                                                      props.item.clsa_pk
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-icon",
                                                { attrs: { dark: "" } },
                                                [_vm._v("mdi-printer")]
                                              )
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      props.item.clsa_status_description ==
                                        "Pendiente" && _vm.boxEnabled != true
                                        ? _c(
                                            "v-btn",
                                            {
                                              staticClass: "mr-2",
                                              attrs: {
                                                fab: "",
                                                dark: "",
                                                small: "",
                                                color: "cyan",
                                                title: "Continuar venta",
                                                href:
                                                  "/detaiorder/" +
                                                  props.item.clor_pk
                                              }
                                            },
                                            [
                                              _c(
                                                "v-icon",
                                                { attrs: { dark: "" } },
                                                [_vm._v("mdi-cash-register")]
                                              )
                                            ],
                                            1
                                          )
                                        : _vm._e()
                                    ],
                                    1
                                  )
                                ])
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

/***/ "./resources/js/components/views/ClientSalesFiltered.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/views/ClientSalesFiltered.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ClientSalesFiltered_vue_vue_type_template_id_3e5520bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientSalesFiltered.vue?vue&type=template&id=3e5520bc& */ "./resources/js/components/views/ClientSalesFiltered.vue?vue&type=template&id=3e5520bc&");
/* harmony import */ var _ClientSalesFiltered_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientSalesFiltered.vue?vue&type=script&lang=js& */ "./resources/js/components/views/ClientSalesFiltered.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ClientSalesFiltered_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ClientSalesFiltered_vue_vue_type_template_id_3e5520bc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ClientSalesFiltered_vue_vue_type_template_id_3e5520bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/ClientSalesFiltered.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/ClientSalesFiltered.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/views/ClientSalesFiltered.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientSalesFiltered_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ClientSalesFiltered.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ClientSalesFiltered.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientSalesFiltered_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/ClientSalesFiltered.vue?vue&type=template&id=3e5520bc&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/views/ClientSalesFiltered.vue?vue&type=template&id=3e5520bc& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientSalesFiltered_vue_vue_type_template_id_3e5520bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ClientSalesFiltered.vue?vue&type=template&id=3e5520bc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/ClientSalesFiltered.vue?vue&type=template&id=3e5520bc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientSalesFiltered_vue_vue_type_template_id_3e5520bc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientSalesFiltered_vue_vue_type_template_id_3e5520bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);