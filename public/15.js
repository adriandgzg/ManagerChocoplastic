(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1:function(t,e,n){var i;"undefined"!=typeof self&&self,t.exports=(i=n(2),function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=9)}([function(t,e){t.exports=i},function(t,e){function n(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(i);return[n].concat(i.sources.map((function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"}))).concat([o]).join("\n")}return[n].join("\n")}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=n(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i})).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(i[a]=!0)}for(o=0;o<t.length;o++){var r=t[o];"number"==typeof r[0]&&i[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),e.push(r))}},e}},function(t,e,n){function i(t){for(var e=0;e<t.length;e++){var n=t[e],i=u[n.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](n.parts[o]);for(;o<n.parts.length;o++)i.parts.push(a(n.parts[o]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{var r=[];for(o=0;o<n.parts.length;o++)r.push(a(n.parts[o]));u[n.id]={id:n.id,refs:1,parts:r}}}}function o(){var t=document.createElement("style");return t.type="text/css",d.appendChild(t),t}function a(t){var e,n,i=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(i){if(v)return h;i.parentNode.removeChild(i)}if(m){var a=f++;i=p||(p=o()),e=r.bind(null,i,a,!1),n=r.bind(null,i,a,!0)}else i=o(),e=c.bind(null,i),n=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else n()}}function r(t,e,n,i){var o=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=g(e,o);else{var a=document.createTextNode(o),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(a,r[e]):t.appendChild(a)}}function c(t,e){var n=e.css,i=e.media,o=e.sourceMap;if(i&&t.setAttribute("media",i),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var s="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!s)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l=n(15),u={},d=s&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,v=!1,h=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n){v=n;var o=l(t,e);return i(o),function(e){for(var n=[],a=0;a<o.length;a++){var r=o[a];(c=u[r.id]).refs--,n.push(c)}for(e?i(o=l(t,e)):o=[],a=0;a<n.length;a++){var c;if(0===(c=n[a]).refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete u[c.id]}}}};var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e,n,i,o,a){var r,c=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(r=t,c=t.default);var l,u="function"==typeof c?c.options:c;if(e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),o&&(u._scopeId=o),a?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},u._ssrRegister=l):i&&(l=i),l){var d=u.functional,p=d?u.render:u.beforeCreate;d?(u._injectStyles=l,u.render=function(t,e){return l.call(e),p(t,e)}):u.beforeCreate=p?[].concat(p,l):[l]}return{esModule:r,exports:c,options:u}}},function(t,e,n){"use strict";var i=n(11),o=n(8),a=new i.a(o.a),r=function(t,e){"normal"!==e&&(t.type=e);var n=Object.assign({},o.b,a.noticeDefaults,t);return a.push(n)},c={error:function(t){return r(t,"error")},info:function(t){return r(t,"info")},open:function(t){return r(t,"normal")},success:function(t){return r(t,"success")},warning:function(t){return r(t,"warning")},close:function(t){a.remove(t)},config:function(t){var e=Object.assign({},o.a,t);return a.configure(e),e}};e.a=c},function(t,e,n){"use strict";var i=n(0),o=n.n(i),a=n(16);e.a=o.a.extend({name:"CripNotices",components:{Notice:a.a},props:{className:{type:String},icons:{type:Object},styles:{type:Object}},data:function(){return{notices:[]}},methods:{add:function(t){this.notices.push(t)},remove:function(t){var e=this;this.notices.forEach((function(n,i){n.name===t&&e.notices.splice(i,1)}))},removeAll:function(){this.notices=[]}}})},function(t,e,n){"use strict";var i=n(0),o=n.n(i),a=n(19),r=["normal","info","success","warning","error"];e.a=o.a.extend({name:"CripNotice",components:{NoticeContent:a.a},props:{type:{type:String,required:!0,validator:function(t){return r.indexOf(t)>-1}},className:{type:String},closable:{type:Boolean,required:!0},description:{type:String},duration:{type:Number,required:!0},icons:{type:Object,required:!0},name:{type:String,required:!0},onClose:{type:Function},styles:{type:Object,default:function(){return{}}},title:{type:String,required:!0}},computed:{withDesc:function(){return!!this.description}},data:function(){return{closeTimer:0}},methods:{setCloseTimer:function(){var t=this;0!==this.duration&&(this.closeTimer=window.setTimeout((function(){t.close()}),1e3*this.duration))},clearCloseTimer:function(){this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=0)},close:function(){this.onClose(),this.clearCloseTimer(),this.$parent.$parent.remove(this.name)}},mounted:function(){this.clearCloseTimer(),this.setCloseTimer()},beforeDestroy:function(){this.clearCloseTimer()}})},function(t,e,n){"use strict";var i=n(0),o=n.n(i);e.a=o.a.extend({name:"CripNoticeContent",props:{description:{type:String},icons:{type:Object},title:{type:String,required:!0},type:{type:String,required:!0}},computed:{withIcon:function(){return"normal"!==this.type},withDesc:function(){return!!this.description}}})},function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),e.a={className:"",closable:!0,duration:4.5,icons:{close:"fa fa-times",error:"fa fa-times-circle",info:"fa fa-info-circle",success:"fa fa-check-circle",warning:"fa fa-exclamation-circle"},styles:{top:"15px",right:"15px"}};var i={className:"",closable:!0,description:"",duration:4.5,name:"",onClose:function(){return null},styles:{},title:"",type:"normal"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(10),o=n(4),a=function(){function t(t){this.name=o.a.open(t)}return t.prototype.close=function(){o.a.close(this.name)},t}();e.default=a,a.install=i.a,a.version="1.1.1"},function(t,e,n){"use strict";e.a=function(t,e){if(!s||i!==t){s=!0,i=t;var n=Object.assign({},c.a,e);r.a.config(n),Object.defineProperty(a.a,"notice",{get:function(){return r.a}}),Object.defineProperty(a.a.prototype,"$notice",{get:function(){return r.a}})}};var i,o=n(0),a=n.n(o),r=n(4),c=n(8),s=!1},function(t,e,n){"use strict";var i=n(0),o=n.n(i),a=n(12),r=0,c=function(){function t(t){var e=this;this.options=t,this.component=new o.a({render:function(t){return t(a.a,{props:e.options})}});var n=this.component.$mount();document.body.appendChild(n.$el),this.instance=this.component.$children[0]}return Object.defineProperty(t.prototype,"noticeDefaults",{get:function(){return{closable:this.options.closable,duration:this.options.duration,title:""}},enumerable:!0,configurable:!0}),t.prototype.push=function(t){return t.name=t.name||"crip-"+Date.now()+"-"+ ++r,this.instance.add(t),t.name.toString()},t.prototype.remove=function(t){this.instance.remove(t)},t.prototype.configure=function(t){Object.assign(this.options,t),this.component.$forceUpdate()},t}();e.a=c},function(t,e,n){"use strict";var i=n(5),o=n(24),a=function(t){n(13)},r=n(3)(i.a,o.a,!1,a,"data-v-45f75f8b",null);e.a=r.exports},function(t,e,n){var i=n(14);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals),n(2)("32e15c8a",i,!0)},function(t,e,n){(t.exports=n(1)(void 0)).push([t.i,".crip-notices[data-v-45f75f8b]{width:335px;position:fixed;z-index:999990}.fade-horizontal[data-v-45f75f8b]{transition:all .7s ease-out}.fade-horizontal-enter[data-v-45f75f8b],.fade-horizontal-leave-to[data-v-45f75f8b]{opacity:0;transform:translateX(325px)}.fade-horizontal-leave-active[data-v-45f75f8b]{transition:all .7s ease-in;position:absolute;width:100%}",""])},function(t,e){t.exports=function(t,e){for(var n=[],i={},o=0;o<e.length;o++){var a=e[o],r=a[0],c={id:t+":"+o,css:a[1],media:a[2],sourceMap:a[3]};i[r]?i[r].parts.push(c):n.push(i[r]={id:r,parts:[c]})}return n}},function(t,e,n){"use strict";var i=n(6),o=n(23),a=function(t){n(17)},r=n(3)(i.a,o.a,!1,a,"data-v-3a456426",null);e.a=r.exports},function(t,e,n){var i=n(18);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals),n(2)("2d80ad4a",i,!0)},function(t,e,n){(t.exports=n(1)(void 0)).push([t.i,'.crip-notice[data-v-3a456426]{margin-bottom:10px;padding:16px;border-radius:3px;box-shadow:0 1px 6px rgba(0,0,0,.2);background:#fff;line-height:1;position:relative;overflow:hidden}.crip-notice[data-v-3a456426]:after{content:"";display:block;width:4px;position:absolute;top:0;bottom:0;left:0}.crip-notice-info[data-v-3a456426]:after,.crip-notice-normal[data-v-3a456426]:after{background:#2a88bd}.crip-notice-success[data-v-3a456426]:after{background:#259d6d}.crip-notice-warning[data-v-3a456426]:after{background:#c5b143}.crip-notice-error[data-v-3a456426]:after{background:#aa4a24}.crip-notice-close[data-v-3a456426]{position:absolute;right:16px;top:15px;color:#999;outline:none}.crip-notice-close i[data-v-3a456426]{font-size:22px;color:#636b6f;transition:color .2s ease;position:relative;top:-3px}.crip-notice-close i[data-v-3a456426]:hover{color:#444}.crip-notice-with-desc .crip-notice-close[data-v-3a456426]{top:11px}',""])},function(t,e,n){"use strict";var i=n(7),o=n(22),a=function(t){n(20)},r=n(3)(i.a,o.a,!1,a,null,null);e.a=r.exports},function(t,e,n){var i=n(21);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals),n(2)("c1adc606",i,!0)},function(t,e,n){(t.exports=n(1)(void 0)).push([t.i,".crip-notice-content.crip-notice-with-desc .crip-notice-title{font-weight:700;margin-bottom:8px}.crip-notice-content.crip-notice-with-desc .crip-notice-icon{font-size:36px}.crip-notice-content.crip-notice-with-icon .crip-notice-desc,.crip-notice-content.crip-notice-with-icon .crip-notice-title{margin-left:22px}.crip-notice-content.crip-notice-with-icon.crip-notice-with-desc .crip-notice-desc,.crip-notice-content.crip-notice-with-icon.crip-notice-with-desc .crip-notice-title{margin-left:51px}.crip-notice-content .crip-notice-icon{position:absolute;left:20px;top:50%;transform:translateY(-50%);font-size:16px}.crip-notice-content .crip-notice-icon-success{color:#259d6d}.crip-notice-content .crip-notice-icon-info{color:#2a88bd}.crip-notice-content .crip-notice-icon-warning{color:#c5b143}.crip-notice-content .crip-notice-icon-error{color:#aa4a24}.crip-notice-content .crip-notice-title{font-size:14px;color:#1c2438;padding-right:30px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.crip-notice-content .crip-notice-desc{font-size:12px;color:#636b6f;text-align:justify;line-height:1.5}",""])},function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"crip-notice-content",class:{"crip-notice-with-icon":t.withIcon,"crip-notice-with-desc":t.withDesc}},[t.withIcon?n("span",{staticClass:"crip-notice-icon",class:["crip-notice-icon-"+t.type]},[n("i",{class:[""+t.icons[t.type]]})]):t._e(),t._v(" "),n("div",{staticClass:"crip-notice-title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),n("div",{staticClass:"crip-notice-desc",domProps:{innerHTML:t._s(t.description)}}),t._v(" "),t._t("default")],2)},staticRenderFns:[]};e.a=i},function(t,e,n){"use strict";var i={render:function(){var t,e=this,n=e.$createElement,i=e._self._c||n;return i("div",{staticClass:"crip-notice",class:(t={"crip-notice-closable":e.closable,"crip-notice-with-desc":e.withDesc},t["crip-notice-"+e.type]=!0,t[e.className]=!!e.className,t),style:e.styles,on:{mousemove:e.clearCloseTimer,mouseover:e.clearCloseTimer,mouseout:e.setCloseTimer}},[i("notice-content",{attrs:{type:e.type,title:e.title,description:e.description,icons:e.icons}},[e.closable?i("a",{staticClass:"crip-notice-close",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.close(t)}}},[i("i",{class:e.icons.close})]):e._e()])],1)},staticRenderFns:[]};e.a=i},function(t,e,n){"use strict";var i={render:function(){var t,e=this,n=e.$createElement,i=e._self._c||n;return i("div",{class:(t={},t["crip-notices"]=!0,t[e.className]=!!e.className,t),style:e.styles},[i("transition-group",{attrs:{name:"fade-horizontal",tag:"div"}},e._l(e.notices,(function(t){return i("div",{key:t.name,staticClass:"fade-horizontal"},[i("notice",{attrs:{type:t.type,title:t.title,name:t.name,description:t.description,icons:e.icons,duration:t.duration,styles:t.styles,"on-close":t.onClose,"class-name":t.className,closable:t.closable}})],1)})))],1)},staticRenderFns:[]};e.a=i}]).default)},51:function(t,e,n){"use strict";n.r(e);var i=n(1),o=n.n(i),a={data:function(){return{headersdetail:[{text:"ID",value:"prpa_pk",width:"10%"},{text:"Forma de Pago",value:"pash_name"},{text:"Monto pagado",value:"prpa_amount"},{text:"Fecha pago",value:"created_at"}],headers:[{text:"ID",value:"prde_pk",width:"10%"},{text:"No. Compra",value:"prpu_identifier"},{text:"Proveedor",value:"prov_name"},{text:"Monto",value:"prde_amount"},{text:"Monto Pagado",value:"prde_amount_paid"},{text:"Monto Pendiente",value:"prde_amount_outstanding"},{text:"Fecha",value:"created_at"},{text:"Estatus",value:"prde_status_description"},{text:"",value:"action",width:"20%"}],select:0,principal:!1,estado:!0,editado:{prde_fk:0,prpu_identifier:"",prov_fk:0,pash_fk:0,prpa_amount:0},defaultItem:{prde_fk:0,prpu_identifier:"",prov_fk:0,pash_fk:0,prpa_amount:0},editedIndex:-1,sales:[],detallepagos:[],clientsdebts:[],entities:[],search:"",dialog:!1,dialogdetail:!1,snackbar:!1,timeout:2e3,textMsg:"",valid:!1,validProvider:!1,payments:[],selectpame:"",folioRules:[function(t){return!!t||"Requerido."},function(t){return t&&t.length>=10||"Min 10 caracter"}],nameRules:[function(t){return!!t||"Requerido."},function(t){return t&&t.length>=3||"Min 3 caracteres"}],phoneRules:[function(t){return!!t||"Requerido."},function(t){return t&&10==t.length||"Requiere 10 caracteres"}],numberRules:[function(t){return!!t||"Requerido."},function(t){return t>0||"El número debe ser mayor o igual a cero"}]}},created:function(){this.getClientesPago(),this.getPayment()},methods:{formatMoney:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",";try{e=Math.abs(e),e=isNaN(e)?2:e;var o=t<0?"-":"",a=parseInt(t=Math.abs(Number(t)||0).toFixed(e)).toString(),r=a.length>3?a.length%3:0;return o+(r?a.substr(0,r)+i:"")+a.substr(r).replace(/(\d{3})(?=\d)/g,"$1"+i)+(e?n+Math.abs(t-a).toFixed(e).slice(2):"")}catch(t){console.log(t)}},getClientesPago:function(){var t=this;axios.get("/provider/debts").then((function(e){console.log(e.data),t.clientsdebts=e.data.data})).catch((function(t){console.log(t)}))},cancelar:function(){this.dialog=!1,this.editado=Object.assign({},this.defaultItem),this.editedIndex=-1},abonar:function(t){this.dialog=!0,this.editado.prde_fk=t.prde_pk,this.editado.prov_fk=t.prov_pk,this.editado.pash_fk=0,this.editado.prpa_amount=0,this.editado.prpu_identifier=t.prpu_identifier},getPayment:function(){var t=this;axios.get("/paymentshapesget").then((function(e){t.payments=e.data.data})).catch((function(t){console.log(t)}))},guardar:function(){var t=this;this.editado.pash_fk=this.selectpame.pash_pk,""!=this.selectpame&&null!=this.selectpame?axios.post("/provider/payments",this.editado).then((function(e){console.log(e),200==e.data.status.code?(t.textMsg="¡Actualizado correctamente!",t.normal("Notificación",e.data.status.message,"success"),t.getClientesPago(),t.cancelar()):t.normal("Notificación",e.data.status.message,"error")})).catch((function(e){t.errors.push(e)})):this.normal("Notificación","Debe seleccionar una Forma de Pago","error")},detalle:function(t){var e=this;console.log(t),axios.get("/provider/payments/"+t.prde_pk).then((function(t){console.log(t),e.detallepagos=t.data.data,e.dialogdetail=!0})).catch((function(t){console.log(t)}))},cancelardetalle:function(){this.dialogdetail=!1},normal:function(t,e,n){this.notice=new o.a({title:t,description:e,className:"open-normal",closable:!0,duration:3,type:n})}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo Registro":"Editar Registro"}}},r=n(0),c=Object(r.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-container",[n("v-dialog",{attrs:{"max-width":"700px",persistent:""},model:{value:t.dialogdetail,callback:function(e){t.dialogdetail=e},expression:"dialogdetail"}},[n("v-card",[n("v-card-title",{staticClass:"cyan white--text"},[n("span",{staticClass:"headline"},[t._v("Detalle de pagos")])]),t._v(" "),n("v-card-text",[n("v-data-table",{staticClass:"elevation-3",attrs:{headers:t.headersdetail,items:t.detallepagos,"sort-by":"id"},scopedSlots:t._u([{key:"item.prpa_amount",fn:function(e){var i=e.item;return[n("v-label",[t._v("$"+t._s(t.formatMoney(i.prpa_amount)))])]}}])})],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:t.cancelardetalle}},[t._v("Cancelar")])],1)],1)],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-card-title",{staticClass:"cyan white--text"},[n("span",{staticClass:"headline"},[t._v("Agregar pago")])]),t._v(" "),n("v-card-text",[n("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-card-title",{staticClass:"subheading font-weight-bold"},[t._v("Compra: "+t._s(t.editado.prpu_identifier))]),t._v(" "),n("v-divider"),t._v(" "),n("v-row",[n("v-text-field",{attrs:{label:"Monto abonado",prefix:"$",type:"number",rules:t.numberRules,required:""},model:{value:t.editado.prpa_amount,callback:function(e){t.$set(t.editado,"prpa_amount",e)},expression:"editado.prpa_amount"}}),t._v(" "),n("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[n("v-combobox",{attrs:{required:"",items:t.payments,label:"Forma de pago","item-text":"pash_name","item-value":"pash_pk",filled:"",chips:"",placeholder:"Seleccionar una opción"},model:{value:t.selectpame,callback:function(e){t.selectpame=e},expression:"selectpame"}})],1)],1)],1)],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:t.cancelar}},[t._v("Cancelar")]),t._v(" "),n("v-btn",{staticClass:"ma-2 white--text",attrs:{disabled:!t.valid,color:"teal accent-4"},on:{click:t.guardar}},[t._v("Guardar")])],1)],1)],1),t._v(" "),n("v-row",[n("v-col",[n("v-card",[n("v-data-table",{staticClass:"elevation-3",attrs:{headers:t.headers,items:t.clientsdebts,search:t.search,"sort-by":"id"},scopedSlots:t._u([{key:"top",fn:function(){return[n("v-system-bar",{attrs:{color:"indigo darken-2",dark:""}}),t._v(" "),n("v-toolbar",{attrs:{flat:"",color:"indigo"}},[n("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),t._v(" "),n("v-spacer")],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"12"}},[n("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]},proxy:!0},{key:"item.prde_amount",fn:function(e){var i=e.item;return[n("v-label",[t._v("$"+t._s(t.formatMoney(i.prde_amount)))])]}},{key:"item.prde_amount_paid",fn:function(e){var i=e.item;return[n("v-label",[t._v("$"+t._s(t.formatMoney(i.prde_amount_paid)))])]}},{key:"item.prde_amount_outstanding",fn:function(e){var i=e.item;return[n("v-label",[t._v("$"+t._s(t.formatMoney(i.prde_amount_outstanding)))])]}},{key:"item.action",fn:function(e){var i=e.item;return[n("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"cyan",title:"Agregar pago"},on:{click:function(e){return t.abonar(i)}}},[n("v-icon",{attrs:{dark:""}},[t._v("mdi-coin")])],1),t._v(" "),n("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"cyan",title:"Detalle"},on:{click:function(e){return t.detalle(i)}}},[n("v-icon",{attrs:{dark:""}},[t._v("mdi-parking")])],1)]}}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=c.exports}}]);