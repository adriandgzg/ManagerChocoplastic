(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{33:function(e,t,i){"use strict";i.r(t);var a=i(1),n=i.n(a),l={data:function(){return{headers:[{text:"Inden",value:"clie_identifier",width:"10%"},{text:"Nombre",value:"clie_name"},{text:"Monto Deuda",value:"clde_amount_outstanding"},{text:"RFC",value:"clie_rfc"},{text:"Teléfono",value:"clie_phone"},{text:"Email",value:"clie_email"},{text:"Dirección",value:"clie_addres"},{text:"CP",value:"clie_cp"},{text:"Ciudad",value:"clie_city"},{text:"Estado",value:"feen_name"},{text:"Estatus",value:"status"},{text:"",value:"action"}],select:0,editado:{clie_pk:0,feen_fk:0,clie_identifier:"",clie_name:"",clie_rfc:"",clie_phone:"",clie_email:"",clie_addres:"",clie_cp:"",clie_city:"",clie_status:0},defaultItem:{clie_pk:0,feen_fk:0,clie_identifier:"",clie_name:"",clie_rfc:"",clie_phone:"",clie_email:"",clie_addres:"",clie_cp:"",clie_city:"",clie_status:0},editedIndex:-1,clientes:[],entities:[],search:"",dialog:!1,snackbar:!1,timeout:2e3,textMsg:"",valid:!1,validProvider:!1,estado:!0,folioRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=10||"Min 10 caracter"}],nameRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=3||"Min 3 caracteres"}],phoneRules:[function(e){return!!e||"Requerido."},function(e){return e&&10==e.length||"Requiere 10 caracteres"}],loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:""}},created:function(){this.getClients(),this.getEntities()},methods:{getClients:function(){var e=this;this.loading=!0,axios.get("/clientlist").then((function(t){setTimeout((function(){return e.loading=!1}),500),e.clientes=t.data.data})).catch((function(t){console.log(t),e.normal("Notificación","Error al cargar los datos","error")}))},getEntities:function(){var e=this;axios.get("/entitieslist").then((function(t){console.log(t.data),e.entities=t.data.data})).catch((function(e){console.log(e)}))},cancelar:function(){this.dialog=!1,this.editado=Object.assign({},this.defaultItem),this.editedIndex=-1},edita:function(e){this.editedIndex=this.clientes.indexOf(e),this.editado=Object.assign({},e),this.select=this.editado.feen_fk,this.estado=this.editado.clie_status,this.dialog=!0},guardar:function(){1==this.estado?this.editado.clie_status=1:this.editado.clie_status=0,this.editedIndex>-1?(this.editado.feen_fk=this.select,this.editar()):(this.editado.feen_fk=this.select.feen_pk,this.alta()),this.cancelar()},alta:function(){var e=this;axios.post("/clients/add",this.editado).then((function(t){e.textMsg="Guardado Correctamente!",e.normal("Notificación",e.textMsg,"success"),e.getClients()}))},editar:function(){var e=this;axios.post("/clients/update",this.editado).then((function(t){e.textMsg="Modificado Correctamente!",e.normal("Notificación",e.textMsg,"success"),e.getClients()}))},borrar:function(e){this.clientes.indexOf(e);this.editado=Object.assign({},e),this.dialogQuestionDelete=!0},guardaBorrar:function(){this.delete(),this.dialogQuestionDelete=!1},delete:function(){var e=this;axios.post("/clients/delete",this.editado).then((function(t){e.textMsg="¡Eliminado Correctamente!",e.normal("Notificación",e.textMsg,"success"),e.getClients()}))},formatMoney:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",";try{t=Math.abs(t),t=isNaN(t)?2:t;var n=e<0?"-":"",l=parseInt(e=Math.abs(Number(e)||0).toFixed(t)).toString(),s=l.length>3?l.length%3:0;return n+(s?l.substr(0,s)+a:"")+l.substr(s).replace(/(\d{3})(?=\d)/g,"$1"+a)+(t?i+Math.abs(e-l).toFixed(t).slice(2):"")}catch(e){console.log(e)}},normal:function(e,t,i){this.notice=new n.a({title:e,description:t,className:"open-normal",closable:!0,duration:3,type:i})}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo Registro":"Editar Registro"}}},s=i(0),o=Object(s.a)(l,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-app",[i("v-container",[i("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[i("v-card",{attrs:{color:"white"}},[i("v-card-text",[e._v("\n          Cargando\n          "),i("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),e._v(" "),i("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:e.dialogQuestionDelete,callback:function(t){e.dialogQuestionDelete=t},expression:"dialogQuestionDelete"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[e._v("Alerta")]),e._v(" "),i("v-card-text",[e._v("¿Está seguro de borrar el registro?")]),e._v(" "),i("v-card-actions",[i("v-spacer"),e._v(" "),i("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(t){e.dialogQuestionDelete=!1}}},[e._v("Cancelar")]),e._v(" "),i("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:e.guardaBorrar}},[e._v("Continuar")])],1)],1)],1),e._v(" "),i("v-snackbar",{attrs:{color:"#000000",timeout:e.timeout},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n      "+e._s(e.textMsg)+"\n      "),i("v-btn",{attrs:{color:"blue",text:""},on:{click:function(t){e.snackbar=!1}}},[e._v("Cerrar")])],1),e._v(" "),i("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[i("v-card",[i("v-card-title",{staticClass:"cyan white--text"},[i("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),e._v(" "),i("v-form",{model:{value:e.validProvider,callback:function(t){e.validProvider=t},expression:"validProvider"}},[i("v-card-text",[i("v-text-field",{attrs:{label:"Nombre",maxlength:"300",rules:e.nameRules,required:""},model:{value:e.editado.clie_name,callback:function(t){e.$set(e.editado,"clie_name",t)},expression:"editado.clie_name"}}),e._v(" "),i("v-text-field",{attrs:{label:"Identificar",maxlength:"300",rules:e.nameRules,required:""},model:{value:e.editado.clie_identifier,callback:function(t){e.$set(e.editado,"clie_identifier",t)},expression:"editado.clie_identifier"}}),e._v(" "),i("v-text-field",{attrs:{label:"RFC",maxlength:"15",rules:e.nameRules,required:""},model:{value:e.editado.clie_rfc,callback:function(t){e.$set(e.editado,"clie_rfc",t)},expression:"editado.clie_rfc"}}),e._v(" "),i("v-text-field",{attrs:{label:"Teléfono",maxlength:"10",rules:e.phoneRules,required:""},model:{value:e.editado.clie_phone,callback:function(t){e.$set(e.editado,"clie_phone",t)},expression:"editado.clie_phone"}}),e._v(" "),i("v-text-field",{attrs:{label:"Correo Electrónico",maxlength:"50",rules:e.nameRules,required:""},model:{value:e.editado.clie_email,callback:function(t){e.$set(e.editado,"clie_email",t)},expression:"editado.clie_email"}}),e._v(" "),i("v-text-field",{attrs:{label:"Dirección",maxlength:"1000",rules:e.nameRules,required:""},model:{value:e.editado.clie_addres,callback:function(t){e.$set(e.editado,"clie_addres",t)},expression:"editado.clie_addres"}}),e._v(" "),i("v-text-field",{attrs:{label:"C.P.",maxlength:"5",rules:e.nameRules,required:""},model:{value:e.editado.clie_cp,callback:function(t){e.$set(e.editado,"clie_cp",t)},expression:"editado.clie_cp"}}),e._v(" "),i("v-text-field",{attrs:{label:"Ciudad",maxlength:"300",rules:e.nameRules,required:""},model:{value:e.editado.clie_city,callback:function(t){e.$set(e.editado,"clie_city",t)},expression:"editado.clie_city"}}),e._v(" "),i("v-switch",{model:{value:e.estado,callback:function(t){e.estado=t},expression:"estado"}}),e._v(" "),i("v-select",{attrs:{items:e.entities,label:"Selecione un estado","single-line":"","item-text":"feen_name","item-value":"feen_pk","return-object":"","persistent-hint":""},model:{value:e.select,callback:function(t){e.select=t},expression:"select"}})],1),e._v(" "),i("v-card-actions",[i("v-spacer"),e._v(" "),i("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:e.cancelar}},[e._v("Cancelar")]),e._v(" "),i("v-btn",{staticClass:"ma-2 white--text",attrs:{disabled:!e.validProvider,color:"teal accent-4"},on:{click:e.guardar}},[e._v("Guardar")])],1)],1)],1)],1),e._v(" "),i("v-row",[i("v-col",[i("v-card",[i("v-data-table",{staticClass:"elevation-3",attrs:{headers:e.headers,items:e.clientes,search:e.search,"sort-by":"id"},scopedSlots:e._u([{key:"top",fn:function(){return[i("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}}),e._v(" "),i("v-toolbar",{attrs:{flat:"",color:"indigo"},scopedSlots:e._u([{key:"extension",fn:function(){return[i("v-btn",{attrs:{fab:"",color:"cyan accent-2",bottom:"",left:"",absolute:""},on:{click:function(t){e.dialog=!e.dialog}}},[i("v-icon",[e._v("mdi-plus")])],1)]},proxy:!0}])},[e._v(" "),i("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e._v(" "),i("v-spacer")],1),e._v(" "),i("v-col",{attrs:{cols:"12",sm:"12"}},[i("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)]},proxy:!0},{key:"item.clde_amount_outstanding",fn:function(t){var a=t.item;return[i("v-label",[e._v("$"+e._s(e.formatMoney(a.clde_amount_outstanding)))])]}},{key:"item.status",fn:function(t){return[1==t.item.clie_status?i("v-chip",{attrs:{color:"green",dark:""}},[e._v("Activo")]):i("v-chip",{attrs:{color:"red",dark:""}},[e._v("Inactivo")])]}},{key:"item.action",fn:function(t){var a=t.item;return[i("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"cyan"},on:{click:function(t){return e.edita(a)}}},[i("v-icon",{attrs:{dark:""}},[e._v("mdi-pencil")])],1),e._v(" "),i("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"error"},on:{click:function(t){return e.borrar(a)}}},[i("v-icon",{attrs:{dark:""}},[e._v("mdi-delete")])],1)]}}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=o.exports}}]);