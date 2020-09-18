(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{45:function(e,t,a){"use strict";a.r(t);var i={data:function(){return{headers:[{text:"ID",value:"meas_pk",width:"10%"},{text:"Nombre",value:"meas_name"},{text:"Abrev",value:"meas_abbreviation"},{text:"Estatus",value:"status"},{text:"",value:"action",width:"20%"}],select:0,principal:!1,estado:!0,editado:{meas_pk:0,meas_name:"",meas_abbreviation:"",meas_status:0},defaultItem:{meas_pk:0,meas_name:"",meas_abbreviation:"",meas_status:0},editedIndex:-1,measurements:[],entities:[],search:"",dialog:!1,snackbar:!1,timeout:2e3,textMsg:"",valid:!1,validProvider:!1,dialogSuccess:!1,folioRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=10||"Min 10 caracter"}],nameRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=3||"Min 3 caracteres"}],phoneRules:[function(e){return!!e||"Requerido."},function(e){return e&&10==e.length||"Requiere 10 caracteres"}],loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:""}},created:function(){this.getMeasurements()},methods:{getMeasurements:function(){var e=this;this.loading=!0,axios.get("/measurementsList").then((function(t){e.measurements=t.data.data,setTimeout((function(){return e.loading=!1}),500)})).catch((function(t){console.log(t),e.normal("Notificación","Error al cargar los datos","error")}))},cancelar:function(){this.dialog=!1,this.editado=Object.assign({},this.defaultItem),this.editedIndex=-1},edita:function(e){this.editedIndex=this.measurements.indexOf(e),this.editado=Object.assign({},e),this.estado=this.editado.meas_status,this.dialog=!0},guardar:function(){1==this.estado?this.editado.meas_status=1:this.editado.meas_status=0,this.editedIndex>-1?this.editar():this.alta(),this.cancelar()},alta:function(){var e=this;axios.post("/measurements/add",this.editado).then((function(t){e.dialogSuccess=!0,e.textMsg="¡Alta exitosa!",e.getMeasurements()}))},editar:function(){var e=this;axios.put("/measurements/update",this.editado).then((function(t){e.dialogSuccess=!0,e.textMsg="¡Actualización Exitosa!",e.getMeasurements()}))},borrar:function(e){this.measurements.indexOf(e);this.editado=Object.assign({},e),this.dialogQuestionDelete=!0},guardaBorrar:function(){this.delete(),this.dialogQuestionDelete=!1},delete:function(){var e=this;axios.put("/measurements/delete",this.editado).then((function(t){e.textMsg="¡Eliminado correctamente!",e.normal("Notificación",e.textMsg,"success"),e.getMeasurements()}))}},watch:{dialogSuccess:function(e){var t=this;e&&setTimeout((function(){return t.dialogSuccess=!1}),4e3)}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo Registro":"Editar Registro"}}},s=a(0),r=Object(s.a)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-container",[a("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[a("v-card",{attrs:{color:"white"}},[a("v-card-text",[e._v("\n          Cargando\n          "),a("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),e._v(" "),a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:e.dialogQuestionDelete,callback:function(t){e.dialogQuestionDelete=t},expression:"dialogQuestionDelete"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("Alerta")]),e._v(" "),a("v-card-text",[e._v("¿Está seguro de borrar el registro?")]),e._v(" "),a("v-card-actions",[a("v-spacer"),e._v(" "),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(t){e.dialogQuestionDelete=!1}}},[e._v("Cancelar")]),e._v(" "),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:e.guardaBorrar}},[e._v("Continuar")])],1)],1)],1),e._v(" "),a("v-dialog",{attrs:{width:"640","overlay-color":"white",persistent:""},model:{value:e.dialogSuccess,callback:function(t){e.dialogSuccess=t},expression:"dialogSuccess"}},[a("v-card",{attrs:{color:"primary"}},[a("v-alert",{attrs:{color:"success",border:"left","colored-border":"",icon:"mdi-checkbox-marked-circle",prominent:""}},[e._v("\n          "+e._s(e.textMsg)+"\n        ")])],1)],1),e._v(" "),a("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"cyan white--text"},[a("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),e._v(" "),a("v-form",{model:{value:e.validProvider,callback:function(t){e.validProvider=t},expression:"validProvider"}},[a("v-card-text",[a("v-text-field",{attrs:{label:"Nombre",maxlength:"300",rules:e.nameRules,required:""},model:{value:e.editado.meas_name,callback:function(t){e.$set(e.editado,"meas_name",t)},expression:"editado.meas_name"}}),e._v(" "),a("v-text-field",{attrs:{label:"Abreviación",maxlength:"300",rules:e.nameRules,required:""},model:{value:e.editado.meas_abbreviation,callback:function(t){e.$set(e.editado,"meas_abbreviation",t)},expression:"editado.meas_abbreviation"}}),e._v(" "),a("span",[e._v("Activo/Inactivo")]),e._v(" "),a("v-switch",{model:{value:e.estado,callback:function(t){e.estado=t},expression:"estado"}})],1),e._v(" "),a("v-card-actions",[a("v-spacer"),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:e.cancelar}},[e._v("Cancelar")]),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{disabled:!e.validProvider,color:"teal accent-4"},on:{click:e.guardar}},[e._v("Guardar")])],1)],1)],1)],1),e._v(" "),a("v-row",[a("v-col",[a("v-card",[a("v-data-table",{staticClass:"elevation-3",attrs:{headers:e.headers,items:e.measurements,search:e.search,"sort-by":"id"},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}}),e._v(" "),a("v-toolbar",{attrs:{flat:"",color:"indigo"},scopedSlots:e._u([{key:"extension",fn:function(){return[a("v-btn",{attrs:{fab:"",color:"cyan accent-2",bottom:"",left:"",absolute:""},on:{click:function(t){e.dialog=!e.dialog}}},[a("v-icon",[e._v("mdi-plus")])],1)]},proxy:!0}])},[e._v(" "),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e._v(" "),a("v-spacer")],1),e._v(" "),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)]},proxy:!0},{key:"item.status",fn:function(t){return[1==t.item.meas_status?a("v-chip",{attrs:{color:"green",dark:""}},[e._v("  Activo  ")]):a("v-chip",{attrs:{color:"red",dark:""}},[e._v("Inactivo")])]}},{key:"item.action",fn:function(t){var i=t.item;return[a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"cyan"},on:{click:function(t){return e.edita(i)}}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-pencil")])],1),e._v(" "),a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"error"},on:{click:function(t){return e.borrar(i)}}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-delete")])],1)]}}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=r.exports}}]);