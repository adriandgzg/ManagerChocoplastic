(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{65:function(e,t,s){"use strict";s.r(t);var o={data:function(){return{enabledStore:!1,menu1:!1,menu2:!1,textMsg:"",alert:!1,valid:!1,select_stores:0,select_products:"",start_date:"",end_date:"",stores:[],products:[]}},created:function(){this.getStores(),this.getUsers(),this.getProducts()},methods:{getUsers:function(){var e=this;axios.get("/listUser").then((function(t){e.users=t.data.data,e.users.store_id>0?(e.enabledStore=!0,e.select_stores=e.users.store_id):e.enabledStore=!1})).catch((function(t){e.errors.push(t)}))},getStores:function(){var e=this;axios.get("/storeget").then((function(t){e.stores=t.data.data})).catch((function(e){console.log(e)}))},getProducts:function(){var e=this;axios.get("/productList").then((function(t){e.products=t.data.data})).catch((function(e){console.log(e)}))},GenerarReporte:function(){if(axios,0==this.select_stores)return this.alert=!0,void(this.textMsg="Seleccionar Sucursal");if(void 0===this.select_products.prod_pk)var e="";else e=this.select_products.prod_pk;window.open("http://3.217.161.164:777/?pRep=2&pProd_PK="+e+"&pStor_PK="+this.select_stores+"&pUser_PK="+this.users.id,"_blank")},hide_alert:function(e){var t=this;console.log("Hide"),window.setInterval((function(){t.alert=!1}),7e3)}},mounted:function(){alert&&this.hide_alert()}},r=s(0),a=Object(r.a)(o,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-container",[s("v-alert",{attrs:{dismissible:"",transition:"fade-transition",type:"info",timeout:"5000"},model:{value:e.alert,callback:function(t){e.alert=t},expression:"alert"}},[e._v(e._s(e.textMsg))]),e._v(" "),s("v-row",[s("v-col",[s("v-card",[s("v-row",[s("v-col",[s("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[s("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[s("v-select",{attrs:{items:e.stores,"item-text":"stor_name","item-value":"stor_pk",filled:"",chips:"",label:"Sucursal",placeholder:"Selecciona Sucursal",disabled:e.enabledStore},model:{value:e.select_stores,callback:function(t){e.select_stores=t},expression:"select_stores"}})],1)],1)],1)],1),e._v(" "),s("v-row",[s("v-col",[s("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[s("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[s("v-combobox",{attrs:{items:e.products,"item-text":"prod_name_identifier","item-value":"prod_identifier",filled:"",chips:"",label:"Producto",placeholder:"Seleccionar Producto"},model:{value:e.select_products,callback:function(t){e.select_products=t},expression:"select_products"}})],1)],1)],1)],1)],1),e._v(" "),s("v-card",{attrs:{justify:"end"}},[s("v-btn",{staticClass:"mr-4",attrs:{color:"success",disabled:!e.valid},on:{click:e.GenerarReporte}},[e._v("Generar")])],1)],1)],1)],1)}),[],!1,null,null,null);t.default=a.exports}}]);