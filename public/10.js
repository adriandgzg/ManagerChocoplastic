(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{37:function(t,e,a){"use strict";a.r(e);var r=a(1),n=a.n(r),s={data:function(){return{headers:[{text:"ID",value:"clsa_identifier",width:"10%"},{text:"Cliente",value:"clie_name"},{text:"Sucursal",value:"stor_name"},{text:"Observación",value:"clre_observation"},{text:"Fecha",value:"created_at"},{text:"Estatus",value:"status"},{text:"",value:"action",width:"20%"}],select:0,principal:!1,estado:!0,editedIndex:-1,sales:[],search:"",dialog:!1,snackbar:!1,timeout:2e3,textMsg:"",folioRules:[function(t){return!!t||"Requerido."},function(t){return t&&t.length>=10||"Min 10 caracter"}],nameRules:[function(t){return!!t||"Requerido."},function(t){return t&&t.length>=3||"Min 3 caracteres"}],phoneRules:[function(t){return!!t||"Requerido."},function(t){return t&&10==t.length||"Requiere 10 caracteres"}],loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:""}},created:function(){this.getSales()},methods:{getSales:function(){var t=this;this.loading=!0,axios.get("/client/returns").then((function(e){setTimeout((function(){return t.loading=!1}),2e3),null!=e.data.data?(console.log(e.data),t.sales=e.data.data):t.normal("Notificación",e.data.status.message,"error")})).catch((function(e){console.log(e),t.normal("Notificación","Error al cargar los datos","error")}))},normal:function(t,e,a){this.notice=new n.a({title:t,description:e,className:"open-normal",closable:!0,duration:3,type:a})}}},i=a(0),o=Object(i.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-container",[a("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("v-card",{attrs:{color:"white"}},[a("v-card-text",[t._v("\n          Cargando\n          "),a("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),t._v(" "),a("v-snackbar",{attrs:{color:"#000000",timeout:t.timeout},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n                "+t._s(t.textMsg)+"\n                "),a("v-btn",{attrs:{color:"blue",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\n                    Cerrar\n                ")])],1),t._v(" "),a("v-row",[a("v-col",[a("v-card",[a("v-data-table",{staticClass:"elevation-3",attrs:{headers:t.headers,items:t.sales,search:t.search,"sort-by":"id"},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}}),t._v(" "),a("v-toolbar",{attrs:{flat:"",color:"indigo"}},[a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),t._v(" "),a("v-spacer")],1),t._v(" "),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]},proxy:!0},{key:"item.status",fn:function(e){var r=e.item;return["Pendiente"==r.clsa_status?a("v-chip",{attrs:{color:"gray",dark:""}},[t._v("  "+t._s(r.clre_status_description)+"  ")]):a("v-chip",{attrs:{color:"green",dark:""}},[t._v(t._s(r.clre_status_description))])]}},{key:"item.action",fn:function(e){var r=e.item;return["Pendiente"==r.clsa_status?a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"pink",href:"/clientsreturn/"+r.clsa_pk,title:"Continuar devolución"}},[a("v-icon",{attrs:{dark:""}},[t._v("mdi-arrow-left-bold-circle")])],1):t._e(),t._v(" "),a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"purple",href:"/clientsrdetail/"+r.clre_pk,title:"Detalle de devolución"}},[a("v-icon",{attrs:{dark:""}},[t._v("mdi-eye")])],1)]}}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=o.exports}}]);