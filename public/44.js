(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{71:function(t,e,s){"use strict";s.r(e);var a={data:function(){return{headers:[{sortable:!1,text:"Nombre",value:"name"},{sortable:!1,text:"Descripción",value:"description"},{sortable:!1,text:"Categoría",value:"profession_id"},{sortable:!1,text:"User",value:"user_id",align:"right"}],items:[]}},beforeMount:function(){var t=this;axios.get("/api/projects").then((function(e){return t.user=e.data}))}},r=s(0),i=Object(r.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[s("v-layout",{attrs:{"justify-center":"",wrap:""}},[s("v-flex",{attrs:{md12:""}},[s("material-card",{attrs:{color:"green",text:"Here is a subtitle for this table",title:"Simple Table"}},[s("v-data-table",{attrs:{headers:t.headers,items:t.items,"hide-default-footer":""},scopedSlots:t._u([{key:"headerCell",fn:function(e){var a=e.header;return[s("span",{staticClass:"subheading font-weight-light text-success text--darken-3",domProps:{textContent:t._s(a.text)}})]}},{key:"items",fn:function(e){var a=e.item;return[s("td",[t._v(t._s(a.name))]),t._v(" "),s("td",[t._v(t._s(a.country))]),t._v(" "),s("td",[t._v(t._s(a.city))]),t._v(" "),s("td",{staticClass:"text-xs-right"},[t._v(t._s(a.salary))])]}}])})],1)],1),t._v(" "),s("v-flex",{attrs:{md12:""}},[s("material-card",{attrs:{color:"green",flat:"","full-width":"",text:"Here is a subtitle for this table",title:"Table on Plain Background"}},[s("v-data-table",{attrs:{headers:t.headers,items:t.items.slice(0,7),"hide-default-footer":""},scopedSlots:t._u([{key:"headerCell",fn:function(e){var a=e.header;return[s("span",{staticClass:"subheading font-weight-light text--darken-3",domProps:{textContent:t._s(a.text)}})]}},{key:"items",fn:function(e){var a=e.item;return[s("td",[t._v(t._s(a.name))]),t._v(" "),s("td",[t._v(t._s(a.description))]),t._v(" "),s("td",[t._v(t._s(a.profession_id))]),t._v(" "),s("td",{staticClass:"text-xs-right"},[t._v(t._s(a.user_id))])]}}])})],1)],1)],1)],1)}),[],!1,null,null,null);e.default=i.exports}}]);