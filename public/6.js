(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{33:function(e,t,a){"use strict";a.r(t);var r=a(1),o=a.n(r),n={data:function(){return{headers:[{text:"Pedido",value:"clor_identifier"},{text:"Sucursal",value:"stor_name"},{text:"Fecha",value:"created_at"},{text:"Estatus",value:"status"},{text:"",value:"action",width:"20%"}],select:0,principal:!1,estado:!0,editado:{clor_pk:0,clor_name:"",clor_status:0},defaultItem:{clor_pk:0,clor_name:"",clor_status:0},editedIndex:-1,sales:[],categories:[],entities:[],search:"",dialog:!1,snackbar:!1,timeout:2e3,textMsg:"",valid:!1,validProvider:!1,folioRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=10||"Min 10 caracter"}],nameRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=3||"Min 3 caracteres"}],phoneRules:[function(e){return!!e||"Requerido."},function(e){return e&&10==e.length||"Requiere 10 caracteres"}],loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:"",boxEnabled:!1}},created:function(){this.getCategories(),this.obtenerCaja()},methods:{obtenerCaja:function(){var e=this;axios.get("/boxcut").then((function(t){null==t.data.data?e.boxEnabled=!0:e.boxEnabled=!1,console.log("boxEnabled --\x3e"+e.boxEnabled)})).catch((function(e){console.log(e)}))},getCategories:function(){var e=this;this.loading=!0,axios.get("/clientorders").then((function(t){setTimeout((function(){return e.loading=!1}),500),null!=t.data.data?e.categories=t.data.data:e.normal("Notificación",t.data.status.message,"error")})).catch((function(t){console.log(t),e.normal("Notificación","Error al cargar los datos","error")}))},cancelar:function(){this.dialog=!1,this.editado=Object.assign({},this.defaultItem),this.editedIndex=-1},ventas:function(e){this.editedIndex=this.categories.indexOf(e),this.editado=Object.assign({},e),this.createsale(e.clor_pk)},createsale:function(e){var t=this;axios.post("/clientsales?clor_pk="+e).then((function(e){t.sales=e.data,console.log(e.data)})).catch((function(e){console.log(e)}))},borrar:function(e){this.categories.indexOf(e);this.editado=Object.assign({},e),this.dialogQuestionDelete=!0},guardaBorrar:function(){this.delete(),this.dialogQuestionDelete=!1},delete:function(){var e=this;axios.post("/client/orders/destroy",this.editado).then((function(t){console.log(t),200==t.data.code?(e.textMsg="¡Eliminado correctamente!",e.normal("Notificación",e.textMsg,"error"),e.getCategories()):e.normal("Notificación",t.data.message,"error")}))},normal:function(e,t,a){this.notice=new o.a({title:e,description:t,className:"open-normal",closable:!0,duration:3,type:a})}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo Registro":"Editar Registro"}}},i=a(0),s=Object(i.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-container",[a("v-alert",{attrs:{type:"warning"},model:{value:e.boxEnabled,callback:function(t){e.boxEnabled=t},expression:"boxEnabled"}},[e._v("\r\n            Para realizar una venta, primero debe abrir caja.\r\n        ")]),e._v(" "),a("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[a("v-card",{attrs:{color:"white"}},[a("v-card-text",[e._v("\r\n                    Cargando\r\n                    "),a("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),e._v(" "),a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:e.dialogQuestionDelete,callback:function(t){e.dialogQuestionDelete=t},expression:"dialogQuestionDelete"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("Alerta")]),e._v(" "),a("v-card-text",[e._v("¿Está seguro de borrar el registro?")]),e._v(" "),a("v-card-actions",[a("v-spacer"),e._v(" "),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(t){e.dialogQuestionDelete=!1}}},[e._v("Cancelar")]),e._v(" "),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:e.guardaBorrar}},[e._v("Continuar")])],1)],1)],1),e._v(" "),a("v-snackbar",{attrs:{color:"#000000",timeout:e.timeout},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\r\n            "+e._s(e.textMsg)+"\r\n            "),a("v-btn",{attrs:{color:"blue",text:""},on:{click:function(t){e.snackbar=!1}}},[e._v("\r\n                Cerrar\r\n            ")])],1),e._v(" "),a("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"cyan white--text"},[a("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),e._v(" "),a("v-form",{model:{value:e.validProvider,callback:function(t){e.validProvider=t},expression:"validProvider"}},[a("v-card-text",[a("v-text-field",{attrs:{label:"Nombre",maxlength:"300",rules:e.nameRules,required:""},model:{value:e.editado.clor_name,callback:function(t){e.$set(e.editado,"clor_name",t)},expression:"editado.clor_name"}}),e._v(" "),a("span",[e._v("Activo/Inactivo")]),e._v(" "),a("v-switch",{model:{value:e.estado,callback:function(t){e.estado=t},expression:"estado"}})],1),e._v(" "),a("v-card-actions",[a("v-spacer"),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:e.cancelar}},[e._v("Cancelar")])],1)],1)],1)],1),e._v(" "),a("v-row",[a("v-col",[a("v-card",[a("v-data-table",{staticClass:"elevation-3",attrs:{headers:e.headers,items:e.categories,search:e.search,"sort-by":"id"},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}}),e._v(" "),a("v-toolbar",{attrs:{flat:"",color:"indigo"}},[a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e._v(" "),a("v-spacer")],1),e._v(" "),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)]},proxy:!0},{key:"item.status",fn:function(t){var r=t.item;return[1==r.clor_status?a("v-chip",{attrs:{color:"green",dark:""}},[e._v(" Pendiente ")]):e._e(),e._v(" "),2==r.clor_status?a("v-chip",{attrs:{color:"blue",dark:""}},[e._v(" Procesado ")]):e._e(),e._v(" "),0==r.clor_status?a("v-chip",{attrs:{color:"red",dark:""}},[e._v(" Cancelado ")]):e._e()]}},{key:"item.action",fn:function(t){var r=t.item;return[1==r.clor_status&&1!=e.boxEnabled?a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"cyan",title:"Convertir Orden en Venta",href:"/detaiorder/"+r.clor_pk}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-cash-register")])],1):e._e(),e._v(" "),a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"purple",title:"Detalle de orden",href:"/detaiorderread/"+r.clor_pk}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-eye")])],1),e._v(" "),1==r.clor_status?a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"error",title:"Eliminar orden"},on:{click:function(t){return e.borrar(r)}}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-delete")])],1):e._e()]}}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=s.exports}}]);