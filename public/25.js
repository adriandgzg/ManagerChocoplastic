(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{1:function(t,e,r){var n;"undefined"!=typeof self&&self,t.exports=(n=r(2),function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=9)}([function(t,e){t.exports=n},function(t,e){function r(t,e){var r=t[1]||"",n=t[3];if(!n)return r;if(e&&"function"==typeof btoa){var i=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(n);return[r].concat(n.sources.map((function(t){return"/*# sourceURL="+n.sourceRoot+t+" */"}))).concat([i]).join("\n")}return[r].join("\n")}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=r(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n})).join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(n[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&n[a[0]]||(r&&!a[2]?a[2]=r:r&&(a[2]="("+a[2]+") and ("+r+")"),e.push(a))}},e}},function(t,e,r){function n(t){for(var e=0;e<t.length;e++){var r=t[e],n=d[r.id];if(n){n.refs++;for(var i=0;i<n.parts.length;i++)n.parts[i](r.parts[i]);for(;i<r.parts.length;i++)n.parts.push(o(r.parts[i]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{var a=[];for(i=0;i<r.parts.length;i++)a.push(o(r.parts[i]));d[r.id]={id:r.id,refs:1,parts:a}}}}function i(){var t=document.createElement("style");return t.type="text/css",u.appendChild(t),t}function o(t){var e,r,n=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(n){if(h)return v;n.parentNode.removeChild(n)}if(m){var o=f++;n=p||(p=i()),e=a.bind(null,n,o,!1),r=a.bind(null,n,o,!0)}else n=i(),e=s.bind(null,n),r=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else r()}}function a(t,e,r,n){var i=r?"":n.css;if(t.styleSheet)t.styleSheet.cssText=_(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function s(t,e){var r=e.css,n=e.media,i=e.sourceMap;if(n&&t.setAttribute("media",n),i&&(r+="\n/*# sourceURL="+i.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var c="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!c)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l=r(15),d={},u=c&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,h=!1,v=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,r){h=r;var i=l(t,e);return n(i),function(e){for(var r=[],o=0;o<i.length;o++){var a=i[o];(s=d[a.id]).refs--,r.push(s)}for(e?n(i=l(t,e)):i=[],o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete d[s.id]}}}};var _=function(){var t=[];return function(e,r){return t[e]=r,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e,r,n,i,o){var a,s=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(a=t,s=t.default);var l,d="function"==typeof s?s.options:s;if(e&&(d.render=e.render,d.staticRenderFns=e.staticRenderFns,d._compiled=!0),r&&(d.functional=!0),i&&(d._scopeId=i),o?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},d._ssrRegister=l):n&&(l=n),l){var u=d.functional,p=u?d.render:d.beforeCreate;u?(d._injectStyles=l,d.render=function(t,e){return l.call(e),p(t,e)}):d.beforeCreate=p?[].concat(p,l):[l]}return{esModule:a,exports:s,options:d}}},function(t,e,r){"use strict";var n=r(11),i=r(8),o=new n.a(i.a),a=function(t,e){"normal"!==e&&(t.type=e);var r=Object.assign({},i.b,o.noticeDefaults,t);return o.push(r)},s={error:function(t){return a(t,"error")},info:function(t){return a(t,"info")},open:function(t){return a(t,"normal")},success:function(t){return a(t,"success")},warning:function(t){return a(t,"warning")},close:function(t){o.remove(t)},config:function(t){var e=Object.assign({},i.a,t);return o.configure(e),e}};e.a=s},function(t,e,r){"use strict";var n=r(0),i=r.n(n),o=r(16);e.a=i.a.extend({name:"CripNotices",components:{Notice:o.a},props:{className:{type:String},icons:{type:Object},styles:{type:Object}},data:function(){return{notices:[]}},methods:{add:function(t){this.notices.push(t)},remove:function(t){var e=this;this.notices.forEach((function(r,n){r.name===t&&e.notices.splice(n,1)}))},removeAll:function(){this.notices=[]}}})},function(t,e,r){"use strict";var n=r(0),i=r.n(n),o=r(19),a=["normal","info","success","warning","error"];e.a=i.a.extend({name:"CripNotice",components:{NoticeContent:o.a},props:{type:{type:String,required:!0,validator:function(t){return a.indexOf(t)>-1}},className:{type:String},closable:{type:Boolean,required:!0},description:{type:String},duration:{type:Number,required:!0},icons:{type:Object,required:!0},name:{type:String,required:!0},onClose:{type:Function},styles:{type:Object,default:function(){return{}}},title:{type:String,required:!0}},computed:{withDesc:function(){return!!this.description}},data:function(){return{closeTimer:0}},methods:{setCloseTimer:function(){var t=this;0!==this.duration&&(this.closeTimer=window.setTimeout((function(){t.close()}),1e3*this.duration))},clearCloseTimer:function(){this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=0)},close:function(){this.onClose(),this.clearCloseTimer(),this.$parent.$parent.remove(this.name)}},mounted:function(){this.clearCloseTimer(),this.setCloseTimer()},beforeDestroy:function(){this.clearCloseTimer()}})},function(t,e,r){"use strict";var n=r(0),i=r.n(n);e.a=i.a.extend({name:"CripNoticeContent",props:{description:{type:String},icons:{type:Object},title:{type:String,required:!0},type:{type:String,required:!0}},computed:{withIcon:function(){return"normal"!==this.type},withDesc:function(){return!!this.description}}})},function(t,e,r){"use strict";r.d(e,"b",(function(){return n})),e.a={className:"",closable:!0,duration:4.5,icons:{close:"fa fa-times",error:"fa fa-times-circle",info:"fa fa-info-circle",success:"fa fa-check-circle",warning:"fa fa-exclamation-circle"},styles:{top:"15px",right:"15px"}};var n={className:"",closable:!0,description:"",duration:4.5,name:"",onClose:function(){return null},styles:{},title:"",type:"normal"}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(10),i=r(4),o=function(){function t(t){this.name=i.a.open(t)}return t.prototype.close=function(){i.a.close(this.name)},t}();e.default=o,o.install=n.a,o.version="1.1.1"},function(t,e,r){"use strict";e.a=function(t,e){if(!c||n!==t){c=!0,n=t;var r=Object.assign({},s.a,e);a.a.config(r),Object.defineProperty(o.a,"notice",{get:function(){return a.a}}),Object.defineProperty(o.a.prototype,"$notice",{get:function(){return a.a}})}};var n,i=r(0),o=r.n(i),a=r(4),s=r(8),c=!1},function(t,e,r){"use strict";var n=r(0),i=r.n(n),o=r(12),a=0,s=function(){function t(t){var e=this;this.options=t,this.component=new i.a({render:function(t){return t(o.a,{props:e.options})}});var r=this.component.$mount();document.body.appendChild(r.$el),this.instance=this.component.$children[0]}return Object.defineProperty(t.prototype,"noticeDefaults",{get:function(){return{closable:this.options.closable,duration:this.options.duration,title:""}},enumerable:!0,configurable:!0}),t.prototype.push=function(t){return t.name=t.name||"crip-"+Date.now()+"-"+ ++a,this.instance.add(t),t.name.toString()},t.prototype.remove=function(t){this.instance.remove(t)},t.prototype.configure=function(t){Object.assign(this.options,t),this.component.$forceUpdate()},t}();e.a=s},function(t,e,r){"use strict";var n=r(5),i=r(24),o=function(t){r(13)},a=r(3)(n.a,i.a,!1,o,"data-v-45f75f8b",null);e.a=a.exports},function(t,e,r){var n=r(14);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals),r(2)("32e15c8a",n,!0)},function(t,e,r){(t.exports=r(1)(void 0)).push([t.i,".crip-notices[data-v-45f75f8b]{width:335px;position:fixed;z-index:999990}.fade-horizontal[data-v-45f75f8b]{transition:all .7s ease-out}.fade-horizontal-enter[data-v-45f75f8b],.fade-horizontal-leave-to[data-v-45f75f8b]{opacity:0;transform:translateX(325px)}.fade-horizontal-leave-active[data-v-45f75f8b]{transition:all .7s ease-in;position:absolute;width:100%}",""])},function(t,e){t.exports=function(t,e){for(var r=[],n={},i=0;i<e.length;i++){var o=e[i],a=o[0],s={id:t+":"+i,css:o[1],media:o[2],sourceMap:o[3]};n[a]?n[a].parts.push(s):r.push(n[a]={id:a,parts:[s]})}return r}},function(t,e,r){"use strict";var n=r(6),i=r(23),o=function(t){r(17)},a=r(3)(n.a,i.a,!1,o,"data-v-3a456426",null);e.a=a.exports},function(t,e,r){var n=r(18);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals),r(2)("2d80ad4a",n,!0)},function(t,e,r){(t.exports=r(1)(void 0)).push([t.i,'.crip-notice[data-v-3a456426]{margin-bottom:10px;padding:16px;border-radius:3px;box-shadow:0 1px 6px rgba(0,0,0,.2);background:#fff;line-height:1;position:relative;overflow:hidden}.crip-notice[data-v-3a456426]:after{content:"";display:block;width:4px;position:absolute;top:0;bottom:0;left:0}.crip-notice-info[data-v-3a456426]:after,.crip-notice-normal[data-v-3a456426]:after{background:#2a88bd}.crip-notice-success[data-v-3a456426]:after{background:#259d6d}.crip-notice-warning[data-v-3a456426]:after{background:#c5b143}.crip-notice-error[data-v-3a456426]:after{background:#aa4a24}.crip-notice-close[data-v-3a456426]{position:absolute;right:16px;top:15px;color:#999;outline:none}.crip-notice-close i[data-v-3a456426]{font-size:22px;color:#636b6f;transition:color .2s ease;position:relative;top:-3px}.crip-notice-close i[data-v-3a456426]:hover{color:#444}.crip-notice-with-desc .crip-notice-close[data-v-3a456426]{top:11px}',""])},function(t,e,r){"use strict";var n=r(7),i=r(22),o=function(t){r(20)},a=r(3)(n.a,i.a,!1,o,null,null);e.a=a.exports},function(t,e,r){var n=r(21);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals),r(2)("c1adc606",n,!0)},function(t,e,r){(t.exports=r(1)(void 0)).push([t.i,".crip-notice-content.crip-notice-with-desc .crip-notice-title{font-weight:700;margin-bottom:8px}.crip-notice-content.crip-notice-with-desc .crip-notice-icon{font-size:36px}.crip-notice-content.crip-notice-with-icon .crip-notice-desc,.crip-notice-content.crip-notice-with-icon .crip-notice-title{margin-left:22px}.crip-notice-content.crip-notice-with-icon.crip-notice-with-desc .crip-notice-desc,.crip-notice-content.crip-notice-with-icon.crip-notice-with-desc .crip-notice-title{margin-left:51px}.crip-notice-content .crip-notice-icon{position:absolute;left:20px;top:50%;transform:translateY(-50%);font-size:16px}.crip-notice-content .crip-notice-icon-success{color:#259d6d}.crip-notice-content .crip-notice-icon-info{color:#2a88bd}.crip-notice-content .crip-notice-icon-warning{color:#c5b143}.crip-notice-content .crip-notice-icon-error{color:#aa4a24}.crip-notice-content .crip-notice-title{font-size:14px;color:#1c2438;padding-right:30px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.crip-notice-content .crip-notice-desc{font-size:12px;color:#636b6f;text-align:justify;line-height:1.5}",""])},function(t,e,r){"use strict";var n={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"crip-notice-content",class:{"crip-notice-with-icon":t.withIcon,"crip-notice-with-desc":t.withDesc}},[t.withIcon?r("span",{staticClass:"crip-notice-icon",class:["crip-notice-icon-"+t.type]},[r("i",{class:[""+t.icons[t.type]]})]):t._e(),t._v(" "),r("div",{staticClass:"crip-notice-title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),r("div",{staticClass:"crip-notice-desc",domProps:{innerHTML:t._s(t.description)}}),t._v(" "),t._t("default")],2)},staticRenderFns:[]};e.a=n},function(t,e,r){"use strict";var n={render:function(){var t,e=this,r=e.$createElement,n=e._self._c||r;return n("div",{staticClass:"crip-notice",class:(t={"crip-notice-closable":e.closable,"crip-notice-with-desc":e.withDesc},t["crip-notice-"+e.type]=!0,t[e.className]=!!e.className,t),style:e.styles,on:{mousemove:e.clearCloseTimer,mouseover:e.clearCloseTimer,mouseout:e.setCloseTimer}},[n("notice-content",{attrs:{type:e.type,title:e.title,description:e.description,icons:e.icons}},[e.closable?n("a",{staticClass:"crip-notice-close",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.close(t)}}},[n("i",{class:e.icons.close})]):e._e()])],1)},staticRenderFns:[]};e.a=n},function(t,e,r){"use strict";var n={render:function(){var t,e=this,r=e.$createElement,n=e._self._c||r;return n("div",{class:(t={},t["crip-notices"]=!0,t[e.className]=!!e.className,t),style:e.styles},[n("transition-group",{attrs:{name:"fade-horizontal",tag:"div"}},e._l(e.notices,(function(t){return n("div",{key:t.name,staticClass:"fade-horizontal"},[n("notice",{attrs:{type:t.type,title:t.title,name:t.name,description:t.description,icons:e.icons,duration:t.duration,styles:t.styles,"on-close":t.onClose,"class-name":t.className,closable:t.closable}})],1)})))],1)},staticRenderFns:[]};e.a=n}]).default)},67:function(t,e,r){"use strict";r.r(e);var n=r(1),i=r.n(n);function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var a={data:function(){var t;return o(t={headers:[{text:"Ident",value:"prod_identifier"},{text:"Nombre",value:"prod_name"},{text:"Unidad",value:"meas_fk_input_name"},{text:"Tipo",value:"bulk"},{text:"",value:"action",width:"20%"}],prtr_pk:this.$route.params.id,directa:this.$route.params.directa,prtr_observation:"",prpu_pk:0,valid:!1,stores:[],providers:[],desserts:[],products:[],selectProv:"",selectStore:"",payments:[],selectpame:"",search:"",snackbar:!1,timeout:2e3,subtotal:0,total:0,iva:0,textMsg:"",editadoHeader:{prpu_pk:0,prov_fk:0,prov_name:"",prpo_fk:0,stor_fk:0,store_name:"",pame_fk:0,pame_name:"",prpu_identifier:"",prpu_type:0,prpu_status:0,created_at:"",updated_at:"",prtr_observation:"",stor_name_output:"",stor_name_input:"",prtr_identifier:""},editado:{prtd_pk:0,prtd_quantity:0,prtd_price:0,prtd_discountrate:0,prod_pk:0,prod_identifier:0,prod_name:"",prod_description:"",meas_name:""},defaultItem:{prtd_pk:0,prtd_quantity:0,prtd_price:0,prtd_discountrate:0,prod_pk:0,prod_identifier:0,prod_name:"",prod_description:"",meas_name:""},detail:{prpu_pk:0,prtr_fk:0,pame_fk:0,prov_fk:0,stor_fk:0,prpo_fk:0,prod_fk:0,prtd_pk:0,prtd_quantity:0,prtd_price:0,prtd_discountrate:0},detailDefault:{prpo_fk:0,prod_fk:0,prtd_pk:0,prtd_quantity:0,prtd_price:0,prtd_discountrate:0},orderHeader:{prpu_pk:0,prtr_pk:0,prov_fk:0,stor_fk_input:0,pame_fk:0,prpu_amount:0,prtr_observation:"",stor_name_output:"",stor_name_input:"",prtr_identifier:""},enabledStore:!1,dialogcredito:!1,dialogcontado:!1,dialog:!1,dialogQuestion:!1,dialogQuestionDelete:!1,messageQuestion:"",minNumberRules:[function(t){return!!t||"Requerido."},function(t){return t>0||"El número debe ser mayor o igual a cero"}],loading:!1},"dialogQuestion",!1),o(t,"dialogQuestionDelete",!1),o(t,"messageQuestion",""),t},created:function(){this.getStores(),this.getProviders(),this.createCompra(),this.getPayment()},methods:{getUsers:function(){var t=this;axios.get("/users").then((function(e){t.users=e.data.data,t.users[0].store_id>0?(t.enabledStore=!0,t.selectStore=t.stores.find((function(e){return e.stor_pk==t.users[0].store_id}))):t.enabledStore=!1})).catch((function(e){t.errors.push(e)}))},formatMoney:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",";try{e=Math.abs(e),e=isNaN(e)?2:e;var i=t<0?"-":"",o=parseInt(t=Math.abs(Number(t)||0).toFixed(e)).toString(),a=o.length>3?o.length%3:0;return i+(a?o.substr(0,a)+n:"")+o.substr(a).replace(/(\d{3})(?=\d)/g,"$1"+n)+(e?r+Math.abs(t-o).toFixed(e).slice(2):"")}catch(t){console.log(t)}},getStores:function(){var t=this;axios.get("/storeget").then((function(e){t.stores=e.data.data})).catch((function(t){console.log(t)}))},getProviders:function(){var t=this;axios.get("/providerlist").then((function(e){t.providers=e.data.data})).catch((function(t){console.log(t)}))},getPayment:function(){var t=this;axios.get("/paymentmethodsget").then((function(e){t.payments=e.data.data})).catch((function(t){console.log(t)}))},agregar:function(t){var e=this;this.desserts.length>0?this.detail.prtr_fk=this.prtr_pk:this.detail.prtr_fk=0,this.detail.prod_fk=t.prod_pk,this.detail.prtd_quantity=1,this.detail.prtd_price=0,this.detail.prtd_discountrate=0,this.detail.prov_fk=this.selectProv.prov_pk,this.detail.stor_fk=this.selectStore.stor_pk,this.detail.pame_fk=this.selectpame.pame_pk,axios.post("/product/transfer/details",this.detail).then((function(t){console.log(t),200==t.data.status.code?(e.textMsg="¡Actualizado correctamente!",e.prtr_pk=t.data.data,e.createCompra(),e.dialog=!1):e.normal("Notificación",t.data.message,"error")})).catch((function(t){e.errors.push(t)}))},borrar:function(t){console.log(t),this.editado=Object.assign({},t),this.dialogQuestionDelete=!0},guardaBorrar:function(){this.delete(),this.dialogQuestionDelete=!1},delete:function(){var t=this;axios.post("/product/transfer/details/destroy",this.editado).then((function(e){console.log(e),200==e.data.status.code?(t.textMsg="¡Eliminado correctamente!",t.normal("Notificación",t.textMsg,"success"),t.createCompra()):t.normal("Notificación","Ocurrio un error al eliminar el producto","error")}))},createCompra:function(){var t=this;this.loading=!0,axios.get("/product/transfers/"+this.prtr_pk).then((function(e){setTimeout((function(){return t.loading=!1}),2e3),null!=e.data.data?(console.log(e),t.desserts=e.data.data.ProductTransferDetails,t.prtr_pk=e.data.data.ProductTransfers.prtr_pk,t.editadoHeader=e.data.data.ProductTransfers):t.normal("Notificación",e.data.status.message,"error")})).catch((function(e){console.log(e),t.normal("Notificación","Error al cargar los datos","error")}))},cancelar:function(){this.dialog=!1,this.editado=Object.assign({},this.defaultItem),this.editedIndex=-1},buscar:function(){var t=this;axios.get("/product/search").then((function(e){t.products=e.data.data,t.dialog=!0,console.log(e.data)})).catch((function(e){t.errors.push(e)}))},onQuantityChange:function(t){var e=this;this.detail.prtd_pk=t.prtd_pk,this.detail.prod_fk=t.prod_pk,this.detail.prtd_quantity=t.prtd_quantity,this.detail.prtd_price=t.prtd_price,this.detail.prtd_discountrate=t.prtd_discountrate,axios.post("/product/transfer/details/update",this.detail).then((function(t){console.log(t),200==t.data.status.code?e.textMsg="¡Actualizado correctamente!":e.normal("Notificación",t.data.status.message,"success")})).catch((function(t){e.errors.push(t)}))},getTotal:function(){this.subtotal=0;for(var t=0;t<this.desserts.length;t++)this.subtotal=this.subtotal+this.desserts[t].prtd_price*this.desserts[t].prtd_quantity*(1-this.desserts[t].prtd_discountrate/100),console.log(this.subtotal);this.total=this.subtotal+this.iva},finalizar:function(){""!=this.selectStore&&null!=this.selectStore?(this.messageQuestion="¿Está seguro de finalizar el traspaso?",this.dialogQuestion=!0):this.normal("Notificación","Debe seleccionar una sucursal","error")},guardaFinalizar:function(){var t=this;this.orderHeader.prtr_pk=this.prtr_pk,this.orderHeader.stor_fk_input=this.selectStore.stor_pk,this.orderHeader.prtr_observation=this.prtr_observation,console.log(this.orderHeader),axios.post("/product/transfers/update",this.orderHeader).then((function(e){console.log(e),200==e.data.status.code?(t.textMsg="¡Actualizado correctamente!",t.normal("Notificación","¡Actualizado correctamente!","success"),t.$router.push("/transferlist")):t.normal("Notificación","Ocurrio un error al finalizar la compra","error")})).catch((function(e){t.errors.push(e)}))},finalizarVenta:function(){var t=this;(console.log(this.total+"-"+(this.efectivo+this.tarjeta)),1!=this.editadoSale.pame_fk||this.total-this.efectivo-this.tarjeta==0)?1==confirm("¿Está seguro de finalizar la compra?")&&(this.editadoSale.clde_amount=this.total,this.editadoSale.clpa_amount_cash=this.efectivo,this.editadoSale.clpa_amount_transfer=this.tarjeta,axios.post("/clientsales/update",this.editadoSale).then((function(e){console.log(e),200==e.data.code?(t.textMsg="¡Actualizado correctamente!",t.normal("Notificación","¡Actualizado correctamente!","success"),t.$router.push("/sales")):t.normal("Notificación",e.data.message,"error")})).catch((function(e){t.errors.push(e)}))):this.normal("Notificación","Los montos de pago deben ser igual al total","error")},actualizar:function(t){var e=this;this.editado=Object.assign({},t),axios.post("/client_sale_details/update",this.editado).then((function(t){e.textMsg="¡Actualizado correctamente!"})).catch((function(t){e.errors.push(t)}))},normal:function(t,e,r){this.notice=new i.a({title:t,description:e,className:"open-normal",closable:!0,duration:3,type:r})}}},s=r(0),c=Object(s.a)(a,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-container",[r("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[r("v-card",{attrs:{color:"white"}},[r("v-card-text",[t._v("\n          Cargando\n          "),r("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"green"}})],1)],1)],1),t._v(" "),r("v-snackbar",{attrs:{color:"#000000",timeout:t.timeout},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n                "+t._s(t.textMsg)+"\n                "),r("v-btn",{attrs:{color:"blue",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\n                    Cerrar\n                ")])],1),t._v(" "),r("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialogQuestion,callback:function(e){t.dialogQuestion=e},expression:"dialogQuestion"}},[r("v-card",[r("v-card-title",{staticClass:"headline"},[t._v("Información")]),t._v(" "),r("v-card-text",[t._v(t._s(t.messageQuestion)+".")]),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.dialogQuestion=!1}}},[t._v("Cancelar")]),t._v(" "),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:t.guardaFinalizar}},[t._v("Continuar")])],1)],1)],1),t._v(" "),r("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialogQuestionDelete,callback:function(e){t.dialogQuestionDelete=e},expression:"dialogQuestionDelete"}},[r("v-card",[r("v-card-title",{staticClass:"headline"},[t._v("Alerta")]),t._v(" "),r("v-card-text",[t._v("¿Está seguro de borrar el registro?")]),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.dialogQuestionDelete=!1}}},[t._v("Cancelar")]),t._v(" "),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:t.guardaBorrar}},[t._v("Continuar")])],1)],1)],1),t._v(" "),r("v-dialog",{attrs:{"max-width":"800px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",[r("v-card-title",{staticClass:"cyan white--text"},[r("span",{staticClass:"headline"},[t._v("Buscar producto")])]),t._v(" "),r("v-data-table",{staticClass:"elevation-3",attrs:{headers:t.headers,items:t.products,search:t.search,"sort-by":"id"},scopedSlots:t._u([{key:"top",fn:function(){return[r("v-col",{attrs:{cols:"12",sm:"12"}},[r("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]},proxy:!0},{key:"item.prod_saleprice",fn:function(e){var n=e.item;return[r("v-label",[t._v("$"+t._s(t.formatMoney(n.prod_saleprice)))])]}},{key:"item.bulk",fn:function(e){return[1==e.item.prod_bulk?r("v-chip",{attrs:{color:"green",outlined:""}},[t._v(" \n                    Granel")]):r("v-chip",{attrs:{color:"red",outlined:""}},[t._v("NA Granel")])]}},{key:"item.action",fn:function(e){var n=e.item;return[r("v-btn",{staticClass:"mr-2",attrs:{fab:"",dark:"",small:"",color:"green",title:"Agregar producto"},on:{click:function(e){return t.agregar(n)}}},[r("v-icon",{attrs:{dark:""}},[t._v("mdi-checkbox-marked-circle")])],1)]}}])})],1)],1),t._v(" "),r("v-row",[r("v-col",[r("v-card",[r("v-row",[r("v-col",{attrs:{cols:"3"}},[r("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[r("v-label",[r("h4",[t._v("ID traspaso")]),t._v(" \n          "+t._s(t.editadoHeader.prtr_identifier))])],1)],1),t._v(" "),r("v-col",{attrs:{cols:"3"}},[r("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[r("v-label",[r("h4",[t._v("Sucursal Salida:")]),t._v(" \n          "+t._s(t.editadoHeader.stor_name_output))])],1)],1),t._v(" "),r("v-col",{attrs:{cols:"3"}},[r("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[r("v-label",[r("h4",[t._v("Sucursal Salida:")]),t._v("        \n          "+t._s(t.editadoHeader.stor_name_input))])],1)],1),t._v(" "),r("v-col",{attrs:{cols:"3"}},[r("v-card-text",{staticClass:"category d-inline-flex font-weight-light"},[r("v-label",[r("h4",[t._v("Observación:")]),t._v("        \n          "+t._s(t.editadoHeader.prtr_observation))])],1)],1)],1),t._v(" "),r("v-row",[r("v-col")],1)],1)],1)],1),t._v(" "),r("v-row",[r("v-col",[r("v-card",[r("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[r("thead",[r("tr",[r("th",{staticClass:"text-left"},[t._v("ID")]),t._v(" "),r("th",{staticClass:"text-left"},[t._v("Producto")]),t._v(" "),r("th",{staticClass:"text-left",staticStyle:{width:"200px"}},[t._v("Cantidad a traspasar")]),t._v(" "),r("th")])]),t._v(" "),r("tbody",t._l(t.desserts,(function(e){return r("tr",{key:e.prod_name},[r("td",[t._v(t._s(e.prod_identifier))]),t._v(" "),r("td",[t._v(t._s(e.prod_name))]),t._v(" "),r("td",[t._v(t._s(e.prtd_quantity))]),t._v(" "),r("td")])})),0)]},proxy:!0}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=c.exports}}]);