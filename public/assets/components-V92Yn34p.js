var N=Object.defineProperty;var V=(n,e,t)=>e in n?N(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var a=(n,e,t)=>(V(n,typeof e!="symbol"?e+"":e,t),t),v=(n,e,t)=>{if(!e.has(n))throw TypeError("Cannot "+t)};var s=(n,e,t)=>(v(n,e,"read from private field"),t?t.call(n):e.get(n)),i=(n,e,t)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,t)},o=(n,e,t,l)=>(v(n,e,"write to private field"),l?l.call(n,t):e.set(n,t),t);class G extends HTMLElement{constructor(){super();a(this,"isInit",!1);a(this,"shadow",null)}init(t="",l=null){this.isInit!=!0&&(this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=t,l!=null&&l(),this.isInit=!0)}}var p,u,w,L,f;const b=class b extends HTMLElement{constructor(){super();i(this,p,!1);i(this,u,null);i(this,w,null);i(this,L,null);i(this,f,null)}init(){s(this,p)!=!0&&(o(this,u,this.attachShadow({mode:"open"})),s(this,u).innerHTML=b.html,o(this,w,s(this,u).getElementById("courseNameLabel")),o(this,L,s(this,u).getElementById("categoryNameLabel")),o(this,f,s(this,u).getElementById("durationLabel")),o(this,p,!0))}connectedCallback(){this.init()}attributeChangedCallback(t,l,d){switch(this.init(),t){case"course-name":{s(this,w).innerText=d;break}case"category-name":{s(this,L).innerText=d;break}case"duration":{s(this,f).innerHTML=`<b>${d}</b>mins`;break}}}};p=new WeakMap,u=new WeakMap,w=new WeakMap,L=new WeakMap,f=new WeakMap,a(b,"html",""),a(b,"observedAttributes",["course-name","category-name","duration","description"]);let k=b;var y,E,h;const B=class B extends HTMLElement{constructor(){super();i(this,y,!1);i(this,E,null);i(this,h,document.createElement("discord-chatbot-panel"));s(this,h).style.display="none"}onMouseDown(){s(this,h).style.display=="none"?s(this,h).style.display="block":s(this,h).style.display="none";for(const t of document.body.children)if(t==s(this,h))return;document.body.appendChild(s(this,h))}init(){s(this,y)!=!0&&(o(this,E,this.attachShadow({mode:"open"})),s(this,E).innerHTML=B.html,this.addEventListener("mousedown",this.onMouseDown.bind(this)),o(this,y,!0))}connectedCallback(){this.init()}attributeChangedCallback(t,l,d){this.init()}};y=new WeakMap,E=new WeakMap,h=new WeakMap,a(B,"html","");let x=B;var M,r,T;const R=class R extends HTMLElement{constructor(){super();i(this,M,!1);i(this,r,null);i(this,T,null)}onCloseButtonMouseDown(){this.style.display="none"}init(){s(this,M)!=!0&&(o(this,r,this.attachShadow({mode:"open"})),s(this,r).innerHTML=R.html,o(this,T,s(this,r).getElementById("closeButton")),s(this,T).addEventListener("mousedown",this.onCloseButtonMouseDown.bind(this)),o(this,M,!0))}connectedCallback(){this.init()}attributeChangedCallback(t,l,d){this.init()}};M=new WeakMap,r=new WeakMap,T=new WeakMap,a(R,"html","");let C=R;var H,g,I,m;const c=class c extends G{constructor(){super();i(this,H,null);i(this,g,null);i(this,I,null);i(this,m,null);o(this,m,this.onInit.bind(this))}onInit(){o(this,H,this.shadow.querySelector("#menu_btn")),o(this,g,this.shadow.querySelector(".sidebar")),o(this,I,this.shadow.querySelector("#logout")),s(this,H).onclick=t=>{s(this,g).classList.toggle("active")},s(this,I).onmousedown=t=>{window.location.href="/"}}connectedCallback(){this.init(c.html,s(this,m))}attributeChangedCallback(t,l,d){this.init(c.html,s(this,m))}};H=new WeakMap,g=new WeakMap,I=new WeakMap,m=new WeakMap,a(c,"html",""),a(c,"observedAttributes",[]);let q=c;function X(){let n=new XMLHttpRequest;n.open("GET","/components/training-card.html",!1),n.send(),k.html=n.responseText,customElements.define("training-card",k);let e=new XMLHttpRequest;e.open("GET","/components/discord-chatbot-button.html",!1),e.send(),x.html=e.responseText,customElements.define("discord-chatbot-button",x);let t=new XMLHttpRequest;t.open("GET","/components/discord-chatbot-panel.html",!1),t.send(),C.html=t.responseText,customElements.define("discord-chatbot-panel",C);let l=new XMLHttpRequest;l.open("GET","/components/sidebar.html",!1),l.send(),q.html=l.responseText,customElements.define("side-bar",q)}export{X as i};