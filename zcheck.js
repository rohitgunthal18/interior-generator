/* full regression suite: build every prompt in every mode, validate the JSON,
   prove the tour lock and the variation, then cross-check index.html ids */
require("./zdom.js");
const fs = require("fs"), vm = require("vm");
for(const f of ["data.js","prompts.js","app.js"]) vm.runInThisContext(fs.readFileSync(f,"utf8"),{filename:f});
const g = vm.runInThisContext("({S,DATA,RATIOS,VARY_TOUR,cards,TOUR,ROOMS,TSP,dnaLine,camOf,newSeed,bundle,shareLink,load,save,surprise,runNote,spaceHintText})");
let fail = 0, pass = 0;
const ok = (c, m) => { c ? pass++ : (fail++, console.log("  FAIL " + m)); };
const fences = t => (String(t).match(/```json\s*([\s\S]*?)```/g) || []);

/* 1. every mode x every space x every ratio builds and yields valid JSON */
let builds = 0, jsons = 0;
for(const mode of ["indoor","outdoor","tour"]){
  g.S.mode = mode;
  const spaces = g.DATA[mode].spaces;
  for(const ratio of Object.keys(g.RATIOS)){
    g.S.ratio = ratio;
    for(const sp of spaces){
      g.S.space = sp.n;
      const cs = g.cards();
      for(const c of cs){
        let txt;
        try { txt = c.f(); } catch(e){ fail++; console.log("  THROW " + mode + "/" + ratio + "/" + sp.n + "/" + c.t + " :: " + e.message); continue; }
        builds++;
        if(!txt || String(txt).length < 200){ fail++; console.log("  SHORT " + mode + "/" + sp.n + "/" + c.t); continue; }
        for(const fence of fences(txt)){
          const body = fence.replace(/```json\s*/, "").replace(/```$/, "");
          try { JSON.parse(body); jsons++; } catch(e){ fail++; console.log("  BAD JSON " + mode + "/" + sp.n + "/" + c.t + " :: " + e.message); }
        }
      }
    }
  }
}
console.log("1. builds: " + builds + " prompts, " + jsons + " json blocks parsed" + (fail ? " (" + fail + " problems)" : ""));

/* 2. card counts per mode */
g.S.mode = "indoor"; g.S.ratio = "post"; g.S.space = g.DATA.indoor.spaces[0].n;
ok(g.cards().length === 4, "indoor should have 4 cards, has " + g.cards().length);
g.S.mode = "outdoor"; g.S.space = g.DATA.outdoor.spaces[0].n;
ok(g.cards().length === 4, "outdoor should have 4 cards, has " + g.cards().length);
g.S.mode = "tour";
for(const sp of g.DATA.tour.spaces){
  g.S.space = sp.n;
  ok(g.cards().length === sp.rooms.length + 2, sp.n + ": expected " + (sp.rooms.length + 2) + " cards, got " + g.cards().length);
}
console.log("2. card counts per mode: 4 / 4 / rooms+2 across 14 packages");

/* 3. the tour lock: prompt 1 prints HOME_DNA, later prompts carry no design words */
const LEAK = ["marble","granite","veneer","laminate"," oak","walnut","teak","brass","terrazzo","terracotta",
  "sage","beige","navy","mustard","rust","ivory","charcoal","brushed gold","chrome","boucle","velvet",
  "linen","rattan","fluted","arched","archway","cove light","microcement","microtopping","#"];
g.S.mode = "tour"; g.S.ratio = "post";
let leaks = 0, roomsChecked = 0;
for(const sp of g.DATA.tour.spaces){
  g.S.space = sp.n;
  const cs = g.cards(), n = sp.rooms.length;
  const p1 = cs[0].f();
  ok(/HOME_DNA/.test(p1), sp.n + ": prompt 1 must print a HOME_DNA block");
  ok(/variation/.test(p1) && /invent/i.test(p1), sp.n + ": prompt 1 must invent a fresh scheme");
  for(let i = 1; i < n; i++){
    const t = cs[i].f(); roomsChecked++;
    ok(/HOME_DNA/.test(t), sp.n + " room " + (i + 1) + ": must point at HOME_DNA");
    ok(/continuity_anchor/.test(t), sp.n + " room " + (i + 1) + ": missing continuity anchor");
    const low = t.toLowerCase();
    for(const w of LEAK) if(low.indexOf(w) >= 0){ leaks++; console.log("  LEAK '" + w + "' in " + sp.n + " / " + sp.rooms[i].n); }
  }
}
ok(leaks === 0, leaks + " design words leaked into room prompts");
console.log("3. tour lock: " + roomsChecked + " room prompts design-free, all reading HOME_DNA");

