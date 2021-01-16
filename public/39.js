(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{66:function(t,e,a){"use strict";a.r(e);var i={data:function(){return{headers:[{text:"ID",value:"stor_pk",width:"10%"},{text:"Nombre",value:"stor_name"},{text:"Teléfono",value:"stor_phone"},{text:"Dirección",value:"stor_addres"},{text:"Matriz",value:"stor_main"},{text:"Estatus",value:"status"},{text:"",value:"action",width:"20%"}],select:0,principal:!1,estado:!1,editado:{stor_pk:0,stor_name:"",stor_phone:"",stor_addres:"",stor_main:0,stor_status:0},defaultItem:{stor_pk:0,stor_name:"",stor_phone:"",stor_addres:"",stor_main:0,stor_status:0},editedIndex:-1,stores:[],entities:[],search:"",dialog:!1,snackbar:!1,timeout:2e3,textMsg:"",valid:!1,validProvider:!1,folioRules:[function(t){return!!t||"Requerido."},function(t){return t&&t.length>=10||"Min 10 caracter"}],nameRules:[function(t){return!!t||"Requerido."},function(t){return t&&t.length>=3||"Min 3 caracteres"}],phoneRules:[function(t){return!!t||"Requerido."},function(t){return t&&10==t.length||"Requiere 10 caracteres"}],loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:""}},created:function(){this.getStores(),this.getEntities()},methods:{getStores:function(){var t=this;this.loading=!0,axios.get("/storelist").then((function(e){setTimeout((function(){return t.loading=!1}),500),console.log(e.data),t.stores=e.data.data})).catch((function(e){console.log(e),t.normal("Notificación","Error al cargar los datos","error")}))},getEntities:function(){var t=this;axios.get("/entitieslist").then((function(e){console.log(e.data),t.entities=e.data.data})).catch((function(t){console.log(t)}))},cancelar:function(){this.dialog=!1,this.editado=Object.assign({},this.defaultItem),this.editedIndex=-1},edita:function(t){this.editedIndex=this.stores.indexOf(t),this.editado=Object.assign({},t),this.principal=this.editado.stor_main,this.estado=this.editado.stor_status,this.dialog=!0},guardar:function(){1==this.principal?this.editado.stor_main=1:this.editado.stor_main=0,1==this.estado?this.editado.stor_status=1:this.editado.stor_status=0,this.editedIndex>-1?this.editar():this.alta(),this.cancelar()},alta:function(){var t=this;axios.post("/store/add",this.editado).then((function(e){t.snackbar=!0,t.textMsg="¡Alta exitosa!",t.getStores()}))},editar:function(){var t=this;axios.post("/store/update",this.editado).then((function(e){t.snackbar=!0,t.textMsg="¡Actualización Exitosa!",t.getStores()}))},borrar:function(t){this.stores.indexOf(t);this.editado=Object.assign({},t),this.dialogQuestionDelete=!0},guardaBorrar:function(){this.delete(),this.dialogQuestionDelete=!1},delete:function(){var t=this;axios.post("/store/delete",this.editado).then((function(e){t.snackbar=!0,t.textMsg="¡Eliminado correctamente!",t.getStores()}))}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo Registro":"Editar Registro"}}},o=a(0),s=Object(o.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-container",[a("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("v-card",{attrs:{color:"white"}},[a("v-card-text",[t._v("\n          Cargando\n          "),a("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),t._v(" "),a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialogQuestionDelete,callback:function(e){t.dialogQuestionDelete=e},expression:"dialogQuestionDelete"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Alerta")]),t._v(" "),a("v-card-text",[t._v("¿Está seguro de borrar el registro?")]),t._v(" "),a("v-card-actions",[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.dialogQuestionDelete=!1}}},[t._v("Cancelar")]),t._v(" "),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:t.guardaBorrar}},[t._v("Continuar")])],1)],1)],1),t._v(" "),a("v-snackbar",{attrs:{color:"#000000",timeout:t.timeout},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n                "+t._s(t.textMsg)+"\n                "),a("v-btn",{attrs:{color:"blue",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\n                    Cerrar\n                ")])],1),t._v(" "),a("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"cyan white--text"},[a("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),t._v(" "),a("v-form",{model:{value:t.validProvider,callback:function(e){t.validProvider=e},expression:"validProvider"}},[a("v-card-text",[a("v-text-field",{attrs:{label:"Nombre",maxlength:"300",rules:t.nameRules,required:""},model:{value:t.editado.stor_name,callback:function(e){t.$set(t.editado,"stor_name",e)},expression:"editado.stor_name"}}),t._v(" "),a("v-text-field",{attrs:{label:"Teléfono",maxlength:"10",rules:t.phoneRules,required:""},model:{value:t.editado.stor_phone,callback:function(e){t.$set(t.editado,"stor_phone",e)},expression:"editado.stor_phone"}}),t._v(" "),a("v-text-field",{attrs:{label:"Dirección",maxlength:"1000",rules:t.nameRules,required:""},model:{value:t.editado.stor_addres,callback:function(e){t.$set(t.editado,"stor_addres",e)},expression:"editado.stor_addres"}}),t._v(" "),a("span",[t._v("Matriz")]),t._v(" "),a("v-switch",{model:{value:t.principal,callback:function(e){t.principal=e},expression:"principal"}}),t._v(" "),a("span",[t._v("Activo/Inactivo")]),t._v(" "),a("v-switch",{model:{value:t.estado,callback:function(e){t.estado=e},expression:"estado"}})],1),t._v(" "),a("v-card-actions",[a("v-spacer"),t._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:t.cancelar}},[t._v("Cancelar")]),t._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{disabled:!t.validProvider,color:"teal accent-4"},on:{click:t.guardar}},[t._v("Guardar")])],1)],1)],1)],1),t._v(" "),a("v-row",[a("v-col",[a("v-card",[a("v-data-table",{staticClass:"elevation-3",attrs:{headers:t.headers,items:t.stores,search:t.search,"sort-by":"id"},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}}),t._v(" "),a("v-toolbar",{attrs:{flat:"",color:"indigo"},scopedSlots:t._u([{key:"extension",fn:function(){return[a("v-btn",{attrs:{fab:"",color:"cyan accent-2",bottom:"",left:"",absolute:""},on:{click:function(e){t.dialog=!t.dialog}}},[a("v-icon",[t._v("mdi-plus")])],1)]},proxy:!0}])},[t._v(" "),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),t._v(" "),a("v-spacer")],1),t._v(" "),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]},proxy:!0},{key:"item.stor_main",fn:function(e){return[1==e.item.stor_main?a("v-chip",{attrs:{color:"green",dark:""}},[t._v("  Si  ")]):a("v-chip",{attrs:{color:"red",dark:""}},[t._v("No")])]}},{key:"item.status",fn:function(e){return[1==e.item.stor_status?a("v-chip",{attrs:{color:"green",dark:""}},[t._v("  Activo  ")]):a("v-chip",{attrs:{color:"red",dark:""}},[t._v("Inactivo")])]}},{key:"item.action",fn:function(e){var i=e.item;return[a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"cyan"},on:{click:function(e){return t.edita(i)}}},[a("v-icon",{attrs:{dark:""}},[t._v("mdi-pencil")])],1),t._v(" "),a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"error"},on:{click:function(e){return t.borrar(i)}}},[a("v-icon",{attrs:{dark:""}},[t._v("mdi-delete")])],1)]}}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=s.exports}}]);