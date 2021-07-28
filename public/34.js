(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      headers: [{
        text: 'No. ID',
        value: 'prpo_identifier'
      }, {
        text: 'Proveedor',
        value: 'prov_name'
      }, {
        text: 'Sucursal',
        value: 'stor_name'
      }, {
        text: 'Fecha',
        value: 'created_at'
      }, {
        text: 'Estatus',
        value: 'status'
      }, {
        text: '',
        value: 'action',
        width: '20%'
      }],
      select: 0,
      principal: false,
      estado: true,
      editado: {
        clor_pk: 0,
        clor_name: '',
        clor_status: 0
      },
      defaultItem: {
        clor_pk: 0,
        clor_name: '',
        clor_status: 0
      },
      editedIndex: -1,
      sales: [],
      ordenescompra: [],
      entities: [],
      search: "",
      dialog: false,
      snackbar: false,
      loadingDialog: false,
      timeout: 2000,
      textMsg: "",
      valid: false,
      validProvider: false,
      folioRules: [function (value) {
        return !!value || "Requerido.";
      }, function (value) {
        return value && value.length >= 10 || "Min 10 caracter";
      }],
      nameRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value && value.length >= 3 || 'Min 3 caracteres';
      }],
      phoneRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value && value.length == 10 || 'Requiere 10 caracteres';
      }],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: ''
    };
  },
  created: function created() {
    this.getCategories();
  },
  methods: {
    getCategories: function getCategories() {
      var _this = this;

      this.loading = true;
      axios.get("/provider/purchase/orders").then(function (response) {
        setTimeout(function () {
          return _this.loading = false;
        }, 500);

        if (response.data.data != null) {
          _this.ordenescompra = response.data.data;
        } else {
          _this.normal('Notificación', response.data.status.message, "error");
        }
      })["catch"](function (e) {
        console.log(e);

        _this.normal('Notificación', "Error al cargar los datos", "error");
      });
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    ventas: function ventas(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editado = Object.assign({}, item);
      this.createsale(item.clor_pk);
    },
    createsale: function createsale(id) {
      var _this2 = this;

      this.loadingDialog = true;
      axios.post('/clientsales?clor_pk=' + id + '').then(function (response) {
        setTimeout(function () {
          return _this2.loadingDialog = false;
        }, 1000);

        if (response.data.data != null) {
          _this2.sales = response.data;
          console.log(response.data);
        } else {
          _this2.normal('Notificación', response.data.status.message, "error");
        }
      })["catch"](function (e) {
        console.log(e);

        _this2.normal('Notificación', "Error al cargar los datos", "error");
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
      var _this3 = this;

      axios.post('/provider/purchase/orders/destroy', this.editado).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this3.textMsg = "¡Eliminado correctamente!";

          _this3.normal('Notificación', _this3.textMsg, "success");

          _this3.getCategories();
        } else {
          _this3.normal('Notificación', "Ocurrio un error al eliminar el producto", "error");
        }
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
  },
  computed: {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro';
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
              attrs: { persistent: "", width: "300" },
              model: {
                value: _vm.loadingDialog,
                callback: function($$v) {
                  _vm.loadingDialog = $$v
                },
                expression: "loadingDialog"
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
                      _c("v-data-table", {
                        staticClass: "elevation-3",
                        attrs: {
                          headers: _vm.headers,
                          items: _vm.ordenescompra,
                          search: _vm.search,
                          "sort-by": "id",
                          loading: _vm.loading,
                          "loading-text": "Cargando... Espere un momento."
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
                                                  absolute: "",
                                                  href: "/purchaseorder/0"
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
                            key: "item.status",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                item.prpo_status == 0
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "red", dark: "" } },
                                      [
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              item.prpo_status_description
                                            ) +
                                            " "
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                item.prpo_status == 1
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "orange", dark: "" } },
                                      [
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              item.prpo_status_description
                                            ) +
                                            " "
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                item.prpo_status == 2
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "green", dark: "" } },
                                      [
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              item.prpo_status_description
                                            ) +
                                            " "
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                item.prpo_status == 3
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "blue", dark: "" } },
                                      [
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              item.prpo_status_description
                                            ) +
                                            " "
                                        )
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            }
                          },
                          {
                            key: "item.action",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                item.prpo_status == 1
                                  ? _c(
                                      "v-btn",
                                      {
                                        staticClass: "mr-2",
                                        attrs: {
                                          fab: "",
                                          dark: "",
                                          small: "",
                                          color: "pink",
                                          href: "/purchaseorder/" + item.prpo_pk
                                        }
                                      },
                                      [
                                        _c("v-icon", { attrs: { dark: "" } }, [
                                          _vm._v("mdi-shuffle")
                                        ])
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                item.prpo_status == 2
                                  ? _c(
                                      "v-btn",
                                      {
                                        staticClass: "mr-2",
                                        attrs: {
                                          fab: "",
                                          dark: "",
                                          small: "",
                                          color: "orange",
                                          href:
                                            "/purchases/" + item.prpo_pk + "/1",
                                          title: "Convertir en compra"
                                        }
                                      },
                                      [
                                        _c("v-icon", { attrs: { dark: "" } }, [
                                          _vm._v("mdi-cloud-check")
                                        ])
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
                                      href: "/orderdetail/" + item.prpo_pk,
                                      title: "Detalle de la orden"
                                    }
                                  },
                                  [
                                    _c("v-icon", { attrs: { dark: "" } }, [
                                      _vm._v("mdi-eye")
                                    ])
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                item.prpo_status == 1
                                  ? _c(
                                      "v-btn",
                                      {
                                        staticClass: "mr-2",
                                        attrs: {
                                          fab: "",
                                          dark: "",
                                          small: "",
                                          color: "error",
                                          title: "Eliminar"
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
                                  : _vm._e()
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

/***/ "./resources/js/components/views/PurchaseOrdersList.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/views/PurchaseOrdersList.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0& */ "./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0&");
/* harmony import */ var _PurchaseOrdersList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PurchaseOrdersList.vue?vue&type=script&lang=js& */ "./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PurchaseOrdersList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/PurchaseOrdersList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PurchaseOrdersList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PurchaseOrdersList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PurchaseOrdersList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/PurchaseOrdersList.vue?vue&type=template&id=6b9ad9a0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PurchaseOrdersList_vue_vue_type_template_id_6b9ad9a0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);