(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{40:function(t,e,a){"use strict";a.r(e);var o=a(1),i=a.n(o),s={data:function(){return{clor_pk:this.$route.params.id,valid:!1,sales:[],stores:[],clients:[],payments:[],paymentsOriginal:[],saleHeader:"",saleDetail:[],desserts:[],selectClient:"",selectStore:"",selectpame:"",snackbar:!1,timeout:2e3,subtotal:0,total:0,iva:0,efectivo:0,tarjeta:0,textMsg:"",editado:{clod_pk:0,clod_quantity:0},editadoSale:{clsa_pk:0,clie_fk:0,pame_fk:0,stor_fk:0,clde_amount:0,clpa_amount_cash:0,clpa_amount_transfer:0},dialogcredito:!1,dialogcontado:!1,loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:"",minNumberRules:[function(t){return!!t||"Requerido."},function(t){return t>0||"El número debe ser mayor o igual a cero"}]}},created:function(){this.createsale(),this.getClients(),this.getPaymentShow(),this.getStores()},methods:{formatMoney:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",";try{e=Math.abs(e),e=isNaN(e)?2:e;var i=t<0?"-":"",s=parseInt(t=Math.abs(Number(t)||0).toFixed(e)).toString(),n=s.length>3?s.length%3:0;return i+(n?s.substr(0,n)+o:"")+s.substr(n).replace(/(\d{3})(?=\d)/g,"$1"+o)+(e?a+Math.abs(t-s).toFixed(e).slice(2):"")}catch(t){console.log(t)}},formatPrice:function(t){return(t/1).toFixed(2).replace(",",".").toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")},onQuantityChange:function(t){var e=this;this.editado=Object.assign({},t),axios.post("/client_sale_details/update",this.editado).then((function(t){e.textMsg="¡Actualizado correctamente!",console.log("¡Actualizado correctamente!"),e.getTotal()})).catch((function(t){e.errors.push(t)}))},onChangeClient:function(){1==this.selectClient.clie_pk?(console.log("getPaymentShow"),this.getPaymentShow()):(console.log("getPayment"),this.getPayment())},finalizar:function(){console.log(this.selectClient),this.efectivo=0,this.tarjeta=0,""!=this.selectClient&&null!=this.selectClient?""!=this.selectpame&&null!=this.selectpame?""!=this.selectStore&&null!=this.selectStore?(this.editadoSale.clsa_pk=this.saleHeader.clsa_pk,this.editadoSale.clie_fk=this.selectClient.clie_pk,this.editadoSale.pame_fk=this.selectpame.pame_pk,this.editadoSale.stor_fk=this.selectStore.stor_pk,1==this.editadoSale.pame_fk?this.dialogcontado=!0:this.dialogcredito=!0):this.normal("Alerta","Debe seleccionar una sucursal","error"):this.normal("Alerta","Debe seleccionar un método de pago","error"):this.normal("Alerta","Debe seleccionar un cliente","error")},finalizarVenta:function(){var t=this;(console.log(this.total+"-"+(this.efectivo+this.tarjeta)),1!=this.editadoSale.pame_fk||this.total-this.efectivo-this.tarjeta==0)?1==confirm("¿Está seguro de finalizar la venta?")&&(this.editadoSale.clde_amount=this.total,this.editadoSale.clpa_amount_cash=this.efectivo,this.editadoSale.clpa_amount_transfer=this.tarjeta,axios.post("/clientsales/update",this.editadoSale).then((function(e){console.log(e),200==e.data.code?(t.textMsg="¡Actualizado correctamente!",t.normal("Notificación","¡Actualizado correctamente!","success"),t.$router.push("/sales")):t.normal("Notificación",e.data.message,"error")})).catch((function(e){t.errors.push(e)}))):this.normal("Notificación","Los montos de pago deben ser igual al total","success")},createsale:function(){var t=this;this.loading=!0,axios.get("/client/orders/"+this.clor_pk).then((function(e){setTimeout((function(){return t.loading=!1}),2e3),null!=e.data.data?(console.log(e.data),t.sales=e.data.data,t.saleHeader=e.data.data.order,t.desserts=t.sales.order_details,t.getTotal()):t.normal("Notificación",e.data.status.message,"error")})).catch((function(e){console.log(e),t.normal("Notificación","Error al cargar los datos","error")}))},getTotal:function(){for(var t=0;t<this.desserts.length;t++)this.subtotal=this.subtotal+this.desserts[t].clod_price*this.desserts[t].clod_quantity;this.total=this.subtotal+this.iva},getClients:function(){var t=this;axios.get("/clientsget").then((function(e){t.clients=e.data.data,t.selectClient=t.clients[0]})).catch((function(t){console.log(t)}))},getPayment:function(){var t=this;axios.get("/paymentmethodsget").then((function(e){t.payments=e.data.data})).catch((function(t){console.log(t)}))},getPaymentShow:function(){var t=this;axios.get("/paymentmethodsshow/1").then((function(e){t.payments=e.data.data})).catch((function(t){console.log(t)}))},getStores:function(){var t=this;axios.get("/storeget").then((function(e){t.stores=e.data.data})).catch((function(t){console.log(t)}))},borrar:function(t){this.editado=Object.assign({},t),1==confirm("¿Está seguro de borrar el registro?")&&(this.editado.clod_pk=t.clod_pk,this.delete())},delete:function(){var t=this;axios.post("/client_sale_details/destroy",this.editado).then((function(e){t.textMsg="¡Eliminado correctamente!",t.normal("Notificación",t.textMsg,"success"),t.createsale()}))},actualizar:function(t){var e=this;this.editado=Object.assign({},t),axios.post("/client_sale_details/update",this.editado).then((function(t){e.textMsg="¡Actualizado correctamente!",e.normal("Notificación",e.textMsg,"success")})).catch((function(t){e.errors.push(t)}))},normal:function(t,e,a){this.notice=new i.a({title:t,description:e,className:"open-normal",closable:!0,duration:3,type:a})}}},n=a(0),l=Object(n.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-container",[a("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("v-card",{attrs:{color:"white"}},[a("v-card-text",[t._v("\r\n                    Cargando\r\n                    "),a("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),t._v(" "),a("v-snackbar",{attrs:{color:"#000000",timeout:t.timeout},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\r\n            "+t._s(t.textMsg)+"\r\n            "),a("v-btn",{attrs:{color:"blue",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\r\n                Cerrar\r\n            ")])],1),t._v(" "),a("v-row",[a("v-col",[a("v-card",[a("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-card-title",{staticClass:"subheading font-weight-bold"},[t._v("No. Pedido: "+t._s(t.saleHeader.clor_identifier))]),t._v(" "),a("v-divider"),t._v(" "),a("v-row",[a("v-col",{attrs:{cols:"4"}},[a("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[a("v-label",[a("h4",[t._v("Cliente:")]),t._v(" "+t._s(t.saleHeader.clie_name)+"\r\n                                    ")])],1)],1),t._v(" "),a("v-col",{attrs:{cols:"4"}},[a("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[a("v-label",[a("h4",[t._v("Vendedor:")]),t._v(t._s(t.saleHeader.user)+"\r\n                                    ")])],1)],1),t._v(" "),a("v-col",{attrs:{cols:"4"}},[a("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[a("v-label",[a("h4",[t._v("Sucursal:")]),t._v(" "+t._s(t.saleHeader.stor_name)+"\r\n                                    ")])],1)],1)],1)],1)],1)],1)],1),t._v(" "),a("v-row",[a("v-col",[a("v-card",[a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("ID")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Producto")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Unidad Medida")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Cantidad")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Precio")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Importe")]),t._v(" "),a("th"),t._v(" "),a("th")])]),t._v(" "),a("tbody",[t._l(t.desserts,(function(e){return a("tr",{key:e.prod_name},[a("td",[t._v(t._s(e.prod_identifier))]),t._v(" "),a("td",[t._v(t._s(e.prod_name))]),t._v(" "),a("td",[t._v(t._s(e.meas_name))]),t._v(" "),a("td",[t._v(t._s(e.clod_quantity))]),t._v(" "),a("td",[t._v("$"+t._s(t.formatMoney(e.clod_price)))]),t._v(" "),a("td",[t._v("$"+t._s(t.formatMoney(e.clod_quantity*e.clod_price)))]),t._v(" "),a("td")])})),t._v(" "),a("tr",[a("td"),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td",[t._v("Subtotal")]),t._v(" "),a("td",[t._v("$"+t._s(t.formatMoney(t.subtotal)))]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td"),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td",[t._v("I.V.A.")]),t._v(" "),a("td",[t._v("$"+t._s(t.formatMoney(t.iva)))]),t._v(" "),a("td")])],2),t._v(" "),a("tfoot",[a("tr",[a("td"),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td",[t._v("Total")]),t._v(" "),a("td",[t._v("$"+t._s(t.formatMoney(t.total)))]),t._v(" "),a("td")])])]},proxy:!0}])})],1)],1)],1),t._v(" "),a("v-dialog",{attrs:{"max-width":"500"},model:{value:t.dialogcredito,callback:function(e){t.dialogcredito=e},expression:"dialogcredito"}},[a("v-card",[a("v-card-title",[t._v("Crédito:")]),t._v(" "),a("v-card-text",[a("span",{staticClass:"subheading font-weight-bold"},[t._v("Forma de Pago:")]),t._v(" "),a("v-text-field",{attrs:{label:"Efectivo: ",prefix:"$",type:"number"},model:{value:t.efectivo,callback:function(e){t.efectivo=e},expression:"efectivo"}}),t._v(" "),a("v-text-field",{attrs:{label:"Transferencia: ",prefix:"$",type:"number"},model:{value:t.tarjeta,callback:function(e){t.tarjeta=e},expression:"tarjeta"}}),t._v(" "),a("br"),t._v(" "),a("tr",[a("td",[t._v("Subtotal")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.subtotal)))]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Total I.V.A.")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.iva)))]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Total")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.total)))])]),t._v(" "),a("tr",[a("td",[t._v("Total Crédito")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.total-t.efectivo-t.tarjeta)))])]),t._v(" "),a("v-btn",{on:{click:function(e){t.dialogcredito=!t.dialogcredito}}},[t._v("Cancelar")]),t._v(" "),a("v-btn",{attrs:{color:"warning"},on:{click:t.finalizarVenta}},[t._v("Confirmar")])],1)],1)],1),t._v(" "),a("v-dialog",{attrs:{"max-width":"500"},model:{value:t.dialogcontado,callback:function(e){t.dialogcontado=e},expression:"dialogcontado"}},[a("v-card",[a("v-card-title",[t._v("Contado")]),t._v(" "),a("v-card-text",[a("span",{staticClass:"subheading font-weight-bold"},[t._v("Forma de Pago:")]),t._v(" "),a("v-text-field",{attrs:{label:"Efectivo: ",required:"",rules:t.minNumberRules,prefix:"$",type:"number"},model:{value:t.efectivo,callback:function(e){t.efectivo=e},expression:"efectivo"}}),t._v(" "),a("v-text-field",{attrs:{label:"Transferencia: ",required:"",rules:t.minNumberRules,prefix:"$",type:"number"},model:{value:t.tarjeta,callback:function(e){t.tarjeta=e},expression:"tarjeta"}}),t._v(" "),a("br"),t._v(" "),a("tr",[a("td",[t._v("Subtotal")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.subtotal)))]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Total I.V.A.")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.iva)))]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Total")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.total)))])]),t._v(" "),a("v-btn",{on:{click:function(e){t.dialogcontado=!t.dialogcontado}}},[t._v("Cancelar")]),t._v(" "),a("v-btn",{attrs:{color:"success"},on:{click:t.finalizarVenta}},[t._v("Confirmar")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=l.exports}}]);