/* tiny CDP driver: node zshot.js <width> [out.png] [preExpr]
   prints layout metrics for the toolbar and writes a screenshot */
const {spawn} = require("child_process"), fs = require("fs"), os = require("os"), path = require("path");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const width = +(process.argv[2] || 1280), out = process.argv[3] || "";
const pre = process.argv[4] || "";
const port = 9300 + (width % 90);
const prof = path.join(os.tmpdir(), "zshot-" + port);
const url = "file:///" + process.cwd().replace(/\/g, "/") + "/index.html";
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  "--no-default-browser-check", "--remote-debugging-port=" + port, "--user-data-dir=" + prof,
  "--window-size=" + width + ",1000", "about:blank"], {stdio:"ignore"});
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function json(p){ const r = await fetch("http://127.0.0.1:" + port + p); return r.json(); }
(async () => {
  let list = null;
  for(let i = 0; i < 60 && !list; i++){ try { list = await json("/json/list"); } catch(e){ await sleep(250); } }
  if(!list){ console.log("chrome did not start"); chrome.kill(); process.exit(1); }
  const tab = list.find(t => t.type === "page") || list[0];
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  let id = 0; const waiting = new Map();
  const send = (method, params) => new Promise(res => { const n = ++id; waiting.set(n, res); ws.send(JSON.stringify({id:n, method, params:params || {}})); });
  ws.addEventListener("message", ev => { const m = JSON.parse(ev.data); if(m.id && waiting.has(m.id)){ waiting.get(m.id)(m.result || m.error); waiting.delete(m.id); } });
  await new Promise(res => ws.addEventListener("open", res));
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {width, height:1000, deviceScaleFactor:1, mobile:width < 700});
  await send("Page.navigate", {url});
  await sleep(1400);
  if(pre) await send("Runtime.evaluate", {expression:pre, awaitPromise:true});
  await sleep(400);
  const expr = `(() => {
    const q = s => Array.from(document.querySelectorAll(s));
    const tb = document.querySelector(".toolbar"), tin = document.querySelector(".tbin");
    const mb = q(".mbtn"), rows = new Set(mb.map(b => Math.round(b.getBoundingClientRect().top)));
    const groups = q(".tgroup, .tspacer"), grows = new Set(groups.map(g => Math.round(g.getBoundingClientRect().top)));
    const short = q("button, select, summary, .mbtn, .sbtn").filter(e => { const r = e.getBoundingClientRect(); return r.height > 0 && r.height < 32; }).map(e => (e.className || e.tagName) + " " + Math.round(e.getBoundingClientRect().height));
    const over = q("*").filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > innerWidth + 1; }).slice(0, 6).map(e => (e.tagName + "." + e.className).slice(0, 40) + " right=" + Math.round(e.getBoundingClientRect().right));
    const card = document.querySelector(".card");
    return JSON.stringify({vw:innerWidth, sw:document.documentElement.scrollWidth,
      overflowX:document.documentElement.scrollWidth > innerWidth + 1,
      toolbarH:tb ? Math.round(tb.getBoundingClientRect().height) : -1,
      tbinH:tin ? Math.round(tin.getBoundingClientRect().height) : -1,
      modeBtnRows:rows.size, toolbarGroupRows:grows.size,
      modeBtn:mb.map(b => { const r = b.getBoundingClientRect(); return b.textContent + " " + Math.round(r.width) + "x" + Math.round(r.height); }),
      shortTargets:short, overflow:over, cards:q(".card").length,
      firstCardTop:card ? Math.round(card.getBoundingClientRect().top) : -1,
      errors:(window.__errs || []).slice(0, 3)});
  })()`;
  const r = await send("Runtime.evaluate", {expression:expr, returnByValue:true});
  console.log(width + "px  " + (r && r.result ? r.result.value : JSON.stringify(r)));
  if(out){
    const shot = await send("Page.captureScreenshot", {format:"png", captureBeyondViewport:false});
    if(shot && shot.data) fs.writeFileSync(out, Buffer.from(shot.data, "base64"));
  }
  ws.close(); chrome.kill();
  try { fs.rmSync(prof, {recursive:true, force:true}); } catch(e){}
  process.exit(0);
})();
