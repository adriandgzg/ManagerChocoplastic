(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{54:function(t,e,a){"use strict";a.r(e);var r=a(1),o=a.n(r),i={data:function(){return{prpu_pk:this.$route.params.id,prre_observation:"",valid:!1,alert:!1,alertError:!1,sales:[],stores:[],returns:[],payments:[],saleHeader:"",saleDetail:[],desserts:[],selectReturn:"",selectStore:"",selectpame:"",snackbar:!1,timeout:2e3,subtotal:0,total:0,iva:0,efectivo:0,tarjeta:0,textMsg:"",editado:{prrd_pk:0,prrd_quantity:0},editadoSale:{prre_pk:0,remo_fk:0,prre_observation:""},loading:!1,dialogcredito:!1,dialogcontado:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:"",minNumberRules:[function(t){return!!t||"Requerido."},function(t){return t>0||"El número debe ser mayor o igual a cero"}]}},created:function(){this.createsale(),this.getMotivos()},methods:{formatMoney:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",";try{e=Math.abs(e),e=isNaN(e)?2:e;var o=t<0?"-":"",i=parseInt(t=Math.abs(Number(t)||0).toFixed(e)).toString(),s=i.length>3?i.length%3:0;return o+(s?i.substr(0,s)+r:"")+i.substr(s).replace(/(\d{3})(?=\d)/g,"$1"+r)+(e?a+Math.abs(t-i).toFixed(e).slice(2):"")}catch(t){console.log(t)}},getMotivos:function(){var t=this;axios.get("/return/motives").then((function(e){t.returns=e.data.data,t.selectReturn=t.returns[0]})).catch((function(t){console.log(t)}))},finalizar:function(){""!=this.selectReturn&&null!=this.selectReturn?(this.messageQuestion="¿Está seguro de finalizar la devolución?",this.dialogQuestion=!0):this.normal("Notificación","Debe seleccionar un motivo de devolución","error")},guardaFinalizar:function(){var t=this;this.editadoSale.prre_pk=this.saleHeader.prre_pk,this.editadoSale.remo_fk=this.selectReturn.remo_pk,this.editadoSale.prre_observation=this.prre_observation,axios.post("/provider/returns/update",this.editadoSale).then((function(e){console.log(e),200==e.data.status.code?(t.textMsg="¡Actualizado correctamente!",t.normal("Notificación","¡Actualizado correctamente!","success"),t.$router.push("/purchaselist")):t.normal("Notificación",e.data.status.message,"error")})).catch((function(e){t.errors.push(e)}))},finalizarVenta:function(){var t=this;(console.log(this.total+"-"+(this.efectivo+this.tarjeta)),1!=this.editadoSale.pame_fk||this.total-this.efectivo-this.tarjeta==0)?1==confirm("¿Está seguro de finalizar la devolución?")&&(this.editadoSale.clde_amount=this.total,this.editadoSale.clpa_amount_cash=this.efectivo,this.editadoSale.clpa_amount_transfer=this.tarjeta,axios.post("/clientsales/update",this.editadoSale).then((function(e){console.log(e),200==e.data.code?(t.textMsg="¡Actualizado correctamente!",t.normal("Notificación","¡Actualizado correctamente!","success"),t.$router.push("/sales")):t.normal("Notificación",e.data.status.message,"error")})).catch((function(e){t.errors.push(e)}))):this.normal("Notificación","Los montos de pago deben ser igual al total","error")},onQuantityChange:function(t){var e=this;if(this.editado=Object.assign({},t),console.log(this.editado),this.editado.prrd_quantity>this.editado.prrd_quantity_purchase)return this.textMsg="¡El cantidad devuelta no puede ser mayor a la cantidad comprada!",this.alertError=!0,setTimeout((function(){e.alertError=!1}),3e3),void this.createsale();axios.post("/provider/return/details/update",this.editado).then((function(t){console.log(t),console.log("¡Actualizado correctamente!"),e.getTotal()})).catch((function(t){e.errors.push(t)}))},createsale:function(){var t=this;this.loading=!0,console.log("/provider/returns?prpu_pk="+this.prpu_pk),axios.post("/provider/returns?prpu_pk="+this.prpu_pk).then((function(e){setTimeout((function(){return t.loading=!1}),500),null!=e.data.data?(console.log(e.data),t.sales=e.data.data,t.saleHeader=e.data.data.ProviderReturns,t.desserts=t.sales.ProviderReturnDetails,t.getTotal()):t.normal("Notificación",e.data.status.message,"error")})).catch((function(e){console.log(e),t.normal("Notificación","Error al cargar los datos","error")}))},getTotal:function(){for(var t=0;t<this.desserts.length;t++)this.subtotal=this.subtotal+this.desserts[t].prrd_price*this.desserts[t].prrd_quantity;this.total=this.subtotal+this.iva},borrar:function(t){this.editado=Object.assign({},t),this.dialogQuestionDelete=!0},guardaBorrar:function(){this.delete(),this.dialogQuestionDelete=!1},delete:function(){var t=this;axios.post("/provider/return/details/destroy",this.editado).then((function(e){t.textMsg="¡Eliminado correctamente!",t.normal("Notificación",t.textMsg,"success"),t.createsale()}))},actualizar:function(t){var e=this;this.editado=Object.assign({},t),axios.post("/client_sale_details/update",this.editado).then((function(t){e.textMsg="¡Actualizado correctamente!"})).catch((function(t){e.errors.push(t)}))},normal:function(t,e,a){this.notice=new o.a({title:t,description:e,className:"open-normal",closable:!0,duration:3,type:a})}}},s=a(0),n=Object(s.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-container",[a("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("v-card",{attrs:{color:"white"}},[a("v-card-text",[t._v("\r\n                    Cargando\r\n                    "),a("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),t._v(" "),a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialogQuestionDelete,callback:function(e){t.dialogQuestionDelete=e},expression:"dialogQuestionDelete"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Alerta")]),t._v(" "),a("v-card-text",[t._v("¿Está seguro de borrar el registro?")]),t._v(" "),a("v-card-actions",[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.dialogQuestionDelete=!1}}},[t._v("Cancelar")]),t._v(" "),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:t.guardaBorrar}},[t._v("Continuar")])],1)],1)],1),t._v(" "),a("v-alert",{attrs:{dismissible:"",transition:"fade-transition",type:"info"},model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}},[t._v("\r\n            "+t._s(t.textMsg)+"\r\n        ")]),t._v(" "),a("v-snackbar",{attrs:{color:"#000000",timeout:t.timeout},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\r\n            "+t._s(t.textMsg)+"\r\n            "),a("v-btn",{attrs:{color:"blue",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\r\n                Cerrar\r\n            ")])],1),t._v(" "),a("v-row",[a("v-col",[a("v-card",[a("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-card-title",{staticClass:"subheading font-weight-bold"},[a("H2",[t._v(t._s(t.saleHeader.prpu_identifier))])],1),t._v(" "),a("v-divider"),t._v(" "),a("v-row",[a("v-col",{attrs:{cols:"4"}},[a("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[a("v-label",[a("h4",[t._v("Cliente:")]),t._v(" "+t._s(t.saleHeader.prov_name)+"\r\n                                    ")])],1)],1),t._v(" "),a("v-col",{attrs:{cols:"4"}},[a("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[a("v-label",[a("h4",[t._v("Sucursal:")]),t._v(" "+t._s(t.saleHeader.stor_name)+"\r\n                                    ")])],1)],1),t._v(" "),a("v-col",{attrs:{cols:"4"}},[a("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[a("v-label",[a("h4",[t._v("Fecha:")]),t._v(" "+t._s(t.saleHeader.created_at)+"\r\n                                    ")])],1)],1)],1),t._v(" "),a("v-row",[a("v-col",{attrs:{cols:"4"}},[a("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[a("v-combobox",{attrs:{required:"",items:t.returns,label:"Motivo de devolución","item-text":"remo_description","item-value":"remo_pk",filled:"",chips:"",placeholder:"Seleccionar Cliente"},model:{value:t.selectReturn,callback:function(e){t.selectReturn=e},expression:"selectReturn"}})],1)],1),t._v(" "),a("v-col",{attrs:{cols:"8"}},[a("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[a("v-textarea",{attrs:{"auto-grow":"",filled:"",color:"deep-purple",label:"Observaciones",rows:"3"},model:{value:t.prre_observation,callback:function(e){t.prre_observation=e},expression:"prre_observation"}})],1)],1)],1)],1)],1),t._v(" "),a("v-card",{attrs:{justify:"end"}},[a("v-btn",{attrs:{disabled:!t.valid,dark:"",color:"success"},on:{click:t.finalizar}},[t._v("FINALIZAR")])],1)],1)],1),t._v(" "),a("v-row",[a("v-alert",{attrs:{dismissible:"",transition:"fade-transition",type:"error",timeout:"400"},model:{value:t.alertError,callback:function(e){t.alertError=e},expression:"alertError"}},[t._v("\r\n                "+t._s(t.textMsg)+"\r\n            ")]),t._v(" "),a("v-col",[a("v-card",[a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("ID")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Producto")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Unidad Medida")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Cantidad")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Cantidad Devuelta")]),t._v(" "),a("th"),t._v(" "),a("th")])]),t._v(" "),a("tbody",t._l(t.desserts,(function(e){return a("tr",{key:e.prod_name},[a("td",[t._v(t._s(e.prod_identifier))]),t._v(" "),a("td",[t._v(t._s(e.prod_name))]),t._v(" "),a("td",[t._v(t._s(e.meas_name))]),t._v(" "),a("td",[t._v("\r\n                                        "+t._s(e.prrd_quantity_purchase)+"\r\n                                    ")]),a("td",[a("v-text-field",{attrs:{label:"",required:""},on:{change:function(a){return t.onQuantityChange(e)}},model:{value:e.prrd_quantity,callback:function(a){t.$set(e,"prrd_quantity",a)},expression:"item.prrd_quantity"}})],1),t._v(" "),a("td",[a("v-icon",{attrs:{small:""},on:{click:function(a){return t.borrar(e)}}},[t._v("mdi-delete")])],1)])})),0),t._v(" "),a("tfoot")]},proxy:!0}])})],1)],1)],1),t._v(" "),a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialogQuestion,callback:function(e){t.dialogQuestion=e},expression:"dialogQuestion"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Información")]),t._v(" "),a("v-card-text",[t._v(t._s(t.messageQuestion)+".")]),t._v(" "),a("v-card-actions",[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.dialogQuestion=!1}}},[t._v("Cancelar")]),t._v(" "),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:t.guardaFinalizar}},[t._v("Continuar")])],1)],1)],1),t._v(" "),a("v-dialog",{attrs:{"max-width":"500"},model:{value:t.dialogcredito,callback:function(e){t.dialogcredito=e},expression:"dialogcredito"}},[a("v-card",[a("v-card-title",[t._v("Crédito:")]),t._v(" "),a("v-card-text",[a("span",{staticClass:"subheading font-weight-bold"},[t._v("Forma de Pago:")]),t._v(" "),a("v-text-field",{attrs:{label:"Efectivo: ",prefix:"$",type:"number"},model:{value:t.efectivo,callback:function(e){t.efectivo=e},expression:"efectivo"}}),t._v(" "),a("v-text-field",{attrs:{label:"Transferencia: ",prefix:"$",type:"number"},model:{value:t.tarjeta,callback:function(e){t.tarjeta=e},expression:"tarjeta"}}),t._v(" "),a("br"),t._v(" "),a("tr",[a("td",[t._v("Subtotal")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.subtotal)))]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Total I.V.A.")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.iva)))]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Total")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.total)))])]),t._v(" "),a("tr",[a("td",[t._v("Total Crédito")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.total-t.efectivo-t.tarjeta)))])]),t._v(" "),a("v-btn",{on:{click:function(e){t.dialogcredito=!t.dialogcredito}}},[t._v("Cancelar")]),t._v(" "),a("v-btn",{attrs:{color:"warning"},on:{click:t.finalizarVenta}},[t._v("Confirmar")])],1)],1)],1),t._v(" "),a("v-dialog",{attrs:{"max-width":"500"},model:{value:t.dialogcontado,callback:function(e){t.dialogcontado=e},expression:"dialogcontado"}},[a("v-card",[a("v-card-title",[t._v("Contado")]),t._v(" "),a("v-card-text",[a("span",{staticClass:"subheading font-weight-bold"},[t._v("Forma de Pago:")]),t._v(" "),a("v-text-field",{attrs:{label:"Efectivo: ",required:"",rules:t.minNumberRules,prefix:"$",type:"number"},model:{value:t.efectivo,callback:function(e){t.efectivo=e},expression:"efectivo"}}),t._v(" "),a("v-text-field",{attrs:{label:"Transferencia: ",required:"",rules:t.minNumberRules,prefix:"$",type:"number"},model:{value:t.tarjeta,callback:function(e){t.tarjeta=e},expression:"tarjeta"}}),t._v(" "),a("br"),t._v(" "),a("tr",[a("td",[t._v("Subtotal")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.subtotal)))]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Total I.V.A.")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.iva)))]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Total")]),t._v(" "),a("td",[t._v(" $"+t._s(t.formatMoney(t.total)))])]),t._v(" "),a("v-btn",{on:{click:function(e){t.dialogcontado=!t.dialogcontado}}},[t._v("Cancelar")]),t._v(" "),a("v-btn",{attrs:{color:"success"},on:{click:t.finalizarVenta}},[t._v("Confirmar")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=n.exports}}]);