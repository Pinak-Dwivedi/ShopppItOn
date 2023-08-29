"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[379],{3379:function(e,t,r){r.r(t),r.d(t,{default:function(){return l}});var a=r(9439),d=r(2791),u=r(7689),c=r(9434),o=r(2953),s=r(184);function l(){var e,t,r,l,n,i,p,m=(0,u.TH)().state,_=null===m||void 0===m?void 0:m.productDetails,h=[];null!=_&&(e=_.productId,t=_.productName,r=_.productDescription,l=_.productPrice,n=_.productStock,i=_.productCategory,p=_.productImages,h=JSON.parse(p));var g=(0,d.useState)(t),P=(0,a.Z)(g,2),f=P[0],v=P[1],j=(0,d.useState)(r),x=(0,a.Z)(j,2),N=x[0],I=x[1],b=(0,d.useState)(l),F=(0,a.Z)(b,2),S=F[0],C=F[1],y=(0,d.useState)(n),L=(0,a.Z)(y,2),E=L[0],k=L[1],w=(0,d.useState)(i),U=(0,a.Z)(w,2),Z=U[0],D=U[1],R=(0,d.useState)(null),O=(0,a.Z)(R,2),G=O[0],J=O[1],T=(0,d.useState)(null),H=(0,a.Z)(T,2),A=H[0],B=H[1],M=(0,d.useState)(null),q=(0,a.Z)(M,2),z=q[0],K=q[1],Q=(0,c.v9)((function(e){return e.product})),V=Q.isLoading,W=Q.validationError,X=(0,c.v9)((function(e){return e.user})),Y=X.isAuthenticated,$=X.user,ee=(0,c.I0)();if(!Y||"admin"!==$.role)return(0,s.jsx)(u.Fg,{to:"/",replace:!0});return(0,s.jsx)("div",{className:"updateProduct",children:(0,s.jsxs)("div",{className:"updateProduct__formContainer",children:[(0,s.jsx)("h3",{className:"updateProduct__formHeading",children:"Update Product"}),(0,s.jsxs)("form",{className:"updateProduct__form",onSubmit:function(t){return function(t){t.preventDefault(),ee((0,o.lM)({id:e,name:f,description:N,price:S,stock:E,category:Z,productImage1:G,productImage2:A,productImage3:z}))}(t)},children:[(0,s.jsxs)("div",{className:"updateProduct__formField",children:[(0,s.jsx)("label",{htmlFor:"productName",className:"updateProduct__formLabel",children:"Name"}),(0,s.jsx)("input",{type:"text",id:"productName",className:"updateProduct__formInput",placeholder:"e.g:- PS5",value:f,onChange:function(e){return v(e.target.value)}}),(0,s.jsx)("span",{className:"updateProduct__formError",children:null===W||void 0===W?void 0:W.name})]}),(0,s.jsxs)("div",{className:"updateProduct__formField",children:[(0,s.jsx)("label",{htmlFor:"productDescription",className:"updateProduct__formLabel",children:"Description"}),(0,s.jsx)("textarea",{id:"productDescription",className:"updateProduct__formInput",placeholder:"e.g:- Get ready to have gaming experience like never before",value:N,onChange:function(e){return I(e.target.value)}}),(0,s.jsx)("span",{className:"updateProduct__formError",children:null===W||void 0===W?void 0:W.description})]}),(0,s.jsxs)("div",{className:"updateProduct__formField",children:[(0,s.jsx)("label",{htmlFor:"productPrice",className:"updateProduct__formLabel",children:"Price"}),(0,s.jsx)("input",{type:"number",id:"productPrice",className:"updateProduct__formInput",placeholder:"e.g:- \u20b9 43000",value:S,onChange:function(e){return C(e.target.value)}}),(0,s.jsx)("span",{className:"updateProduct__formError",children:null===W||void 0===W?void 0:W.price})]}),(0,s.jsxs)("div",{className:"updateProduct__formField",children:[(0,s.jsx)("label",{htmlFor:"productStock",className:"updateProduct__formLabel",children:"Stock"}),(0,s.jsx)("input",{type:"number",id:"productStock",className:"updateProduct__formInput",placeholder:"e.g:- 15",value:E,onChange:function(e){return k(e.target.value)}}),(0,s.jsx)("span",{className:"updateProduct__formError",children:null===W||void 0===W?void 0:W.stock})]}),(0,s.jsxs)("div",{className:"updateProduct__formField",children:[(0,s.jsx)("label",{htmlFor:"productCategory",className:"updateProduct__formLabel",children:"Category"}),(0,s.jsxs)("select",{id:"productCategory",className:"updateProduct__formInput",value:Z,onChange:function(e){return D(e.target.value)},children:[(0,s.jsx)("option",{value:"Electronics",children:"Electronics"}),(0,s.jsx)("option",{value:"Footwear",children:"Footwear"}),(0,s.jsx)("option",{value:"Glasses",children:"Glasses"}),(0,s.jsx)("option",{value:"T-Shirt",children:"T-Shirt"}),(0,s.jsx)("option",{value:"Jeans",children:"Jeans"})]}),(0,s.jsx)("span",{className:"updateProduct__formError",children:null===W||void 0===W?void 0:W.category})]}),(0,s.jsx)("div",{className:"updateProduct__imageNote",children:"Note - Either upload all images or none"}),(0,s.jsxs)("div",{className:"updateProduct__formField",children:[(0,s.jsx)("label",{htmlFor:"productImage1",className:"updateProduct__formLabel",children:"Product Image 1"}),(0,s.jsxs)("div",{className:"updateProduct__productImage",children:[null==G?(0,s.jsx)("img",{className:"updateProduct__productImagePreview",src:h[0],alt:"product"}):(0,s.jsx)("img",{className:"updateProduct__productImagePreview",src:URL.createObjectURL(G),alt:"product"}),(0,s.jsx)("input",{className:"updateProduct__formInput updateProduct__productImageInput",type:"file",id:"productImage1",onChange:function(e){return J(e.target.files[0])}})]}),(0,s.jsx)("span",{className:"updateProduct__formError",children:null===W||void 0===W?void 0:W.productImages})]}),(0,s.jsxs)("div",{className:"updateProduct__formField",children:[(0,s.jsx)("label",{htmlFor:"productImage2",className:"updateProduct__formLabel",children:"Product Image 2"}),(0,s.jsxs)("div",{className:"updateProduct__productImage",children:[null==A?(0,s.jsx)("img",{className:"updateProduct__productImagePreview",src:h[1],alt:"product"}):(0,s.jsx)("img",{className:"updateProduct__productImagePreview",src:URL.createObjectURL(A),alt:"product"}),(0,s.jsx)("input",{className:"updateProduct__formInput updateProduct__productImageInput",type:"file",id:"productImage2",onChange:function(e){return B(e.target.files[0])}})]}),(0,s.jsx)("span",{className:"updateProduct__formError",children:null===W||void 0===W?void 0:W.productImages})]}),(0,s.jsxs)("div",{className:"updateProduct__formField",children:[(0,s.jsx)("label",{htmlFor:"productImage3",className:"updateProduct__formlabel",children:"Product Image 3"}),(0,s.jsxs)("div",{className:"updateProduct__productImage",children:[null==z?(0,s.jsx)("img",{className:"updateProduct__productImagePreview",src:h[2],alt:"product"}):(0,s.jsx)("img",{className:"updateProduct__productImagePreview",src:URL.createObjectURL(z),alt:"product"}),(0,s.jsx)("input",{className:"updateProduct__formInput updateProduct__productImageInput",type:"file",id:"productImage3",onChange:function(e){return K(e.target.files[0])}})]}),(0,s.jsx)("span",{className:"updateProduct__formError",children:null===W||void 0===W?void 0:W.productImages})]}),(0,s.jsx)("button",{className:"updateProduct__formButton",type:"submit",disabled:V,children:"Update Product"})]})]})})}}}]);
//# sourceMappingURL=379.c56ecba1.chunk.js.map