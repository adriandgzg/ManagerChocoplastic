(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{81:function(e,t,a){"use strict";a.r(t);var s=a(1),i=a.n(s),o={data:function(){return{dialogForm:!1,dialog:!1,dialogPassword:!1,show1:!1,statuses:[{name:"Cliente",id:1},{name:"Repartidor",id:2}],valid:!1,validUpdate:!1,validPassword:!1,genders:[],gender:"",store:"",stores:[],headers:[{text:"ID",value:"id",width:"10%"},{text:"Nombre",value:"name"},{text:"Correo Electrónico",value:"email"},{text:"No. Empleado",value:"phone_number"},{text:"Sucursal",value:"stor_name"},{text:"",value:"action"}],usuarios:[],editado:{id:"",name:"",email:"",password:"",phone_number:"",birthday:"",gender:"",profile_picture:"",user_type:"",user_type_id:0,stor_fk:0,verified:1},defaultItem:{id:"",name:"",email:"",password:"",phone_number:"",birthday:"",gender:"",profile_picture:"",user_type:"",user_type_id:0,stor_fk:0,verified:1},nameRules:[function(e){return!!e||"Requerido."},function(e){return e&&e.length>=3||"Min 3 caracteres"}],phoneRules:[function(e){return!!e||"Requerido."},function(e){return e&&10==e.length||"Requiere 10 caracteres"}],numberRules:[function(e){return!!e||"Requerido."},function(e){return e>0||"El número debe ser mayor a cero"}],rulesImage:[function(e){return!!e||"Archivo requerido"},function(e){return!e||e.size<2e6||"La imagen tiene que ser menor a 2 MB!"}],rules:{required:function(e){return!!e||"Requiredo."},min:function(e){return e.length>=8||"Min 8 caracteres"},email:function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)||"E-mail inválido."}},loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:""}},created:function(){this.getUser(),this.getGenders(),this.getStores()},methods:{getUser:function(){var e=this;this.loading=!0,axios.get("/listUsers").then((function(t){setTimeout((function(){return e.loading=!1}),500),e.usuarios=t.data.data})).catch((function(t){console.log(t),e.normal("Notificación","Error al cargar los datos","error")}))},getGenders:function(){var e=this;axios.get("/clients/genders").then((function(t){e.genders=t.data.data})).catch((function(e){console.log(e)}))},getStores:function(){var e=this;axios.get("/storeget").then((function(t){e.stores=t.data.data})).catch((function(e){console.log(e)}))},editarTipo:function(e){console.log(e),this.editado=Object.assign({},e),this.gender=this.editado.gender,this.store=this.editado.stor_fk,console.log(this.editado),this.dialog=!0},editarPassword:function(e){this.editado=Object.assign({},e),this.dialogPassword=!0},cancelar:function(){this.dialogForm=!1,this.editado=Object.assign({},this.defaultItem)},guardar:function(){var e=this;this.editado.gender=this.gender,this.editado.stor_fk=this.store,this.editado.verified=1,console.log(this.editado),axios.post("signup",this.editado).then((function(t){200==t.data.status.code?(e.normal("Notificación",t.data.status.message,"success"),e.dialogForm=!1,e.getUser()):e.normal("Notificación",t.data.status.message,"success")}))},actualizar:function(){var e=this;this.editado.gender=this.gender,this.editado.stor_fk=this.store,this.editado.verified=1,console.log(this.editado),axios.post("/user/update",this.editado).then((function(t){200==t.data.status.code?(e.normal("Notificación",t.data.status.message,"success"),e.dialog=!1,e.getUser()):e.normal("Notificación",t.data.status.message,"success")}))},actualizarPassword:function(){var e=this;axios.post("/user/password/change",this.editado).then((function(t){200==t.data.status.code?(e.normal("Notificación",t.data.status.message,"success"),e.dialogPassword=!1,e.getUser()):e.normal("Notificación",t.data.status.message,"success")}))},cancelarupdate:function(){this.dialog=!1,this.editado=Object.assign({},this.defaultItem)},cancelarPassword:function(){this.dialogPassword=!1,this.editado=Object.assign({},this.defaultItem)},normal:function(e,t,a){this.notice=new i.a({title:e,description:t,className:"open-normal",closable:!0,duration:3,type:a})}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo Registro":"Editar Registro"}}},r=a(0),n=Object(r.a)(o,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[a("v-card",{attrs:{color:"white"}},[a("v-card-text",[e._v("\r\n                Cargando\r\n                "),a("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),e._v(" "),a("v-row",[a("v-col",[a("v-data-table",{staticClass:"elevation-3",attrs:{headers:e.headers,items:e.usuarios,"sort-by":"id"},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}}),e._v(" "),a("v-toolbar",{attrs:{flat:"",color:"indigo"},scopedSlots:e._u([{key:"extension",fn:function(){return[a("v-btn",{attrs:{fab:"",color:"cyan accent-2",bottom:"",left:"",absolute:""},on:{click:function(t){e.dialogForm=!e.dialogForm}}},[a("v-icon",[e._v("mdi-plus")])],1)]},proxy:!0}])},[e._v(" "),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e._v(" "),a("v-spacer")],1)]},proxy:!0},{key:"item.action",fn:function(t){var s=t.item;return[a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"green"},on:{click:function(t){return e.editarTipo(s)}}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-account-arrow-right")])],1),e._v(" "),a("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"blue"},on:{click:function(t){return e.editarPassword(s)}}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-account-key")])],1)]}}])})],1)],1),e._v(" "),a("v-dialog",{attrs:{"max-width":"800px"},scopedSlots:e._u([{key:"activator",fn:function(e){e.on}}]),model:{value:e.dialogForm,callback:function(t){e.dialogForm=t},expression:"dialogForm"}},[e._v(" "),a("v-card",[a("v-card-title",{staticClass:"cyan white--text"},[a("span",{staticClass:"headline"},[e._v("Usuario")])]),e._v(" "),a("v-form",{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-card-text",[a("v-container",[a("v-text-field",{attrs:{label:"Nombre",maxlength:"300",rules:e.nameRules,required:""},model:{value:e.editado.name,callback:function(t){e.$set(e.editado,"name",t)},expression:"editado.name"}}),e._v(" "),a("v-text-field",{attrs:{label:"Email",maxlength:"300",rules:[e.rules.required,e.rules.email],required:""},model:{value:e.editado.email,callback:function(t){e.$set(e.editado,"email",t)},expression:"editado.email"}}),e._v(" "),a("v-text-field",{attrs:{label:"No. Empleado",maxlength:"300",rules:e.nameRules,required:""},model:{value:e.editado.phone_number,callback:function(t){e.$set(e.editado,"phone_number",t)},expression:"editado.phone_number"}}),e._v(" "),a("v-text-field",{attrs:{label:"Contraseña",maxlength:"300",rules:[e.rules.required,e.rules.min],"append-icon":e.show1?"mdi-eye":"mdi-eye-off",type:e.show1?"text":"password"},on:{"click:append":function(t){e.show1=!e.show1}},model:{value:e.editado.password,callback:function(t){e.$set(e.editado,"password",t)},expression:"editado.password"}}),e._v(" "),a("v-select",{attrs:{items:e.genders,"item-text":"name","item-value":"name",filled:"",chips:"",label:"Género",placeholder:"Selecciona su Género"},model:{value:e.gender,callback:function(t){e.gender=t},expression:"gender"}}),e._v(" "),a("v-select",{attrs:{items:e.stores,"item-text":"stor_name","item-value":"stor_pk",filled:"",chips:"",label:"Sucursal",placeholder:"Selecciona sucursal"},model:{value:e.store,callback:function(t){e.store=t},expression:"store"}})],1),e._v(" "),a("v-card-actions",[a("v-spacer"),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:e.cancelar}},[e._v("\r\n                            Cancelar\r\n                        ")]),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{disabled:!e.valid,color:"teal accent-4"},on:{click:e.guardar}},[e._v("\r\n                            Guardar\r\n                        ")])],1)],1)],1)],1)],1),e._v(" "),a("v-dialog",{attrs:{"max-width":"800px"},scopedSlots:e._u([{key:"activator",fn:function(e){e.on}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),a("v-card",[a("v-card-title",{staticClass:"cyan white--text"},[a("span",{staticClass:"headline"},[e._v("Usuario")])]),e._v(" "),a("v-form",{model:{value:e.validUpdate,callback:function(t){e.validUpdate=t},expression:"validUpdate"}},[a("v-card-text",[a("v-container",[a("v-text-field",{attrs:{label:"Nombre",maxlength:"300",rules:e.nameRules,required:""},model:{value:e.editado.name,callback:function(t){e.$set(e.editado,"name",t)},expression:"editado.name"}}),e._v(" "),a("v-text-field",{attrs:{label:"Email",maxlength:"300",rules:[e.rules.required,e.rules.email],required:""},model:{value:e.editado.email,callback:function(t){e.$set(e.editado,"email",t)},expression:"editado.email"}}),e._v(" "),a("v-text-field",{attrs:{label:"No. Empleado",maxlength:"300",disabled:""},model:{value:e.editado.phone_number,callback:function(t){e.$set(e.editado,"phone_number",t)},expression:"editado.phone_number"}}),e._v(" "),a("v-select",{attrs:{items:e.genders,"item-text":"name","item-value":"name",filled:"",chips:"",label:"Género",placeholder:"Selecciona su Género"},model:{value:e.gender,callback:function(t){e.gender=t},expression:"gender"}}),e._v(" "),a("v-select",{attrs:{items:e.stores,"item-text":"stor_name","item-value":"stor_pk",filled:"",chips:"",label:"Sucursal",placeholder:"Selecciona sucursal"},model:{value:e.store,callback:function(t){e.store=t},expression:"store"}})],1),e._v(" "),a("v-card-actions",[a("v-spacer"),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:e.cancelarupdate}},[e._v("\r\n                            Cancelar\r\n                        ")]),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{disabled:!e.validUpdate,color:"teal accent-4"},on:{click:e.actualizar}},[e._v("\r\n                            Guardar\r\n                        ")])],1)],1)],1)],1)],1),e._v(" "),a("v-dialog",{attrs:{"max-width":"800px"},scopedSlots:e._u([{key:"activator",fn:function(e){e.on}}]),model:{value:e.dialogPassword,callback:function(t){e.dialogPassword=t},expression:"dialogPassword"}},[e._v(" "),a("v-card",[a("v-card-title",{staticClass:"cyan white--text"},[a("span",{staticClass:"headline"},[e._v("Cambio de Contraseña")])]),e._v(" "),a("v-form",{model:{value:e.validPassword,callback:function(t){e.validPassword=t},expression:"validPassword"}},[a("v-card-text",[a("v-container",[a("v-text-field",{attrs:{label:"Contraseña",maxlength:"300",rules:[e.rules.required,e.rules.min],"append-icon":e.show1?"mdi-eye":"mdi-eye-off",type:e.show1?"text":"password"},on:{"click:append":function(t){e.show1=!e.show1}},model:{value:e.editado.password,callback:function(t){e.$set(e.editado,"password",t)},expression:"editado.password"}})],1),e._v(" "),a("v-card-actions",[a("v-spacer"),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:e.cancelarPassword}},[e._v("\r\n                            Cancelar\r\n                        ")]),e._v(" "),a("v-btn",{staticClass:"ma-2 white--text",attrs:{disabled:!e.validPassword,color:"teal accent-4"},on:{click:e.actualizarPassword}},[e._v("\r\n                            Guardar\r\n                        ")])],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=n.exports}}]);