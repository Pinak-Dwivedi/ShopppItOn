"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[424],{7424:function(e,l,i){i.r(l),i.d(l,{default:function(){return u}});var r=i(9439),a=i(2791),o=i(7689),n=i(9434),s=i(6355),t=i(9306),f=i(184);function u(){var e,l,i,u,m,d=(0,a.useRef)(!0),c=(0,n.I0)(),p=(0,o.TH)().state,v=null===p||void 0===p?void 0:p.userDetails,_=(0,n.v9)((function(e){return e.user})),h=_.isAuthenticated,g=_.isLoading,j=_.validationError,x=_.user,N={};N=null!=v?v:x,(0,a.useEffect)((function(){if(!0===d.current)return c((0,t.UA)()),function(){d.current=!1}}),[c]);var I,b=(0,a.useState)(null===(e=N)||void 0===e?void 0:e.name),y=(0,r.Z)(b,2),F=y[0],P=y[1],C=(0,a.useState)(null===(l=N)||void 0===l?void 0:l.email),E=(0,r.Z)(C,2),L=E[0],w=E[1],U=(0,a.useState)(null===(i=N)||void 0===i?void 0:i.profileImage),k=(0,r.Z)(U,2),S=k[0],R=k[1];if(!h&&!g)return(0,f.jsx)(o.Fg,{to:"/"});if(null==(null===(u=N)||void 0===u?void 0:u.profileImage))I=(0,f.jsx)(s.m3W,{className:"profile__imagePreview"});else if("string"===typeof(null===(m=N)||void 0===m?void 0:m.profileImage)){var Z;I=null===(Z=N)||void 0===Z?void 0:Z.profileImage}return"object"===typeof S&&(I=URL.createObjectURL(S)),(0,f.jsxs)("div",{className:"profile",children:[(0,f.jsx)("h3",{className:"profile__heading",children:"My Profile"}),(0,f.jsxs)("form",{onSubmit:function(e){return function(e){var l;e.preventDefault(),c((0,t.Nq)({userId:null===(l=N)||void 0===l?void 0:l.userId,username:F,email:L,profileImage:S}))}(e)},className:"profile__form",children:[(0,f.jsxs)("div",{className:"profile__formField profile__image",children:[(0,f.jsx)("label",{className:"profile__formLabel",htmlFor:"profileImage",children:"Profile Picture"}),(0,f.jsx)("div",{className:"profile__imagePreviewContainer",children:(0,f.jsx)("img",{className:"profile__imagePreview",src:I,alt:"profile"})}),(0,f.jsx)("span",{className:"profile__formError",children:null===j||void 0===j?void 0:j.profileImage}),(0,f.jsx)("input",{className:"profile__formInput profile__imageInput",type:"file",id:"profileImage",onChange:function(e){return R(e.target.files[0])}})]}),(0,f.jsxs)("div",{className:"profile__info",children:[(0,f.jsxs)("div",{className:"profile__formField",children:[(0,f.jsx)("label",{className:"profile__formLabel",htmlFor:"username",children:"Username"}),(0,f.jsx)("input",{className:"profile__formInput",type:"text",id:"username",placeholder:"Jordan",value:F,onChange:function(e){return P(e.target.value)}}),(0,f.jsx)("span",{className:"profile__formError",children:null===j||void 0===j?void 0:j.username})]}),(0,f.jsxs)("div",{className:"profile__formField",children:[(0,f.jsx)("label",{className:"profile__formLabel",htmlFor:"email",children:"Email"}),(0,f.jsx)("input",{className:"profile__formInput",type:"text",id:"email",placeholder:"jordan@gmail.com",value:L,onChange:function(e){return w(e.target.value)}}),(0,f.jsx)("span",{className:"profile__formError",children:null===j||void 0===j?void 0:j.email})]})]}),(0,f.jsx)("button",{className:"profile__formButton",type:"submit",disabled:g,children:"Update Profile"})]})]})}}}]);
//# sourceMappingURL=424.544e4161.chunk.js.map