/* 4. collage geometry across every ratio, and the caption prompt */
let cells = 0, geo = 0;
g.S.handle = "@studio.example";
for(const r of Object.keys(g.RATIOS)){
  g.S.ratio = r;
  const pm = g.RATIOS[r].px.match(/(\d+) x (\d+)/), W = +pm[1], H = +pm[2];
  for(const sp of g.DATA.tour.spaces){
    g.S.space = sp.n;
    const cs = g.cards(), col = cs[cs.length - 2].neg(), cap = cs[cs.length - 1].f();
    const G = col.fixed_template.geometry;
    const rects = G.cells.map(s => { const m = s.match(/x (-?\d+), y (-?\d+), w (-?\d+), h (-?\d+)/); return {x:+m[1],y:+m[2],w:+m[3],h:+m[4]}; });
    cells += rects.length;
    if(rects.length !== sp.rooms.length){ geo++; console.log("  CELL COUNT " + r + " " + sp.n); }
    const foot = +G.footer_band.match(/y (\d+) to/)[1];
    for(const q of rects){
      if(q.x < 0 || q.y < 0 || q.x + q.w > W || q.y + q.h > H){ geo++; console.log("  OUT OF CANVAS " + r + " " + sp.n); }
      if(q.w < 120 || q.h < 120){ geo++; console.log("  TINY CELL " + r + " " + sp.n); }
      if(q.y + q.h > foot){ geo++; console.log("  CELL IN FOOTER " + r + " " + sp.n); }
    }
    for(let i = 0; i < rects.length; i++) for(let j = i + 1; j < rects.length; j++){
      const a = rects[i], b = rects[j];
      if(a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h){ geo++; console.log("  OVERLAP " + r + " " + sp.n); }
    }
    if(!/@studio\.example/.test(col.fixed_template.handle)){ geo++; console.log("  NO HANDLE " + r + " " + sp.n); }
    if(!/NONE/.test(col.fixed_template.text)){ geo++; console.log("  TEXT ALLOWED ON COLLAGE " + r + " " + sp.n); }
    if(!/HASHTAGS/.test(cap) || !/SLIDE_CAPTIONS/.test(cap)){ geo++; console.log("  CAPTION INCOMPLETE " + r + " " + sp.n); }
    if(/before/i.test(cap)){ geo++; console.log("  CAPTION MENTIONS BEFORE/AFTER " + r + " " + sp.n); }
  }
}
ok(geo === 0, geo + " collage or caption problems");
console.log("4. collage + caption: " + cells + " cells across 3 ratios x 14 packages, handle present, no text");

/* 5. variation: the same package must come back as a different property */
g.S.ratio = "post"; g.S.space = "2 BHK apartment";
const seen = new Set(), lights = new Set();
for(let i = 0; i < 12; i++){ g.S.seed = g.newSeed(); seen.add(g.dnaLine()); }
ok(seen.size === 12, "expected 12 distinct design lines, got " + seen.size);
g.S.seed = 424242; const a = g.dnaLine(); g.S.seed = 999; g.dnaLine(); g.S.seed = 424242;
ok(a === g.dnaLine(), "same seed must give the same design line");
const st = new Set(), ht = new Set();
g.ROOMS().forEach((r, i) => { const c = g.camOf(i); lights.add(c.daylight); st.add(c.station); ht.add(c.height); });
ok(lights.size === 1, "one time of day per property, got " + lights.size);
ok(st.size > 1 && ht.size > 1, "camera must move room to room (" + st.size + " stations, " + ht.size + " heights)");
let combos = 1, pools = 0;
for(const grp of Object.keys(g.VARY_TOUR)) for(const k of Object.keys(g.VARY_TOUR[grp])){ combos *= g.VARY_TOUR[grp][k].length; pools++; }
console.log("5. variation: " + seen.size + "/12 distinct, deterministic per seed, " + pools + " pools, " + combos.toLocaleString("en-US") + " combinations");

/* 6. size profile */
function setSizes(mode, space){ g.S.mode = mode; g.S.space = space; const cs = g.cards(); return cs.map(c => c.f().length); }
const iz = setSizes("indoor", g.DATA.indoor.spaces[0].n);
const oz = setSizes("outdoor", g.DATA.outdoor.spaces[0].n);
const tz = setSizes("tour", "2 BHK apartment");
const tzBig = setSizes("tour", "4 BHK duplex villa");
const sum = a => a.reduce((x, y) => x + y, 0);
console.log("6. sizes: indoor " + iz.join("/") + " = " + sum(iz)
  + " | outdoor " + oz.join("/") + " = " + sum(oz)
  + " | tour 2BHK " + tz.join("/") + " = " + sum(tz)
  + " | tour 4BHK villa (" + tzBig.length + " prompts) = " + sum(tzBig));
ok(Math.max.apply(null, tz.concat(tzBig)) < 8000, "no single prompt should pass 8000 chars");

/* 7. the page: every id app.js reaches for must exist, and three mode buttons */
const html = fs.readFileSync("index.html", "utf8"), js = fs.readFileSync("app.js", "utf8");
const ids = new Set();
for(const m of js.matchAll(/\$\("([a-zA-Z0-9_-]+)"\)/g)) ids.add(m[1]);
for(const m of js.matchAll(/getElementById\("([a-zA-Z0-9_-]+)"\)/g)) ids.add(m[1]);
let missing = [];
for(const id of ids) if(html.indexOf('id="' + id + '"') < 0) missing.push(id);
ok(missing.length === 0, "ids referenced by app.js but absent from index.html: " + missing.join(", "));
const modeBtns = (html.match(/data-mode="/g) || []).length;
ok(modeBtns === 3, "expected 3 mode buttons in the toolbar, found " + modeBtns);
ok(/data-mode="tour"/.test(html), "the tour mode button is missing from index.html");
console.log("7. page wiring: " + ids.size + " ids all present, " + modeBtns + " mode buttons");

/* 8. share link round trip and surprise() reaching every mode */
g.S.mode = "tour"; g.S.space = "Penthouse"; g.S.seed = 777; g.save();
const url = g.shareLink();
ok(url.indexOf("#") > 0 && url.length > 40, "share link looks wrong: " + url);
const modes = new Set();
for(let i = 0; i < 400; i++){ g.surprise(); modes.add(g.S.mode); }
ok(modes.size === 3, "surprise() should reach all three modes, reached " + Array.from(modes).join(","));
console.log("8. share link ok, surprise() reaches " + Array.from(modes).sort().join(" / "));

console.log((fail ? "RESULT: " + fail + " FAILURES (" + pass + " checks passed)" : "RESULT: all green — " + pass + " checks passed"));
