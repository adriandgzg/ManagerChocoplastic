(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{44:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),o={data:function(){return{headers:[{text:"ID",value:"prod_identifier",width:"10%"},{text:"Producto",value:"prod_name"},{text:"Unidad Medida Salida",value:"meas_name"},{text:"Categoria",value:"prca_name"},{text:"Sucursal",value:"stor_name"},{text:"Stock",value:"prin_stock"},{text:"Pedido",value:"stock_order"},{text:"Stock App",value:"stock_app"}],select:0,principal:!1,estado:!0,editedIndex:-1,sales:[],sales0:[],search:"",dialog:!1,snackbar:!1,timeout:2e3,idUserStore:0,textMsg:"",folioRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=10||"Min 10 caracter"}],nameRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=3||"Min 3 caracteres"}],phoneRules:[function(e){return!!e||"Requerido."},function(e){return e&&10==e.length||"Requiere 10 caracteres"}],loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:""}},created:function(){this.getSales()},methods:{getSales:function(){var e=this;this.loading=!0,axios.get("/product/inventories").then((function(t){setTimeout((function(){return e.loading=!1}),500),null!=t.data.data?e.sales=t.data.data:e.normal("Notificación",t.data.status.message,"error")})).catch((function(t){console.log("Detalle: "+response.data.status.technicaldetail),e.normal("Notificación","Error al cargar los datos","error")}))},normal:function(e,t,a){this.notice=new n.a({title:e,description:t,className:"open-normal",closable:!0,duration:3,type:a})}}},s=a(0),i=Object(s.a)(o,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-container",[a("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[a("v-card",{attrs:{color:"white"}},[a("v-card-text",[e._v("\r\n                    Cargando\r\n                    "),a("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),e._v(" "),a("v-snackbar",{attrs:{color:"#000000",timeout:e.timeout},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\r\n            "+e._s(e.textMsg)+"\r\n            "),a("v-btn",{attrs:{color:"blue",text:""},on:{click:function(t){e.snackbar=!1}}},[e._v("\r\n                Cerrar\r\n            ")])],1),e._v(" "),a("v-row",[a("v-col",[a("v-card",[a("v-data-table",{staticClass:"elevation-3",attrs:{headers:e.headers,items:e.sales,search:e.search,"sort-by":"id"},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}}),e._v(" "),a("v-toolbar",{attrs:{flat:"",color:"indigo"}},[a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e._v(" "),a("v-spacer")],1),e._v(" "),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("v-text-field",{attrs:{autofocus:"","append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)]},proxy:!0}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=i.exports}}]);