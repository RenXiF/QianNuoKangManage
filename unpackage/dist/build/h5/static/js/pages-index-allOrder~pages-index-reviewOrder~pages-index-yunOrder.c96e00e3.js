(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-allOrder~pages-index-reviewOrder~pages-index-yunOrder"],{"0a8e":function(n,t,e){var r=e("d0e5");"string"===typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);var a=e("4f06").default;a("550d36bd",r,!0,{sourceMap:!1,shadowMode:!1})},"0c5a":function(n,t,e){"use strict";var r=e("0a8e"),a=e.n(r);a.a},"1a65":function(n,t,e){"use strict";e.r(t);var r=e("2838"),a=e("2e33");for(var o in a)"default"!==o&&function(n){e.d(t,n,(function(){return a[n]}))}(o);e("a43b");var i,s=e("f0c5"),c=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,"18d13714",null,!1,r["a"],i);t["default"]=c.exports},"260b":function(n,t,e){"use strict";e.r(t);var r=e("f961"),a=e.n(r);for(var o in r)"default"!==o&&function(n){e.d(t,n,(function(){return r[n]}))}(o);t["default"]=a.a},2838:function(n,t,e){"use strict";var r,a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{staticClass:"mens flex_columns "},n._l(n.men,(function(t,r){return e("v-uni-view",{key:r,staticClass:"mens_block flex_columns"},[e("v-uni-view",{staticClass:"mens_one flex-between flex-center",class:t.id==n.showit?"mens_one_active":"",on:{click:function(e){arguments[0]=e=n.$handleEvent(e),n.doUrls(t)}}},[e("v-uni-text",[n._v(n._s(t.name))])],1)],1)})),1)},o=[];e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return r}))},"2e33":function(n,t,e){"use strict";e.r(t);var r=e("919e"),a=e.n(r);for(var o in r)"default"!==o&&function(n){e.d(t,n,(function(){return r[n]}))}(o);t["default"]=a.a},"2fdc":function(n,t,e){"use strict";e.r(t);var r=e("f4d7"),a=e("260b");for(var o in a)"default"!==o&&function(n){e.d(t,n,(function(){return a[n]}))}(o);e("596e");var i,s=e("f0c5"),c=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,"298c6060",null,!1,r["a"],i);t["default"]=c.exports},"596e":function(n,t,e){"use strict";var r=e("bf28"),a=e.n(r);a.a},"919e":function(n,t,e){"use strict";e("a9e3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={props:{men:{type:Array,default:function(){return[]}},showit:{type:Number,default:function(){}}},data:function(){return{sorttid:1,zumen:[{name:"查询全部代理",id:1,sortt:0,http:"/pages/index/userlist"},{name:"查询审核订单",id:2,sortt:1,http:"/pages/index/index"},{name:"查询所有订单",id:3,sortt:2,http:"/pages/index/index"},{name:"查询云进货单",id:4,sortt:3,http:"/pages/index/yunOrder"},{name:"查询云提货单",id:6,sortt:3,http:"/pages/index/yunOrderdelivery"},{name:"查询信息反馈",id:5,sortt:4,http:"/pages/index/userfeedback"}]}},onLoad:function(){},onShow:function(){},methods:{doUrls:function(n){this.sorttid=n.id,this.doUrl(n.http)}}};t.default=r},"974b":function(n,t,e){var r=e("24fb");t=r(!1),t.push([n.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.mens[data-v-18d13714]{width:13%;min-height:100%;background-color:#304156}.mens uni-text[data-v-18d13714]{color:#bfcbd9}.mens .mens_block[data-v-18d13714]{width:100%}.mens .mens_block .mens_one[data-v-18d13714]{width:100%;height:50px;border-bottom:#273445 1px solid}.mens .mens_block .mens_one uni-text[data-v-18d13714]{padding:0 10px;font-size:20px}.mens .mens_block .mens_one uni-image[data-v-18d13714]{width:30px}.mens .mens_block .mens_one_active[data-v-18d13714]{background-color:#00152a}.mens .mens_block .mens_one[data-v-18d13714]:hover{background-color:#1f2d3d}',""]),n.exports=t},a43b:function(n,t,e){"use strict";var r=e("a94c"),a=e.n(r);a.a},a94c:function(n,t,e){var r=e("974b");"string"===typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);var a=e("4f06").default;a("93e0cb02",r,!0,{sourceMap:!1,shadowMode:!1})},bf28:function(n,t,e){var r=e("fdcd");"string"===typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);var a=e("4f06").default;a("73d88d2c",r,!0,{sourceMap:!1,shadowMode:!1})},d0e5:function(n,t,e){var r=e("24fb");t=r(!1),t.push([n.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.fy[data-v-52c7a588]{width:100%}.fy span[data-v-52c7a588]{border:#007aff 1px solid;padding:10px 20px;margin-left:10px;border:#999 1px solid;-webkit-border-radius:15px;border-radius:15px;font-size:20px}.fy span[data-v-52c7a588]:hover{cursor:pointer;background-color:#dd524d;color:#fff}.btn-view[data-v-52c7a588]{margin-top:10px}.btn-view uni-text[data-v-52c7a588]{font-size:20px}',""]),n.exports=t},d287:function(n,t,e){"use strict";e("a9e3"),e("e25e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={name:"paging",props:{total:{type:Number,default:0},pageSize:{type:Number,default:0},footer:{type:Boolean,default:!1},current:{type:Number,default:1},background:{type:String,default:"#ffffff"},color:{type:String,default:"#333333"},activebackground:{type:String,default:"#00BFFF"},activecolor:{type:String,default:"#ffffff"}},data:function(){return{page:[],zpage:0,current1:this.current}},created:function(){this.jx()},watch:{total:function(){this.jx()},pageSize:function(){this.jx()}},methods:{jx:function(){var n=this,t=parseInt(n.total),e=parseInt(n.pageSize),r=parseInt(t/e);t/e>r&&r++,n.zpage=r;var a=[];if(r<5)for(var o=1;o<=r;o++)a.push(o);else a=[1,2,3,4,5];n.page=a},HN_back:function(n){var t=this.current1==this.page[n]?this.activebackground:this.background;return t},HN_color:function(n){var t=this.current1==this.page[n]?this.activecolor:this.color;return t},qy:function(n){var t=this;switch(n){case-1:n=1;break;case-2:n=t.zpage;break;default:n=t.page[n]}t.current1=n,t.$emit("changes",n);var e=parseInt(t.total),r=parseInt(t.pageSize),a=parseInt(e/r);console.log(a),e/r>a&&a++;var o=[];if(!(a<5))return n>=a-2?(o=[a-4,a-3,a-2,a-1,a],void(t.page=o)):a>5&&n<4?(o=[1,2,3,4,5],void(t.page=o)):a>5&&n>3?(o=[n-2,n-1,n,n+1,n+2],void(t.page=o)):void 0}},onLoad:function(){}};t.default=r},d821:function(n,t,e){"use strict";var r,a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",[e("v-uni-view",{staticClass:"flex_columns",staticStyle:{width:"100%"}},[e("v-uni-view",{staticClass:"fy flex-center"},[e("span",{style:{background:n.background,color:n.color},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.qy(-1)}}},[n._v("首页")]),n._l(n.page,(function(t,r){return e("span",{key:r,style:{background:n.HN_back(r),color:n.HN_color(r)},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.qy(r)}}},[n._v(n._s(t))])})),e("span",{style:{background:n.background,color:n.color},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.qy(-2)}}},[n._v("尾页")])],2),n.footer?e("v-uni-view",{staticClass:"btn-view flex-around"},[e("v-uni-view",{staticClass:"flex-center"},[e("v-uni-text",[n._v("当前页："+n._s(n.current1)+"，订单总数："+n._s(n.total)+"条")])],1)],1):n._e()],1)],1)},o=[];e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return r}))},ef7d:function(n,t,e){"use strict";e.r(t);var r=e("d287"),a=e.n(r);for(var o in r)"default"!==o&&function(n){e.d(t,n,(function(){return r[n]}))}(o);t["default"]=a.a},f334:function(n,t,e){"use strict";e.r(t);var r=e("d821"),a=e("ef7d");for(var o in a)"default"!==o&&function(n){e.d(t,n,(function(){return a[n]}))}(o);e("0c5a");var i,s=e("f0c5"),c=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,"52c7a588",null,!1,r["a"],i);t["default"]=c.exports},f4d7:function(n,t,e){"use strict";var r,a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:n.show,expression:"show"}],staticClass:"popup"},[e("v-uni-view",{staticClass:"mask",on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.closeShow.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"content",style:n.posNum},[n._t("default")],2)],1)},o=[];e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return r}))},f790:function(n,t){n.exports=[{name:"查询全部代理",id:1,sortt:0,http:"/pages/index/userlist"},{name:"查询审核订单",id:2,sortt:1,http:"/pages/index/reviewOrder"},{name:"查询普通订单",id:3,sortt:2,http:"/pages/index/allOrder"},{name:"查询云进货单",id:4,sortt:3,http:"/pages/index/yunOrder"},{name:"查询云提货单",id:6,sortt:3,http:"/pages/index/yunOrderdelivery"},{name:"查询信息反馈",id:5,sortt:4,http:"/pages/index/userfeedback"}]},f961:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={props:{show:{type:Boolean,default:function(){return!0}},posNum:{type:String,default:function(){return""}}},methods:{closeShow:function(){this.$emit("showClose")}}};t.default=r},fdcd:function(n,t,e){var r=e("24fb");t=r(!1),t.push([n.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.mask[data-v-298c6060]{width:100%;height:100%;position:fixed;left:0;top:0;bottom:0;right:0;background:rgba(0,0,0,.3);z-index:100}.content[data-v-298c6060]{height:auto;position:fixed;left:0;z-index:101;background:#fff}',""]),n.exports=t}}]);