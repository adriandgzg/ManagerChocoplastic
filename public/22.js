(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/SalesBusiness.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/SalesBusiness.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    var _this = this;

    return {
      headers: [{
        text: 'ID',
        value: 'id'
      }, {
        text: 'Cliente',
        value: 'user.name'
      }, {
        text: 'Tienda',
        value: 'store.name'
      }, {
        text: 'Dirección',
        value: 'address.address'
      }, {
        text: 'Pago',
        value: 'payment_method.name'
      }, {
        text: 'Total',
        value: 'total'
      }, {
        text: 'Efectivo',
        value: 'cash_amount'
      }, {
        text: 'Ticket',
        value: 'ticket'
      }, {
        text: 'Comentario',
        value: 'comments'
      }, {
        text: 'Fecha Pedido',
        value: 'created_at'
      }, {
        text: 'Estado',
        value: 'status.name',
        width: '100px',
        filter: function filter(value) {
          if (_this.status.length === 0) return true;
          return _this.status.find(function (element) {
            return element === value;
          });
        }
      }, {
        text: '',
        value: 'action',
        width: '60px'
      }],
      valid: true,
      sales: [],
      categoriesNode: [],
      search: '',
      //para el cuadro de búsqueda de datatables
      detailForm: false,
      //para que la ventana de dialogo o modal no aparezca automáticamente
      imageUrl: '',
      selectedSale: {
        address: {},
        user: {},
        store: {},
        status: {},
        cancel_id: '',
        payment_method: {},
        delivery_time: {}
      },
      selectedProduct: {
        idProduct: '',
        idBusiness: '',
        completed: false
      },
      statuses: [],
      status: [],
      saleProducts: [],
      deliveryMen: [],
      deliveryMan: '',
      motivosCancelacion: [],
      motivoCancelacion: '',
      deliveryForm: false,
      cancelForm: false,
      confirm: false,
      confirm_text: '',
      confirm_result: false,
      resolve: null,
      reject: null,
      user: [],
      business: []
    };
  },
  created: function created() {
    this.getUser(); //this.getProducts();

    this.getStatusNode();
    this.getDeliveryMen();
    this.getMotivosCancelacion();
  },
  methods: {
    formatPrice: function formatPrice(value) {
      var val = (value / 1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getProducts: function getProducts(idStore) {
      var _this2 = this;

      if (!idStore) {
        idStore = 0;
      }

      axios.get('/saleList/' + idStore).then(function (response) {
        _this2.sales = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getUser: function getUser() {
      var _this3 = this;

      axios.get('/listUser').then(function (response) {
        _this3.user = response.data.data;

        _this3.getProducts(_this3.user.store_id);
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getDeliveryMen: function getDeliveryMen() {
      var _this4 = this;

      axios.get('/deliveryMen').then(function (response) {
        _this4.deliveryMen = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getStatusNode: function getStatusNode() {
      var _this5 = this;

      axios.get('/statusNode').then(function (response) {
        _this5.statuses = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getMotivosCancelacion: function getMotivosCancelacion() {
      var _this6 = this;

      axios.get('/motivosCancelacion').then(function (response) {
        _this6.motivosCancelacion = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    viewSale: function viewSale(sale) {
      var _this7 = this;

      axios.get('/sales/' + sale.id + '/productsBusiness/' + this.user.store_id).then(function (response) {
        //this.selectedSale.status.id = 1;
        //console.log(this.selectedSale);
        _this7.saleProducts = response.data.data;
        _this7.selectedSale = sale; //console.log(this.saleProducts);

        _this7.detailForm = true;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    updateSaleStatus: function updateSaleStatus(status) {
      var _this8 = this;

      if (this.selectedSale.status.id >= status) {
        return;
      }

      if (this.selectedSale.total > 0) {
        this.selectedSale.status_id = status;
        axios.put('/sale/updateStatus', this.selectedSale).then(function (response) {
          var statusObj = _this8.statuses.find(function (item) {
            return item.id === status;
          });

          _this8.sales.find(function (item) {
            return item.id === _this8.selectedSale.id;
          }).status = statusObj;
          _this8.sales.find(function (item) {
            return item.id === _this8.selectedSale.id;
          }).status_id = status;
        })["catch"](function (e) {
          console.log(e);
        });
      } else {
        alert("No se puede continuar, no cuenta con productos en el pedido");
      }
    },
    updateSaleDelivery: function updateSaleDelivery() {
      var _this9 = this;

      if (this.deliveryMan == '' || this.selectedSale.delivery_id != null) {
        console.log('error');
        return;
      }

      console.log(this.deliveryMan);
      axios.put('/sale/delivery/update', {
        id: this.selectedSale.id,
        delivery_id: this.deliveryMan
      }).then(function (response) {
        _this9.deliveryForm = false;
        _this9.selectedSale.delivery_id = _this9.deliveryMan.id;

        _this9.updateSaleStatus(4);
      })["catch"](function (e) {
        console.log(e);
      });
    },
    updateCancelReason: function updateCancelReason(status) {
      var _this10 = this;

      console.log(this.motivoCancelacion + ' <--> ' + this.selectedSale.cancel_id);

      if (this.motivoCancelacion == '') {
        console.log('error');
        return;
      }

      this.selectedSale.cancel_id = this.motivoCancelacion;
      this.selectedSale.status_id = status;
      console.log(this.selectedSale);
      axios.put('/sale/updateStatusCancel', this.selectedSale).then(function (response) {
        _this10.cancelForm = false;
        alert("El pedido ha sido cancelado.");

        var statusObj = _this10.statuses.find(function (item) {
          return item.id === status;
        });

        _this10.sales.find(function (item) {
          return item.id === _this10.selectedSale.id;
        }).status = statusObj;
        _this10.sales.find(function (item) {
          return item.id === _this10.selectedSale.id;
        }).status_id = status; //this.getProducts();
      })["catch"](function (e) {
        console.log(e);
      });
    },
    cancelSale: function cancelSale(status) {
      var _this11 = this;

      this.selectedSale.status_id = status;
      axios.put('/sale/updateStatus', this.selectedSale).then(function (response) {
        // this.selectedSale.status_id=status;
        var statusObj = _this11.statuses.find(function (item) {
          return item.id === status;
        });

        _this11.sales.find(function (item) {
          return item.id === _this11.selectedSale.id;
        }).status = statusObj;
        _this11.sales.find(function (item) {
          return item.id === _this11.selectedSale.id;
        }).status_id = status;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    cancelOrder: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /*if (! await this.ask('¿Seguro que desea cancelar esta orden?')) {
                    return;
                }*/
                this.cancelForm = true; //this.updateSaleStatus(6)

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function cancelOrder() {
        return _cancelOrder.apply(this, arguments);
      }

      return cancelOrder;
    }(),
    deleteProduct: function () {
      var _deleteProduct = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(product_id) {
        var _this12 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.ask('¿Desea borrar este producto?');

              case 2:
                if (_context2.sent) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return");

              case 4:
                axios.get('/sales/' + this.selectedSale.id + '/products/' + product_id + '/delete').then(function (response) {
                  _this12.selectedSale.total = response.data.data.total;

                  if (_this12.selectedSale.total <= 0) {
                    _this12.cancelSale(6);

                    alert("El pedido ha sido cancelado por falta de productos.");
                    _this12.detailForm = false;
                  }

                  _this12.saleProducts.splice(_this12.saleProducts.indexOf(_this12.saleProducts.find(function (item) {
                    return item.id === product_id;
                  })), 1);
                })["catch"](function (e) {
                  console.log(e);
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deleteProduct(_x) {
        return _deleteProduct.apply(this, arguments);
      }

      return deleteProduct;
    }(),
    completedProduct: function () {
      var _completedProduct = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(product, estado) {
        var _this13 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                //console.log(product);
                this.selectedProduct.idBusiness = this.selectedSale.id;
                this.selectedProduct.idProduct = product.id;
                this.selectedProduct.completed = estado; //console.log(this.selectedProduct)

                axios.put('/sale/updateProductSale', this.selectedProduct).then(function (response) {
                  //this.viewSale(this.selectedSale)
                  //var statusObj=this.statuses.find(item => item.id === status);
                  //this.sales.find(item => item.id === this.selectedSale.id).status=statusObj;
                  //this.sales.find(item => item.id === this.selectedSale.id).status_id=status;                        
                  _this13.saleProducts.find(function (item) {
                    return item.id === product.id;
                  }).completed = estado;
                })["catch"](function (e) {
                  console.log(e);
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function completedProduct(_x2, _x3) {
        return _completedProduct.apply(this, arguments);
      }

      return completedProduct;
    }(),
    ask: function ask(text) {
      var _this14 = this;

      this.confirm = true;
      this.confirm_text = text;
      return new Promise(function (resolve, reject) {
        _this14.resolve = resolve;
        _this14.reject = reject;
      });
    },
    agree: function agree() {
      this.resolve(true);
      this.confirm = false;
    },
    cancel: function cancel() {
      this.resolve(false);
      this.confirm = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/SalesBusiness.vue?vue&type=template&id=73a1a120&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/SalesBusiness.vue?vue&type=template&id=73a1a120& ***!
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
    "v-row",
    [
      _c("v-data-table", {
        staticClass: "elevation-3",
        attrs: {
          headers: _vm.headers,
          items: _vm.sales,
          search: _vm.search,
          "sort-by": "id",
          "sort-desc": [true]
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
            key: "body.prepend",
            fn: function() {
              return [
                _c("tr", [
                  _c("td", { attrs: { colspan: "10" } }),
                  _vm._v(" "),
                  _c(
                    "td",
                    [
                      _c("v-select", {
                        attrs: {
                          flat: "",
                          "hide-details": "",
                          small: "",
                          multiple: "",
                          clearable: "",
                          "item-text": "name",
                          "item-value": "name",
                          label: "Estado",
                          items: _vm.statuses
                        },
                        model: {
                          value: _vm.status,
                          callback: function($$v) {
                            _vm.status = $$v
                          },
                          expression: "status"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("td")
                ])
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
                    attrs: { "x-small": "", fab: "", dark: "", color: "cyan" },
                    on: {
                      click: function($event) {
                        return _vm.viewSale(item)
                      }
                    }
                  },
                  [_c("v-icon", { attrs: { dark: "" } }, [_vm._v("mdi-eye")])],
                  1
                )
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "hide-overlay": "", transition: "dialog-bottom-transition" },
          model: {
            value: _vm.detailForm,
            callback: function($$v) {
              _vm.detailForm = $$v
            },
            expression: "detailForm"
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-toolbar",
                { attrs: { dark: "", color: "primary" } },
                [
                  _c("v-toolbar-title", [_vm._v("Detalle de pedido")]),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        icon: "",
                        dark: "",
                        href: "/sales/" + _vm.selectedSale.id + "/print",
                        target: "_blank"
                      }
                    },
                    [_c("v-icon", [_vm._v("mdi-printer")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { icon: "", dark: "" },
                      on: {
                        click: function($event) {
                          _vm.detailForm = false
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("mdi-close")])],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _vm.user.store_id == null
                ? _c(
                    "v-stepper",
                    { attrs: { "alt-labels": "" } },
                    [
                      _c(
                        "v-stepper-header",
                        [
                          _c(
                            "v-stepper-step",
                            { attrs: { complete: "", step: "1" } },
                            [
                              _vm._v(
                                "\n                        Iniciado\n                    "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-stepper-step",
                            {
                              attrs: {
                                complete: _vm.selectedSale.status.id >= 2,
                                step: "2",
                                editable:
                                  _vm.selectedSale.status.id == 1 &&
                                  _vm.user.store_id == null
                              },
                              on: {
                                click: function($event) {
                                  _vm.user.store_id == null
                                    ? _vm.updateSaleStatus(2)
                                    : function() {}
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        Procesado\n                    "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-stepper-step",
                            {
                              attrs: {
                                complete: _vm.selectedSale.status.id >= 3,
                                step: "3",
                                editable:
                                  _vm.selectedSale.status.id == 2 &&
                                  _vm.user.store_id == null
                              },
                              on: {
                                click: function($event) {
                                  _vm.selectedSale.status.id == 2 &&
                                  _vm.user.store_id == null
                                    ? _vm.updateSaleStatus(3)
                                    : function() {}
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        Surtido\n                    "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _vm.selectedSale.delivery_type_id == 1 &&
                          _vm.selectedSale.delivery_id == null
                            ? _c(
                                "v-stepper-step",
                                {
                                  attrs: {
                                    complete: _vm.selectedSale.status.id >= 4,
                                    editable:
                                      _vm.selectedSale.status.id == 3 &&
                                      _vm.user.store_id == null,
                                    step: "4"
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.selectedSale.status.id == 3 &&
                                      _vm.user.store_id == null
                                        ? (_vm.deliveryForm = true)
                                        : false
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                        Enviado\n                    "
                                  )
                                ]
                              )
                            : _c(
                                "v-stepper-step",
                                {
                                  attrs: {
                                    complete: _vm.selectedSale.status.id >= 4,
                                    editable:
                                      _vm.selectedSale.status.id == 3 &&
                                      _vm.user.store_id == null,
                                    step: "4"
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.selectedSale.status.id == 3 &&
                                      _vm.user.store_id == null
                                        ? _vm.updateSaleStatus(4)
                                        : function() {}
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                        Enviado\n                    "
                                  )
                                ]
                              ),
                          _vm._v(" "),
                          _c(
                            "v-stepper-step",
                            {
                              attrs: {
                                complete: _vm.selectedSale.status.id >= 5,
                                editable:
                                  _vm.selectedSale.status.id == 4 &&
                                  _vm.user.store_id == null,
                                step: "5"
                              },
                              on: {
                                click: function($event) {
                                  _vm.selectedSale.status.id == 4 &&
                                  _vm.user.store_id == null
                                    ? _vm.updateSaleStatus(5)
                                    : function() {}
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        Entregado\n                    "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        { attrs: { sm8: "" } },
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
                                              [_vm._v("Producto")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "th",
                                              { staticClass: "text-left" },
                                              [_vm._v("Comentarios")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "th",
                                              { staticClass: "text-left" },
                                              [_vm._v("Cantidad")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "th",
                                              { staticClass: "text-left" },
                                              [_vm._v("Precio de venta")]
                                            ),
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
                                            _vm._l(_vm.saleProducts, function(
                                              product
                                            ) {
                                              return _c(
                                                "tr",
                                                { key: product.id },
                                                [
                                                  _c("td", [
                                                    _vm._v(_vm._s(product.name))
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(
                                                      _vm._s(
                                                        product.sale.comments
                                                      )
                                                    )
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(
                                                      _vm._s(
                                                        product.sale.quantity
                                                      )
                                                    )
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(
                                                      "$" +
                                                        _vm._s(
                                                          product.sale
                                                            .sale_price
                                                        )
                                                    )
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "td",
                                                    [
                                                      _vm.selectedSale.status
                                                        .id <= 3 &&
                                                      product.sale
                                                        .business_id ==
                                                        _vm.user.store_id &&
                                                      product.completed == false
                                                        ? _c(
                                                            "v-icon",
                                                            {
                                                              attrs: {
                                                                color:
                                                                  "red darken-2"
                                                              },
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.completedProduct(
                                                                    product,
                                                                    1
                                                                  )
                                                                }
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                "mdi-checkbox-blank-circle"
                                                              )
                                                            ]
                                                          )
                                                        : _vm._e(),
                                                      _vm._v(" "),
                                                      _vm.selectedSale.status
                                                        .id <= 3 &&
                                                      product.sale
                                                        .business_id ==
                                                        _vm.user.store_id &&
                                                      product.completed == true
                                                        ? _c(
                                                            "v-icon",
                                                            {
                                                              attrs: {
                                                                color:
                                                                  "green darken-2"
                                                              },
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.completedProduct(
                                                                    product,
                                                                    0
                                                                  )
                                                                }
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                "mdi-check-circle"
                                                              )
                                                            ]
                                                          )
                                                        : _vm._e()
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "td",
                                                    [
                                                      _vm.selectedSale.status
                                                        .id <= 3 &&
                                                      _vm.user.store_id == null
                                                        ? _c(
                                                            "v-icon",
                                                            {
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.deleteProduct(
                                                                    product.id
                                                                  )
                                                                }
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                "mdi-delete-forever"
                                                              )
                                                            ]
                                                          )
                                                        : _vm._e()
                                                    ],
                                                    1
                                                  )
                                                ]
                                              )
                                            }),
                                            _vm._v(" "),
                                            _vm.user.store_id == null
                                              ? _c("tr", [
                                                  _c("td"),
                                                  _vm._v(" "),
                                                  _c("td"),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(" Subtotal")
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(
                                                      "$" +
                                                        _vm._s(
                                                          _vm.formatPrice(
                                                            _vm.selectedSale
                                                              .total
                                                          )
                                                        )
                                                    )
                                                  ])
                                                ])
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _vm.user.store_id == null
                                              ? _c("tr", [
                                                  _c("td"),
                                                  _vm._v(" "),
                                                  _c("td"),
                                                  _vm._v(" "),
                                                  _c("td", [_vm._v(" Envio")]),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(
                                                      "$" +
                                                        _vm._s(
                                                          _vm.formatPrice(
                                                            _vm.selectedSale
                                                              .delivery_distance *
                                                              _vm.selectedSale
                                                                .delivery_price
                                                          )
                                                        )
                                                    )
                                                  ])
                                                ])
                                              : _vm._e()
                                          ],
                                          2
                                        ),
                                        _vm._v(" "),
                                        _vm.user.store_id == null
                                          ? _c("tfoot", [
                                              _c("tr", [
                                                _c("td"),
                                                _vm._v(" "),
                                                _c("td"),
                                                _vm._v(" "),
                                                _c("td", [
                                                  _vm._v(" Total a Pagar")
                                                ]),
                                                _vm._v(" "),
                                                _c("td", [
                                                  _vm._v(
                                                    "$" +
                                                      _vm._s(
                                                        _vm.formatPrice(
                                                          _vm.selectedSale
                                                            .delivery_distance *
                                                            _vm.selectedSale
                                                              .delivery_price +
                                                            _vm.selectedSale
                                                              .total
                                                        )
                                                      )
                                                  )
                                                ])
                                              ])
                                            ])
                                          : _vm._e()
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
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "4" } },
                        [
                          _c(
                            "v-input",
                            {
                              attrs: {
                                messages: ["No. Pedido"],
                                dense: "",
                                "prepend-icon": "mdi-star"
                              }
                            },
                            [_vm._v(_vm._s(_vm.selectedSale.id))]
                          ),
                          _vm._v(" "),
                          _c("br"),
                          _vm._v(" "),
                          _c(
                            "v-input",
                            {
                              attrs: {
                                messages: ["Fecha Pedido"],
                                dense: "",
                                "prepend-icon": "mdi-calendar-multiple-check"
                              }
                            },
                            [_vm._v(_vm._s(_vm.selectedSale.created_at))]
                          ),
                          _vm._v(" "),
                          _vm.selectedSale.status.id == 5 ? _c("br") : _vm._e(),
                          _vm._v(" "),
                          _vm.selectedSale.status.id == 5
                            ? _c(
                                "v-input",
                                {
                                  attrs: {
                                    messages: ["Fecha Pedido Entregado"],
                                    dense: "",
                                    "prepend-icon":
                                      "mdi-calendar-multiple-check"
                                  }
                                },
                                [_vm._v(_vm._s(_vm.selectedSale.updated_at))]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c("br"),
                          _vm._v(" "),
                          _vm.user.store_id == null
                            ? _c(
                                "v-input",
                                {
                                  attrs: {
                                    messages: ["Dirección"],
                                    dense: "",
                                    "prepend-icon": "mdi-pin"
                                  }
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm.selectedSale.address.address)
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.user.store_id == null ? _c("br") : _vm._e(),
                          _vm._v(" "),
                          _vm.user.store_id == null
                            ? _c(
                                "v-input",
                                {
                                  attrs: {
                                    messages: ["Cliente"],
                                    "prepend-icon": "mdi-account"
                                  }
                                },
                                [_vm._v(_vm._s(_vm.selectedSale.user.name))]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.user.store_id == null ? _c("br") : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _vm.user.store_id == null
                                ? _c(
                                    "v-col",
                                    { attrs: { cols: "4" } },
                                    [
                                      _c(
                                        "v-input",
                                        {
                                          attrs: {
                                            messages: ["Metodo de Pago"],
                                            "prepend-icon": "mdi-currency-usd"
                                          }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.selectedSale.payment_method
                                                .name
                                            )
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.user.store_id == null
                                ? _c(
                                    "v-col",
                                    { attrs: { cols: "4" } },
                                    [
                                      _vm.selectedSale.payment_method_id == 1
                                        ? _c(
                                            "v-input",
                                            {
                                              attrs: {
                                                messages: ["Paga con"],
                                                "prepend-icon":
                                                  "mdi-currency-usd"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.selectedSale.cash_amount
                                                )
                                              )
                                            ]
                                          )
                                        : _vm._e()
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.user.store_id == null
                                ? _c(
                                    "v-col",
                                    { attrs: { cols: "4" } },
                                    [
                                      _vm.selectedSale.payment_method_id == 1
                                        ? _c(
                                            "v-input",
                                            {
                                              attrs: {
                                                messages: ["Cambio"],
                                                "prepend-icon":
                                                  "mdi-currency-usd"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.formatPrice(
                                                    _vm.selectedSale
                                                      .cash_amount -
                                                      (_vm.selectedSale
                                                        .delivery_distance *
                                                        _vm.selectedSale
                                                          .delivery_price +
                                                        _vm.selectedSale.total)
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        : _vm._e()
                                    ],
                                    1
                                  )
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm.user.store_id == null ? _c("br") : _vm._e(),
                          _vm._v(" "),
                          _vm.user.store_id == null
                            ? _c(
                                "v-input",
                                {
                                  attrs: {
                                    messages: ["Tipo entrega"],
                                    "prepend-icon": "mdi-cube-send"
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.selectedSale.delivery_type_id != 1
                                          ? "En tienda"
                                          : _vm.selectedSale.delivery_id == null
                                          ? "A domicilio"
                                          : "A domicilio por " +
                                            _vm.deliveryMen.find(function(
                                              item
                                            ) {
                                              return (
                                                item.id ===
                                                _vm.selectedSale.delivery_id
                                              )
                                            }).name
                                      ) +
                                      "\n                        "
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.user.store_id == null ? _c("br") : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "v-input",
                            {
                              attrs: {
                                messages: ["Horario"],
                                "prepend-icon": "mdi-clock"
                              }
                            },
                            [
                              _vm._v(
                                _vm._s(_vm.selectedSale.delivery_time.time)
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("br"),
                          _vm._v(" "),
                          _c(
                            "v-input",
                            {
                              attrs: {
                                messages: ["Comentario"],
                                "prepend-icon": "mdi-tooltip-outline"
                              }
                            },
                            [_vm._v(_vm._s(_vm.selectedSale.comments))]
                          ),
                          _vm._v(" "),
                          _c("br"),
                          _vm._v(" "),
                          _vm.selectedSale.status.id <= 4 &&
                          _vm.user.store_id == null
                            ? _c(
                                "v-btn",
                                {
                                  attrs: { dark: "", color: "danger" },
                                  on: { click: _vm.cancelOrder }
                                },
                                [
                                  _vm._v(
                                    "\n                            CANCELAR PEDIDO\n                        "
                                  )
                                ]
                              )
                            : _vm._e()
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-divider"),
                  _vm._v(" "),
                  _vm.user.store_id == null
                    ? _c(
                        "v-row",
                        [
                          _c(
                            "v-col",
                            {
                              staticClass:
                                "text-center align-center align-content-center"
                            },
                            [
                              _c("iframe", {
                                staticStyle: { border: "0" },
                                attrs: {
                                  src:
                                    "http://www.google.com/maps?q=" +
                                    _vm.selectedSale.address.latitude +
                                    "," +
                                    _vm.selectedSale.address.longitude +
                                    "&z=15&output=embed",
                                  width: "500",
                                  height: "300",
                                  frameborder: "0",
                                  allowfullscreen: ""
                                }
                              })
                            ]
                          )
                        ],
                        1
                      )
                    : _vm._e()
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
            value: _vm.deliveryForm,
            callback: function($$v) {
              _vm.deliveryForm = $$v
            },
            expression: "deliveryForm"
          }
        },
        [
          _c(
            "v-card",
            [
              _c("v-card-title", [
                _vm._v(
                  "\n                Asignación de repartidor\n            "
                )
              ]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c("v-select", {
                    attrs: {
                      flat: "",
                      "hide-details": "",
                      small: "",
                      clearable: "",
                      "item-text": "name",
                      "item-value": "id",
                      label: "Repartidor",
                      items: _vm.deliveryMen
                    },
                    model: {
                      value: _vm.deliveryMan,
                      callback: function($$v) {
                        _vm.deliveryMan = $$v
                      },
                      expression: "deliveryMan"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      on: {
                        click: function($event) {
                          _vm.deliveryForm = false
                          _vm.deliveryMan = ""
                        }
                      }
                    },
                    [_vm._v("Cancelar")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "primary" },
                      on: { click: _vm.updateSaleDelivery }
                    },
                    [_vm._v("Asignar Repartidor")]
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
            value: _vm.cancelForm,
            callback: function($$v) {
              _vm.cancelForm = $$v
            },
            expression: "cancelForm"
          }
        },
        [
          _c(
            "v-card",
            [
              _c("v-card-title", [
                _vm._v("\n                Motivo de cancelación\n            ")
              ]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c("v-select", {
                    attrs: {
                      flat: "",
                      "hide-details": "",
                      small: "",
                      clearable: "",
                      "item-text": "name",
                      "item-value": "id",
                      label: "Seleccione una opción",
                      items: _vm.motivosCancelacion
                    },
                    model: {
                      value: _vm.motivoCancelacion,
                      callback: function($$v) {
                        _vm.motivoCancelacion = $$v
                      },
                      expression: "motivoCancelacion"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      on: {
                        click: function($event) {
                          _vm.cancelForm = false
                          _vm.motivoCancelacion = ""
                        }
                      }
                    },
                    [_vm._v("Cancelar")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "primary" },
                      on: {
                        click: function($event) {
                          return _vm.updateCancelReason(6)
                        }
                      }
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
          ref: "confirm",
          attrs: { "max-width": "500" },
          on: {
            keydown: function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
              ) {
                return null
              }
              return _vm.cancel($event)
            }
          },
          model: {
            value: _vm.confirm,
            callback: function($$v) {
              _vm.confirm = $$v
            },
            expression: "confirm"
          }
        },
        [
          _c(
            "v-card",
            [
              _c("v-card-title", [
                _vm._v(
                  "\n            " + _vm._s(_vm.confirm_text) + "\n        "
                )
              ]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-btn",
                    {
                      nativeOn: {
                        click: function($event) {
                          return _vm.cancel($event)
                        }
                      }
                    },
                    [_vm._v("Cancelar")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "primary" },
                      nativeOn: {
                        click: function($event) {
                          return _vm.agree($event)
                        }
                      }
                    },
                    [_vm._v("Aceptar")]
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

/***/ "./resources/js/components/views/SalesBusiness.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/views/SalesBusiness.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SalesBusiness_vue_vue_type_template_id_73a1a120___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SalesBusiness.vue?vue&type=template&id=73a1a120& */ "./resources/js/components/views/SalesBusiness.vue?vue&type=template&id=73a1a120&");
/* harmony import */ var _SalesBusiness_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SalesBusiness.vue?vue&type=script&lang=js& */ "./resources/js/components/views/SalesBusiness.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SalesBusiness_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SalesBusiness_vue_vue_type_template_id_73a1a120___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SalesBusiness_vue_vue_type_template_id_73a1a120___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/SalesBusiness.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/SalesBusiness.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/views/SalesBusiness.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesBusiness_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./SalesBusiness.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/SalesBusiness.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesBusiness_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/SalesBusiness.vue?vue&type=template&id=73a1a120&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/views/SalesBusiness.vue?vue&type=template&id=73a1a120& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesBusiness_vue_vue_type_template_id_73a1a120___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./SalesBusiness.vue?vue&type=template&id=73a1a120& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/SalesBusiness.vue?vue&type=template&id=73a1a120&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesBusiness_vue_vue_type_template_id_73a1a120___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesBusiness_vue_vue_type_template_id_73a1a120___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);