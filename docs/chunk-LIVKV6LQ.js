import{a as v}from"./chunk-AGJXEXJD.js";import{C as Z,D as q,E as G,F as J,G as K,H as Q,I as X,a as E,e as L,g as R,j as H,m as U,q as V,r as W}from"./chunk-FXMADUMU.js";import"./chunk-ZMDOF3EM.js";import{b as O,c as k,d as A,da as B}from"./chunk-MS6WNOJG.js";import{$b as T,Ab as C,Ma as h,Ua as b,Ub as F,Va as S,W as y,Wa as D,X as f,Xa as n,Ya as r,Z as M,Za as p,ca as a,da as u,db as z,ec as j,jc as x,nb as s,ob as I,pb as P,wb as N,xa as c,ya as l,zb as g}from"./chunk-2WFHQBDQ.js";var Y=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=a({type:t,selectors:[["app-menu"]],decls:4,vars:0,consts:[[1,"main"],[1,"main-wrapper","p-4"]],template:function(i,m){i&1&&(n(0,"div",0),p(1,"app-header"),n(2,"div",1),p(3,"router-outlet"),r()())},dependencies:[v,j],styles:[".main[_ngcontent-%COMP%]{height:100%;width:100%;background:var(--main-bg)}.main-wrapper[_ngcontent-%COMP%]{height:calc(100vh - 100px)}@media (min-width: 1450px){.main-wrapper[_ngcontent-%COMP%]{padding:0 150px!important}}@media (min-width: 992px) and (max-width: 1450px){.main-wrapper[_ngcontent-%COMP%]{padding:0 100px!important}}"]});let e=t;return e})();function nt(e,t){e&1&&(n(0,"div",2),p(1,"div",3),r())}var $=(()=>{let t=class t{constructor(){this.categories=[{},{},{},{},{},{},{},{}]}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=a({type:t,selectors:[["app-categories"]],decls:4,vars:0,consts:[[1,"wrapper"],[1,"row"],[1,"col-xl-3","col-lg-3","col-md-6","col-sm-12","cmt"],[1,"card"]],template:function(i,m){i&1&&(n(0,"div",0)(1,"div",1),S(2,nt,2,0,"div",2,b),r()()),i&2&&(c(2),D(m.categories))},styles:[".wrapper[_ngcontent-%COMP%]{height:100%;overflow:hidden auto;padding:0 5px 15px}@media (max-width: 767px){.cmt[_ngcontent-%COMP%]{margin-top:12px}}@media (min-width: 767px){.cmt[_ngcontent-%COMP%]{margin-top:24px}}"]});let e=t;return e})();var _=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=a({type:t,selectors:[["app-products"]],decls:2,vars:0,template:function(i,m){i&1&&(n(0,"p"),s(1,"products works!"),r())}});let e=t;return e})();var tt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=a({type:t,selectors:[["app-product-detail"]],decls:10,vars:0,consts:[[1,"wrapper"],[1,"row"],[1,"col-xl-4","col-lg-4","col-md-6","col-sm-12"],[1,"card"],[1,"ps-4","pt-2"],[1,"col-xl-8","col-lg-8","col-md-6","col-sm-12"],[1,"detail"]],template:function(i,m){i&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),s(5,"photo"),r()()(),n(6,"div",5)(7,"div",6)(8,"div",4),s(9,"detail"),r()()()()())},styles:[".wrapper[_ngcontent-%COMP%]{height:100%;overflow:hidden auto;padding:0 5px 15px}"]});let e=t;return e})();var et=(()=>{let t=class t{constructor(o){this.http=o}addComment(o){return this.http.post(W.API_BASE+"comment/add",o)}};t.\u0275fac=function(i){return new(i||t)(M(T))},t.\u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var mt=()=>({minRows:7,maxRows:15}),it=(()=>{let t=class t{constructor(o,i,m,w){this.menuService=o,this.client=i,this.translate=m,this.messageService=w,this.message=new H}submit_onClick(){this.submitLoading=this.menuService.addComment({userId:1,message:this.message.value}).subscribe(({success:o})=>{o?(this.messageService.create("success",this.translate.instant("actionDone")),this.message.reset()):this.messageService.create("error",this.translate.instant("error"))})}};t.\u0275fac=function(i){return new(i||t)(l(et),l(E),l(O),l(B))},t.\u0275cmp=a({type:t,selectors:[["app-about-us"]],decls:9,vars:10,consts:[[1,"d-flex","flex-column","w-100","h-100","pb-5"],[1,"flex-grow"],["nz-input","",3,"formControl","nzAutosize"],["nz-button","","nzType","primary",1,"submit",3,"click","nzLoading"]],template:function(i,m){i&1&&(n(0,"div",0),p(1,"div",1),n(2,"p"),s(3),g(4,"translate"),r(),p(5,"textarea",2),n(6,"button",3),z("click",function(){return m.submit_onClick()}),s(7),g(8,"translate"),r()()),i&2&&(c(3),P(" ",C(4,5,"yourMessage")," "),c(2),h("formControl",m.message)("nzAutosize",N(9,mt)),c(),h("nzLoading",m.submitLoading&&!m.submitLoading.closed),c(),I(C(8,7,"submit")))},dependencies:[L,R,U,Z,q,Q,J,K,k],styles:["button.submit[_ngcontent-%COMP%]{width:100px;margin-top:10px}"]});let e=t;return e})();var at=[{path:"",component:Y,children:[{path:"categories",component:$},{path:"products",component:_},{path:"detail",component:tt},{path:"about-us",component:it}]}],ot=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=u({type:t}),t.\u0275inj=f({imports:[x.forChild(at),x]});let e=t;return e})();var pt=[G,X],Yt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=u({type:t}),t.\u0275inj=f({imports:[F,v,ot,A,V,pt]});let e=t;return e})();export{Yt as MenuModule};
