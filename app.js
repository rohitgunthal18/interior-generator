/* =====================================================================
   app.js — state, UI wiring, persistence
   ===================================================================== */

const S = {
  mode:"indoor", ratio:"post", fmt:"json", model:"gpt",
  space:"", theme:"__auto", handle:"",
  pid:"", seed:0, opts:{}, vals:{scale:"",light:"",condition:"",accent:"",must:"",
  budget:"mid-range",hook:"",market:"",cta:CTA[0]},
  flags:{notes:true,hindi:false,strict:true}
};
const AUTO_LABEL = "AI decides — pick the best match";
const LS_KEY = "idps.v3";

function newPid(){
  return "IDPS-" + Math.random().toString(16).slice(2,6).toUpperCase();
}
/* the shell-variation seed: rerolled with the post id, so the next post
   gets a different raw space instead of the same box again */
function newSeed(){
  return Math.floor(Math.random()*1e9);
}
const $ = id => document.getElementById(id);
function toast(m){
  const t=$("toast"); t.textContent=m; t.classList.add("on");
  clearTimeout(t._x); t._x=setTimeout(()=>t.classList.remove("on"),1700);
}
function copy(txt,msg){
  navigator.clipboard.writeText(txt).then(()=>toast(msg||"Copied"),
    ()=>toast("Copy blocked — select the text manually"));
}

/* ---------------- persistence ---------------- */
function save(){
  try{ localStorage.setItem(LS_KEY, JSON.stringify(S)); }catch(e){}
}
function load(){
  let raw=null;
  if(location.hash.length>1){
    try{ raw=decodeURIComponent(escape(atob(location.hash.slice(1)))); }catch(e){ raw=null; }
  }
  if(!raw){ try{ raw=localStorage.getItem(LS_KEY); }catch(e){} }
  if(!raw) return false;
  try{
    const o=JSON.parse(raw);
    Object.assign(S,o);
    S.opts=o.opts||{}; S.vals=Object.assign({},S.vals,o.vals||{});
    S.flags=Object.assign({},S.flags,o.flags||{});
    return true;
  }catch(e){ return false; }
}
function shareLink(){
  const b64=btoa(unescape(encodeURIComponent(JSON.stringify(S))));
  return location.href.split("#")[0] + "#" + b64;
}

