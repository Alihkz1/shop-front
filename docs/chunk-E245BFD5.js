import{a as y}from"./chunk-FXMADUMU.js";import{b as M,c as T,d as V,da as I}from"./chunk-MS6WNOJG.js";import{Ab as x,Ka as h,Sa as k,Xa as r,Ya as c,bb as g,ca as v,db as m,fb as l,fc as S,ka as a,la as s,nb as u,ob as f,pb as w,vb as b,xa as p,ya as d,zb as C}from"./chunk-2WFHQBDQ.js";function j(t,i){if(t&1){let n=g();r(0,"img",2),m("click",function(){a(n);let e=l();return s(e.logout_onClick())}),c(),r(1,"div",3)(2,"div",4),u(3),c(),r(4,"img",5),m("click",function(){a(n);let e=l();return s(e.profile_onClick())}),c()()}if(t&2){let n=l();p(3),w(" ",n.client.getUser.name," ")}}function E(t,i){if(t&1){let n=g();r(0,"button",6),m("click",function(){a(n);let e=l();return s(e.aboutUs_onClick())}),u(1),C(2,"translate"),c(),r(3,"button",7),m("click",function(){a(n);let e=l();return s(e.login_onClick())}),u(4),C(5,"translate"),c()}t&2&&(p(),f(x(2,2,"aboutUs")),p(3),f(x(5,4,"loginButton")))}var F=(()=>{let i=class i{constructor(o,e,_,P){this.client=o,this.router=e,this.translate=_,this.message=P}logout_onClick(){this.client.setUser=null,this.router.navigate(["auth/login"]),this.message.create("success",this.translate.instant("logoutSuccess"))}profile_onClick(){}aboutUs_onClick(){this.router.navigate(["menu/about-us"])}login_onClick(){this.router.navigate(["auth/login"])}};i.\u0275fac=function(e){return new(e||i)(d(y),d(S),d(M),d(I))},i.\u0275cmp=v({type:i,selectors:[["app-header"]],standalone:!0,features:[b],decls:4,vars:1,consts:[[1,"w-100","d-flex","justify-content-center","p-4"],["dir","ltr",1,"header"],["src","assets/svg/power.svg","alt","",1,"power",3,"click"],[1,"d-flex","align-items-center"],[1,"client-name","pe-2"],["src","assets/svg/profile.svg","alt","",1,"profile",3,"click"],[1,"button",3,"click"],[1,"button","login",3,"click"]],template:function(e,_){e&1&&(r(0,"div",0)(1,"div",1),h(2,j,5,1)(3,E,6,6),c()()),e&2&&(p(2),k(2,_.client.isLogin?2:3))},dependencies:[V,T],styles:[".header[_ngcontent-%COMP%]{width:100%;height:50px;background:#fff;border-radius:4px;display:flex;justify-content:space-between;align-items:center;padding:0 20px}.power[_ngcontent-%COMP%], .profile[_ngcontent-%COMP%]{height:20px;width:20px;cursor:pointer}.button[_ngcontent-%COMP%]{border:none;background:transparent;cursor:pointer;font-size:14px}.login[_ngcontent-%COMP%]:hover{color:var(--link)}.client-name[_ngcontent-%COMP%]{font-size:14px;color:#787878}"]});let t=i;return t})();export{F as a};
