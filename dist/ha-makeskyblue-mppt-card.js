function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,_=g.trustedTypes,m=_?_.emptyScript:"",v=g.reactiveElementPolyfillSupport,f=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,n=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[f("elementProperties")]=new Map,w[f("finalized")]=new Map,v?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.1");const x=globalThis,S=x.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,P=`<${k}>`,U=document,O=()=>U.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,M=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,V=/"/g,j=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,F=U.createTreeWalker(U,129);function G(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=T;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===T?"!--"===l[1]?o=H:void 0!==l[1]?o=M:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=z):void 0!==l[3]&&(o=z):o===z?">"===l[0]?(o=n??T,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?z:'"'===l[3]?V:B):o===V||o===B?o=z:o===H||o===M?o=T:(o=z,n=void 0);const d=o===z&&t[e+1].startsWith("/>")?" ":"";r+=o===T?i+P:c>=0?(s.push(a),i.slice(0,c)+E+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,c]=K(t,e);if(this.el=J.createElement(l,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=c[r++],i=s.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),F.nextNode(),a.push({type:2,index:++n});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===L)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=D(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=X(t,n._$AS(t,e.values),n,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);F.currentNode=s;let n=F.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Z(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=F.nextNode(),r++)}return F.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),D(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Z(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=X(this,t,e,0),r=!D(t)||t!==this._$AH&&t!==L,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=X(this,s[i+o],e,o),a===L&&(a=this._$AH[o]),r||=!D(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===L)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(J,Z),(x.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class ot extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Z(e.insertBefore(O(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.1");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:b},ht=(t=ct,e,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return dt({...t,state:!0,attribute:!1})}var ut,gt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ut||(ut={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(gt||(gt={}));let _t=class extends ot{setConfig(t){this._config=t}render(){return this.hass&&this._config?I`
      <div class="card-config">
        <ha-textfield 
          label="Device Serial Number (Required)" 
          .value=${this._config.device||""} 
          .configValue=${"device"} 
          @input=${this._valueChanged} 
          helper="The unique serial number part, e.g., m7g6fmpw3" 
          required
        ></ha-textfield>
        <ha-textfield label="Name (Optional)" .value=${this._config.name||""} .configValue=${"name"} @input=${this._valueChanged} helper="The title of the card"></ha-textfield>
        <ha-textfield label="Brand Image URL (Optional)" .value=${this._config.image||""} .configValue=${"image"} @input=${this._valueChanged} helper="e.g., /local/makeskyblue-logo.png"></ha-textfield>
        <ha-textfield label="Power Switch Entity (Optional)" .value=${this._config.power_switch_entity||""} .configValue=${"power_switch_entity"} @input=${this._valueChanged} helper="e.g., switch.your_mppt_power"></ha-textfield>
        <ha-textfield label="Battery SoC Entity (Optional)" .value=${this._config.battery_soc_entity||""} .configValue=${"battery_soc_entity"} @input=${this._valueChanged} helper="e.g., sensor.your_battery_soc"></ha-textfield>
      </div>
    `:I``}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue;if(this._config[i]===e.value)return;const s={...this._config};""===e.value?delete s[i]:s[i]=e.value,function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});n.detail=i,t.dispatchEvent(n)}(this,"config-changed",{config:s})}};t([dt({attribute:!1})],_t.prototype,"hass",void 0),t([pt()],_t.prototype,"_config",void 0),_t=t([lt("ha-makeskyblue-mppt-card-editor")],_t),console.info("%c HA-MAKESKYBLUE-MPPT-CARD %c v4.5.3-final ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");const mt={faultStatus:"mppt_fault_status",batteryVoltage:"battery_voltage",batteryCurrent:"battery_current",pvVoltage:"pv_voltage",chargePower:"mppt_charge_power",temperature:"mppt_temperature",cumulativeGeneration:"mppt_cumulative_generation",workStatus:"mppt_work_status",equalizationVoltage:"mppt_equalization_voltage",floatVoltage:"mppt_float_voltage",chargeCurrent:"mppt_charge_current",batteryLowVoltage:"undervoltage_protection_voltage",batteryRecoverVoltage:"undervoltage_recovery_voltage",batteryType:"battery_type",batteryNumber:"battery_number",wifiSignal:"signal_strength",wifiSsid:"wi_fi_name",ledIndicator:"led_indicator",restartDevice:"restart",resetDevice:"reset_device"};let vt=class extends ot{constructor(){super(...arguments),this._showSettings=!1,this._showDiagnostics=!1}static async getConfigElement(){return document.createElement("ha-makeskyblue-mppt-card-editor")}static getStubConfig(){return{device:""}}setConfig(t){if(!t||!t.device)throw new Error("Config 'device is required");this.config=t}getCardSize(){return 10}_getEntity(t,e="sensor"){const i=`${e}.${`makeskyblue_mppt_${this.config.device.toLowerCase()}`}_${t}`;return this.hass.states[i]}_getEntityById(t){return this.hass.states[t]}_getState(t,e="--"){return t&&"unavailable"!==t.state&&"unknown"!==t.state?t.state:e}_getUnit(t){return t?.attributes.unit_of_measurement||""}_callService(t,e,i){this.hass.callService(t,e,i)}render(){if(!this.config||!this.hass)return I``;const t=this._getEntity(mt.chargePower);if(!t)return I`<ha-card><div class="warning">Entity not found. Check Serial Number. Expected: sensor.makeskyblue_mppt_${this.config.device.toLowerCase()}_${mt.chargePower}</div></ha-card>`;const e=this._getEntity(mt.pvVoltage),i=this._getEntity(mt.batteryVoltage),s=this._getEntity(mt.batteryCurrent),n=this._getEntity(mt.workStatus),r=this._getEntity(mt.cumulativeGeneration),o=this._getEntity(mt.temperature),a=this.config.power_switch_entity?this._getEntityById(this.config.power_switch_entity):void 0,l=this.config.battery_soc_entity?this._getEntityById(this.config.battery_soc_entity):void 0,c=parseFloat(this._getState(t,"0")),h=Math.min(180,c/1e4*180)-90;return I`
      <ha-card>
        <div class="card-content">
          ${this.config.image?I`<img class="brand-image" src="${this.config.image}" />`:""}
          <div class="title">${this.config.name||this.config.device}</div>
          ${this.renderGaugeAndStats(c,h,e,i,s)}
          ${this.renderInfoBoxes(n,r)}
          ${a?this.renderSwitchRow(a):""}
          ${l?this.renderBatterySOCRow(l):""}
          ${this.renderTempBar(o)}
        </div>
        <div class="card-actions">
          <mwc-button @click=${()=>this._showSettings=!this._showSettings}>
            ${this._showSettings?"Hide Settings":"Show Settings"}
          </mwc-button>
          <!-- ADDED: A new button for diagnostics -->
          <mwc-button @click=${()=>this._showDiagnostics=!this._showDiagnostics}>
            ${this._showDiagnostics?"Hide Diagnostics":"Show Diagnostics"}
          </mwc-button>
        </div>
        ${this._showSettings?this.renderSettingsPanel():""}
        <!-- ADDED: Conditional rendering for the new diagnostics panel -->
        ${this._showDiagnostics?this.renderDiagnosticsPanel():""}
      </ha-card>
    `}renderGaugeAndStats(t,e,i,s,n){return I`
      <div class="gauge-wrapper">
        <div class="gauge-container">
          <div class="gauge-background"></div>
          <div class="gauge-ticks">
            ${Array.from({length:41},(t,e)=>I`<div class="gauge-tick ${e%5==0?"major":""}" style="transform: rotate(${4.5*e-90}deg);"></div>`)}
          </div>
          <div class="gauge-labels">
            ${[{value:"0",angle:-90},{value:"2500",angle:-45},{value:"5000",angle:0},{value:"7500",angle:45},{value:"10000",angle:90}].map(t=>I` <div class="gauge-label-wrapper" style="transform: rotate(${t.angle}deg);"> <span class="gauge-label-text" style="transform: rotate(${-t.angle}deg);">${t.value}</span> </div> `)}
          </div>
          <div class="gauge-power-bar" style="transform: rotate(${e}deg);"></div>
        </div>
        <div class="gauge-value-text">${t.toFixed(1)}<span class="unit">W</span></div>
      </div>
      <div class="stats-grid">
        <div class="stat"><ha-icon icon="mdi:solar-power"></ha-icon><div class="label">光伏输入电压</div><div class="value">${this._getState(i)}<span class="unit">${this._getUnit(i)}</span></div></div>
        <div class="stat"><ha-icon icon="mdi:battery-charging"></ha-icon><div class="label">电池充电电压</div><div class="value">${this._getState(s)}<span class="unit">${this._getUnit(s)}</span></div></div>
        <div class="stat"><ha-icon icon="mdi:current-dc"></ha-icon><div class="label">电池充电电流</div><div class="value">${this._getState(n)}<span class="unit">${this._getUnit(n)}</span></div></div>
      </div>
    `}renderInfoBoxes(t,e){return I`
      <div class="info-grid">
        <div class="info-box blue"><ha-icon icon="mdi:cog-transfer"></ha-icon><div class="label">充电模式</div><div class="value">${this._getState(t)}</div></div>
        <div class="info-box blue"><ha-icon icon="mdi:chart-line"></ha-icon><div class="label">累计发电量</div><div class="value">${this._getState(e)}<span class="unit">${this._getUnit(e)}</span></div></div>
      </div>
    `}renderSwitchRow(t){return I`<div class="row"><ha-icon icon="mdi:power-standby"></ha-icon><div class="label">电源开关</div><ha-switch .checked=${"on"===this._getState(t)} @click=${()=>this._callService("switch","toggle",{entity_id:t.entity_id})}></ha-switch></div>`}renderBatterySOCRow(t){return I`<div class="row"><ha-icon icon="mdi:battery"></ha-icon><div class="label">电池电量</div><div class="value">${this._getState(t)}<span class="unit">${this._getUnit(t)}</span></div></div>`}renderTempBar(t){return I`<div class="temp-bar"><ha-icon icon="mdi:thermometer"></ha-icon><div class="label">当前温度</div><div class="value">${this._getState(t)}<span class="unit">${this._getUnit(t)}</span></div></div>`}renderSettingsPanel(){return I`
      <div class="settings-area">
        ${[{key:"equalizationVoltage",domain:"number",label:"均充电压"},{key:"floatVoltage",domain:"number",label:"浮充电压"},{key:"chargeCurrent",domain:"number",label:"最大充电电流"},{key:"batteryLowVoltage",domain:"number",label:"电池低压"},{key:"batteryRecoverVoltage",domain:"number",label:"电池恢复电压"},{key:"batteryType",domain:"select",label:"电池类型"},{key:"batteryNumber",domain:"number",label:"电池串数"}].map(t=>{const e=this._getEntity(mt[t.key],t.domain);return e?"number"===t.domain?"batteryNumber"===t.key?this.renderSliderSetting(e,t.label):this.renderNumberSetting(e,t.label):"select"===t.domain?this.renderSelectSetting(e,t.label):"":""})}
      </div>
    `}renderNumberSetting(t,e){return I` <div class="setting-row"> <label>${e}</label> <ha-textfield type="number" .value=${t.state} .min=${t.attributes.min} .max=${t.attributes.max} .step=${t.attributes.step} suffix=${this._getUnit(t)} @change=${e=>this._callService("number","set_value",{entity_id:t.entity_id,value:e.target.value})}></ha-textfield> </div> `}renderSliderSetting(t,e){return I` <div class="setting-row slider"> <label>${e}</label> <div class="slider-container"> <ha-slider min=${t.attributes.min} max=${t.attributes.max} step=${t.attributes.step} .value=${t.state} pin @change=${e=>this._callService("number","set_value",{entity_id:t.entity_id,value:e.target.value})}></ha-slider> <span>${t.state}</span> </div> </div> `}renderSelectSetting(t,e){return I` <div class="setting-row"> <label>${e}</label> <ha-select .value=${t.state} @selected=${e=>{const i=e.target.value;this._callService("select","select_option",{entity_id:t.entity_id,option:i})}}> ${t.attributes.options.map(t=>I`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)} </ha-select> </div> `}renderDiagnosticsPanel(){const t=this._getEntity(mt.wifiSignal),e=this._getEntity(mt.wifiSsid),i=this._getEntity(mt.ledIndicator,"switch"),s=this._getEntity(mt.restartDevice,"button"),n=this._getEntity(mt.resetDevice,"button");return I`
      <div class="diagnostics-area">
        <!-- WiFi Signal Strength -->
        ${t?I`
          <div class="setting-row">
            <label>信号强度</label>
            <span>${this._getState(t)}${this._getUnit(t)}</span>
          </div>
        `:""}
        <!-- WiFi Name (SSID) -->
        ${e?I`
          <div class="setting-row">
            <label>WiFi 名称</label>
            <span>${this._getState(e)}</span>
          </div>
        `:""}
        <!-- LED Indicator Switch -->
        ${i?I`
          <div class="setting-row">
            <label>LED 指示灯</label>
            <ha-switch .checked=${"on"===this._getState(i)} @click=${()=>this._callService("switch","toggle",{entity_id:i.entity_id})}></ha-switch>
          </div>
        `:""}
        <!-- Restart Device Button -->
        ${s?I`
          <div class="setting-row">
            <label>重启设备</label>
            <mwc-button @click=${()=>this._callService("button","press",{entity_id:s.entity_id})}>重启</mwc-button>
          </div>
        `:""}
        <!-- Reset Device Button -->
        ${n?I`
          <div class="setting-row">
            <label>重置设备</label>
            <mwc-button class="destructive" @click=${()=>this._callService("button","press",{entity_id:n.entity_id})}>重置</mwc-button>
          </div>
        `:""}
      </div>
    `}static get styles(){return o`
      /* UNCHANGED STYLES */
      ha-card { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
      .card-content { padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
      .warning { padding: 16px; color: var(--error-color); }
      .brand-image { max-width: 150px; max-height: 40px; }
      .title { font-size: 1.2em; font-weight: 500; color: var(--primary-text-color); }
      .gauge-wrapper { display: flex; flex-direction: column; align-items: center; margin-bottom: 24px; }
      .gauge-container { position: relative; width: 100%; max-width: 300px; height: 150px; }
      .gauge-background { position: absolute; width: 240px; height: 120px; bottom: 0; left: 50%; transform: translateX(-50%); border-top-left-radius: 120px; border-top-right-radius: 120px; background: #f0f3f5; }
      .gauge-ticks, .gauge-labels { position: absolute; width: 240px; height: 120px; bottom: 0; left: 50%; transform: translateX(-50%); }
      .gauge-tick { position: absolute; bottom: 0; left: 50%; width: 1px; height: 120px; transform-origin: bottom center; }
      .gauge-tick::after { content: ''; position: absolute; top: 0; left: 0px; width: 2px; height: 8px; background: #d0d0d0; }
      .gauge-tick.major::after { height: 12px; background: #a0a0a0; }
      .gauge-label-wrapper { position: absolute; width: 1px; height: 145px; bottom: 0; left: 50%; transform-origin: bottom center; }
      .gauge-label-text { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); font-size: 0.9em; color: var(--secondary-text-color); }
      .gauge-power-bar { position: absolute; bottom: 12.5px; left: 50%; width: 6px; height: 75px; margin-left: -3px; background-color: #f44336; border-radius: 3px; transform-origin: bottom center; transition: transform 0.5s ease-in-out; }
      .gauge-value-text { margin-top: 20px; font-size: 2.2em; font-weight: bold; color: #4CAF50; text-align: center; }
      .gauge-value-text .unit { font-size: 0.5em; font-weight: normal; color: var(--secondary-text-color); margin-left: 4px; }
      .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%; text-align: center; }
      .stat ha-icon { color: var(--state-icon-color); margin-bottom: 4px; }
      .stat .label { font-size: 0.8em; color: var(--secondary-text-color); }
      .stat .value { font-size: 1.5em; font-weight: 500; color: var(--primary-text-color); }
      .stat .value .unit { font-size: 0.6em; }
      .info-grid { display: grid; gap: 8px; width: 100%; grid-template-columns: repeat(2, 1fr); }
      .info-box { background-color: #03a9f4; color: white; border-radius: 12px; padding: 12px; text-align: center; }
      .info-box .label { font-size: 0.9em; opacity: 0.8; }
      .info-box .value { font-size: 1.2em; font-weight: bold; }
      .info-box .value .unit { font-size: 0.7em; }
      .row, .temp-bar { display: flex; align-items: center; width: 100%; padding: 12px; box-sizing: border-box; border-radius: 12px; }
      .row { background: var(--card-background-color); border: 1px solid var(--divider-color); }
      .temp-bar { background-color: #f5f5dc; color: #333; }
      .row .label, .temp-bar .label { flex-grow: 1; margin-left: 12px; font-weight: 500; }
      .row .value, .temp-bar .value { font-size: 1.1em; font-weight: bold; }
      .row .value .unit { font-size: 0.8em; color: var(--secondary-text-color); }
      .settings-area { padding: 0 16px 16px; border-top: 1px solid var(--divider-color); margin-top: 8px; }
      .setting-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
      .setting-row label { flex: 1; }
      .setting-row ha-textfield, .setting-row ha-select { flex: 1; max-width: 150px; }
      .setting-row.slider { flex-direction: column; align-items: stretch; }
      .slider-container { display: flex; align-items: center; gap: 16px; }
      .slider-container ha-slider { flex-grow: 1; }
      
      /* ADDED: Styles for the new diagnostics panel */
      .card-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding-right: 8px;
      }
      .diagnostics-area {
        padding: 0 16px 16px;
        border-top: 1px solid var(--divider-color);
        margin-top: 8px;
      }
      .destructive {
        --mdc-theme-primary: var(--error-color);
      }
    `}};t([dt({attribute:!1})],vt.prototype,"hass",void 0),t([pt()],vt.prototype,"config",void 0),t([pt()],vt.prototype,"_showSettings",void 0),t([pt()],vt.prototype,"_showDiagnostics",void 0),vt=t([lt("ha-makeskyblue-mppt-card")],vt);export{vt as HaMakeskyblueMpptCard};
//# sourceMappingURL=ha-makeskyblue-mppt-card.js.map
