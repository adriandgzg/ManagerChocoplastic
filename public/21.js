(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{1:function(t,e,r){var o;"undefined"!=typeof self&&self,t.exports=(o=r(2),function(t){function e(o){if(r[o])return r[o].exports;var i=r[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,o){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=9)}([function(t,e){t.exports=o},function(t,e){function r(t,e){var r=t[1]||"",o=t[3];if(!o)return r;if(e&&"function"==typeof btoa){var i=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(o);return[r].concat(o.sources.map((function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"}))).concat([i]).join("\n")}return[r].join("\n")}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var o=r(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o})).join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},i=0;i<this.length;i++){var n=this[i][0];"number"==typeof n&&(o[n]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&o[a[0]]||(r&&!a[2]?a[2]=r:r&&(a[2]="("+a[2]+") and ("+r+")"),e.push(a))}},e}},function(t,e,r){function o(t){for(var e=0;e<t.length;e++){var r=t[e],o=d[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(n(r.parts[i]));o.parts.length>r.parts.length&&(o.parts.length=r.parts.length)}else{var a=[];for(i=0;i<r.parts.length;i++)a.push(n(r.parts[i]));d[r.id]={id:r.id,refs:1,parts:a}}}}function i(){var t=document.createElement("style");return t.type="text/css",p.appendChild(t),t}function n(t){var e,r,o=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(o){if(v)return h;o.parentNode.removeChild(o)}if(m){var n=f++;o=u||(u=i()),e=a.bind(null,o,n,!1),r=a.bind(null,o,n,!0)}else o=i(),e=s.bind(null,o),r=function(){o.parentNode.removeChild(o)};return e(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;e(t=o)}else r()}}function a(t,e,r,o){var i=r?"":o.css;if(t.styleSheet)t.styleSheet.cssText=_(e,i);else{var n=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(n,a[e]):t.appendChild(n)}}function s(t,e){var r=e.css,o=e.media,i=e.sourceMap;if(o&&t.setAttribute("media",o),i&&(r+="\n/*# sourceURL="+i.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var c="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!c)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l=r(15),d={},p=c&&(document.head||document.getElementsByTagName("head")[0]),u=null,f=0,v=!1,h=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,r){v=r;var i=l(t,e);return o(i),function(e){for(var r=[],n=0;n<i.length;n++){var a=i[n];(s=d[a.id]).refs--,r.push(s)}for(e?o(i=l(t,e)):i=[],n=0;n<r.length;n++){var s;if(0===(s=r[n]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete d[s.id]}}}};var _=function(){var t=[];return function(e,r){return t[e]=r,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e,r,o,i,n){var a,s=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(a=t,s=t.default);var l,d="function"==typeof s?s.options:s;if(e&&(d.render=e.render,d.staticRenderFns=e.staticRenderFns,d._compiled=!0),r&&(d.functional=!0),i&&(d._scopeId=i),n?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},d._ssrRegister=l):o&&(l=o),l){var p=d.functional,u=p?d.render:d.beforeCreate;p?(d._injectStyles=l,d.render=function(t,e){return l.call(e),u(t,e)}):d.beforeCreate=u?[].concat(u,l):[l]}return{esModule:a,exports:s,options:d}}},function(t,e,r){"use strict";var o=r(11),i=r(8),n=new o.a(i.a),a=function(t,e){"normal"!==e&&(t.type=e);var r=Object.assign({},i.b,n.noticeDefaults,t);return n.push(r)},s={error:function(t){return a(t,"error")},info:function(t){return a(t,"info")},open:function(t){return a(t,"normal")},success:function(t){return a(t,"success")},warning:function(t){return a(t,"warning")},close:function(t){n.remove(t)},config:function(t){var e=Object.assign({},i.a,t);return n.configure(e),e}};e.a=s},function(t,e,r){"use strict";var o=r(0),i=r.n(o),n=r(16);e.a=i.a.extend({name:"CripNotices",components:{Notice:n.a},props:{className:{type:String},icons:{type:Object},styles:{type:Object}},data:function(){return{notices:[]}},methods:{add:function(t){this.notices.push(t)},remove:function(t){var e=this;this.notices.forEach((function(r,o){r.name===t&&e.notices.splice(o,1)}))},removeAll:function(){this.notices=[]}}})},function(t,e,r){"use strict";var o=r(0),i=r.n(o),n=r(19),a=["normal","info","success","warning","error"];e.a=i.a.extend({name:"CripNotice",components:{NoticeContent:n.a},props:{type:{type:String,required:!0,validator:function(t){return a.indexOf(t)>-1}},className:{type:String},closable:{type:Boolean,required:!0},description:{type:String},duration:{type:Number,required:!0},icons:{type:Object,required:!0},name:{type:String,required:!0},onClose:{type:Function},styles:{type:Object,default:function(){return{}}},title:{type:String,required:!0}},computed:{withDesc:function(){return!!this.description}},data:function(){return{closeTimer:0}},methods:{setCloseTimer:function(){var t=this;0!==this.duration&&(this.closeTimer=window.setTimeout((function(){t.close()}),1e3*this.duration))},clearCloseTimer:function(){this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=0)},close:function(){this.onClose(),this.clearCloseTimer(),this.$parent.$parent.remove(this.name)}},mounted:function(){this.clearCloseTimer(),this.setCloseTimer()},beforeDestroy:function(){this.clearCloseTimer()}})},function(t,e,r){"use strict";var o=r(0),i=r.n(o);e.a=i.a.extend({name:"CripNoticeContent",props:{description:{type:String},icons:{type:Object},title:{type:String,required:!0},type:{type:String,required:!0}},computed:{withIcon:function(){return"normal"!==this.type},withDesc:function(){return!!this.description}}})},function(t,e,r){"use strict";r.d(e,"b",(function(){return o})),e.a={className:"",closable:!0,duration:4.5,icons:{close:"fa fa-times",error:"fa fa-times-circle",info:"fa fa-info-circle",success:"fa fa-check-circle",warning:"fa fa-exclamation-circle"},styles:{top:"15px",right:"15px"}};var o={className:"",closable:!0,description:"",duration:4.5,name:"",onClose:function(){return null},styles:{},title:"",type:"normal"}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r(10),i=r(4),n=function(){function t(t){this.name=i.a.open(t)}return t.prototype.close=function(){i.a.close(this.name)},t}();e.default=n,n.install=o.a,n.version="1.1.1"},function(t,e,r){"use strict";e.a=function(t,e){if(!c||o!==t){c=!0,o=t;var r=Object.assign({},s.a,e);a.a.config(r),Object.defineProperty(n.a,"notice",{get:function(){return a.a}}),Object.defineProperty(n.a.prototype,"$notice",{get:function(){return a.a}})}};var o,i=r(0),n=r.n(i),a=r(4),s=r(8),c=!1},function(t,e,r){"use strict";var o=r(0),i=r.n(o),n=r(12),a=0,s=function(){function t(t){var e=this;this.options=t,this.component=new i.a({render:function(t){return t(n.a,{props:e.options})}});var r=this.component.$mount();document.body.appendChild(r.$el),this.instance=this.component.$children[0]}return Object.defineProperty(t.prototype,"noticeDefaults",{get:function(){return{closable:this.options.closable,duration:this.options.duration,title:""}},enumerable:!0,configurable:!0}),t.prototype.push=function(t){return t.name=t.name||"crip-"+Date.now()+"-"+ ++a,this.instance.add(t),t.name.toString()},t.prototype.remove=function(t){this.instance.remove(t)},t.prototype.configure=function(t){Object.assign(this.options,t),this.component.$forceUpdate()},t}();e.a=s},function(t,e,r){"use strict";var o=r(5),i=r(24),n=function(t){r(13)},a=r(3)(o.a,i.a,!1,n,"data-v-45f75f8b",null);e.a=a.exports},function(t,e,r){var o=r(14);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals),r(2)("32e15c8a",o,!0)},function(t,e,r){(t.exports=r(1)(void 0)).push([t.i,".crip-notices[data-v-45f75f8b]{width:335px;position:fixed;z-index:999990}.fade-horizontal[data-v-45f75f8b]{transition:all .7s ease-out}.fade-horizontal-enter[data-v-45f75f8b],.fade-horizontal-leave-to[data-v-45f75f8b]{opacity:0;transform:translateX(325px)}.fade-horizontal-leave-active[data-v-45f75f8b]{transition:all .7s ease-in;position:absolute;width:100%}",""])},function(t,e){t.exports=function(t,e){for(var r=[],o={},i=0;i<e.length;i++){var n=e[i],a=n[0],s={id:t+":"+i,css:n[1],media:n[2],sourceMap:n[3]};o[a]?o[a].parts.push(s):r.push(o[a]={id:a,parts:[s]})}return r}},function(t,e,r){"use strict";var o=r(6),i=r(23),n=function(t){r(17)},a=r(3)(o.a,i.a,!1,n,"data-v-3a456426",null);e.a=a.exports},function(t,e,r){var o=r(18);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals),r(2)("2d80ad4a",o,!0)},function(t,e,r){(t.exports=r(1)(void 0)).push([t.i,'.crip-notice[data-v-3a456426]{margin-bottom:10px;padding:16px;border-radius:3px;box-shadow:0 1px 6px rgba(0,0,0,.2);background:#fff;line-height:1;position:relative;overflow:hidden}.crip-notice[data-v-3a456426]:after{content:"";display:block;width:4px;position:absolute;top:0;bottom:0;left:0}.crip-notice-info[data-v-3a456426]:after,.crip-notice-normal[data-v-3a456426]:after{background:#2a88bd}.crip-notice-success[data-v-3a456426]:after{background:#259d6d}.crip-notice-warning[data-v-3a456426]:after{background:#c5b143}.crip-notice-error[data-v-3a456426]:after{background:#aa4a24}.crip-notice-close[data-v-3a456426]{position:absolute;right:16px;top:15px;color:#999;outline:none}.crip-notice-close i[data-v-3a456426]{font-size:22px;color:#636b6f;transition:color .2s ease;position:relative;top:-3px}.crip-notice-close i[data-v-3a456426]:hover{color:#444}.crip-notice-with-desc .crip-notice-close[data-v-3a456426]{top:11px}',""])},function(t,e,r){"use strict";var o=r(7),i=r(22),n=function(t){r(20)},a=r(3)(o.a,i.a,!1,n,null,null);e.a=a.exports},function(t,e,r){var o=r(21);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals),r(2)("c1adc606",o,!0)},function(t,e,r){(t.exports=r(1)(void 0)).push([t.i,".crip-notice-content.crip-notice-with-desc .crip-notice-title{font-weight:700;margin-bottom:8px}.crip-notice-content.crip-notice-with-desc .crip-notice-icon{font-size:36px}.crip-notice-content.crip-notice-with-icon .crip-notice-desc,.crip-notice-content.crip-notice-with-icon .crip-notice-title{margin-left:22px}.crip-notice-content.crip-notice-with-icon.crip-notice-with-desc .crip-notice-desc,.crip-notice-content.crip-notice-with-icon.crip-notice-with-desc .crip-notice-title{margin-left:51px}.crip-notice-content .crip-notice-icon{position:absolute;left:20px;top:50%;transform:translateY(-50%);font-size:16px}.crip-notice-content .crip-notice-icon-success{color:#259d6d}.crip-notice-content .crip-notice-icon-info{color:#2a88bd}.crip-notice-content .crip-notice-icon-warning{color:#c5b143}.crip-notice-content .crip-notice-icon-error{color:#aa4a24}.crip-notice-content .crip-notice-title{font-size:14px;color:#1c2438;padding-right:30px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.crip-notice-content .crip-notice-desc{font-size:12px;color:#636b6f;text-align:justify;line-height:1.5}",""])},function(t,e,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"crip-notice-content",class:{"crip-notice-with-icon":t.withIcon,"crip-notice-with-desc":t.withDesc}},[t.withIcon?r("span",{staticClass:"crip-notice-icon",class:["crip-notice-icon-"+t.type]},[r("i",{class:[""+t.icons[t.type]]})]):t._e(),t._v(" "),r("div",{staticClass:"crip-notice-title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),r("div",{staticClass:"crip-notice-desc",domProps:{innerHTML:t._s(t.description)}}),t._v(" "),t._t("default")],2)},staticRenderFns:[]};e.a=o},function(t,e,r){"use strict";var o={render:function(){var t,e=this,r=e.$createElement,o=e._self._c||r;return o("div",{staticClass:"crip-notice",class:(t={"crip-notice-closable":e.closable,"crip-notice-with-desc":e.withDesc},t["crip-notice-"+e.type]=!0,t[e.className]=!!e.className,t),style:e.styles,on:{mousemove:e.clearCloseTimer,mouseover:e.clearCloseTimer,mouseout:e.setCloseTimer}},[o("notice-content",{attrs:{type:e.type,title:e.title,description:e.description,icons:e.icons}},[e.closable?o("a",{staticClass:"crip-notice-close",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.close(t)}}},[o("i",{class:e.icons.close})]):e._e()])],1)},staticRenderFns:[]};e.a=o},function(t,e,r){"use strict";var o={render:function(){var t,e=this,r=e.$createElement,o=e._self._c||r;return o("div",{class:(t={},t["crip-notices"]=!0,t[e.className]=!!e.className,t),style:e.styles},[o("transition-group",{attrs:{name:"fade-horizontal",tag:"div"}},e._l(e.notices,(function(t){return o("div",{key:t.name,staticClass:"fade-horizontal"},[o("notice",{attrs:{type:t.type,title:t.title,name:t.name,description:t.description,icons:e.icons,duration:t.duration,styles:t.styles,"on-close":t.onClose,"class-name":t.className,closable:t.closable}})],1)})))],1)},staticRenderFns:[]};e.a=o}]).default)},58:function(t,e,r){"use strict";r.r(e);var o=r(1),i=r.n(o),n={data:function(){return{headers:[{text:"Ident",value:"prod_identifier"},{text:"Nombre",value:"prod_name"},{text:"Unidad",value:"meas_fk_input_name"},{text:"Tipo",value:"bulk"},{text:"",value:"action",width:"20%"}],prpo_pk:this.$route.params.id,directa:this.$route.params.directa,prpu_pk:0,valid:!1,stores:[],providers:[],desserts:[],products:[],selectProv:"",selectStore:"",payments:[],selectpame:"",search:"",snackbar:!1,timeout:2e3,subtotal:0,total:0,iva:0,textMsg:"",editadoHeader:{prpu_pk:0,prov_fk:0,prov_name:"",prpo_fk:0,stor_fk:0,store_name:"",pame_fk:0,pame_name:"",prpu_identifier:"",prpu_type:0,prpu_status:0,created_at:"",updated_at:""},editado:{prpd_pk:0,prpd_quantity:0,prpd_price:0,prpd_discountrate:0,prod_pk:0,prod_identifier:0,prod_name:"",prod_description:"",meas_name:""},defaultItem:{prpd_pk:0,prpd_quantity:0,prpd_price:0,prpd_discountrate:0,prod_pk:0,prod_identifier:0,prod_name:"",prod_description:"",meas_name:""},detail:{prpu_pk:0,pame_fk:0,prov_fk:0,stor_fk:0,prpo_fk:0,prod_fk:0,prpd_pk:0,prpd_quantity:0,prpd_price:0,prpd_discountrate:0},detailDefault:{prpo_fk:0,prod_fk:0,prpd_pk:0,prpd_quantity:0,prpd_price:0,prpd_discountrate:0},orderHeader:{prpu_pk:0,prpo_pk:0,prov_fk:0,stor_fk:0,pame_fk:0,prpu_amount:0},enabledStore:!1,dialogcredito:!1,dialogcontado:!1,dialog:!1,loading:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:"",minNumberRules:[function(t){return!!t||"Requerido."},function(t){return t>0||"El número debe ser mayor o igual a cero"}]}},created:function(){this.getStores(),this.getProviders(),this.createCompra(),this.getPayment(),this.getUsers()},methods:{getUsers:function(){var t=this;axios.get("/users").then((function(e){t.users=e.data.data,t.users[0].store_id>0?(t.enabledStore=!0,t.selectStore=t.stores.find((function(e){return e.stor_pk==t.users[0].store_id}))):t.enabledStore=!1})).catch((function(e){t.errors.push(e)}))},formatMoney:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",";try{e=Math.abs(e),e=isNaN(e)?2:e;var i=t<0?"-":"",n=parseInt(t=Math.abs(Number(t)||0).toFixed(e)).toString(),a=n.length>3?n.length%3:0;return i+(a?n.substr(0,a)+o:"")+n.substr(a).replace(/(\d{3})(?=\d)/g,"$1"+o)+(e?r+Math.abs(t-n).toFixed(e).slice(2):"")}catch(t){console.log(t)}},getStores:function(){var t=this;axios.get("/storeget").then((function(e){t.stores=e.data.data})).catch((function(t){console.log(t)}))},getProviders:function(){var t=this;axios.get("/providerlist").then((function(e){t.providers=e.data.data})).catch((function(t){console.log(t)}))},getPayment:function(){var t=this;axios.get("/paymentmethodsget").then((function(e){t.payments=e.data.data})).catch((function(t){console.log(t)}))},agregar:function(t){var e=this;""!=this.selectProv&&null!=this.selectProv?""!=this.selectStore&&null!=this.selectStore?""!=this.selectpame&&null!=this.selectpame?(this.desserts.length>0?this.detail.prpu_pk=this.prpo_pk:this.detail.prpu_pk=0,this.detail.prod_fk=t.prod_pk,this.detail.prpd_quantity=1,this.detail.prpd_price=0,this.detail.prpd_discountrate=0,this.detail.prov_fk=this.selectProv.prov_pk,this.detail.stor_fk=this.selectStore.stor_pk,this.detail.pame_fk=this.selectpame.pame_pk,axios.post("/provider/purchase/details",this.detail).then((function(t){console.log(t),200==t.data.status.code?(e.textMsg="¡Actualizado correctamente!",e.prpo_pk=t.data.data,e.createCompra(),e.dialog=!1,e.getTotal()):e.normal("Notificación",t.data.message,"error")})).catch((function(t){e.errors.push(t)}))):this.normal("Notificación","Debe seleccionar una forma de pago","error"):this.normal("Notificación","Debe seleccionar una sucursal","error"):this.normal("Notificación","Debe seleccionar un proveedor","error")},borrar:function(t){console.log(t),this.editado=Object.assign({},t),this.dialogQuestionDelete=!0},guardaBorrar:function(){this.delete(),this.dialogQuestionDelete=!1},delete:function(){var t=this;axios.post("/provider/purchase/details/destroy",this.editado).then((function(e){console.log(e),200==e.data.status.code?(t.textMsg="¡Eliminado correctamente!",t.normal("Notificación",t.textMsg,"success"),t.createCompra()):t.normal("Notificación","Ocurrio un error al eliminar el producto","error")}))},createCompra:function(){var t=this;this.loading=!0,1==this.directa?axios.post("/provider/purchases?prpo_pk="+this.prpo_pk).then((function(e){if(setTimeout((function(){return t.loading=!1}),2e3),null!=e.data.data){t.desserts=e.data.data.ProviderPurchaseDetail,t.getTotal(),t.prpu_pk=e.data.data.ProviderPurchase.prpu_pk,t.editadoHeader=e.data.data.ProviderPurchase;var r=0;for(r=0;r<t.providers.length;r++)e.data.data.ProviderPurchase.prov_fk==t.providers[r].prov_pk&&(t.selectProv=t.providers[r]);for(r=0;r<t.stores.length;r++)e.data.data.ProviderPurchase.stor_fk==t.stores[r].stor_pk&&(console.log(r),t.selectStore=t.stores[r])}else t.prpo_pk>0&&t.normal("Notificación",e.data.status.message,"error")})).catch((function(e){console.log(e),t.normal("Notificación","Error al cargar los datos","error")})):axios.get("/provider/purchases/"+this.prpo_pk).then((function(e){setTimeout((function(){return t.loading=!1}),2e3),null!=e.data.data?(console.log(e),t.desserts=e.data.data.ProviderPurchaseDetail,t.getTotal(),t.prpu_pk=e.data.data.ProviderPurchase.prpu_pk,t.editadoHeader=e.data.data.ProviderPurchase):t.normal("Notificación",e.data.status.message,"error")})).catch((function(e){console.log(e),t.normal("Notificación","Error al cargar los datos","error")}))},cancelar:function(){this.dialog=!1,this.editado=Object.assign({},this.defaultItem),this.editedIndex=-1},buscar:function(){var t=this;axios.get("/product/search").then((function(e){t.products=e.data.data,t.dialog=!0,console.log(e.data)})).catch((function(e){t.errors.push(e)}))},onQuantityChange:function(t){var e=this;this.detail.prpd_pk=t.prpd_pk,this.detail.prod_fk=t.prod_pk,this.detail.prpd_quantity=t.prpd_quantity,this.detail.prpd_price=t.prpd_price,this.detail.prpd_discountrate=t.prpd_discountrate,axios.post("/provider/purchase/details/update",this.detail).then((function(t){console.log(t),200==t.data.status.code?(e.textMsg="¡Actualizado correctamente!",e.getTotal()):e.normal("Notificación",t.data.status.message,"success")})).catch((function(t){e.errors.push(t)}))},getTotal:function(){this.subtotal=0;for(var t=0;t<this.desserts.length;t++)this.subtotal=this.subtotal+this.desserts[t].prpd_price*this.desserts[t].prpd_quantity*(1-this.desserts[t].prpd_discountrate/100),console.log(this.subtotal);this.total=this.subtotal+this.iva},finalizar:function(){this.total<=0?this.normal("Notificación","La orden de compra no puede ser menor o igual a cero","error"):""!=this.selectProv&&null!=this.selectProv?""!=this.selectStore&&null!=this.selectStore?""!=this.selectpame&&null!=this.selectpame?(this.messageQuestion="¿Está seguro de finalizar la compra?",this.dialogQuestion=!0):this.normal("Notificación","Debe seleccionar una forma de pago","error"):this.normal("Notificación","Debe seleccionar una sucursal","error"):this.normal("Notificación","Debe seleccionar un proveedor","error")},guardaFinalizar:function(){var t=this;this.orderHeader.prpu_pk=this.prpu_pk,this.orderHeader.prpo_pk=this.prpo_pk,this.orderHeader.prov_fk=this.selectProv.prov_pk,this.orderHeader.stor_fk=this.selectStore.stor_pk,this.orderHeader.pame_fk=this.selectpame.pame_pk,this.orderHeader.prpu_amount=this.total,console.log("this.orderHeader"),console.log(this.orderHeader),axios.post("/provider/purchases/update",this.orderHeader).then((function(e){console.log(e),200==e.data.status.code?(t.textMsg="¡Actualizado correctamente!",t.normal("Notificación","¡Actualizado correctamente!","success"),t.$router.push("/purchaselist")):t.normal("Notificación","Ocurrio un error al finalizar la compra","error")})).catch((function(e){t.errors.push(e)}))},finalizarVenta:function(){var t=this;(console.log(this.total+"-"+(this.efectivo+this.tarjeta)),1!=this.editadoSale.pame_fk||this.total-this.efectivo-this.tarjeta==0)?1==confirm("¿Está seguro de finalizar la compra?")&&(this.editadoSale.clde_amount=this.total,this.editadoSale.clpa_amount_cash=this.efectivo,this.editadoSale.clpa_amount_transfer=this.tarjeta,axios.post("/clientsales/update",this.editadoSale).then((function(e){console.log(e),200==e.data.code?(t.textMsg="¡Actualizado correctamente!",t.normal("Notificación","¡Actualizado correctamente!","success"),t.$router.push("/sales")):t.normal("Notificación",e.data.message,"error")})).catch((function(e){t.errors.push(e)}))):this.normal("Notificación","Los montos de pago deben ser igual al total","error")},actualizar:function(t){var e=this;this.editado=Object.assign({},t),axios.post("/client_sale_details/update",this.editado).then((function(t){e.textMsg="¡Actualizado correctamente!"})).catch((function(t){e.errors.push(t)}))},normal:function(t,e,r){this.notice=new i.a({title:t,description:e,className:"open-normal",closable:!0,duration:3,type:r})}}},a=r(0),s=Object(a.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-container",[r("v-snackbar",{attrs:{color:"#000000",timeout:t.timeout},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n                "+t._s(t.textMsg)+"\n                "),r("v-btn",{attrs:{color:"blue",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\n                    Cerrar\n                ")])],1),t._v(" "),r("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[r("v-card",{attrs:{color:"white"}},[r("v-card-text",[t._v("\n                    Cargando\n                    "),r("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),t._v(" "),r("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialogQuestion,callback:function(e){t.dialogQuestion=e},expression:"dialogQuestion"}},[r("v-card",[r("v-card-title",{staticClass:"headline"},[t._v("Información")]),t._v(" "),r("v-card-text",[t._v(t._s(t.messageQuestion)+".")]),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.dialogQuestion=!1}}},[t._v("Cancelar")]),t._v(" "),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:t.guardaFinalizar}},[t._v("Continuar")])],1)],1)],1),t._v(" "),r("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialogQuestionDelete,callback:function(e){t.dialogQuestionDelete=e},expression:"dialogQuestionDelete"}},[r("v-card",[r("v-card-title",{staticClass:"headline"},[t._v("Alerta")]),t._v(" "),r("v-card-text",[t._v("¿Está seguro de borrar el registro?")]),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.dialogQuestionDelete=!1}}},[t._v("Cancelar")]),t._v(" "),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:t.guardaBorrar}},[t._v("Continuar")])],1)],1)],1),t._v(" "),r("v-dialog",{attrs:{"max-width":"800px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",[r("v-card-title",{staticClass:"cyan white--text"},[r("span",{staticClass:"headline"},[t._v("Buscar producto")])]),t._v(" "),r("v-data-table",{staticClass:"elevation-3",attrs:{headers:t.headers,items:t.products,search:t.search,"sort-by":"id"},scopedSlots:t._u([{key:"top",fn:function(){return[r("v-col",{attrs:{cols:"12",sm:"12"}},[r("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]},proxy:!0},{key:"item.prod_saleprice",fn:function(e){var o=e.item;return[r("v-label",[t._v("$"+t._s(t.formatMoney(o.prod_saleprice)))])]}},{key:"item.bulk",fn:function(e){return[1==e.item.prod_bulk?r("v-chip",{attrs:{color:"green",outlined:""}},[t._v(" \n                    Granel")]):r("v-chip",{attrs:{color:"red",outlined:""}},[t._v("NA Granel")])]}},{key:"item.action",fn:function(e){var o=e.item;return[r("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"green",title:"Agregar producto"},on:{click:function(e){return t.agregar(o)}}},[r("v-icon",{attrs:{dark:""}},[t._v("mdi-checkbox-marked-circle")])],1)]}}])})],1)],1),t._v(" "),r("v-row",[r("v-col",[r("v-card",[r("v-row",[r("v-col",{attrs:{cols:"4"}},[r("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[1==t.directa?r("v-label",[r("h3",[t._v("Proveedor:")]),t._v(" "+t._s(t.editadoHeader.prov_name))]):t._e(),t._v(" "),2==t.directa?r("v-combobox",{attrs:{required:"",items:t.stores,label:"Sucursal",disabled:t.enabledStore,"item-text":"stor_name","item-value":"stor_pk",filled:"",chips:"",placeholder:"Seleccionar una sucursal"},model:{value:t.selectStore,callback:function(e){t.selectStore=e},expression:"selectStore"}}):t._e()],1)],1),t._v(" "),r("v-col",{attrs:{cols:"4"}},[r("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[1==t.directa?r("v-label",[r("h3",[t._v("Sucursal:")]),t._v(" "+t._s(t.editadoHeader.stor_name))]):t._e(),t._v(" "),2==t.directa?r("v-combobox",{attrs:{required:"",items:t.providers,label:"Proveedor","item-text":"prov_name","item-value":"prov_pk",filled:"",chips:"",placeholder:"Seleccionar una proveedor"},model:{value:t.selectProv,callback:function(e){t.selectProv=e},expression:"selectProv"}}):t._e()],1)],1),t._v(" "),r("v-col",{attrs:{cols:"4"}},[r("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[r("v-combobox",{attrs:{required:"",items:t.payments,label:"Método de pago","item-text":"pame_name","item-value":"pame_pk",filled:"",chips:"",placeholder:"Seleccionar una opción"},model:{value:t.selectpame,callback:function(e){t.selectpame=e},expression:"selectpame"}})],1)],1)],1),t._v(" "),r("v-row",[r("v-col",[2==t.directa?r("v-btn",{staticClass:"ma-2",attrs:{tile:"",outlined:"",color:"blue"},on:{click:t.buscar}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-file-find")]),t._v(" Buscar Producto\n                ")],1):t._e(),t._v(" "),r("v-btn",{attrs:{dark:"",color:"success",outlined:""},on:{click:t.finalizar}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-checkbox-marked-circle")]),t._v(" Finalizar\n                ")],1)],1)],1)],1)],1)],1),t._v(" "),r("v-row",[r("v-col",[r("v-card",[r("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[r("thead",[r("tr",[r("th",{staticClass:"text-left"},[t._v("ID")]),t._v(" "),r("th",{staticClass:"text-left"},[t._v("Producto")]),t._v(" "),r("th",{staticClass:"text-left"},[t._v("Unidad Medida")]),t._v(" "),r("th",{staticClass:"text-left"},[t._v("Cantidad")]),t._v(" "),r("th",{staticClass:"text-left"},[t._v("Precio")]),t._v(" "),r("th",{staticClass:"text-left"},[t._v("Descuento")]),t._v(" "),r("th",{staticClass:"text-left"},[t._v("Importe")]),t._v(" "),r("th"),t._v(" "),r("th")])]),t._v(" "),r("tbody",[t._l(t.desserts,(function(e){return r("tr",{key:e.prod_name},[r("td",[t._v(t._s(e.prod_identifier))]),t._v(" "),r("td",[t._v(t._s(e.prod_name))]),t._v(" "),r("td",[t._v(t._s(e.meas_name))]),t._v(" "),r("td",[r("v-text-field",{attrs:{label:"",required:""},on:{change:function(r){return t.onQuantityChange(e)}},model:{value:e.prpd_quantity,callback:function(r){t.$set(e,"prpd_quantity",r)},expression:"item.prpd_quantity"}})],1),t._v(" "),r("td",[r("v-text-field",{attrs:{label:"",required:""},on:{change:function(r){return t.onQuantityChange(e)}},model:{value:e.prpd_price,callback:function(r){t.$set(e,"prpd_price",r)},expression:"item.prpd_price"}})],1),t._v(" "),r("td",[r("v-text-field",{attrs:{label:"",required:""},on:{change:function(r){return t.onQuantityChange(e)}},model:{value:e.prpd_discountrate,callback:function(r){t.$set(e,"prpd_discountrate",r)},expression:"item.prpd_discountrate"}})],1),t._v(" "),r("td",[t._v("$"+t._s(t.formatMoney(e.prpd_quantity*e.prpd_price*(1-e.prpd_discountrate/100))))]),t._v(" "),r("td",[r("v-icon",{attrs:{small:""},on:{click:function(r){return t.borrar(e)}}},[t._v("mdi-delete")])],1)])})),t._v(" "),r("tr",[r("td"),t._v(" "),r("td"),t._v(" "),r("td"),t._v(" "),r("td"),t._v(" "),r("td",[t._v("Subtotal")]),t._v(" "),r("td",[t._v("$"+t._s(t.formatMoney(t.subtotal)))]),t._v(" "),r("td")]),t._v(" "),r("tr",[r("td"),t._v(" "),r("td"),t._v(" "),r("td"),t._v(" "),r("td"),t._v(" "),r("td",[t._v("I.V.A.")]),t._v(" "),r("td",[t._v("$"+t._s(t.formatMoney(t.iva)))]),t._v(" "),r("td")])],2),t._v(" "),r("tfoot",[r("tr",[r("td"),t._v(" "),r("td"),t._v(" "),r("td"),t._v(" "),r("td"),t._v(" "),r("td",[t._v("Total")]),t._v(" "),r("td",[t._v("$"+t._s(t.formatMoney(t.total)))]),t._v(" "),r("td")])])]},proxy:!0}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=s.exports}}]);