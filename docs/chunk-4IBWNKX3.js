import{a as z,b as D,c as S,d as w,e as F,f as T,g as I,h as L,j as B,k as j,l as E,m as R,n as V}from"./chunk-4J733MHP.js";import"./chunk-HSO4ENL5.js";import{b as N,c as O}from"./chunk-FNN344GR.js";import{Ha as p,Ja as f,K as g,La as b,Na as l,Oa as c,P as s,Q as h,Ya as P,ca as m,da as y,eb as k,fb as _,hb as v,na as C,ta as n,ua as r,va as d,za as x}from"./chunk-TCYSD3Q3.js";var G=(()=>{let t=class t{constructor(i){this.router=i,this.loginLoading=!1,this.usernameControl=new w,this.passwordControl=new w}forgetPassword_onClick(){this.router.navigate(["/auth/forget-password"])}register_onClick(){this.router.navigate(["/auth/signup"])}login_onClick(){}};t.\u0275fac=function(o){return new(o||t)(y(_))},t.\u0275cmp=s({type:t,selectors:[["app-login"]],decls:22,vars:21,consts:[[1,"login"],[1,"login-title"],[1,"flex-grow"],[1,"login-form"],["nz-input","",3,"placeholder","formControl"],["nz-input","",1,"mt-2",3,"placeholder","formControl"],[1,"login-submit"],["nz-button","","nzType","primary",3,"click","nzLoading"],[1,"d-flex","justify-content-center","w-100"],[1,"option",3,"click"]],template:function(o,a){o&1&&(n(0,"div",0)(1,"div",1),p(2),l(3,"translate"),r(),n(4,"div",2)(5,"form",3),d(6,"input",4),l(7,"translate"),d(8,"input",5),l(9,"translate"),r(),n(10,"div",6)(11,"button",7),x("click",function(){return a.login_onClick()}),p(12),l(13,"translate"),r()()(),n(14,"div",8)(15,"button",9),x("click",function(){return a.forgetPassword_onClick()}),p(16),l(17,"translate"),r(),p(18," | "),n(19,"button",9),x("click",function(){return a.register_onClick()}),p(20),l(21,"translate"),r()()()),o&2&&(m(2),f(" ",c(3,9,"welcome")," "),m(4),C("placeholder",c(7,11,"username"))("formControl",a.usernameControl),m(2),C("placeholder",c(9,13,"password"))("formControl",a.passwordControl),m(3),C("nzLoading",a.loginLoading),m(),f(" ",c(13,15,"getIn")," "),m(4),f(" ",c(17,17,"forgetPassword")," "),m(4),f(" ",c(21,19,"register")," "))},dependencies:[L,R,j,E,F,z,D,S,T,N],styles:[".login[_ngcontent-%COMP%]{height:100%;width:100%;padding:10px 0;display:flex;flex-direction:column}.login-title[_ngcontent-%COMP%], .login-form[_ngcontent-%COMP%]{padding:10px 30px}.login-submit[_ngcontent-%COMP%]{padding-right:30px}.login-submit[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100px}button.option[_ngcontent-%COMP%]{font-size:12px;border:none;background-color:transparent}button.option[_ngcontent-%COMP%]:hover{color:#004cff}input[_ngcontent-%COMP%]{height:40px;border-radius:4px}"]});let e=t;return e})();var W=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=s({type:t,selectors:[["app-signup"]],decls:1,vars:0,template:function(o,a){o&1&&p(0,"signup")}});let e=t;return e})();var Z=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=s({type:t,selectors:[["auth-routing"]],decls:3,vars:0,consts:[[1,"main"],[1,"box"]],template:function(o,a){o&1&&(n(0,"div",0)(1,"div",1),d(2,"router-outlet"),r()())},dependencies:[k],styles:[".main[_ngcontent-%COMP%]{background:var(--main-bg);height:100%;width:100%;display:flex;justify-content:center;align-items:center}.row[_ngcontent-%COMP%]{height:400px}.box[_ngcontent-%COMP%]{border:1px solid rgb(237,237,237);min-width:400px;max-width:fit-content;height:400px;background:#fff;border-radius:6px;box-shadow:1px 1px 10px #dcdcdc}@media (max-width: 670px){.box[_ngcontent-%COMP%]{width:300px;height:350px}}"]});let e=t;return e})();var q=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=s({type:t,selectors:[["app-forget-password"]],standalone:!0,features:[b],decls:2,vars:0,template:function(o,a){o&1&&(n(0,"p"),p(1,"forget-password works!"),r())}});let e=t;return e})();var J=[{path:"",component:Z,children:[{path:"login",component:G},{path:"signup",component:W},{path:"forget-password",component:q}]}],A=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=h({type:t}),t.\u0275inj=g({imports:[v.forChild(J),v]});let e=t;return e})();var K=[B,V],Pt=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=h({type:t}),t.\u0275inj=g({imports:[P,A,O,K,I]});let e=t;return e})();export{Pt as AuthModule};