(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{63:function(t,e,s){"use strict";s.r(e);var n={data:function(){return{enabledStore:!1,menu1:!1,menu2:!1,textMsg:"",alert:!1,valid:!1,select_stores:0,select_products:0,start_date:"",end_date:"",stores:[],products:[]}},created:function(){this.getStores(),this.getUsers(),this.getProducts()},methods:{getUsers:function(){var t=this;axios.get("/listUser").then((function(e){t.users=e.data.data,t.users.store_id>0?(t.enabledStore=!0,t.SelectSucursal=t.stores.find((function(e){return e.stor_pk==t.users.store_id}))):t.enabledStore=!1})).catch((function(e){t.errors.push(e)}))},getStores:function(){var t=this;axios.get("/storeget").then((function(e){t.stores=e.data.data})).catch((function(t){console.log(t)}))},getProducts:function(){var t=this;axios.get("/productList").then((function(e){t.products=e.data.data})).catch((function(t){console.log(t)}))},GenerarReporte:function(){if(axios,""==this.select_products||"0"==this.select_products)return this.alert=!0,void(this.textMsg="Seleccionar Producto");0==this.select_stores&&(this.select_stores=""),window.open("http://3.217.161.164:777/?pRep=1&pProd_PK="+this.select_products+"&pStor_PK="+this.select_stores+"&pDateStart="+this.start_date+"&pDateEnd="+this.end_date,"_blank")},hide_alert:function(t){var e=this;console.log("Hide"),window.setInterval((function(){e.alert=!1}),7e3)}},mounted:function(){alert&&this.hide_alert()}},o=s(0),a=Object(o.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-alert",{attrs:{dismissible:"",transition:"fade-transition",type:"info",timeout:"5000"},model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}},[t._v(t._s(t.textMsg))]),t._v(" "),s("v-row",[s("v-col",[s("v-card",[s("v-row",[s("v-col",[s("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[s("v-select",{attrs:{items:t.stores,"item-text":"stor_name","item-value":"stor_pk",filled:"",chips:"",label:"Sucursal",placeholder:"Selecciona Sucursal",disabled:t.enabledStore},model:{value:t.select_stores,callback:function(e){t.select_stores=e},expression:"select_stores"}})],1)],1)],1)],1),t._v(" "),s("v-row",[s("v-col",[s("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[s("v-select",{attrs:{items:t.products,"item-text":"prod_name_identifier","item-value":"prod_identifier",filled:"",chips:"",label:"Producto",placeholder:"Seleccionar Producto"},model:{value:t.select_products,callback:function(e){t.select_products=e},expression:"select_products"}})],1)],1)],1)],1),t._v(" "),s("v-row",[s("v-col",{attrs:{cols:"12",lg:"6"}},[s("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[s("v-text-field",t._g({attrs:{label:"Fecha Inicio","prepend-icon":"event",readonly:""},model:{value:t.start_date,callback:function(e){t.start_date=e},expression:"start_date"}},n))]}}]),model:{value:t.menu2,callback:function(e){t.menu2=e},expression:"menu2"}},[t._v(" "),s("v-date-picker",{on:{input:function(e){t.menu2=!1}},model:{value:t.start_date,callback:function(e){t.start_date=e},expression:"start_date"}})],1)],1),t._v(" "),s("v-col",{attrs:{cols:"12",lg:"6"}},[s("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[s("v-text-field",t._g({attrs:{label:"Fecha Fin","prepend-icon":"event",readonly:""},model:{value:t.end_date,callback:function(e){t.end_date=e},expression:"end_date"}},n))]}}]),model:{value:t.menu1,callback:function(e){t.menu1=e},expression:"menu1"}},[t._v(" "),s("v-date-picker",{attrs:{min:t.start_date},on:{input:function(e){t.menu1=!1}},model:{value:t.end_date,callback:function(e){t.end_date=e},expression:"end_date"}})],1)],1)],1)],1),t._v(" "),s("v-card",{attrs:{justify:"end"}},[s("v-btn",{staticClass:"mr-4",attrs:{color:"success",disabled:!t.valid},on:{click:t.GenerarReporte}},[t._v("Generar")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=a.exports}}]);