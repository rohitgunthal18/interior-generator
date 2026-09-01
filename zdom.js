/* minimal browser stub so data.js + prompts.js + app.js can run under node */
function El(id, tag){
  const e = {
    id:id||"", tagName:(tag||"div").toUpperCase(), children:[], _html:"", value:"", checked:false,
    className:"", style:{}, dataset:{}, textContent:"",
    classList:{ _s:new Set(), add(c){this._s.add(c);}, remove(c){this._s.delete(c);},
      toggle(c,f){ f===undefined ? (this._s.has(c)?this._s.delete(c):this._s.add(c)) : (f?this._s.add(c):this._s.delete(c)); },
      contains(c){ return this._s.has(c); } },
    addEventListener(){}, removeEventListener(){}, appendChild(c){ this.children.push(c); return c; },
    remove(){}, focus(){}, blur(){}, select(){}, closest(){ return null; },
    setAttribute(k,v){ this[k]=v; }, getAttribute(k){ return this[k]; },
    querySelector(){ return El("q"); }, querySelectorAll(){ return []; },
    getBoundingClientRect(){ return {top:0,left:0,width:0,height:0,right:0,bottom:0}; },
    scrollIntoView(){}, insertAdjacentHTML(){}
  };
  Object.defineProperty(e, "innerHTML", { get(){ return this._html; }, set(v){ this._html = String(v); } });
  Object.defineProperty(e, "options",   { get(){ return []; } });
  return e;
}
const store = {};
const doc = {
  _els:{},
  getElementById(id){ return this._els[id] || (this._els[id] = El(id)); },
  querySelector(s){ return El(s); },
  querySelectorAll(){ return []; },
  createElement(t){ return El("", t); },
  body:El("body","body"), documentElement:El("html","html"),
  addEventListener(){}, removeEventListener(){}
};
global.document = doc;
global.localStorage = { getItem(k){ return k in store ? store[k] : null; },
  setItem(k,v){ store[k] = String(v); }, removeItem(k){ delete store[k]; } };
global.location = { hash:"", href:"file:///x/index.html", search:"" };
global.navigator = { clipboard:{ writeText(){ return Promise.resolve(); } }, userAgent:"node" };
global.window = { addEventListener(){}, removeEventListener(){}, matchMedia(){ return {matches:false, addEventListener(){}}; },
  innerWidth:1440, innerHeight:900, location:global.location, localStorage:global.localStorage,
  scrollTo(){}, getComputedStyle(){ return {}; } };
global.btoa = s => Buffer.from(s, "binary").toString("base64");
global.atob = s => Buffer.from(s, "base64").toString("binary");
global.alert = () => {};
global.requestAnimationFrame = f => setTimeout(f, 0);
