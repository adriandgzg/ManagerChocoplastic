(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{29:function(t,e,a){"use strict";a.r(e);var r=a(1),n=a.n(r),o={data:function(){return{headers:[{text:"ID",value:"bocu_pk",width:"10%"},{text:"Fecha Apertura",value:"bocu_startdate"},{text:"Fecha Cierre",value:"bocu_enddate"},{text:"Monto Inicial",value:"bocu_initialamount"},{text:"Monto Cierre",value:"bocu_endamount"},{text:"Observaciones",value:"bocu_observation"},{text:"Estatus",value:"status"},{text:"",value:"action"}],select:0,principal:!1,estado:!0,editedIndex:-1,sales:[],sales0:[],search:"",dialog:!1,snackbar:!1,timeout:2e3,idUserStore:0,textMsg:"",folioRules:[function(t){return!!t||"Requerido."},function(t){return t&&t.length>=10||"Min 10 caracter"}],nameRules:[function(t){return!!t||"Requerido."},function(t){return t&&t.length>=3||"Min 3 caracteres"}],phoneRules:[function(t){return!!t||"Requerido."},function(t){return t&&10==t.length||"Requiere 10 caracteres"}],loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:""}},created:function(){this.getSales()},methods:{getSales:function(){var t=this;this.loading=!0,axios.get("/boxcuts").then((function(e){setTimeout((function(){return t.loading=!1}),2e3),null!=e.data.data?t.sales=e.data.data:t.normal("Notificación",e.data.status.message,"error")})).catch((function(e){console.log(e),t.normal("Notificación","Error al cargar los datos","error")}))},formatMoney:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",";try{e=Math.abs(e),e=isNaN(e)?2:e;var n=t<0?"-":"",o=parseInt(t=Math.abs(Number(t)||0).toFixed(e)).toString(),s=o.length>3?o.length%3:0;return n+(s?o.substr(0,s)+r:"")+o.substr(s).replace(/(\d{3})(?=\d)/g,"$1"+r)+(e?a+Math.abs(t-o).toFixed(e).slice(2):"")}catch(t){console.log(t)}},normal:function(t,e,a){this.notice=new n.a({title:t,description:e,className:"open-normal",closable:!0,duration:3,type:a})}}},s=a(0),i=Object(s.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-container",[a("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("v-card",{attrs:{color:"white"}},[a("v-card-text",[t._v("\r\n                    Cargando\r\n                    "),a("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),t._v(" "),a("v-snackbar",{attrs:{color:"#000000",timeout:t.timeout},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\r\n            "+t._s(t.textMsg)+"\r\n            "),a("v-btn",{attrs:{color:"blue",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\r\n                Cerrar\r\n            ")])],1),t._v(" "),a("v-row",[a("v-col",[a("v-card",[a("v-data-table",{staticClass:"elevation-3",attrs:{headers:t.headers,items:t.sales,search:t.search,"sort-by":"id"},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}}),t._v(" "),a("v-toolbar",{attrs:{flat:"",color:"indigo"}},[a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),t._v(" "),a("v-spacer")],1),t._v(" "),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("v-text-field",{attrs:{autofocus:"","append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]},proxy:!0},{key:"item.bocu_initialamount",fn:function(e){var r=e.item;return[a("v-label",[t._v("$"+t._s(t.formatMoney(r.bocu_initialamount)))])]}},{key:"item.bocu_endamount",fn:function(e){var r=e.item;return[a("v-label",[t._v("$"+t._s(t.formatMoney(r.bocu_endamount)))])]}},{key:"item.status",fn:function(e){var r=e.item;return["Abierta"==r.bocu_status?a("v-chip",{attrs:{color:"gray",dark:""}},[t._v(" "+t._s(r.bocu_status)+" ")]):a("v-chip",{attrs:{color:"green",dark:""}},[t._v(t._s(r.bocu_status))])]}},{key:"item.action",fn:function(e){var r=e.item;return["Cerrada"==r.bocu_status?a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"orange",href:"/box/cuts/"+r.bocu_pk,title:"Imprimir"}},[a("v-icon",{attrs:{dark:""}},[t._v("mdi-printer")])],1):t._e()]}}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=i.exports}}]);