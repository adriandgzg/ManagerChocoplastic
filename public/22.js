(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Missions.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Missions.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuetify_daterange_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuetify-daterange-picker */ "./node_modules/vuetify-daterange-picker/dist/vuetify-daterange-picker.common.js");
/* harmony import */ var vuetify_daterange_picker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuetify_daterange_picker__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vuetify_daterange_picker_dist_vuetify_daterange_picker_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuetify-daterange-picker/dist/vuetify-daterange-picker.css */ "./node_modules/vuetify-daterange-picker/dist/vuetify-daterange-picker.css");
/* harmony import */ var vuetify_daterange_picker_dist_vuetify_daterange_picker_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vuetify_daterange_picker_dist_vuetify_daterange_picker_css__WEBPACK_IMPORTED_MODULE_3__);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    VDateRange: vuetify_daterange_picker__WEBPACK_IMPORTED_MODULE_2___default.a
  },
  name: 'InvoiceForm',
  data: function data() {
    var _defaultItem;

    return {
      date: new Date().toISOString().substr(0, 10),
      nowDate: new Date().toISOString().slice(0, 10),
      menu1: false,
      modal: false,
      menu2: false,
      snackbar: false,
      textMsg: '',
      timeout: 2000,
      tab: null,
      showSubcategoria: false,
      stores: [],
      categories: [],
      subcategories: [],
      categoriesrelations: [],
      customCondition: true,
      products: [],
      missions: [],
      dates: [],
      mission: '',
      missionsProducts: [],
      editedIndex: -1,
      editedSubIndex: -1,
      editedAddSubIndex: -1,
      editedIndexProducto: -1,
      editedIndexMision: -1,
      editedIndexProductoMission: -1,
      valid: false,
      validPromo: false,
      lazy: false,
      dialog: false,
      dialogSub: false,
      dialogProducts: false,
      dialogAddProduct: false,
      dialogPromoProduct: false,
      dialogMision: false,
      dialogProductsMissions: false,
      start_date: '',
      end_date: '',
      headers: [{
        text: 'ID',
        value: 'id',
        width: '10%'
      }, {
        text: 'Categoría',
        value: 'name'
      }, {
        text: '',
        value: 'action'
      }],
      headersSub: [{
        text: 'ID',
        value: 'id',
        width: '10%'
      }, {
        text: 'Subcategoría',
        value: 'name'
      }, {
        text: '',
        value: 'action'
      }],
      headersProd: [{
        text: 'ID',
        value: 'id',
        width: '10%'
      }, {
        text: 'Nombre',
        value: 'name'
      }, {
        text: '',
        value: 'action'
      }],
      headersCateg: [{
        text: 'ID',
        value: 'id',
        width: '10%'
      }, {
        text: 'Nombre',
        value: 'name'
      }, {
        text: '',
        value: 'action'
      }],
      headersMissions: [{
        text: 'ID',
        value: 'id',
        width: '5%'
      }, {
        text: 'Nombre',
        value: 'name',
        width: '15%'
      }, {
        text: 'Descripción',
        value: 'description',
        width: '20%'
      }, {
        text: "Image",
        value: "image",
        sortable: false,
        width: '15%'
      }, {
        text: '',
        value: 'action',
        width: '20%'
      }],
      headersProducts: [{
        text: 'ID',
        value: 'id',
        width: '5%'
      }, {
        text: 'Nombre',
        value: 'name',
        width: '35%'
      }, {
        text: 'Descripción',
        value: 'description',
        width: '20%'
      }, {
        text: 'Key',
        value: 'long_key',
        width: '20%'
      }, {
        text: 'Precio',
        value: 'pricebusiness',
        width: '10%'
      }, {
        text: 'Contenido',
        value: 'content',
        width: '10%'
      }, {
        text: 'Unidad',
        value: 'unit',
        width: '10%'
      }, {
        text: 'Marca',
        value: 'brand',
        width: '10%'
      }, {
        text: "Image",
        value: "image",
        sortable: false,
        width: '15%'
      }, {
        text: '',
        value: 'action',
        width: '20%'
      }],
      nameRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value && value.length >= 3 || 'Min 3 caracteres';
      }],
      unidadRules: [function (value) {
        return !!value || 'Requerido.';
      }, function (value) {
        return value && value.length >= 1 || 'Min 1 caracter';
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
      title: this.$route.params.id,
      title2: this.$route.params.idStore,
      search: '',
      //para el cuadro de búsqueda de datatables
      searchProd: '',
      searchProducts: '',
      searchMission: '',
      dialogProducto: false,
      dialogCategorias: false,
      dialogAddSub: false,
      switchMe: false,
      imageUrl: '',
      editadoCategorias: {
        business_id: '',
        store_id: '',
        category_id: ''
      },
      editadoRelacion: {
        id: '',
        name: '',
        description: '',
        imageUrl: this.imageUrl,
        file: '',
        select: ''
      },
      editadoSub: {
        id: '',
        name: '',
        description: '',
        imageUrl: this.imageUrl,
        file: '',
        select: ''
      },
      editado: {
        id: '',
        name: '',
        description: '',
        imageUrl: this.imageUrl,
        file: '',
        select: '',
        stock: '',
        price: '',
        max_quantity: '',
        is_active: false,
        exist: 0,
        category_id: '',
        store_id: '',
        business_id: ''
      },
      defaultItem: (_defaultItem = {
        id: '',
        name: '',
        description: '',
        imageUrl: this.imageUrl,
        file: '',
        select: '',
        stock: '',
        price: '',
        max_quantity: '',
        is_active: false,
        exist: 0,
        category_id: '',
        pricebusiness: ''
      }, _defineProperty(_defaultItem, "price", ''), _defineProperty(_defaultItem, "max_quantity", ''), _defaultItem),
      editadoProduct: {
        id: '',
        name: '',
        description: '',
        long_key: '',
        price: '',
        content: '',
        unit: '',
        brand: '',
        sales_unit: '',
        bulk: '',
        imageUrl: '',
        idsubcategoria: 0,
        category_id: '',
        select: 0,
        store_id: '',
        business_id: '',
        stock: 0,
        pricebusiness: '',
        is_active: false,
        is_mod: false
      },
      editadoProductPromo: {
        id: '',
        start_date: '',
        end_date: '',
        idPromo: '',
        pricePromocion: '',
        store_id: '',
        business_id: '',
        existPromo: 0
      },
      defaultProductPromo: {
        id: '',
        start_date: '',
        end_date: '',
        idPromo: '',
        pricePromocion: '',
        store_id: '',
        business_id: '',
        existPromo: 0
      },
      defaultItemProduct: {
        id: '',
        name: '',
        description: '',
        long_key: '',
        price: '',
        content: '',
        unit: '',
        brand: '',
        sales_unit: '',
        bulk: '',
        imageUrl: '',
        idsubcategoria: 0,
        category_id: '',
        select: 0,
        store_id: '',
        business_id: '',
        stock: 0,
        pricebusiness: '',
        is_active: false,
        is_mod: false
      },
      editadoMision: {
        id: '',
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        imageUrl: '',
        store_id: '',
        business_id: '',
        is_active: false,
        is_mod: false
      },
      defaultItemMision: {
        id: '',
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        imageUrl: '',
        store_id: '',
        business_id: '',
        is_active: false,
        is_mod: false
      },
      editadoMisionProduct: {
        id: '',
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        imageUrl: '',
        store_id: '',
        business_id: '',
        is_active: false,
        is_mod: false
      },
      defaultItemMisionProduct: {
        id: '',
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        imageUrl: '',
        store_id: '',
        business_id: '',
        is_active: false,
        is_mod: false
      }
    };
  },
  created: function created() {
    this.getstores();
    this.getcategories();
    this.getMissions();
  },
  methods: {
    toggleMission: function toggleMission(product) {
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/missions/' + this.mission + '/products/' + product.id + '/toggle').then(function (response) {
        console.log(response.data);
      })["catch"](function (e) {
        console.log(response);
      });
    },
    getstores: function getstores() {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/infoBusiness/' + this.$route.params.id + '/' + this.$route.params.idStore).then(function (response) {
        _this.stores = response.data.data;
      })["catch"](function (e) {
        _this.errors.push(e);
      });
    },
    getcategories: function getcategories() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/CategoriesBusiness/' + this.$route.params.id + '/' + this.$route.params.idStore).then(function (response) {
        _this2.categories = response.data.data;
      })["catch"](function (e) {
        _this2.errors.push(e);
      });
    },
    getSubcategorias: function getSubcategorias(item) {
      this.editedSubIndex = this.subcategories.indexOf(item);
      this.editado = Object.assign({}, item);
      this.showSubcategoria = !this.showSubcategoria;
      this.customCondition = false;
      this.getSubcategories();
    },
    getSubcategories: function getSubcategories() {
      var _this3 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/subcategoriesList?id=' + this.editado.id).then(function (response) {
        _this3.subcategories = response.data.data;
      })["catch"](function (e) {
        _this3.errors.push(e);
      });
    },
    getcategoriesrelations: function getcategoriesrelations() {
      var _this4 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/AsociarCategoriesBusiness/' + this.$route.params.id + '/' + this.$route.params.idStore).then(function (response) {
        _this4.categoriesrelations = response.data.data;
        _this4.imageUrl = '';
      })["catch"](function (e) {
        _this4.errors.push(e);
      });
    },
    editar: function editar(item) {
      //this.editedSubIndex = this.subcategories.indexOf(item)
      //this.editado = Object.assign({}, item)
      this.dialog = true;
      this.getProducts(item.id);
    },
    editarProducto: function editarProducto(item) {
      this.editedIndexProducto = this.products.indexOf(item);
      this.editado = Object.assign({}, item);
      this.dialogProducto = true;
    },
    cancelar: function cancelar() {
      this.dialogProducto = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    guardar: function guardar() {
      if (this.editado.exist < 2) {
        //Guarda en caso de Edición
        console.log('¡Actualización Exitosa!');
        this.editarProduct();
      } else {
        console.log('¡Alta exitosa!');
        this.addProduct();
      }

      this.cancelar();
    },
    editarProduct: function editarProduct() {
      var _this5 = this;

      var idC = this.editado.category_id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/businessproduct/update', this.editado).then(function (response) {
        _this5.getProducts(idC);

        _this5.imageUrl = '';
      });
    },
    addProduct: function addProduct() {
      var _this6 = this;

      var idC = this.editado.category_id;
      this.editado.store_id = this.$route.params.idStore;
      this.editado.business_id = this.$route.params.id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/businessproduct/add', this.editado).then(function (response) {
        _this6.getProducts(idC);

        _this6.imageUrl = '';
      });
    },
    relacionarCat: function relacionarCat() {
      this.dialogCategorias = true;
      this.getcategoriesrelations();
    },
    insertarCat: function insertarCat(item) {
      this.editedIndexrelations = this.categoriesrelations.indexOf(item);
      this.editadoRelacion = Object.assign({}, item);
      this.dialogCategorias = true;
      this.insertCategorias();
    },
    insertCategorias: function insertCategorias() {
      var _this7 = this;

      this.editadoCategorias.category_id = this.editadoRelacion.id;
      this.editadoCategorias.store_id = this.$route.params.idStore;
      this.editadoCategorias.business_id = this.$route.params.id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/categories/updateBusinessCategory', this.editadoCategorias).then(function (response) {
        _this7.getcategoriesrelations();

        _this7.getcategories();

        _this7.imageUrl = '';
      });
    },
    ///Nuevas funciones
    cancelarCategorie: function cancelarCategorie() {
      this.dialog = false;
      this.editado = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    guardarCategorie: function guardarCategorie() {
      if (this.editedIndex > -1) {
        //Guarda en caso de Edición
        this.snackbar = true;
        this.textMsg = '¡Actualización Exitosa!';
        this.editarCategorie();
      } else {
        //Guarda el registro en caso de Alta
        this.snackbar = true;
        this.textMsg = '¡Alta exitosa!';
        this.altaCategorie();
        this.imageUrl = '';
      }

      this.cancelarCategorie();
    },
    altaCategorie: function altaCategorie() {
      var _this8 = this;

      this.editado.store_id = this.$route.params.idStore;
      this.editado.business_id = this.$route.params.id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/categories/addAsociar', this.editado).then(function (response) {
        _this8.getcategoriesrelations();

        _this8.getcategories();

        _this8.imageUrl = '';
      });
      this.name = "", this.description = "";
    },
    editarCategorie: function editarCategorie() {
      var _this9 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/categories/update', this.editado).then(function (response) {
        _this9.getcategoriesrelations();

        _this9.getcategories();

        _this9.imageUrl = '';
      });
    },
    editarCategoria: function editarCategoria(item) {
      console.log(item);
      this.editedIndex = this.categories.indexOf(item);
      console.log(this.editedIndex);
      this.editado = Object.assign({}, item);
      this.dialog = true;
    },
    cancelarSub: function cancelarSub() {
      this.dialogAddSub = false;
      this.editadoSub = Object.assign({}, this.defaultItem);
      this.editedAddSubIndex = -1;
    },
    editarSub: function editarSub(item) {
      this.editedAddSubIndex = this.subcategories.indexOf(item);
      this.editadoSub = Object.assign({}, item);
      this.dialogAddSub = true;
    },
    guardarSub: function guardarSub() {
      console.log(this.editedAddSubIndex);

      if (this.editedAddSubIndex > -1) {
        //Guarda en caso de Edición
        console.log('¡Actualización Exitosa!');
        this.editarSubCat();
      } else {
        console.log('¡Agregado Exitosa!');
        this.altaSubCat();
      }

      this.cancelarSub();
    },
    altaSubCat: function altaSubCat() {
      var _this10 = this;

      console.log(this.editado.id);
      this.editadoSub.category_id = this.editado.id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/categories/addSub', this.editadoSub).then(function (response) {
        _this10.getSubcategories();

        _this10.imageUrl = '';
      });
      this.name = "";
      this.description = "";
    },
    editarSubCat: function editarSubCat() {
      var _this11 = this;

      console.log(this.editado.id);
      this.editadoSub.category_id = this.editado.id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/categories/updateSub', this.editadoSub).then(function (response) {
        _this11.getSubcategories();

        _this11.imageUrl = '';
      });
      this.name = "";
      this.description = "";
    },
    borrarSub: function borrarSub(item) {
      var index = this.subcategories.indexOf(item);
      this.editadoSub = Object.assign({}, item);
      console.log(this.subcategories[index].id); //capturo el id de la fila seleccionada

      var r = confirm("¿Está seguro de borrar el registro?");

      if (r == true) {
        this.deleteSubCat();
        this.snackbar = true;
        this.textMsg = 'Se eliminó el registro.';
      } else {
        this.snackbar = true;
        this.textMsg = 'Operación cancelada.';
      }
    },
    deleteSubCat: function deleteSubCat() {
      var _this12 = this;

      console.log(this.editadoSub);
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/categories/deleteSub', this.editadoSub).then(function (response) {
        _this12.getSubcategories();
      });
      this.name = "", this.description = "";
    },
    borrarCat: function borrarCat(item) {
      var index = this.categories.indexOf(item);
      this.editado = Object.assign({}, item);
      console.log(this.categories[index].id); //capturo el id de la fila seleccionada

      var r = confirm("¿Está seguro de borrar el registro?");

      if (r == true) {
        this.deleteCat();
        this.snackbar = true;
        this.textMsg = 'Se eliminó el registro.';
      } else {
        this.snackbar = true;
        this.textMsg = 'Operación cancelada.';
      }
    },
    deleteCat: function deleteCat() {
      var _this13 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/categories/delete', this.editado).then(function (response) {
        _this13.getcategories();
      });
      this.name = "", this.description = "";
    },
    borrarMission: function borrarMission(item) {
      var index = this.missions.indexOf(item);
      this.editadoMision = Object.assign({}, item);
      var r = confirm("¿Está seguro de borrar el registro?");

      if (r == true) {
        this.deleteMission();
        this.snackbar = true;
        this.textMsg = 'Se eliminó el registro.';
      } else {
        this.snackbar = true;
        this.textMsg = 'Operación cancelada.';
      }
    },
    deleteMission: function deleteMission() {
      var _this14 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/businessMissions/delete', this.editadoMision).then(function (response) {
        _this14.getMissions();
      });
      this.name = "", this.description = "";
    },
    abrirProducts: function abrirProducts(item) {
      this.editedAddSubIndex = this.subcategories.indexOf(item);
      this.editadoSub = Object.assign({}, item);
      this.dialogProducts = true;
      this.getProducts(item.id);
    },
    getProducts: function getProducts(id) {
      var _this15 = this;

      console.log('/productBusiness/' + id + '/' + this.$route.params.idStore + '/' + this.$route.params.id);
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/productBusiness/' + id + '/' + this.$route.params.idStore + '/' + this.$route.params.id).then(function (response) {
        _this15.imageUrl = '';
        _this15.products = response.data.data;
        console.log(_this15.products);
      })["catch"](function (e) {
        _this15.errors.push(e);
      });
    },
    editarProductoOriginal: function editarProductoOriginal(item) {
      this.editedIndexProducto = this.products.indexOf(item);
      this.editadoProduct = Object.assign({}, item);
      this.dialogAddProduct = true;
      this.editadoProduct.is_mod = false;
      console.log(this.editadoProduct);
    },
    PromocionProductoOriginal: function PromocionProductoOriginal(item) {
      this.editadoProductPromo = Object.assign({}, item);
      this.dialogPromoProduct = true;
    },
    borrarProductoOriginal: function borrarProductoOriginal(item) {
      var index = this.products.indexOf(item);
      this.editadoProduct = Object.assign({}, item);
      console.log(this.products[index].id); //capturo el id de la fila seleccionada

      var r = confirm("¿Está seguro de borrar el registro?");

      if (r == true) {
        this.deleteProductOriginal();
      }
    },
    cancelarProductoOriginal: function cancelarProductoOriginal(item) {
      this.editedIndexProducto = -1;
      this.editadoProduct = Object.assign({}, this.defaultItemProduct);
      this.dialogAddProduct = false;
    },
    guardarProductoOriginal: function guardarProductoOriginal() {
      if (this.editedIndexProducto > -1) {
        //Guarda en caso de Edición
        console.log('¡Actualización Exitosa!');
        console.log(this.editadoProduct);
        this.editarProductOriginal();
      } else {
        //Guarda el registro en caso de Alta
        this.textMsg = '¡Alta exitosa!';
        this.addProductOriginal();
      }

      this.cancelarProductoOriginal();
    },
    editarProductOriginal: function editarProductOriginal() {
      var _this16 = this;

      var idC = this.editadoProduct.category_id;
      this.editadoProduct.store_id = this.$route.params.idStore;
      this.editadoProduct.business_id = this.$route.params.id;
      this.editadoProduct.category_id = this.editadoSub.id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/product/update', this.editadoProduct).then(function (response) {
        _this16.snackbar = true;
        _this16.textMsg = "¡Producto actualizado correctamente!";

        _this16.getProducts(idC);
      });
      this.name = "", this.description = "";
    },
    addProductOriginal: function addProductOriginal() {
      var _this17 = this;

      var idC = this.editadoSub.id;
      this.editadoProduct.store_id = this.$route.params.idStore;
      this.editadoProduct.business_id = this.$route.params.id;
      this.editadoProduct.category_id = this.editadoSub.id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/product/add', this.editadoProduct).then(function (response) {
        _this17.snackbar = true;
        _this17.textMsg = "¡Producto agregado correctamente!";

        _this17.getProducts(idC);
      });
    },
    deleteProductOriginal: function deleteProductOriginal() {
      var _this18 = this;

      var idC = this.editadoProduct.category_id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/product/delete', this.editadoProduct).then(function (response) {
        _this18.snackbar = true;
        _this18.textMsg = "¡Producto eliminado correctamente!";

        _this18.getProducts(idC);
      });
    },
    AsociarCategorias: function AsociarCategorias() {
      var _this19 = this;

      this.editadoCategorias.category_id = this.editado.id;
      this.editadoCategorias.store_id = this.$route.params.idStore;
      this.editadoCategorias.business_id = this.$route.params.id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/categories/updateBusinessCategory', this.editadoCategorias).then(function (response) {
        _this19.getcategoriesrelations();

        _this19.getcategories();
      });
    },
    getMissions: function getMissions() {
      var _this20 = this;

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/getMissionBusiness/' + this.$route.params.idStore + '/' + this.$route.params.id).then(function (response) {
        console.log(response.data.data);
        _this20.missions = response.data.data;
      })["catch"](function (e) {
        _this20.errors.push(e);
      });
    },
    guardarMission: function guardarMission() {
      if (this.editedIndexMision > -1) {
        //Guarda en caso de Edición
        console.log('¡Actualización Exitosa!');
        console.log(this.editadoMision);
        this.editarGuardarMission();
      } else {
        //Guarda el registro en caso de Alta
        this.textMsg = '¡Alta exitosa!';
        this.addGuardarMission();
      }

      this.cancelarMission();
    },
    editarGuardarMission: function editarGuardarMission() {
      var _this21 = this;

      this.editadoMision.store_id = this.$route.params.idStore;
      this.editadoMision.business_id = this.$route.params.id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/businessMissions/update', this.editadoMision).then(function (response) {
        _this21.snackbar = true;
        _this21.textMsg = "¡Producto actualizado correctamente!";

        _this21.getMissions();
      });
    },
    addGuardarMission: function addGuardarMission() {
      var _this22 = this;

      this.editadoMision.store_id = this.$route.params.idStore;
      this.editadoMision.business_id = this.$route.params.id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/businessMissions/add', this.editadoMision).then(function (response) {
        _this22.snackbar = true;
        _this22.textMsg = "¡Agregado correctamente!";

        _this22.getMissions();
      });
    },
    editarMission: function editarMission(item) {
      console.log(item);
      this.editedIndexMision = this.missions.indexOf(item);
      console.log(this.editadoMision);
      this.editadoMision.imageUrl = this.image;
      this.editadoMision = Object.assign({}, item);
      this.dialogMision = true;
    },
    cancelarMission: function cancelarMission(item) {
      this.editedIndexMision = -1;
      this.editadoMision = Object.assign({}, this.defaultItemMision);
      this.dialogMision = false;
    },
    abrirProductsMissions: function abrirProductsMissions(item) {
      this.editedIndexProductoMission = this.missions.indexOf(item);
      this.editadoMision = Object.assign({}, item);
      this.dialogProductsMissions = true;
      this.getProductsMission(item.id);
    },
    getProductsMission: function getProductsMission(id) {
      var _this23 = this;

      this.mission = id;
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/ProductsMissionsBusiness/' + id + '/' + this.$route.params.idStore + '/' + this.$route.params.id).then(function (response) {
        console.log(response.data.data);
        _this23.missionsProducts = response.data.data;
      })["catch"](function (e) {
        _this23.errors.push(e);
      });
    },

    /*++++++++++++++++++++++++*/
    guardarProductoPromo: function guardarProductoPromo() {
      if (this.editadoProductPromo.existPromo > 0) {
        //Guarda en caso de Edición
        console.log('¡Actualización Exitosa!');
        this.editarProductPromo();
      } else {
        //Guarda el registro en caso de Alta
        this.textMsg = '¡Alta exitosa!';
        this.addProductPromo();
      }

      this.cancelarProductoPromo();
    },
    editarProductPromo: function editarProductPromo() {
      var _this24 = this;

      var idC = this.editadoProductPromo.category_id;
      this.editadoProductPromo.store_id = this.$route.params.idStore;
      this.editadoProductPromo.business_id = this.$route.params.id;
      this.editadoProductPromo.category_id = this.editadoSub.id;
      console.log(this.editadoProductPromo);
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/promoproduct/update', this.editadoProductPromo).then(function (response) {
        _this24.snackbar = true;
        _this24.textMsg = "¡Promoción actualizada correctamente!";

        _this24.getProducts(idC);
      });
    },
    addProductPromo: function addProductPromo() {
      var _this25 = this;

      var idC = this.editadoProductPromo.category_id;
      this.editadoProductPromo.store_id = this.$route.params.idStore;
      this.editadoProductPromo.business_id = this.$route.params.id;
      this.editadoProductPromo.category_id = this.editadoSub.id;
      console.log(this.editadoProductPromo);
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/promoproduct/add', this.editadoProductPromo).then(function (response) {
        _this25.snackbar = true;
        _this25.textMsg = "¡Promoción agregada correctamente!";

        _this25.getProducts(idC);
      });
    },
    cancelarProductoPromo: function cancelarProductoPromo(item) {
      this.editadoProductPromo = Object.assign({}, this.defaultProductPromo);
      this.dialogPromoProduct = false;
    },

    /*++++++++++++++++++++++++*/
    onPickFile: function onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked: function onFilePicked(event) {
      var _this26 = this;

      var files = event.target.files;
      var filename = files[0].name;
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        _this26.imageUrl = fileReader.result;
        _this26.editado.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    onPickFileProduct: function onPickFileProduct() {
      this.$refs.fileInput.click();
    },
    onFilePickedProduct: function onFilePickedProduct(event) {
      var _this27 = this;

      var files = event.target.files;
      var filename = files[0].name;
      console.log(this.editadoProduct);
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        _this27.imageUrl = fileReader.result;
        _this27.editadoProduct.imageUrl = fileReader.result;
        _this27.editadoProduct.is_mod = true;
        console.log(_this27.editadoProduct);
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    onPickFileMision: function onPickFileMision() {
      this.$refs.fileInput.click();
    },
    onFilePickedMision: function onFilePickedMision(event) {
      var _this28 = this;

      var files = event.target.files;
      var filename = files[0].name;
      console.log(this.editadoMision);
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        _this28.imageUrl = fileReader.result;
        _this28.editadoMision.imageUrl = fileReader.result;
        _this28.editadoMision.is_mod = true;
        console.log(_this28.editadoMision);
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  },
  computed: {
    /* getStartDate() {
                     var nowDate = new Date(this.date.getFullYear(), this.date.getMonth(), 10);
                     return nowDate.toISOString().slice(0,10)
                 },*/
    // ...mapGetters('auth', ['can'])
    //Dependiendo si es Alta o Edición cambia el título del modal
    formTitle: function formTitle() {
      //operadores condicionales "condición ? expr1 : expr2"
      // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
      return this.editedIndex === -1 ? 'Agregar Categoría' : 'Editar Categoria';
    },
    formTitleAddSub: function formTitleAddSub() {
      //operadores condicionales "condición ? expr1 : expr2"
      // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
      return this.editedAddSubIndex === -1 ? 'Agregar subcategoría' : 'Editar subcategoría';
    },
    formTitleAddProduct: function formTitleAddProduct() {
      //operadores condicionales "condición ? expr1 : expr2"
      // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
      return this.editedIndexProducto === -1 ? 'Agregar producto' : 'Editar producto';
    },
    formTitleMision: function formTitleMision() {
      //operadores condicionales "condición ? expr1 : expr2"
      // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
      return this.editedIndexMision === -1 ? 'Agregar Misión' : 'Editar Misión';
    },
    formTitleProductMision: function formTitleProductMision() {
      //operadores condicionales "condición ? expr1 : expr2"
      // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
      return this.editedIndexProductoMission === -1 ? 'Agregar Producto/Misión' : 'Editar Producto/Misión';
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Missions.vue?vue&type=template&id=755a2213&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Missions.vue?vue&type=template&id=755a2213& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
    "v-container",
    { attrs: { "fill-height": "", fluid: "", "grid-list-xl": "" } },
    [
      _c(
        "v-snackbar",
        {
          attrs: { timeout: _vm.timeout },
          model: {
            value: _vm.snackbar,
            callback: function($$v) {
              _vm.snackbar = $$v
            },
            expression: "snackbar"
          }
        },
        [
          _vm._v("\n        " + _vm._s(_vm.textMsg) + "\n        "),
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
            [_vm._v("\n            Cerrar\n        ")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { md12: "", sm12: "", lg12: "" } },
            [
              _c("v-card", [
                _c(
                  "div",
                  { staticClass: "d-flex flex-no-wrap justify-space-between" },
                  [
                    _c(
                      "div",
                      [
                        _c("v-card-title", { staticClass: "headline" }, [
                          _vm._v(_vm._s(_vm.stores.businessName))
                        ]),
                        _vm._v(" "),
                        _c("v-card-subtitle", [
                          _vm._v(_vm._s(_vm.stores.storeName))
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-col",
                      { attrs: { cols: "6" } },
                      [
                        _c("v-img", {
                          attrs: {
                            src: _vm.stores.image,
                            height: "125",
                            "aspect-ratio": "1"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
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
        "v-dialog",
        {
          attrs: { "max-width": "500px" },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on
                return undefined
              }
            }
          ]),
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _vm._v(" "),
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
                "v-card-text",
                [
                  _c(
                    "v-container",
                    [
                      _c("v-text-field", {
                        attrs: {
                          label: "Nombre",
                          rules: _vm.nameRules,
                          required: ""
                        },
                        model: {
                          value: _vm.editado.name,
                          callback: function($$v) {
                            _vm.$set(_vm.editado, "name", $$v)
                          },
                          expression: "editado.name"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          label: "Descripción",
                          rules: _vm.nameRules,
                          required: ""
                        },
                        model: {
                          value: _vm.editado.description,
                          callback: function($$v) {
                            _vm.$set(_vm.editado, "description", $$v)
                          },
                          expression: "editado.description"
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
                              on: { click: _vm.onPickFile }
                            },
                            [_vm._v("Subir imagen")]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            ref: "fileInput",
                            staticStyle: { display: "none" },
                            attrs: { type: "file", accept: "image/jpeg" },
                            on: { change: _vm.onFilePicked }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-layout", [
                        _c("img", {
                          attrs: { src: _vm.imageUrl, height: "150" }
                        })
                      ])
                    ],
                    1
                  )
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
                      on: { click: _vm.cancelarCategorie }
                    },
                    [_vm._v("Cancelar")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "ma-2 white--text",
                      attrs: { color: "teal accent-4" },
                      on: { click: _vm.guardarCategorie }
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
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "500px" },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on
                return undefined
              }
            }
          ]),
          model: {
            value: _vm.dialogAddSub,
            callback: function($$v) {
              _vm.dialogAddSub = $$v
            },
            expression: "dialogAddSub"
          }
        },
        [
          _vm._v(" "),
          _c(
            "v-card",
            [
              _c("v-card-title", { staticClass: "cyan white--text" }, [
                _c("span", { staticClass: "headline" }, [
                  _vm._v(_vm._s(_vm.formTitleAddSub))
                ])
              ]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-container",
                    [
                      _c("v-text-field", {
                        attrs: {
                          label: "Nombre",
                          rules: _vm.nameRules,
                          required: ""
                        },
                        model: {
                          value: _vm.editadoSub.name,
                          callback: function($$v) {
                            _vm.$set(_vm.editadoSub, "name", $$v)
                          },
                          expression: "editadoSub.name"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          label: "Descripción",
                          rules: _vm.nameRules,
                          required: ""
                        },
                        model: {
                          value: _vm.editadoSub.description,
                          callback: function($$v) {
                            _vm.$set(_vm.editadoSub, "description", $$v)
                          },
                          expression: "editadoSub.description"
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
                              on: { click: _vm.onPickFile }
                            },
                            [_vm._v("Subir imagen")]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            ref: "fileInput",
                            staticStyle: { display: "none" },
                            attrs: { type: "file", accept: "image/jpeg" },
                            on: { change: _vm.onFilePicked }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-layout", [
                        _c("img", {
                          attrs: { src: _vm.imageUrl, height: "150" }
                        })
                      ])
                    ],
                    1
                  )
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
                      on: { click: _vm.cancelarSub }
                    },
                    [_vm._v("Cancelar")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "ma-2 white--text",
                      attrs: { color: "teal accent-4" },
                      on: { click: _vm.guardarSub }
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
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: {
            fullscreen: "",
            "hide-overlay": "",
            transition: "dialog-bottom-transition"
          },
          model: {
            value: _vm.dialogProducts,
            callback: function($$v) {
              _vm.dialogProducts = $$v
            },
            expression: "dialogProducts"
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
                    "v-btn",
                    {
                      attrs: { icon: "", dark: "" },
                      on: {
                        click: function($event) {
                          _vm.dialogProducts = false
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("mdi-close")])],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-toolbar-title", [
                    _vm._v(
                      _vm._s(_vm.editado.name) +
                        " --> " +
                        _vm._s(_vm.editadoSub.name) +
                        " --> Productos"
                    )
                  ]),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-toolbar-items",
                    [
                      _c(
                        "v-btn",
                        {
                          attrs: { dark: "", text: "" },
                          on: {
                            click: function($event) {
                              _vm.dialogProducts = false
                            }
                          }
                        },
                        [_vm._v("Cerrar")]
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list",
                { attrs: { "three-line": "", subheader: "" } },
                [
                  _c(
                    "v-subheader",
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-2",
                          attrs: { color: "success", dark: "" },
                          on: {
                            click: function($event) {
                              _vm.dialogAddProduct = !_vm.dialogAddProduct
                            }
                          }
                        },
                        [
                          _vm._v(
                            "Agregar\n                        Producto\n                    "
                          )
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    [
                      _c(
                        "v-list-item-content",
                        [
                          _c("v-data-table", {
                            staticClass: "elevation-3",
                            attrs: {
                              headers: _vm.headersProducts,
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
                                key: "item.image",
                                fn: function(ref) {
                                  var item = ref.item
                                  return [
                                    _c(
                                      "div",
                                      { staticClass: "p-2" },
                                      [
                                        _c("v-img", {
                                          attrs: {
                                            src: item.image,
                                            alt: item.name,
                                            "aspect-ratio": "1"
                                          }
                                        })
                                      ],
                                      1
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
                                          color: "cyan"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.editarProductoOriginal(
                                              item
                                            )
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
                                          color: "cyan"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.PromocionProductoOriginal(
                                              item
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c("v-icon", { attrs: { dark: "" } }, [
                                          _vm._v("mdi-offer")
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
                                            return _vm.borrarProductoOriginal(
                                              item
                                            )
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
          attrs: { "max-width": "500px" },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on
                return undefined
              }
            }
          ]),
          model: {
            value: _vm.dialogPromoProduct,
            callback: function($$v) {
              _vm.dialogPromoProduct = $$v
            },
            expression: "dialogPromoProduct"
          }
        },
        [
          _vm._v(" "),
          _c(
            "v-form",
            {
              model: {
                value: _vm.validPromo,
                callback: function($$v) {
                  _vm.validPromo = $$v
                },
                expression: "validPromo"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", { staticClass: "cyan white--text" }, [
                    _c("span", { staticClass: "headline" }, [
                      _vm._v("Agregar Promoción")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "12", lg: "6" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Precio Promoción",
                                      prefix: "$",
                                      type: "number",
                                      rules: _vm.numberRules,
                                      required: ""
                                    },
                                    model: {
                                      value:
                                        _vm.editadoProductPromo.precioPromocion,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.editadoProductPromo,
                                          "precioPromocion",
                                          $$v
                                        )
                                      },
                                      expression:
                                        "editadoProductPromo.precioPromocion"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "12", lg: "6" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Unidades mínimas",
                                      type: "number",
                                      rules: _vm.numberRules,
                                      required: ""
                                    },
                                    model: {
                                      value:
                                        _vm.editadoProductPromo.montoMinimo,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.editadoProductPromo,
                                          "montoMinimo",
                                          $$v
                                        )
                                      },
                                      expression:
                                        "editadoProductPromo.montoMinimo"
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
                                        transition: "scale-transition",
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
                                                      label: "Fecha Inicio",
                                                      "prepend-icon": "event",
                                                      readonly: ""
                                                    },
                                                    model: {
                                                      value:
                                                        _vm.editadoProductPromo
                                                          .start_date,
                                                      callback: function($$v) {
                                                        _vm.$set(
                                                          _vm.editadoProductPromo,
                                                          "start_date",
                                                          $$v
                                                        )
                                                      },
                                                      expression:
                                                        "editadoProductPromo.start_date"
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
                                          value:
                                            _vm.editadoProductPromo.start_date,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editadoProductPromo,
                                              "start_date",
                                              $$v
                                            )
                                          },
                                          expression:
                                            "editadoProductPromo.start_date"
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
                                        transition: "scale-transition",
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
                                                      label: "Fecha Fin",
                                                      "prepend-icon": "event",
                                                      readonly: ""
                                                    },
                                                    model: {
                                                      value:
                                                        _vm.editadoProductPromo
                                                          .end_date,
                                                      callback: function($$v) {
                                                        _vm.$set(
                                                          _vm.editadoProductPromo,
                                                          "end_date",
                                                          $$v
                                                        )
                                                      },
                                                      expression:
                                                        "editadoProductPromo.end_date"
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
                                          "no-title": "",
                                          min:
                                            _vm.editadoProductPromo.start_date
                                        },
                                        on: {
                                          input: function($event) {
                                            _vm.menu1 = false
                                          }
                                        },
                                        model: {
                                          value:
                                            _vm.editadoProductPromo.end_date,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.editadoProductPromo,
                                              "end_date",
                                              $$v
                                            )
                                          },
                                          expression:
                                            "editadoProductPromo.end_date"
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
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-2 white--text",
                          attrs: { color: "blue-grey" },
                          on: { click: _vm.cancelarProductoPromo }
                        },
                        [_vm._v("Cancelar\n                    ")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-2 white--text",
                          attrs: {
                            disabled: !_vm.validPromo,
                            color: "teal accent-4"
                          },
                          on: { click: _vm.guardarProductoPromo }
                        },
                        [_vm._v("Guardar\n                    ")]
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
          attrs: { "max-width": "500px" },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on
                return undefined
              }
            }
          ]),
          model: {
            value: _vm.dialogAddProduct,
            callback: function($$v) {
              _vm.dialogAddProduct = $$v
            },
            expression: "dialogAddProduct"
          }
        },
        [
          _vm._v(" "),
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
                "v-card",
                [
                  _c("v-card-title", { staticClass: "cyan white--text" }, [
                    _c("span", { staticClass: "headline" }, [
                      _vm._v(_vm._s(_vm.formTitleAddProduct))
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        [
                          _c("v-text-field", {
                            attrs: {
                              label: "Nombre",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProduct.name,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProduct, "name", $$v)
                              },
                              expression: "editadoProduct.name"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Descripción",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProduct.description,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProduct, "description", $$v)
                              },
                              expression: "editadoProduct.description"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Key",
                              rules: _vm.nameRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProduct.long_key,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProduct, "long_key", $$v)
                              },
                              expression: "editadoProduct.long_key"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Precio",
                              prefix: "$",
                              type: "number",
                              rules: _vm.numberRules,
                              required: ""
                            },
                            model: {
                              value: _vm.editadoProduct.pricebusiness,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editadoProduct,
                                  "pricebusiness",
                                  $$v
                                )
                              },
                              expression: "editadoProduct.pricebusiness"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Contenido",
                              type: "number",
                              rules: _vm.numberRules
                            },
                            model: {
                              value: _vm.editadoProduct.content,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProduct, "content", $$v)
                              },
                              expression: "editadoProduct.content"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: { label: "Unidad", rules: _vm.unidadRules },
                            model: {
                              value: _vm.editadoProduct.unit,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProduct, "unit", $$v)
                              },
                              expression: "editadoProduct.unit"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: { label: "Marca", rules: _vm.nameRules },
                            model: {
                              value: _vm.editadoProduct.brand,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProduct, "brand", $$v)
                              },
                              expression: "editadoProduct.brand"
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
                              value: _vm.editadoProduct.stock,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProduct, "stock", $$v)
                              },
                              expression: "editadoProduct.stock"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Cantidad Máxima",
                              type: "number",
                              rules: _vm.numberRules
                            },
                            model: {
                              value: _vm.editadoProduct.max_quantity,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.editadoProduct,
                                  "max_quantity",
                                  $$v
                                )
                              },
                              expression: "editadoProduct.max_quantity"
                            }
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v("Habilitar / Deshabilitar")]),
                          _vm._v(" "),
                          _c("v-switch", {
                            model: {
                              value: _vm.editadoProduct.is_active,
                              callback: function($$v) {
                                _vm.$set(_vm.editadoProduct, "is_active", $$v)
                              },
                              expression: "editadoProduct.is_active"
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
                              attrs: {
                                src: _vm.editadoProduct.imageUrl,
                                height: "150"
                              }
                            })
                          ])
                        ],
                        1
                      )
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
                          on: { click: _vm.cancelarProductoOriginal }
                        },
                        [_vm._v("Cancelar\n                    ")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-2 white--text",
                          attrs: {
                            disabled: !_vm.valid,
                            color: "teal accent-4"
                          },
                          on: { click: _vm.guardarProductoOriginal }
                        },
                        [_vm._v("Guardar\n                    ")]
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
          attrs: { "max-width": "500px" },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on
                return undefined
              }
            }
          ]),
          model: {
            value: _vm.dialogMision,
            callback: function($$v) {
              _vm.dialogMision = $$v
            },
            expression: "dialogMision"
          }
        },
        [
          _vm._v(" "),
          _c(
            "v-card",
            [
              _c("v-card-title", { staticClass: "cyan white--text" }, [
                _c("span", { staticClass: "headline" }, [
                  _vm._v(_vm._s(_vm.formTitleMision))
                ])
              ]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-container",
                    [
                      _c("v-text-field", {
                        attrs: { label: "Nombre" },
                        model: {
                          value: _vm.editadoMision.name,
                          callback: function($$v) {
                            _vm.$set(_vm.editadoMision, "name", $$v)
                          },
                          expression: "editadoMision.name"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: { label: "Descripción" },
                        model: {
                          value: _vm.editadoMision.description,
                          callback: function($$v) {
                            _vm.$set(_vm.editadoMision, "description", $$v)
                          },
                          expression: "editadoMision.description"
                        }
                      }),
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
                                    transition: "scale-transition",
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
                                                  label: "Fecha Inicio",
                                                  "prepend-icon": "event",
                                                  readonly: ""
                                                },
                                                model: {
                                                  value:
                                                    _vm.editadoMision
                                                      .start_date,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.editadoMision,
                                                      "start_date",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "editadoMision.start_date"
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
                                      value: _vm.editadoMision.start_date,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.editadoMision,
                                          "start_date",
                                          $$v
                                        )
                                      },
                                      expression: "editadoMision.start_date"
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
                                    transition: "scale-transition",
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
                                                  label: "Fecha Fin",
                                                  "prepend-icon": "event",
                                                  readonly: ""
                                                },
                                                model: {
                                                  value:
                                                    _vm.editadoMision.end_date,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.editadoMision,
                                                      "end_date",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "editadoMision.end_date"
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
                                    on: {
                                      input: function($event) {
                                        _vm.menu1 = false
                                      }
                                    },
                                    model: {
                                      value: _vm.editadoMision.end_date,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.editadoMision,
                                          "end_date",
                                          $$v
                                        )
                                      },
                                      expression: "editadoMision.end_date"
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
                        "v-card-text",
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "primary",
                              attrs: { raised: "" },
                              on: { click: _vm.onPickFileMision }
                            },
                            [_vm._v("Subir imagen")]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            ref: "fileInput",
                            staticStyle: { display: "none" },
                            attrs: { type: "file", accept: "image/jpeg" },
                            on: { change: _vm.onFilePickedMision }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-layout", [
                        _c("img", {
                          attrs: {
                            src: _vm.editadoMision.imageUrl,
                            height: "150"
                          }
                        })
                      ])
                    ],
                    1
                  )
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
                      on: { click: _vm.cancelarMission }
                    },
                    [_vm._v("Cancelar")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "ma-2 white--text",
                      attrs: { color: "teal accent-4" },
                      on: { click: _vm.guardarMission }
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
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: {
            fullscreen: "",
            "hide-overlay": "",
            transition: "dialog-bottom-transition"
          },
          model: {
            value: _vm.dialogProductsMissions,
            callback: function($$v) {
              _vm.dialogProductsMissions = $$v
            },
            expression: "dialogProductsMissions"
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
                    "v-btn",
                    {
                      attrs: { icon: "", dark: "" },
                      on: {
                        click: function($event) {
                          _vm.dialogProductsMissions = false
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("mdi-close")])],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-toolbar-items",
                    [
                      _c(
                        "v-btn",
                        {
                          attrs: { dark: "", text: "" },
                          on: {
                            click: function($event) {
                              _vm.dialogProductsMissions = false
                            }
                          }
                        },
                        [_vm._v("Cerrar")]
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list",
                { attrs: { "three-line": "", subheader: "" } },
                [
                  _c(
                    "v-list-item",
                    [
                      _c(
                        "v-list-item-content",
                        [
                          _c("v-data-table", {
                            staticClass: "elevation-3",
                            attrs: {
                              headers: _vm.headersMissions,
                              items: _vm.missionsProducts,
                              search: _vm.searchMission,
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
                                            value: _vm.searchMission,
                                            callback: function($$v) {
                                              _vm.searchMission = $$v
                                            },
                                            expression: "searchMission"
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
                                key: "item.image",
                                fn: function(ref) {
                                  var item = ref.item
                                  return [
                                    _c(
                                      "div",
                                      { staticClass: "p-2" },
                                      [
                                        _c("v-img", {
                                          attrs: {
                                            src: item.image,
                                            alt: item.name,
                                            "aspect-ratio": "1",
                                            height: "60"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                }
                              },
                              {
                                key: "item.action",
                                fn: function(ref) {
                                  var item = ref.item
                                  return [
                                    item.missions.length > 0
                                      ? _c("v-switch", {
                                          attrs: {
                                            value: "",
                                            "input-value": "true"
                                          },
                                          on: {
                                            change: function($event) {
                                              return _vm.toggleMission(item)
                                            }
                                          }
                                        })
                                      : _c("v-switch", {
                                          on: {
                                            change: function($event) {
                                              return _vm.toggleMission(item)
                                            }
                                          },
                                          model: {
                                            value: item.action,
                                            callback: function($$v) {
                                              _vm.$set(item, "action", $$v)
                                            },
                                            expression: "item.action"
                                          }
                                        })
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
      ),
      _vm._v(" "),
      _c(
        "v-row",
        [
          _c(
            "v-tabs",
            {
              attrs: {
                "background-color": "deep-purple accent-4",
                centered: "",
                dark: "",
                "icons-and-text": ""
              },
              model: {
                value: _vm.tab,
                callback: function($$v) {
                  _vm.tab = $$v
                },
                expression: "tab"
              }
            },
            [
              _c("v-tabs-slider"),
              _vm._v(" "),
              _c(
                "v-tab",
                { attrs: { href: "#tab-1" } },
                [
                  _vm._v("\n                Categorías\n                "),
                  _c("v-icon", [_vm._v("mdi-format-list-text")])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-tab",
                { attrs: { href: "#tab-2" } },
                [
                  _vm._v("\n                Misiones\n                "),
                  _c("v-icon", [_vm._v("mdi-sale")])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-tabs-items",
            {
              model: {
                value: _vm.tab,
                callback: function($$v) {
                  _vm.tab = $$v
                },
                expression: "tab"
              }
            },
            [
              _c(
                "v-tab-item",
                { key: 1, attrs: { value: "tab-1" } },
                [
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        { attrs: { cols: "6" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "ma-2",
                              attrs: { color: "success", dark: "" },
                              on: {
                                click: function($event) {
                                  _vm.dialog = !_vm.dialog
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Agregar Categoría\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-container",
                            [
                              _c("v-data-table", {
                                staticClass: "elevation-3",
                                attrs: {
                                  headers: _vm.headers,
                                  items: _vm.categories,
                                  search: _vm.search,
                                  "sort-by": "id"
                                },
                                scopedSlots: _vm._u([
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
                                              color: "cyan"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.editarCategoria(item)
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
                                            staticClass: "mr-2",
                                            attrs: {
                                              fab: "",
                                              dark: "",
                                              small: "",
                                              color: "cyan"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.getSubcategorias(
                                                  item
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c(
                                              "v-icon",
                                              { attrs: { dark: "" } },
                                              [
                                                _vm._v(
                                                  "mdi-file-document-box-search"
                                                )
                                              ]
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
                                                return _vm.borrarCat(item)
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
                        "v-col",
                        { attrs: { cols: "6" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "ma-2",
                              attrs: {
                                color: "success",
                                dark: "",
                                disabled: _vm.customCondition
                              },
                              on: {
                                click: function($event) {
                                  _vm.dialogAddSub = !_vm.dialogAddSub
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Agregar Subcategoría\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-card-text",
                            [
                              _c(
                                "v-container",
                                [
                                  _c("v-data-table", {
                                    staticClass: "elevation-3",
                                    attrs: {
                                      headers: _vm.headersSub,
                                      items: _vm.subcategories,
                                      search: _vm.search,
                                      "sort-by": "id"
                                    },
                                    scopedSlots: _vm._u([
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
                                                  color: "cyan"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.editarSub(item)
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
                                                staticClass: "mr-2",
                                                attrs: {
                                                  fab: "",
                                                  dark: "",
                                                  small: "",
                                                  color: "error"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.borrarSub(item)
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
                                                  color: "cyan"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.abrirProducts(
                                                      item
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _c(
                                                  "v-icon",
                                                  { attrs: { dark: "" } },
                                                  [
                                                    _vm._v(
                                                      "mdi-file-document-box-plus"
                                                    )
                                                  ]
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
              ),
              _vm._v(" "),
              _c(
                "v-tab-item",
                { key: 2, attrs: { value: "tab-2" } },
                [
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-2",
                          attrs: { color: "success", dark: "" },
                          on: {
                            click: function($event) {
                              _vm.dialogMision = !_vm.dialogMision
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        Agregar Misión\n                    "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-container",
                        [
                          _c("v-data-table", {
                            staticClass: "elevation-3",
                            attrs: {
                              headers: _vm.headersMissions,
                              items: _vm.missions,
                              search: _vm.search,
                              "sort-by": "id"
                            },
                            scopedSlots: _vm._u([
                              {
                                key: "item.image",
                                fn: function(ref) {
                                  var item = ref.item
                                  return [
                                    _c(
                                      "div",
                                      { staticClass: "p-2" },
                                      [
                                        _c("v-img", {
                                          attrs: {
                                            src: item.image,
                                            alt: item.name,
                                            "aspect-ratio": "1"
                                          }
                                        })
                                      ],
                                      1
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
                                          color: "cyan"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.editarMission(item)
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
                                            return _vm.borrarMission(item)
                                          }
                                        }
                                      },
                                      [
                                        _c("v-icon", { attrs: { dark: "" } }, [
                                          _vm._v("mdi-delete")
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
                                          color: "cyan"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.abrirProductsMissions(
                                              item
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c("v-icon", { attrs: { dark: "" } }, [
                                          _vm._v("mdi-file-document-box-search")
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

/***/ "./resources/js/components/views/Missions.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/views/Missions.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Missions_vue_vue_type_template_id_755a2213___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Missions.vue?vue&type=template&id=755a2213& */ "./resources/js/components/views/Missions.vue?vue&type=template&id=755a2213&");
/* harmony import */ var _Missions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Missions.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Missions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Missions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Missions_vue_vue_type_template_id_755a2213___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Missions_vue_vue_type_template_id_755a2213___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Missions.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Missions.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/views/Missions.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Missions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Missions.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Missions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Missions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Missions.vue?vue&type=template&id=755a2213&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/views/Missions.vue?vue&type=template&id=755a2213& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Missions_vue_vue_type_template_id_755a2213___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Missions.vue?vue&type=template&id=755a2213& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Missions.vue?vue&type=template&id=755a2213&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Missions_vue_vue_type_template_id_755a2213___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Missions_vue_vue_type_template_id_755a2213___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);