(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{65:function(e,t,n){"use strict";n.r(t);var s={data:function(){return{enabledStore:!1,menu1:!1,menu2:!1,textMsg:"",alert:!1}},created:function(){this.getUsers()},methods:{getUsers:function(){var e=this;axios.get("/listUser").then((function(t){e.users=t.data.data,e.users.store_id>0?(e.enabledStore=!0,e.select_stores=e.users.store_id):e.enabledStore=!1})).catch((function(t){e.errors.push(t)}))},GenerarReporte:function(){axios,window.open("http://3.217.161.164:777/?pRep=3&pUser_PK="+this.users.id,"_blank")},hide_alert:function(e){var t=this;console.log("Hide"),window.setInterval((function(){t.alert=!1}),7e3)}},mounted:function(){alert&&this.hide_alert()}},r=n(0),a=Object(r.a)(s,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-alert",{attrs:{dismissible:"",transition:"fade-transition",type:"info",timeout:"5000"},model:{value:e.alert,callback:function(t){e.alert=t},expression:"alert"}},[e._v(e._s(e.textMsg))]),e._v(" "),n("v-row",[n("v-col",[n("v-card",{attrs:{justify:"end"}},[n("v-btn",{staticClass:"mr-4",attrs:{color:"success"},on:{click:e.GenerarReporte}},[e._v("Generar")])],1)],1)],1)],1)}),[],!1,null,null,null);t.default=a.exports}}]);