(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{31:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),o={data:function(){return{headersdetail:[{text:"ID",value:"clpa_pk",width:"10%"},{text:"Forma de Pago",value:"pash_name"},{text:"Monto pagado",value:"clpa_amount"},{text:"Fecha pago",value:"created_at"}],headers:[{text:"ID",value:"clde_pk",width:"10%"},{text:"No. Venta",value:"clsa_identifier"},{text:"Cliente",value:"clie_name"},{text:"Monto Deuda",value:"clde_amount"},{text:"Monto Pagado",value:"clde_amount_paid"},{text:"Monto Pendiente",value:"clde_amount_outstanding"},{text:"Fecha",value:"created_at"},{text:"Estatus",value:"clde_status_description"},{text:"",value:"action",width:"20%"}],select:0,principal:!1,estado:!0,editado:{clde_fk:0,clsa_identifier:"",clie_fk:0,pash_fk:0,clpa_amount:0},defaultItem:{clde_fk:0,clsa_identifier:"",clie_fk:0,pash_fk:0,clpa_amount:0},editedIndex:-1,sales:[],detallepagos:[],clientsdebts:[],entities:[],search:"",dialog:!1,dialogdetail:!1,snackbar:!1,timeout:2e3,textMsg:"",valid:!1,validProvider:!1,payments:[],selectpame:"",folioRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=10||"Min 10 caracter"}],nameRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=3||"Min 3 caracteres"}],phoneRules:[function(e){return!!e||"Requerido."},function(e){return e&&10==e.length||"Requiere 10 caracteres"}],numberRules:[function(e){return!!e||"Requerido."},function(e){return e>0||"El número debe ser mayor o igual a cero"}],loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:"",boxEnabled:!1}},created:function(){this.getClientesPago(),this.getPayment(),this.obtenerCaja()},methods:{obtenerCaja:function(){var e=this;axios.get("/boxcut").then((function(t){null==t.data.data?e.boxEnabled=!0:e.boxEnabled=!1,console.log("boxEnabled --\x3e"+e.boxEnabled)})).catch((function(e){console.log(e)}))},formatMoney:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",";try{t=Math.abs(t),t=isNaN(t)?2:t;var i=e<0?"-":"",o=parseInt(e=Math.abs(Number(e)||0).toFixed(t)).toString(),l=o.length>3?o.length%3:0;return i+(l?o.substr(0,l)+n:"")+o.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+n)+(t?a+Math.abs(e-o).toFixed(t).slice(2):"")}catch(e){console.log(e)}},getClientesPago:function(){var e=this;this.loading=!0,axios.get("/client/debts").then((function(t){setTimeout((function(){return e.loading=!1}),2e3),null!=t.data.data?(console.log(t.data),e.clientsdebts=t.data.data):e.normal("Notificación",t.data.status.message,"error")})).catch((function(t){console.log(t),e.normal("Notificación","Error al cargar los datos","error")}))},cancelar:function(){this.dialog=!1,this.editado=Object.assign({},this.defaultItem),this.editedIndex=-1},abonar:function(e){this.dialog=!0,this.editado.clde_fk=e.clde_pk,this.editado.clsa_identifier=e.clsa_identifier,this.editado.clie_fk=e.clie_pk,this.editado.pash_fk=0,this.editado.clpa_amount=0},getPayment:function(){var e=this;axios.get("/paymentshapesget").then((function(t){e.payments=t.data.data})).catch((function(e){console.log(e)}))},guardar:function(){var e=this;this.editado.pash_fk=this.selectpame.pash_pk,""!=this.selectpame&&null!=this.selectpame?axios.post("/client/payments",this.editado).then((function(t){console.log(t),200==t.data.code?(e.textMsg="¡Actualizado correctamente!",e.normal("Notificación","¡Actualizado correctamente!","success"),e.getClientesPago(),e.cancelar()):e.normal("Notificación",t.data.message,"success")})).catch((function(t){e.errors.push(t)})):this.normal("Notificación","Debe seleccionar un Forma de Pago","success")},detalle:function(e){var t=this;console.log(e),axios.get("/client/payments/"+e.clde_pk).then((function(e){t.detallepagos=e.data.data,t.dialogdetail=!0})).catch((function(e){console.log(e)}))},cancelardetalle:function(){this.dialogdetail=!1},normal:function(e,t,a){this.notice=new i.a({title:e,description:t,className:"open-normal",closable:!0,duration:3,type:a})}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo Registro":"Editar Registro"}}},l=a(0),s=Object(l.a)(o,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-container",[a("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[a("v-card",{attrs:{color:"white"}},[a("v-card-text",[e._v("\n          Cargando\n          "),a("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),e._v(" "),a("v-dialog",{attrs:{"max-width":"800px",persistent:""},model:{value:e.dialogdetail,callback:function(t){e.dialogdetail=t},expression:"dialogdetail"}},[a("v-card",[a("v-card-title",{staticClass:"cyan white--text"},[a("span",{staticClass:"headline"},[e._v("Detalle de pagos")])]),e._v(" "),a("v-card-text",[a("v-data-table",{staticClass:"elevation-3",attrs:{headers:e.headersdetail,items:e.detallepagos,"sort-by":"id"},scopedSlots:e._u([{key:"item.clpa_amount",fn:function(t){var n=t.item;return[a("v-label",[e._v("$"+e._s(e.formatMoney(n.clpa_amount)))])]}}])})],1),e._v(" "),a("v-card-actions",[a("v-spacer"),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:e.cancelardetalle}},[e._v("Cancelar")])],1)],1)],1),e._v(" "),a("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"cyan white--text"},[a("span",{staticClass:"headline"},[e._v("Agregar pago")])]),e._v(" "),a("v-card-text",[a("v-form",{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-card-title",{staticClass:"subheading font-weight-bold"},[e._v("No. Venta: "+e._s(e.editado.clsa_identifier))]),e._v(" "),a("v-divider"),e._v(" "),a("v-row",[a("v-text-field",{attrs:{label:"Monto abonado",prefix:"$",type:"number",rules:e.numberRules,required:""},model:{value:e.editado.clpa_amount,callback:function(t){e.$set(e.editado,"clpa_amount",t)},expression:"editado.clpa_amount"}}),e._v(" "),a("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[a("v-combobox",{attrs:{required:"",items:e.payments,label:"Forma de pago","item-text":"pash_name","item-value":"pash_pk",filled:"",chips:"",placeholder:"Seleccionar una opción"},model:{value:e.selectpame,callback:function(t){e.selectpame=t},expression:"selectpame"}})],1)],1)],1)],1),e._v(" "),a("v-card-actions",[a("v-spacer"),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:e.cancelar}},[e._v("Cancelar")]),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{disabled:!e.valid,color:"teal accent-4"},on:{click:e.guardar}},[e._v("Guardar")])],1)],1)],1),e._v(" "),a("v-row",[a("v-col",[a("v-card",[a("v-data-table",{staticClass:"elevation-3",attrs:{headers:e.headers,items:e.clientsdebts,search:e.search,"sort-by":"id"},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}}),e._v(" "),a("v-toolbar",{attrs:{flat:"",color:"indigo"}},[a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e._v(" "),a("v-spacer")],1),e._v(" "),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)]},proxy:!0},{key:"item.clde_amount",fn:function(t){var n=t.item;return[a("v-label",[e._v("$"+e._s(e.formatMoney(n.clde_amount)))])]}},{key:"item.clde_amount_paid",fn:function(t){var n=t.item;return[a("v-label",[e._v("$"+e._s(e.formatMoney(n.clde_amount_paid)))])]}},{key:"item.clde_amount_outstanding",fn:function(t){var n=t.item;return[a("v-label",[e._v("$"+e._s(e.formatMoney(n.clde_amount_outstanding)))])]}},{key:"item.action",fn:function(t){var n=t.item;return[1!=e.boxEnabled?a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"cyan",title:"Agregar pago"},on:{click:function(t){return e.abonar(n)}}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-coin")])],1):e._e(),e._v(" "),a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"cyan",title:"Detalle de pagos"},on:{click:function(t){return e.detalle(n)}}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-parking")])],1)]}}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=s.exports}}]);