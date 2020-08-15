(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Product.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Product.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var crip_vue_notice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crip-vue-notice */ "./node_modules/crip-vue-notice/lib/crip-vue-notice.js");
/* harmony import */ var crip_vue_notice__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crip_vue_notice__WEBPACK_IMPORTED_MODULE_0__);
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var _defaultItem;

    return {
      headersVar: [{
        text: 'Unidad de medida',
        value: 'meas_fk_output_name'
      }, {
        text: 'Precio de Lista',
        value: 'prod_listprice'
      }, {
        text: 'Precio de venta',
        value: 'prod_saleprice'
      }, {
        text: 'Factor de conversión',
        value: 'prod_fact_convert'
      }, {
        text: '',
        value: 'action'
      }],
      headers: [{
        text: 'Ident',
        value: 'prod_identifier'
      }, {
        text: 'Nombre',
        value: 'prod_name'
      }, {
        text: 'Categoria',
        value: 'prca_name'
      }, {
        text: 'Unidad Entrada',
        value: 'meas_fk_input_name'
      }, {
        text: 'Unidad Salida',
        value: 'meas_fk_output_name'
      }, {
        text: 'Precio Actual',
        value: 'prod_actualprice'
      }, {
        text: 'Precio Eventual',
        value: 'prod_eventualprice'
      }, {
        text: 'Precio Preferencial',
        value: 'prod_preferentialprice'
      }, {
        text: 'Precio Venta',
        value: 'prod_saleprice'
      }, {
        text: 'Precio Lista',
        value: 'prod_listprice'
      }, {
        text: 'Cantidad por Paquete',
        value: 'prod_packingquantity'
      }, {
        text: 'Tipo',
        value: 'bulk'
      }, {
        text: 'Estatus',
        value: 'status'
      }, {
        text: '',
        value: 'action'
      }],
      select: 0,
      selectCat: 0,
      selectMeasIn: 0,
      selectMeas: 0,
      selectMeasOut: 0,
      principal: false,
      estado: true,
      estadoGranel: true,
      imageUrl: '',
      editadoVar: {
        prod_pk: 0,
        meas_fk_output: 0,
        prod_saleprice: 0,
        prod_listprice: 0,
        prod_fact_convert: 0
      },
      defaultItemVar: {
        prod_pk: 0,
        meas_fk_output: 0,
        prod_saleprice: 0,
        prod_listprice: 0,
        prod_fact_convert: 0
      },
      editado: {
        prod_pk: 0,
        prca_fk: 0,
        prca_name: '',
        meas_fk_input: 0,
        meas_fk_input_name: '',
        prod_description: '',
        meas_fk_output: 0,
        meas_fk_output_name: '',
        prod_identifier: '',
        prod_name: '',
        prod_actualprice: 0,
        prod_eventualprice: 0,
        prod_preferentialprice: 0,
        prod_saleprice: 0,
        prod_listprice: 0,
        prod_bulk: 0,
        prod_packingquantity: 0,
        prod_status: 0,
        is_mod: false,
        imageUrl: this.imageUrl
      },
      prod_pk: 0,
      defaultItem: (_defaultItem = {
        prod_pk: 0,
        prca_fk: 0,
        prca_name: '',
        meas_fk_input: 0,
        meas_fk_input_name: '',
        prod_description: '',
        meas_fk_output: 0,
        meas_fk_output_name: '',
        prod_identifier: '',
        prod_name: ''
      }, _defineProperty(_defaultItem, "prod_name", ''), _defineProperty(_defaultItem, "prod_actualprice", 0), _defineProperty(_defaultItem, "prod_eventualprice", 0), _defineProperty(_defaultItem, "prod_preferentialprice", 0), _defineProperty(_defaultItem, "prod_saleprice", 0), _defineProperty(_defaultItem, "prod_listprice", 0), _defineProperty(_defaultItem, "prod_bulk", 0), _defineProperty(_defaultItem, "prod_packingquantity", 0), _defineProperty(_defaultItem, "prod_status", 0), _defineProperty(_defaultItem, "is_mod", false), _defineProperty(_defaultItem, "imageUrl", this.imageUrl), _defaultItem),
      editedIndex: -1,
      products: [],
      categories: [],
      measurements: [],
      search: "",
      dialog: false,
      dialogAddVar: false,
      snackbar: false,
      timeout: 2000,
      textMsg: "",
      valid: false,
      validVar: false,
      validProvider: false,
      dialogSuccess: false,
      dialogVar: false,
      variations: [],
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
      numberRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value > 0 || 'El número debe ser mayor a cero';
      }],
      rulesImage: [function (value) {
        return !!value || 'Archivo requerido';
      }, function (value) {
        return !value || value.size < 2000000 || 'La imagen tiene que ser menor a 2 MB!';
      }],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      dialogQuestionDeleteVar: false,
      messageQuestion: ''
    };
  },
  created: function created() {
    this.getProducts();
    this.getCategories();
    this.getMeasurements();
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
    getProducts: function getProducts() {
      var _this = this;

      this.loading = true;
      axios.get("/productList").then(function (response) {
        setTimeout(function () {
          return _this.loading = false;
        }, 2000);

        if (response.data.data != null) {
          _this.products = response.data.data;
        } else {
          _this.normal('Notificación', response.data.status.message, "error");
        }
      })["catch"](function (e) {
        console.log(e);

        _this.normal('Notificación', "Error al cargar los datos", "error");
      });
    },
    getCategories: function getCategories() {
      var _this2 = this;

      axios.get("/categories").then(function (response) {
        _this2.categories = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    getMeasurements: function getMeasurements() {
      var _this3 = this;

      axios.get("/measurements").then(function (response) {
        _this3.measurements = response.data.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    variacion: function variacion(item) {
      var _this4 = this;

      this.editedIndex = this.products.indexOf(item);
      this.editado = Object.assign({}, item);
      this.editadoVar.prod_pk = this.editado.prod_pk;
      this.dialogVar = true;
      this.loading = true;
      axios.get("/products/derived/" + item.prod_pk).then(function (response) {
        setTimeout(function () {
          return _this4.loading = false;
        }, 500);

        if (response.data.data != null) {
          _this4.variations = response.data.data;
        } else {
          _this4.normal('Notificación', response.data.status.message, "error");
        }
      })["catch"](function (e) {
        console.log(e);

        _this4.normal('Notificación', "Error al cargar los datos", "error");
      });
    },
    cancelar: function cancelar() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    edita: function edita(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editado = Object.assign({}, item);
      this.estado = this.editado.prod_status;
      this.estadoGranel = this.editado.prod_bulk;
      this.selectCat = this.editado.prca_fk;
      this.selectMeasIn = this.editado.meas_fk_input;
      this.selectMeasOut = this.editado.meas_fk_output;
      this.imageUrl = this.editado.prod_image;
      this.dialog = true;
    },
    guardar: function guardar() {
      if (this.estado == true) this.editado.prod_status = 1;else this.editado.prod_status = 0;
      if (this.estadoGranel == true) this.editado.prod_bulk = 1;else this.editado.prod_bulk = 0;
      this.editado.prca_fk = this.selectCat;
      this.editado.meas_fk_input = this.selectMeasIn;
      this.editado.meas_fk_output = this.selectMeasOut;
      console.log(this.editado);

      if (this.editedIndex > -1) {
        this.editar();
      } else {
        this.alta();
      }

      this.cancelar();
    },
    alta: function alta() {
      var _this5 = this;

      axios.post('/product/add', this.editado).then(function (response) {
        console.log(response.data);

        if (response.data.status.code == 200) {
          _this5.dialogSuccess = false;
          _this5.textMsg = response.data.status.message;

          _this5.normal('Notificación', _this5.textMsg, "success");

          _this5.getProducts();
        } else {
          _this5.normal('Notificación', response.data.status.technicaldetail.errorInfo[2], "error");
        }
      })["catch"](function (e) {
        _this5.errors.push(e);
      });
    },
    editar: function editar() {
      var _this6 = this;

      axios.put('/product/update', this.editado).then(function (response) {
        console.log(response);

        if (response.data.code == 200) {
          _this6.dialogSuccess = false;
          _this6.textMsg = '¡Actualización Exitosa!';

          _this6.normal('Notificación', _this6.textMsg, "success");

          _this6.getProducts();
        } else {
          _this6.normal('Notificación', response.data.message, "error");
        }
      })["catch"](function (e) {
        _this6.errors.push(e);
      });
    },
    borrar: function borrar(item) {
      var index = this.products.indexOf(item);
      this.editado = Object.assign({}, item);
      this.dialogQuestionDelete = true;
    },
    guardaBorrar: function guardaBorrar() {
      this["delete"]();
      this.dialogQuestionDelete = false;
    },
    "delete": function _delete() {
      var _this7 = this;

      axios.put('/product/delete', this.editado).then(function (response) {
        console.log(response);
        _this7.textMsg = "¡Eliminado correctamente!";

        _this7.normal('Notificación', _this7.textMsg, "success");

        _this7.getProducts();
      });
    },
    onPickFileProduct: function onPickFileProduct() {
      this.$refs.fileInput.click();
    },
    onFilePickedProduct: function onFilePickedProduct(event) {
      var _this8 = this;

      var files = event.target.files;
      var filename = files[0].name;
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        _this8.imageUrl = fileReader.result;
        _this8.editado.imageUrl = fileReader.result;
        _this8.editado.is_mod = true;
        console.log(_this8.editado);
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    OpenDialogAddVar: function OpenDialogAddVar() {
      //console.log(this.editadoVar)
      this.dialogAddVar = true;
      this.selectMeas = -1;
    },
    guardaAddVar: function guardaAddVar() {
      this.editadoVar.meas_fk_output = this.selectMeas;

      if (this.editedIndexVar > -1) {
        this.editarAddVar();
      } else {
        this.guardarAddVar();
      }

      this.cancelarAddVar();
    },
    guardarAddVar: function guardarAddVar() {
      var _this9 = this;

      //this.editadoVar.meas_fk_output = this.selectMeas
      this.editadoVar.prod_pk = this.editado.prod_pk;
      console.log(this.editadoVar);
      axios.post('products/derived', this.editadoVar).then(function (response) {
        console.log(response.data);

        if (response.data.status.code == 200) {
          _this9.dialogSuccess = false;
          _this9.textMsg = response.data.status.message;

          _this9.normal('Notificación', _this9.textMsg, "success");

          console.log(_this9.editado);

          _this9.getvariacion(_this9.editado.prod_pk);
        } else {
          _this9.normal('Notificación', response.data.status.technicaldetail.errorInfo[2], "error");
        }
      })["catch"](function (e) {
        //this.errors.push(e)
        console.log(e);
      });
    },
    editaVar: function editaVar(item) {
      this.editedIndexVar = this.variations.indexOf(item); //this.editadoVar = Object.assign({}, item)

      this.editadoVar.prod_pk = item.prod_pk;
      this.editadoVar.meas_fk_output = item.meas_fk_output;
      this.editadoVar.prod_saleprice = item.prod_saleprice;
      this.editadoVar.prod_listprice = item.prod_listprice;
      this.editadoVar.prod_fact_convert = item.prod_fact_convert;
      this.selectMeas = item.meas_fk_output;
      this.dialogAddVar = true;
    },
    editarAddVar: function editarAddVar() {
      var _this10 = this;

      console.log("editar");
      console.log(this.editadoVar);
      axios.post('/products/derived/update', this.editadoVar).then(function (response) {
        console.log(response);

        if (response.data.status.code == 200) {
          _this10.dialogSuccess = false;
          _this10.textMsg = '¡Actualización Exitosa!';

          _this10.normal('Notificación', _this10.textMsg, "success");

          _this10.getvariacion(_this10.editado.prod_pk);
        } else {
          _this10.normal('Notificación', response.data.message, "error");
        }
      })["catch"](function (e) {
        _this10.errors.push(e);
      });
    },
    cancelarAddVar: function cancelarAddVar() {
      this.dialogAddVar = false;
      this.editadoVar = Object.assign({}, this.defaultItemVar);
      this.editedIndexVar = -1;
    },
    getvariacion: function getvariacion(id) {
      var _this11 = this;

      this.loading = true;
      axios.get("/products/derived/" + id).then(function (response) {
        _this11.loading = false;
        console.log('response');
        console.log(response);

        if (response.data.data != null) {
          _this11.variations = response.data.data;
        } else {
          _this11.normal('Notificación', response.data.status.message, "error");
        }
      })["catch"](function (e) {
        console.log(e);

        _this11.normal('Notificación', "Error al cargar los datos", "error");
      });
    },
    borrarVar: function borrarVar(item) {
      var index = this.variations.indexOf(item);
      this.editadoVar = Object.assign({}, item);
      this.dialogQuestionDeleteVar = true;
    },
    guardaBorrarVar: function guardaBorrarVar() {
      this.deleteVar();
      this.dialogQuestionDeleteVar = false;
    },
    deleteVar: function deleteVar() {
      var _this12 = this;

      axios.post('/products/derived/destroy', this.editadoVar).then(function (response) {
        console.log(response);
        _this12.textMsg = "¡Eliminado correctamente!";

        _this12.normal('Notificación', _this12.textMsg, "success");

        _this12.getvariacion(_this12.editado.prod_pk);
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
  watch: {
    dialogSuccess: function dialogSuccess(val) {
      var _this13 = this;

      if (!val) return;
      setTimeout(function () {
        return _this13.dialogSuccess = false;
      }, 4000);
    }
  },
  computed: {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro';
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a& ***!
  \****************************************************************************************************************************************************************************************************************/
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
                value: _vm.dialogQuestionDeleteVar,
                callback: function($$v) {
                  _vm.dialogQuestionDeleteVar = $$v
                },
                expression: "dialogQuestionDeleteVar"
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
                              _vm.dialogQuestionDeleteVar = false
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
                          on: { click: _vm.guardaBorrarVar }
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
              attrs: { width: "640", "overlay-color": "white", persistent: "" },
              model: {
                value: _vm.dialogSuccess,
                callback: function($$v) {
                  _vm.dialogSuccess = $$v
                },
                expression: "dialogSuccess"
              }
            },
            [
              _c(
                "v-card",
                { attrs: { color: "primary" } },
                [
                  _c(
                    "v-alert",
                    {
                      attrs: {
                        color: "success",
                        border: "left",
                        "colored-border": "",
                        icon: "mdi-checkbox-marked-circle",
                        prominent: ""
                      }
                    },
                    [
                      _vm._v(
                        "\n                " +
                          _vm._s(_vm.textMsg) +
                          "\n                "
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
            "v-dialog",
            {
              attrs: { "max-width": "500px", persistent: "" },
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
                      _vm._v(_vm._s(_vm.formTitle))
                    ])
                  ]),
                  _vm._v(" "),
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
                        "v-card-text",
                        [
                          _c("v-text-field", {
                            attrs: {
                              label: "Nombre",
                              maxlength: "300",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_name,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_name", $$v)
                              },
                              expression: "editado.prod_name"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-textarea", {
                            attrs: {
                              label: "Descripción",
                              maxlength: "5000",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_description,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_description", $$v)
                              },
                              expression: "editado.prod_description"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Identificador",
                              maxlength: "300",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_identifier,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_identifier", $$v)
                              },
                              expression: "editado.prod_identifier"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.categories,
                              label: "Selecione una categoría",
                              "single-line": "",
                              "item-text": "prca_name",
                              "item-value": "prca_pk",
                              "persistent-hint": ""
                            },
                            model: {
                              value: _vm.selectCat,
                              callback: function($$v) {
                                _vm.selectCat = $$v
                              },
                              expression: "selectCat"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.measurements,
                              label: "Selecione una Unidad Entrada",
                              "single-line": "",
                              "item-text": "meas_name",
                              "item-value": "meas_pk",
                              "persistent-hint": ""
                            },
                            model: {
                              value: _vm.selectMeasIn,
                              callback: function($$v) {
                                _vm.selectMeasIn = $$v
                              },
                              expression: "selectMeasIn"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.measurements,
                              label: "Selecione una Unidad Salida",
                              "single-line": "",
                              "item-text": "meas_name",
                              "item-value": "meas_pk",
                              "persistent-hint": ""
                            },
                            model: {
                              value: _vm.selectMeasOut,
                              callback: function($$v) {
                                _vm.selectMeasOut = $$v
                              },
                              expression: "selectMeasOut"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio Actual",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_actualprice,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_actualprice", $$v)
                              },
                              expression: "editado.prod_actualprice"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio Eventual",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_eventualprice,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_eventualprice", $$v)
                              },
                              expression: "editado.prod_eventualprice"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio Preferencial",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_preferentialprice,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editado,
                                  "prod_preferentialprice",
                                  $$v
                                )
                              },
                              expression: "editado.prod_preferentialprice"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio Venta",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_saleprice,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_saleprice", $$v)
                              },
                              expression: "editado.prod_saleprice"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio Lista",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editado.prod_listprice,
                              callback: function($$v) {
                                _vm.$set(_vm.editado, "prod_listprice", $$v)
                              },
                              expression: "editado.prod_listprice"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Stock",
                              type: "number",
                              rules: _vm.numberRules
                            },
                            model: {
                              value: _vm.editado.prod_packingquantity,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editado,
                                  "prod_packingquantity",
                                  $$v
                                )
                              },
                              expression: "editado.prod_packingquantity"
                            }
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v("Venta a Granel")]),
                          _vm._v(" "),
                          _c("v-switch", {
                            model: {
                              value: _vm.estadoGranel,
                              callback: function($$v) {
                                _vm.estadoGranel = $$v
                              },
                              expression: "estadoGranel"
                            }
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v("Activo/Inactivo")]),
                          _vm._v(" "),
                          _c("v-switch", {
                            model: {
                              value: _vm.estado,
                              callback: function($$v) {
                                _vm.estado = $$v
                              },
                              expression: "estado"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "v-card-text",
                            [
                              _c(
                                "v-btn",
                                {
                                  staticClass: "primary",
                                  attrs: { raised: "" },
                                  on: { click: _vm.onPickFileProduct }
                                },
                                [_vm._v("Subir imagen")]
                              ),
                              _vm._v(" "),
                              _c("input", {
                                ref: "fileInput",
                                staticStyle: { display: "none" },
                                attrs: {
                                  type: "file",
                                  accept: "image/jpeg",
                                  required: "",
                                  rules: _vm.rulesImage
                                },
                                on: { change: _vm.onFilePickedProduct }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-layout", [
                            _c("img", {
                              attrs: { src: this.imageUrl, height: "150" }
                            })
                          ])
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
                              on: { click: _vm.cancelar }
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
                              on: { click: _vm.guardar }
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
              attrs: { "max-width": "500px", persistent: "" },
              model: {
                value: _vm.dialogAddVar,
                callback: function($$v) {
                  _vm.dialogAddVar = $$v
                },
                expression: "dialogAddVar"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c(
                    "v-toolbar",
                    { attrs: { dark: "", color: "primary" } },
                    [_c("v-toolbar-title", [_vm._v("Variaciones")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-form",
                    {
                      model: {
                        value: _vm.validVar,
                        callback: function($$v) {
                          _vm.validVar = $$v
                        },
                        expression: "validVar"
                      }
                    },
                    [
                      _c(
                        "v-card-text",
                        [
                          _c("span", [_vm._v("Unidad de medida")]),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.measurements,
                              label: "Selecione una Unidad de Salida",
                              "single-line": "",
                              "item-text": "meas_name",
                              "item-value": "meas_pk",
                              "persistent-hint": ""
                            },
                            model: {
                              value: _vm.selectMeas,
                              callback: function($$v) {
                                _vm.selectMeas = $$v
                              },
                              expression: "selectMeas"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio Lista",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoVar.prod_listprice,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoVar, "prod_listprice", $$v)
                              },
                              expression: "editadoVar.prod_listprice"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio Venta",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoVar.prod_saleprice,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoVar, "prod_saleprice", $$v)
                              },
                              expression: "editadoVar.prod_saleprice"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Factor de conversión",
                              prefix: "",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoVar.prod_fact_convert,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editadoVar,
                                  "prod_fact_convert",
                                  $$v
                                )
                              },
                              expression: "editadoVar.prod_fact_convert"
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
                              on: { click: _vm.cancelarAddVar }
                            },
                            [_vm._v("Cancelar")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "ma-2 white--text",
                              attrs: {
                                disabled: !_vm.validVar,
                                color: "teal accent-4"
                              },
                              on: { click: _vm.guardaAddVar }
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
              attrs: { "max-width": "1024px", persistent: "" },
              model: {
                value: _vm.dialogVar,
                callback: function($$v) {
                  _vm.dialogVar = $$v
                },
                expression: "dialogVar"
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
                      _c(
                        "v-toolbar-items",
                        [
                          _c("v-btn", { attrs: { dark: "", text: "" } }, [
                            _vm._v("Variaciones")
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { icon: "", dark: "" },
                          on: {
                            click: function($event) {
                              _vm.dialogVar = false
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
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-2",
                          attrs: { dark: "", color: "green" },
                          on: { click: _vm.OpenDialogAddVar }
                        },
                        [_vm._v("Nuevo")]
                      ),
                      _vm._v(" "),
                      _c("v-data-table", {
                        staticClass: "elevation-3",
                        attrs: {
                          headers: _vm.headersVar,
                          items: _vm.variations
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "item.prod_listprice",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                _c("v-label", [
                                  _vm._v(
                                    "$" +
                                      _vm._s(
                                        _vm.formatMoney(item.prod_listprice)
                                      )
                                  )
                                ])
                              ]
                            }
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
                            key: "item.action",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                _c(
                                  "v-btn",
                                  {
                                    staticClass: "mx-2",
                                    attrs: {
                                      fab: "",
                                      dark: "",
                                      small: "",
                                      color: "cyan",
                                      title: "Editar"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.editaVar(item)
                                      }
                                    }
                                  },
                                  [
                                    _c("v-icon", { attrs: { dark: "" } }, [
                                      _vm._v("mdi-pencil")
                                    ])
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    staticClass: "mr-2",
                                    attrs: {
                                      fab: "",
                                      dark: "",
                                      small: "",
                                      color: "error"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.borrarVar(item)
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
                                                  absolute: ""
                                                },
                                                on: {
                                                  click: function($event) {
                                                    _vm.dialog = !_vm.dialog
                                                  }
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
                            key: "item.prod_actualprice",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                _c("v-label", [
                                  _vm._v(
                                    "$" +
                                      _vm._s(
                                        _vm.formatMoney(item.prod_actualprice)
                                      )
                                  )
                                ])
                              ]
                            }
                          },
                          {
                            key: "item.prod_eventualprice",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                _c("v-label", [
                                  _vm._v(
                                    "$" +
                                      _vm._s(
                                        _vm.formatMoney(item.prod_eventualprice)
                                      )
                                  )
                                ])
                              ]
                            }
                          },
                          {
                            key: "item.prod_preferentialprice",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                _c("v-label", [
                                  _vm._v(
                                    "$" +
                                      _vm._s(
                                        _vm.formatMoney(
                                          item.prod_preferentialprice
                                        )
                                      )
                                  )
                                ])
                              ]
                            }
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
                            key: "item.prod_listprice",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                _c("v-label", [
                                  _vm._v(
                                    "$" +
                                      _vm._s(
                                        _vm.formatMoney(item.prod_listprice)
                                      )
                                  )
                                ])
                              ]
                            }
                          },
                          {
                            key: "item.status",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                item.prod_status == 1
                                  ? _c(
                                      "v-chip",
                                      { attrs: { color: "green", dark: "" } },
                                      [_vm._v("  Activo  ")]
                                    )
                                  : _c(
                                      "v-chip",
                                      { attrs: { color: "red", dark: "" } },
                                      [_vm._v("Inactivo")]
                                    )
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
                                  "v-menu",
                                  {
                                    attrs: { bottom: "", left: "" },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "activator",
                                          fn: function(ref) {
                                            var on = ref.on
                                            var attrs = ref.attrs
                                            return [
                                              _c(
                                                "v-btn",
                                                _vm._g(
                                                  _vm._b(
                                                    {
                                                      attrs: {
                                                        color: "grey",
                                                        dark: "",
                                                        icon: ""
                                                      }
                                                    },
                                                    "v-btn",
                                                    attrs,
                                                    false
                                                  ),
                                                  on
                                                ),
                                                [
                                                  _c("v-icon", [
                                                    _vm._v("mdi-dots-vertical")
                                                  ])
                                                ],
                                                1
                                              )
                                            ]
                                          }
                                        }
                                      ],
                                      null,
                                      true
                                    )
                                  },
                                  [
                                    _vm._v(" "),
                                    _c(
                                      "v-list",
                                      [
                                        _c(
                                          "v-list-item",
                                          [
                                            _c(
                                              "v-btn",
                                              {
                                                staticClass: "mx-2",
                                                attrs: {
                                                  fab: "",
                                                  dark: "",
                                                  small: "",
                                                  color: "cyan",
                                                  title: "Editar producto"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.edita(item)
                                                  }
                                                }
                                              },
                                              [
                                                _c(
                                                  "v-icon",
                                                  { attrs: { dark: "" } },
                                                  [_vm._v("mdi-pencil")]
                                                )
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-btn",
                                              {
                                                staticClass: "mx-2",
                                                attrs: {
                                                  fab: "",
                                                  dark: "",
                                                  small: "",
                                                  color: "orange",
                                                  title: "Variaciones"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.variacion(item)
                                                  }
                                                }
                                              },
                                              [
                                                _c(
                                                  "v-icon",
                                                  { attrs: { dark: "" } },
                                                  [_vm._v("mdi-scale")]
                                                )
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-btn",
                                              {
                                                staticClass: "mr-2",
                                                attrs: {
                                                  fab: "",
                                                  dark: "",
                                                  small: "",
                                                  color: "error"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.borrar(item)
                                                  }
                                                }
                                              },
                                              [
                                                _c(
                                                  "v-icon",
                                                  { attrs: { dark: "" } },
                                                  [_vm._v("mdi-delete")]
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

/***/ "./resources/js/components/views/Product.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/views/Product.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Product.vue?vue&type=template&id=78aafa1a& */ "./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a&");
/* harmony import */ var _Product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Product.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Product.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Product.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Product.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/views/Product.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Product.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Product.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Product.vue?vue&type=template&id=78aafa1a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Product.vue?vue&type=template&id=78aafa1a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_template_id_78aafa1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);