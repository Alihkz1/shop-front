import{a as v,b as N}from"./chunk-LUFUIHNU.js";import{a as h,ca as M,d as g,x,y as C}from"./chunk-MS6WNOJG.js";import{$b as c,Ub as u,X as i,Za as f,ca as m,da as n,ec as d,fc as l,jc as a,ya as p}from"./chunk-2WFHQBDQ.js";var j=(()=>{let t=class t{constructor(o){this.router=o,this.router.url==="/"&&this.router.navigate(["menu/categories"])}};t.\u0275fac=function(r){return new(r||t)(p(l))},t.\u0275cmp=m({type:t,selectors:[["app-layout"]],decls:1,vars:0,template:function(r,A){r&1&&f(0,"router-outlet")},dependencies:[d]});let e=t;return e})();var I=[{path:"",component:j,children:[{path:"menu",loadChildren:()=>import("./chunk-LIVKV6LQ.js").then(e=>e.MenuModule)},{path:"auth",loadChildren:()=>import("./chunk-ZYSHQQFJ.js").then(e=>e.AuthModule)},{path:"admin",loadChildren:()=>import("./chunk-GKQKXZIK.js").then(e=>e.AdminModule)}]}],z=(()=>{let t=class t{};t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=n({type:t}),t.\u0275inj=i({imports:[a.forChild(I),a]});let e=t;return e})();var s=class{http;prefix;suffix;constructor(t,F="/assets/i18n/",o=".json"){this.http=t,this.prefix=F,this.suffix=o}getTranslation(t){return this.http.get(`${this.prefix}${t}${this.suffix}`)}};function T(e){return new s(e,"./assets/i18n/",".json")}var w={message:{nzDirection:"rtl",nzMaxStack:2,nzAnimate:!0,nzPauseOnHover:!0}},E=(()=>{let t=class t{};t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=n({type:t}),t.\u0275inj=i({providers:[C,N(v),{provide:x,useValue:w}],imports:[u,z,M,g.forRoot({loader:{provide:h,useFactory:T,deps:[c]},defaultLanguage:"fa"})]});let e=t;return e})();export{E as LayoutModule,T as createTranslateLoader};