/* ---------------- rendering ---------------- */
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function hl(s){
  let h=esc(s);
  h=h.replace(/(AI_DECIDES[^\n"]*)/g,'<mark>$1</mark>');
  if(S.fmt==="json"){
    h=h.replace(/^(\s*)(&quot;|")([^"&]+)(&quot;|")(\s*:)/gm,'$1<span class="k">"$3"</span>$5');
  }
  return h;
}
function renderPrompts(){
  $("prompts").innerHTML = cards().map((c,i)=>{
    const txt=c.f();
    const neg = c.neg ? negOf(c.neg()) : "";
    return `<div class="card">
      <div class="chead"><div class="num">${c.n}</div><h2>${c.t}</h2>
        <span class="tag">${c.tag()}</span></div>
      <p class="cdesc">${c.d}</p>
      <div class="pbox"><pre>${hl(txt)}</pre>
        <div class="bar">
          <button class="btn" data-copy="${i}">Copy prompt</button>
          <button class="btn gh" data-dl="${i}">Download .txt</button>
          ${neg?`<button class="btn sm" data-neg="${i}">Copy negative only</button>`:""}
          <span class="meta">${txt.split(/\s+/).length} words · ${txt.length} chars</span>
        </div></div>
      ${c.tip[1]?`<div class="tip ${c.tip[0]}">${c.tip[1]}</div>`:""}</div>`;
  }).join("");
}
function renderThemes(){
  const q=($("themeSearch").value||"").toLowerCase();
  const list=DATA[S.mode].themes.filter(t=>!q ||
    (t.n+" "+t.f+" "+t.d+" "+t.b).toLowerCase().includes(q));
  $("themeCount").textContent = list.length + " of " + DATA[S.mode].themes.length;
  $("themeGrid").innerHTML = list.map(t=>`<div class="tcard">
    <span class="fam">${esc(t.f)}</span><b>${esc(t.n)}</b>
    <div class="sw">${t.sw.map(c=>`<i style="background:${c}"></i>`).join("")}</div>
    <p>${esc(t.d)}</p><span class="best">Best for: ${esc(t.b)}</span></div>`).join("") ||
    `<p class="hint">No theme matches that search.</p>`;
}
function groupOptions(items, sel, keyFn){
  const groups=[];
  items.forEach(x=>{
    const g=keyFn(x);
    let bucket=groups.find(b=>b.g===g);
    if(!bucket){ bucket={g:g,items:[]}; groups.push(bucket); }
    bucket.items.push(x);
  });
  return groups.map(b=>`<optgroup label="${esc(b.g)}">`+
    b.items.map(x=>`<option${x.n===sel?" selected":""}>${esc(x.n)}</option>`).join("")+
    `</optgroup>`).join("");
}

/* ---------------- mode-aware chrome ---------------- */
const FLOW_BA = [["Step 1","Raw Space","Slide 2 &middot; Before"],
  ["Step 2","Design Layer","Slide 3 &middot; After"],
  ["Step 3","Cover","Slide 1 &middot; Cover"],
  ["Step 4","Caption &amp; Tags","Post copy"]];
function renderFlow(){
  const box = document.querySelector(".flow");
  if(!box) return;
  let steps = FLOW_BA;
  if(TOUR()){
    const rooms = ROOMS(), n = rooms.length;
    steps = [["Step 1", esc(rooms[0].n), "Locks the design"],
      ["Steps 2-" + n, (n - 1) + " more rooms", "Same design, no restyle"],
      ["Step " + (n + 1), "Thumbnail Collage", "Cover tile"],
      ["Step " + (n + 2), "Caption &amp; Tags", "Post copy"]];
  }
  box.innerHTML = steps.map(x =>
    `<div class="fstep"><b>${x[0]}</b><span>${x[1]}</span><i>${x[2]}</i></div>`).join("");
}
function spaceHintText(sp){
  if(!sp) return "";
  return TOUR()
    ? sp.rooms.length + " images · " + sp.m + " · " + sp.s
    : "Typical size: " + sp.s;
}
function runNote(){
  const n = cards().length;
  if(!TOUR()) return "Run the prompts in order 1 to " + n + ". Steps 2 and 3 need the previous image attached.";
  return "Run all " + n + " prompts in ONE chat, in order. Prompt 1 designs the property and prints the HOME_DNA block; "
    + "prompts 2 to " + (n - 2) + " reuse it without describing the design again; prompt " + (n - 1)
    + " builds the collage from every image; prompt " + n + " writes the copy.";
}
/* rows that make no sense in a mode are pulled out of the form entirely */
function optRow(key, show){
  const c = document.querySelector('[data-opt="' + key + '"]');
  if(!c) return;
  const lab = c.closest ? c.closest("label") : null;
  if(lab) lab.hidden = !show;
  if(!show && S.opts[key]){ S.opts[key] = false; c.checked = false; }
  const box = $("opt-" + key);
  if(box) box.hidden = !(show && S.opts[key]);
}
function fillSpaces(){
  const D=DATA[S.mode];
  const q=($("spaceSearch").value||"").toLowerCase();
  const list=D.spaces.filter(x=>!q || (x.n+" "+x.g+" "+x.m).toLowerCase().includes(q));
  const use=list.length?list:D.spaces;
  if(!use.find(x=>x.n===S.space)) S.space=use[0].n;
  $("space").innerHTML=groupOptions(use,S.space,x=>x.g);
  const sp=D.spaces.find(x=>x.n===S.space)||D.spaces[0];
  $("spaceHint").textContent=spaceHintText(sp);
}
function fillMode(){
  const D=DATA[S.mode];
  document.querySelectorAll(".mbtn").forEach(b=>b.classList.toggle("on",b.dataset.mode===S.mode));
  document.querySelector('label[for="space"]').textContent=D.spaceLabel;
  fillSpaces();
  if(!D.themes.find(t=>t.n===S.theme)) S.theme="__auto";
  $("theme").innerHTML=`<option value="__auto"${S.theme==="__auto"?" selected":""}>${AUTO_LABEL}</option>`+
    groupOptions(D.themes,S.theme,t=>t.f);
  $("scale").placeholder=D.scaleEx;
  $("must").placeholder=D.mustEx;
  $("themeHint").textContent=D.themes.length+" "+(TOUR()?"interior":S.mode)+
    " themes across 6 families. Leave on AI decides for the best fit.";
  $("spaceSearch").placeholder="Filter "+D.spaces.length+" "+
    (TOUR()?"property packages":S.mode+" spaces");
  optRow("condition", !TOUR());
  optRow("hook", !TOUR());
  renderFlow();
  radios("lightR","light",D.light.map(x=>({n:x})));
  radios("condR","condition",D.cond.map(x=>({n:x})));
  renderThemes();
}
function radios(id,key,arr){
  if(!arr.find(a=>a.n===S.vals[key])) S.vals[key]=arr[0].n;
  $(id).innerHTML=arr.map(a=>
    `<label title="${esc(a.d||a.n)}"><input type="radio" name="${key}" value="${esc(a.n)}"${a.n===S.vals[key]?" checked":""}>
     <span>${esc(a.n)}</span></label>`).join("");
  $(id).querySelectorAll("input").forEach(r=>
    r.addEventListener("change",()=>{S.vals[key]=r.value;refresh();}));
}
function fillAccents(){
  $("swgrid").innerHTML=ACCENTS.map(a=>
    `<button class="swbtn" data-hex="${a.h}" data-name="${esc(a.n)}" title="${esc(a.n)}"
      style="background:${a.h}" aria-label="${esc(a.n)}"></button>`).join("");
  $("swgrid").querySelectorAll(".swbtn").forEach(b=>b.addEventListener("click",()=>{
    const label=b.dataset.name+" ("+b.dataset.hex+")";
    S.vals.accent=label; $("accent").value=label; markAccent(); refresh();
  }));
}
function markAccent(){
  const val=(S.vals.accent||"").toLowerCase();
  $("swgrid").querySelectorAll(".swbtn").forEach(b=>
    b.classList.toggle("on", val.includes(b.dataset.name.toLowerCase())));
  $("swname").textContent=S.vals.accent||"Pick a swatch or type your own";
}

/* ---------------- mobile: optional-details toggle ---------------- */
const MOBILE_Q = "(max-width:980px)";
function isMobile(){
  return !!(typeof window!=="undefined" && window.matchMedia &&
            window.matchMedia(MOBILE_Q).matches);
}
function setAdv(open){
  if(document.body && document.body.classList) document.body.classList.toggle("adv-closed", !open);
  const b=$("advToggle");
  if(b && b.setAttribute) b.setAttribute("aria-expanded", open ? "true" : "false");
}
function openAdv(){ if(isMobile()) setAdv(true); }

/* ---------------- presets + randomiser ---------------- */
function fillPresets(){
  $("presets").innerHTML=PRESETS.map((p,i)=>
    `<button class="pbtn" data-preset="${i}">${esc(p.n)}</button>`).join("");
  $("presets").querySelectorAll(".pbtn").forEach(b=>
    b.addEventListener("click",()=>applyPreset(PRESETS[+b.dataset.preset])));
}
function applyPreset(p){
  S.mode=p.m; S.space=p.sp; S.theme=p.th;
  Object.keys(p.o||{}).forEach(k=>{ S.opts[k]=true; S.vals[k]=p.o[k]; });
  syncUI(); refresh(); openAdv(); toast("Preset loaded: "+p.n);
}
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function surprise(){
  S.seed = newSeed();
  const roll = Math.random();
  S.mode = roll<.55 ? "indoor" : (roll<.8 ? "outdoor" : "tour");
  const D=DATA[S.mode];
  S.space=pick(D.spaces).n;
  S.theme=pick(D.themes).n;
  const a=pick(ACCENTS);
  S.opts.accent=true; S.vals.accent=a.n+" ("+a.h+")";
  S.opts.light=true;  S.vals.light=pick(D.light);
  S.opts.budget=true; S.vals.budget=pick(BUDGET).n;
  S.opts.condition=false; S.opts.scale=false; S.opts.must=false;
  syncUI(); refresh(); openAdv(); toast("Surprise: "+S.space+" · "+S.theme);
}

/* ---------------- UI sync ---------------- */
function syncUI(){
  fillMode();
  $("ratio") && ($("ratio").value=S.ratio);
  document.querySelectorAll(".rbtn").forEach(b=>b.classList.toggle("on",b.dataset.ratio===S.ratio));
  document.querySelectorAll(".fbtn").forEach(b=>b.classList.toggle("on",b.dataset.fmt===S.fmt));
  $("model").value=S.model;
  $("space").value=S.space;
  $("theme").value=S.theme;
  $("handle").value=S.handle;
  ["scale","accent","must","hook","market"].forEach(k=>{
    const el=$(k); if(el && typeof S.vals[k]==="string") el.value=S.vals[k];
  });
  document.querySelectorAll("[data-opt]").forEach(c=>{
    c.checked=!!S.opts[c.dataset.opt];
    const box=$("opt-"+c.dataset.opt); if(box) box.hidden=!c.checked;
  });
  document.querySelectorAll("[data-flag]").forEach(c=>{ c.checked=!!S.flags[c.dataset.flag]; });
  radios("budgetR","budget",BUDGET);
  radios("ctaR","cta",CTA.map(x=>({n:x})));
  markAccent();
  $("modelNote").textContent=MODELS[S.model].note;
  $("pid").textContent=S.pid;
  $("ratioNote").textContent=RATIOS[S.ratio].px+" · "+RATIOS[S.ratio].ar;
}

/* ---------------- refresh ---------------- */
function refresh(){
  renderPrompts();
  const sp=DATA[S.mode].spaces.find(x=>x.n===S.space);
  if(sp) $("spaceHint").textContent=spaceHintText(sp);
  $("modelNote").textContent=MODELS[S.model].note;
  $("ratioNote").textContent=RATIOS[S.ratio].px+" · "+RATIOS[S.ratio].ar;
  save();
}

/* ---------------- reset ---------------- */
function reset(){
  const pid=S.pid;
  S.mode="indoor"; S.ratio="post"; S.fmt="json"; S.model="gpt";
  S.theme="__auto"; S.space=""; S.handle="";
  S.opts={};
  S.vals={scale:"",light:"",condition:"",accent:"",must:"",
    budget:BUDGET[1].n,hook:"",market:"",cta:CTA[0]};
  S.flags={notes:true,hindi:false,strict:true};
  S.pid=pid; S.seed=newSeed();
  $("spaceSearch").value=""; $("themeSearch").value="";
  syncUI(); refresh(); toast("Everything reset");
}

/* ---------------- files ---------------- */
function slug(s){ return String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
function download(name,txt){
  const b=new Blob([txt],{type:"text/plain;charset=utf-8"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(b); a.download=name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),2000);
}
function bundle(){
  const head="INTERIOR DESIGN PROMPT SET\npost id: "+S.pid+
    "\nmode: "+S.mode+"\nspace: "+S.space+
    "\ntheme: "+(S.theme==="__auto"?"AI decides":S.theme)+
    "\nformat: "+RATIOS[S.ratio].n+" ("+RATIOS[S.ratio].ar+", "+RATIOS[S.ratio].px+")"+
    "\ntarget model: "+MODELS[S.model].n+
    "\nprompt format: "+(S.fmt==="json"?"JSON":"plain text")+
    "\n\n" + runNote() + "\n";
  return head+cards().map(c=>
    "\n\n"+"=".repeat(64)+"\nPROMPT "+c.n+" — "+c.t+" ("+c.tag()+")\n"+
    "=".repeat(64)+"\n\n"+c.f()).join("");
}

/* ---------------- wiring ---------------- */
function wire(){
  document.querySelectorAll(".mbtn").forEach(b=>b.addEventListener("click",()=>{
    S.mode=b.dataset.mode; S.space=""; syncUI(); refresh();
  }));
  document.querySelectorAll(".rbtn").forEach(b=>b.addEventListener("click",()=>{
    S.ratio=b.dataset.ratio; syncUI(); refresh();
  }));
  const rsel=$("ratio");
  if(rsel) rsel.addEventListener("change",()=>{ S.ratio=rsel.value; syncUI(); refresh(); });
  document.querySelectorAll(".fbtn").forEach(b=>b.addEventListener("click",()=>{
    S.fmt=b.dataset.fmt; syncUI(); refresh();
  }));
  $("model").addEventListener("change",()=>{ S.model=$("model").value; refresh(); });
  $("space").addEventListener("change",()=>{ S.space=$("space").value; S.seed=newSeed(); S.pid=newPid(); refresh(); });
  $("theme").addEventListener("change",()=>{ S.theme=$("theme").value; refresh(); });
  $("handle").addEventListener("input",()=>{ S.handle=$("handle").value; refresh(); });
  $("spaceSearch").addEventListener("input",()=>{ fillSpaces(); refresh(); });
  $("themeSearch").addEventListener("input",renderThemes);

  document.querySelectorAll("[data-opt]").forEach(c=>c.addEventListener("change",()=>{
    S.opts[c.dataset.opt]=c.checked;
    const box=$("opt-"+c.dataset.opt); if(box) box.hidden=!c.checked;
    refresh();
  }));
  document.querySelectorAll("[data-flag]").forEach(c=>c.addEventListener("change",()=>{
    S.flags[c.dataset.flag]=c.checked; refresh();
  }));
  ["scale","accent","must","hook","market"].forEach(k=>{
    const el=$(k); if(!el) return;
    el.addEventListener("input",()=>{ S.vals[k]=el.value; if(k==="accent") markAccent(); refresh(); });
  });

  $("prompts").addEventListener("click",e=>{
    const b=e.target.closest("button"); if(!b) return;
    if(b.dataset.copy!==undefined){ copy(cards()[+b.dataset.copy].f(),"Prompt "+cards()[+b.dataset.copy].n+" copied"); }
    else if(b.dataset.dl!==undefined){
      const c=cards()[+b.dataset.dl];
      download(slug(S.space)+"-"+c.n+"-"+slug(c.t)+".txt",c.f());
      toast("Downloaded");
    }
    else if(b.dataset.neg!==undefined){
      const c=cards()[+b.dataset.neg];
      copy(negOf(c.neg()),"Negative prompt copied");
    }
  });

  $("copyAll").addEventListener("click",()=>copy(bundle(),"All "+cards().length+" prompts copied"));
  $("dlAll").addEventListener("click",()=>{
    download("prompts-"+slug(S.space)+"-"+S.pid+".txt",bundle()); toast("Prompt set downloaded");
  });
  $("share").addEventListener("click",()=>{
    const l=shareLink(); location.hash=l.split("#")[1]; copy(l,"Share link copied");
  });
  $("surprise").addEventListener("click",surprise);
  $("newId").addEventListener("click",()=>{
    S.pid=newPid(); S.seed=newSeed(); $("pid").textContent=S.pid;
    refresh(); toast("New post id "+S.pid+" · fresh raw layout");
  });
  $("resetBtn").addEventListener("click",reset);

  const at=$("advToggle");
  if(at) at.addEventListener("click",()=>{
    setAdv(!!(document.body && document.body.classList.contains("adv-closed")));
  });
  if(typeof window!=="undefined" && window.addEventListener)
    window.addEventListener("resize",()=>{ if(!isMobile()) setAdv(true); });
}

/* ---------------- init ---------------- */
(function init(){
  const had=load();
  if(!S.pid) S.pid=newPid();
  if(!S.seed) S.seed=newSeed();
  if(!had || !S.vals.budget) S.vals.budget=BUDGET[1].n;
  fillAccents();
  fillPresets();
  syncUI();
  wire();
  setAdv(!isMobile());
  refresh();
})();
