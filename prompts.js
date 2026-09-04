/* =====================================================================
   prompts.js — builds the four prompts as structured objects, then
   serialises them to JSON or to readable plain text.
   Reads the global S (state) defined in app.js.
   ===================================================================== */

const AUTO = "AI_DECIDES";
function autoV(what){ return AUTO + " — " + what; }

function RT(){ return RATIOS[S.ratio]; }
function DM(){ return DATA[S.mode]; }
function OUT(){ return S.mode === "outdoor"; }
function SP(){
  const list = DM().spaces;
  return list.find(x => x.n === S.space) || list[0];
}
function TH(){
  return S.theme === "__auto" ? null : DM().themes.find(t => t.n === S.theme) || null;
}
/* user value if the option is on and filled, else an auto-instruction */
function v(key, auto){
  const val = S.opts[key] && S.vals[key] ? String(S.vals[key]).trim() : "";
  return val || autoV(auto);
}
function themeFamilies(){
  const fams = [];
  DM().themes.forEach(t => { if(fams.indexOf(t.f) < 0) fams.push(t.f); });
  return fams.join(", ");
}
function themeName(){
  return TH() ? TH().n
    : autoV("name one exact style from these families: " + themeFamilies());
}
function themeLang(){
  return TH() ? TH().d
    : autoV("state the material language of the style you picked, at this level of detail");
}
function budgetVal(){
  if(!S.opts.budget) return autoV("assume a realistic mid to premium Indian spend");
  const b = BUDGET.find(x => x.n === S.vals.budget) || BUDGET[1];
  return b.n + " — " + b.d;
}
function accentVal(){
  return v("accent","pick one accent colour that suits the theme and name it");
}

/* =====================================================================
   SEEDED SHELL VARIATION
   One deterministic line per seed. Changing the post id rerolls it, so
   two posts never get the same raw shell — which is what stopped every
   BEFORE image coming back as the same one-door, one-window box.
   ===================================================================== */
function prng(seed){
  let a = (seed >>> 0) || 1;
  return function(){
    a += 0x6D2B79F5; a >>>= 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seedNum(){
  const s = String(S.seed || S.pid || "0");
  let h = 2166136261;
  for(let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
/* the one line that guides a different raw shell every time */
function varyLine(){
  /* ---- typology router for outdoor spaces ---- */
  let P;
  if(OUT()){
    const spName = (S.space||"").toLowerCase();
    const sacred = /temple|mandir|mosque|masjid|church|gurudwara|dargah|shrine|chapel|gopuram/i.test(spName);
    const commercial = /office|showroom|factory|warehouse|school|college|hospital|clinic|institute|mall|hotel|industrial/i.test(spName);
    P = sacred ? VARY_SACRED : commercial ? VARY_COMMERCIAL : VARY_OUT_RESIDENTIAL;
  } else {
    P = VARY_IN;
  }

  /* use a different seed offset per category so picks don't cluster */
  const offset = OUT() ? 7777 : 1111;
  const r = prng(seedNum() + offset);
  const p = arr => arr[Math.floor(r() * arr.length) % arr.length];
  const plan = p(P.plan), open = p(P.openings), acc = p(P.door),
        quirk = p(P.quirk), view = p(P.view);
  const sized = S.opts.scale && S.vals.scale && String(S.vals.scale).trim();
  const shape = sized ? "keep the size I gave" : plan;

  /* Put the plan description FIRST so it's the lead instruction */
  return (OUT()
    ? "THIS POST ONLY — do not reuse a default massing: " + shape + ". " + open +
      ". " + acc + ". " + quirk + ". Viewpoint: " + view +
      ". If this is a sacred or monumental building, honour its actual architectural typology — shikhara, gopuram, mandapa, etc. — not a generic house box."
    : "THIS POST ONLY — do not reuse a default room box: " + shape + ". " + open +
      ". " + acc + ". " + quirk + ". Viewpoint: " + view +
      ". Make the spatial geometry unmistakably specific — a different layout from every other post.");
}


/* ---------- shared blocks ---------- */
function strictNeg(){
  return S.flags.strict
    ? ["no people","no text of any kind","no watermark","no logo","no signage"]
    : [];
}
function outputBlock(kind){
  const r = RT();
  return {
    aspect_ratio:r.ar, size:r.px, images:1, medium:kind,
    safe_area:r.safe, detail:"maximum — every material, joint and shadow resolved"
  };
}
function ergonomics(){
  return {
    seat:450, dining_table:750, kitchen_counter:900, wardrobe:2100,
    door:2100, window_sill:900, switch_plate:1200, tv_centre:1100,
    pendant_over_table:750, skirting:100, walkway:900, step_riser:150,
    compound_wall:1800, railing:1050
  };
}

/* ---------- serialisers ---------- */
function stripUndef(o){
  if(Array.isArray(o)) return o.filter(x=>x!==undefined && x!=="").map(stripUndef);
  if(o && typeof o === "object"){
    const r={};
    for(const k in o){ if(o[k]===undefined||o[k]==="") continue; r[k]=stripUndef(o[k]); }
    return r;
  }
  return o;
}
function toText(o, ind){
  let out="";
  for(const k in o){
    const val=o[k], key=ind + k.replace(/_/g," ").toUpperCase();
    if(Array.isArray(val)){
      out += key + "\n";
      val.forEach(x => {
        if(x && typeof x === "object") out += toText(x, ind+"    ");
        else out += ind + "  - " + x + "\n";
      });
      out += "\n";
    } else if(val && typeof val === "object"){
      out += key + "\n" + toText(val, ind+"  ") + "\n";
    } else {
      out += key + ": " + val + "\n";
    }
  }
  return out;
}
function modelSuffix(){
  const m = MODELS[S.model];
  if(!m || !m.suffix) return "";
  return "\n\n" + m.suffix.replace("{AR}", RT().ar).replace("{SEED}", seedNum() % 4294967295);
}
/* final prompt string for a card */
function wrap(lead, dataObj){
  const data = stripUndef(dataObj);
  const body = S.fmt === "json"
    ? "```json\n" + JSON.stringify(data, null, 2) + "\n```"
    : toText(data, "");
  return lead + "\n\n" + body + modelSuffix();
}
function negJoin(list){ return list.filter(Boolean).join(", "); }
function negOf(dataObj){
  const n = dataObj && dataObj.negative_prompt;
  if(typeof n === "string") return n;
  return Array.isArray(n) ? n.join(", ") : "";
}

/* =====================================================================
   PROMPT 1 — the raw "before" plate
   No fixed shell is described here on purpose: the geometry comes from
   shell_variation, so the model invents a fresh space each post.
   ===================================================================== */
function D1(){
  const o=OUT(), sp=SP(), r=RT();
  return {
    task:"text_to_image",
    post_id:S.pid, use:"BEFORE plate — slide 2 of 3",
    space_type:sp.n + " (" + sp.g + ")",
    critical_instruction:"You are generating a RAW, UNDESIGNED '" + sp.n + "' — a real site photograph at construction stage. " +
      "MATCH the actual spatial typology of a " + sp.n + ": its characteristic dimensions, proportions, ceiling height, " +
      "structural system and opening layout must read as this specific space, not a generic rectangle. " +
      "Use the shell_variation field below as the governing geometry for THIS unique post.",
    shell_variation:varyLine(),
    variation_seed:S.pid + "-" + (S.seed || 0),
    goal:"One raw, empty, un-designed " + (o?"Indian property exterior":"Indian interior") +
      ". It becomes the locked reference for step 2 — keep it level, deep, readable.",
    output:outputBlock("unedited documentary site photograph, shot on full-frame DSLR or mirrorless, natural lens character — NOT a render, NOT CGI, NOT a graphic"),
    subject:{
      space:sp.n, group:sp.g, region:"India",
      state:"completely empty and undesigned — pre-design site condition, construction stage",
      size:v("scale","realistic typical size for a " + sp.n + ": " + sp.s),
      condition:v("condition","the most typical real site condition for this space")
    },
    raw_shell:o
      ? ["unfinished grey blockwork or rough cement plaster, unpainted, tonal patchiness",
         "rough uneven ground — no paving, no planting, no compound finish",
         "raw parapet with no coping, a chajja over each window, MS grill provisions only",
         "openings unfinished: frames in place, glazing missing or taped",
         "services left raw: meter box, drain points, downpipe openings, conduit stubs",
         "site reality: cement stains, debris, tyre marks, chalk markings, one stray scaffolding pipe"]
      : ["bare grey cement plaster, unpainted, visible trowel ridges and patch repairs",
         "exposed RCC ceiling soffit with shuttering ply lines, a single fan hook stub",
         "raw screed or IPS floor with cement dust and tile-cutting debris",
         "openings unfinished: frames in place, glass taped or missing, no shutters, no curtain track",
         "electrical provisions raw: conduit stubs, switchboard back-boxes marked on wall",
         "site reality: cement dust, float marks, paint splashes, a chalk dimension scribble"],
    indian_standards_mm:o
      ? {door_height:2100, window_sill:900, chajja_projection:600, floor_to_floor:3050,
         parapet:1050, plinth:450, compound_wall:1800}
      : {door_height:2100, door_width:900, lintel_band:2100, window_sill:900,
         slab_height:3050, skirting_mark:100, switchboard:1200, socket:300},
    camera:{
      lens:r.cam[o?"out":"in"], height_cm:o?160:150,
      station_point:"as directed in shell_variation — do not default to the centre of the near wall",
      level:"perfectly level, verticals dead straight, no tilt, no keystone, no fisheye, no barrel distortion",
      optics:"full-frame DSLR feel — slight natural vignette at corners, real lens micro-CA, no software over-sharpening, no AI composite flatness",
      exposure:o?"f/9, 1/125, ISO 100, hyperfocal":"f/8, 1/60, ISO 200, hyperfocal",
      frame:o?"the full property height with sky above the roofline, about 20 percent foreground ground, boundary visible for scale"
             :"two walls meeting at a corner, ceiling line at the top, about 15 percent foreground floor — read as a volume, never a flat wall"
    },
    lighting:{
      time_of_day:v("light","whatever reads most natural and documentary here"),
      source:o?"daylight only — no facade or landscape lighting installed yet"
             :"daylight through the existing openings only — no fixtures installed yet",
      quality:"even and honest, open shadows, 5000-5600K neutral, one sun direction that every shadow in frame agrees with, no HDR"
    },
    realism:["true vanishing points — no warped, melted or duplicated geometry, no impossible corner joins",
      "material scale consistent — brick, block and tile coursing correct across depth of frame",
      "quiet uncluttered document, not a hero shot, readable at thumbnail size",
      "no grading, no HDR, no vignette — very light natural sensor grain only",
      "contact shadows at base of every wall, true penumbra, no floating elements"],
    negative_prompt:negJoin([
      o?"no landscaping":"no furniture", o?"no paving":"no rugs", o?"no planting":"no curtains",
      o?"no gate or compound finish":"no decor or artwork",
      o?"no exterior lighting":"no light fixtures",
      o?"no paint or cladding scheme":"no plants",
      "no staged styling of any kind", ...strictNeg(),
      "no fisheye","no HDR halo","no heavy colour grading","no oversaturation",
      "no CGI or 3D-render sheen","no plastic-looking or artificially smooth materials",
      "no invented or duplicated openings","no floating objects","no mirrored geometry",
      "no borders","no split screen","no low-resolution artefacts","no AI composite flatness"
    ]),
    after_generation_output:S.flags.notes ? {
      block_title:"GEOMETRY_LOCK",
      instruction:"After the image, print this block as plain text. I paste it back in step 2, so be exact.",
      fields:["camera position, height and lens",
        o?"massing: floors, footprint shape, roofline height, projections"
         :"wall layout, plan shape and finished ceiling height",
        "exact count, size and position of every window and door you drew",
        o?"boundary position, ground level, approach direction":"floor material and wall finish state",
        "sun direction and time of day",
        "anything unusual in frame that must survive into the after image"]
    } : undefined
  };
}
function P1(){
  return wrap("Generate ONE image from this JSON specification. Every field is a hard requirement. " +
    "critical_instruction and shell_variation define the architecture — follow them exactly and do not substitute a generic layout or default room shape. " +
    "The result must look like a real documentary site photograph, not a 3D render or CGI composite. " +
    "Do not describe the JSON back to me, produce the image.", D1());
}


/* =====================================================================
   PROMPT 2 — the designed "after", locked to the before
   ===================================================================== */
function lockList(){
  return OUT() ? [
    "1. Camera position, height, angle, lens and crop.",
    "2. Perspective and vanishing points — building corners land on the same pixels.",
    "3. Massing: floors, footprint, roofline height, projections, setbacks.",
    "4. Every window, door, balcony and opening — count, size, shape, position.",
    "5. Boundary line and plot extent.",
    "6. Time of day and sun direction.",
    "7. Street context and neighbouring structures.",
    "8. Ground level, plinth height, number of entrance steps.",
    "9. Output aspect ratio."
  ] : [
    "1. Camera position, height, lens and crop.",
    "2. Perspective and vanishing points — wall corners land on the same pixels.",
    "3. Room dimensions, plan shape and ceiling height.",
    "4. Every window and door — count, size, shape, position. Nothing added, moved or closed.",
    "5. Structural elements: columns, beams, niches, ledges, level changes.",
    "6. Time of day and the direction of incoming daylight.",
    "7. Output aspect ratio."
  ];
}
function layersIn(){
  return {
    layout:["a buildable furniture layout with correct zoning, sized to the real room",
      "900 mm primary and 750 mm secondary circulation kept clear",
      "an unobstructed sightline from the doorway into the space"],
    surfaces:["walls: theme-correct treatment applied over the existing plaster — name the material",
      "floor: name the exact material, format and joint, e.g. 800x1600 mm matt porcelain, 2 mm rectified joint",
      "ceiling: false ceiling with a 100 mm cove for indirect light, drop capped at 250 mm",
      "skirting 100 mm; every surface change lands on a logical edge or a reveal, never mid-wall"],
    lighting:["ambient: recessed downlights on a considered grid or a 3000K cove wash",
      "task: 4000K aimed exactly where work happens",
      "accent: narrow-beam grazing on texture and art, roughly 3:1 to ambient",
      "decorative: one statement fixture at 2700K",
      "no light without a visible source, no source without a shadow"],
    furniture:["anchor piece first, then seating, then surfaces, then storage",
      "buildable joinery and legs, one hardware finish family across the room"],
    soft_furnishing:["sheer plus blackout curtains on a recessed track, hem 10 mm off the floor",
      "rug sized so the front legs of the seating sit on it, cushions in three sizes maximum"],
    styling:["3 to 5 styled moments only, varied heights, one imperfect natural object",
      "greenery in a species that survives Indian indoor light, and deliberate empty surface left"],
    detailing:["switch plates at 1200 mm matched to the hardware finish",
      "AC unit placed logically with a believable drain fall, no visible piping, no exposed wires, no shelf without bracket logic"]
  };
}
function layersOut(){
  return {
    facade:["a finish scheme over the existing structure: paint or texture, cladding, stone or wood panels",
      "jaali, louvre or fin screens only where sun shading is genuinely needed",
      "railing, parapet and coping resolved — but not one structural line moves"],
    hardscape:["driveway and path paving with a believable laying pattern and a drainage channel",
      "entrance steps at 150 mm risers with a handrail, plinth edge band",
      "car porch, 1.8 m compound wall, main gate plus a wicket gate, kerb and level transitions"],
    softscape:["lawn with a defined hard edge, layered shrub beds, one specimen tree",
      "species plausible for India — frangipani, bougainvillea, palm, ficus, bamboo, tulsi, ixora",
      "planting mass in proportion to the facade, pots and creepers where they make sense"],
    lighting:["facade wall washers grazing texture, soffit downlights under overhangs",
      "step, bollard and gate lights scaled to the property",
      "2700-3000K on stone and wood, never blue-white; every light pool correct for its throw"],
    functional_detail:["house number plate, letterbox, intercom panel",
      "meter box and DB integrated neatly, rainwater downpipe and drainage grating routed sensibly",
      "a seating nook, tulsi platform or water feature if the zone allows"]
  };
}
function D2(){
  const o=OUT(), sp=SP();
  return {
    task:"image_to_image_edit",
    post_id:S.pid, use:"AFTER — slide 3 of 3",
    reference:{
      source:"the empty " + DM().word + " in this conversation — the attached image if there is one, otherwise the image directly above plus its GEOMETRY_LOCK block",
      handling:"Treat it as a locked background plate. You are painting a design layer onto fixed pixels, not generating a new scene."
    },
    critical_instruction:"Do NOT create a new " + DM().noun +
      ". Design that exact one. This is the AFTER half of a before/after pair, so the architecture stays pixel-faithful and only the design layer is added.",
    output:outputBlock("photorealistic architectural photograph of the same space, now designed"),
    geometry_lock:{
      rule:"Every item below is IDENTICAL to the reference. If a design idea conflicts with one, drop the idea, not the lock.",
      immutable:lockList(),
      allowed_changes:"surface finishes and colour, furniture and fittings, "
        + (o?"paving, planting and landscape":"soft furnishing and decor")
        + ", lighting fixtures and the resulting light, styling and accessories",
      forbidden_changes:"camera, framing, zoom, crop, aspect ratio, "
        + (o?"plot size, floor count, roofline height":"room size, wall positions, ceiling height")
        + ", the count, size or position of any opening, and any invented view that was not in the reference"
    },
    design_brief:{
      space:sp.n, group:sp.g, region:"India",
      theme:themeName(), theme_material_language:themeLang(),
      accent_colour:accentVal(),
      colour_rule:"60 percent dominant neutral, 30 secondary, 10 accent — the accent holds about a tenth of the frame and repeats at least three times.",
      budget_tier:budgetVal(),
      must_include:(S.opts.must && S.vals.must) ? String(S.vals.must).trim() : undefined,
      essential_elements:sp.m,
      design_intent:"Looks expensive, is actually buildable, photographs well in one frame."
    },
    layers_to_add: o ? layersOut() : layersIn(),
    ergonomics_mm:ergonomics(),
    render_quality:{
      medium:"magazine architectural photography — looks like a human photographer entered the space with a DSLR or mirrorless camera, not a 3D render or CGI composite",
      camera_optics:"shot on full-frame sensor, 24-35mm prime or 16-35mm zoom at f/5.6 to f/8, slight natural lens vignette at corners, real chromatic aberration micro-fringe at high-contrast edges, no software sharpening halo, no AI composite flatness",
      materials:"physically based roughness and specular per material — anisotropic brushed metal with the grain running with the piece, stone veining continuous across grout joints, visible fabric weave at 1:1 zoom, glass with real refraction not a flat reflective plane, painted wall shows slight eggshell sheen not matte-clay smoothness",
      light:"global illumination with colour bleed onto adjacent surfaces, soft penumbra shadows with correct inverse-square falloff, a contact shadow at the base of every piece of furniture so nothing floats, visible dust motes in a sun beam if windows are in shot",
      grade:"neutral to warm white balance 3200-4500K, restrained saturation, straight verticals, zero CGI sheen, no clay-render look, no Unreal Engine smoothness, no oversaturated brand-style grade"
    },
    negative_prompt:negJoin([
      "do not change the camera angle","do not zoom or re-frame","do not change the aspect ratio",
      o?"do not add floors or change the roof shape":"do not enlarge the room or add fake windows",
      o?"do not widen the plot":"do not add fake outdoor views",
      o?"no unrealistic jungle density":"no over-cluttered surfaces",
      "no floating furniture", ...strictNeg(),
      "no duplicated furniture legs","no melted or impossible joinery",
      "no mismatched shadow directions","no light without a source",
      "no fisheye","no heavy filter","no oversaturation","no HDR halo",
      "no CGI sheen","no plastic materials","no low-resolution mush",
      "no borders","no collage","no split screen"
    ]),
    self_check_before_output:[
      "Same corners, same openings, same ceiling or roofline height as the reference?",
      "Anything floating without a contact shadow?",
      "Does the accent hold roughly 10 percent of the frame and repeat three times?",
      "Is human scale right measured against the 2100 mm door?",
      "Could a contractor build this, and does it read as a photograph?"
    ],
    after_generation_output:S.flags.notes ? {
      block_title:"DESIGN_SUMMARY",
      instruction:"After the image, print this block as plain text. Steps 3 and 4 reuse it, so name real things.",
      fields:["theme used","palette: 4 to 5 named colours with rough percentages",
        "key materials and finishes",
        o?"hardscape, planting and the lighting approach":"main furniture pieces and the lighting approach",
        "the strongest visual feature in frame",
        "one honest weakness a designer would notice"]
    } : undefined
  };
}
function P2(){
  return wrap("Edit the reference image using this JSON specification. geometry_lock overrides every creative "
    + "instinct you have. Produce the image — do not restate the JSON.", D2());
}

/* =====================================================================
   PROMPT 3 — the carousel / reel cover
   ===================================================================== */
function zones(){
  if(S.ratio === "reel") return {
    canvas:"1080 x 1920 px",
    safe_content_area:"y 250 to y 1500 — Instagram UI covers everything outside it",
    headline_band:"y 250 to y 540, full width, 60 px side padding",
    before_photo:"x 40 to x 1040, y 560 to y 960",
    divider:"horizontal 4 px #111111 line, x 40 to x 1040, at y 982",
    after_photo:"x 40 to x 1040, y 1004 to y 1404",
    footer_strip:"y 1420 to y 1500"
  };
  if(S.ratio === "portrait") return {
    canvas:"1080 x 1350 px",
    headline_band:"y 0 to y 250, full width, 60 px side padding",
    before_photo:"x 40 to x 518, y 290 to y 1190",
    divider:"vertical 4 px #111111 line at x 538, from y 250 to y 1230",
    after_photo:"x 562 to x 1040, y 290 to y 1190",
    footer_strip:"y 1230 to y 1350"
  };
  return {
    canvas:"1080 x 1080 px",
    headline_band:"y 0 to y 200, full width, 56 px side padding",
    before_photo:"x 40 to x 518, y 240 to y 940",
    divider:"vertical 4 px #111111 line at x 538, from y 200 to y 980",
    after_photo:"x 562 to x 1040, y 240 to y 940",
    footer_strip:"y 980 to y 1080"
  };
}
function D3(){
  const r=RT(), sp=SP(), z=zones();
  const stacked = r.split === "horizontal";
  const shortSpace = sp.n.split("—").pop().trim().toLowerCase();
  const headline = (S.opts.hook && S.vals.hook && S.vals.hook.trim())
    ? {mode:"use my exact words", text:S.vals.hook.trim(),
       spelling:"render character for character, no substitutions, no extra words"}
    : {mode:AUTO, instruction:"Write the hook yourself from this space and theme. Maximum 7 words, 2 lines, sentence case.",
       tone_examples:["This " + shortSpace + " changed completely","Same " + shortSpace + ". Different life."],
       spelling:"render it crisply and correctly, no gibberish letterforms"};
  return {
    task:"graphic_design_composite",
    post_id:S.pid, use:stacked ? "reel / story cover" : "COVER — slide 1 of 3",
    goal:"A graphic layout, not a photograph. It must stop the scroll at thumbnail size and stay template-identical to every other post on the page.",
    inputs:{image_1:"BEFORE — the empty " + DM().word, image_2:"AFTER — the designed " + DM().word,
      note:"Use the two images from this conversation. If attached, the first is BEFORE and the second is AFTER."},
    output:outputBlock("flat graphic layout, vector-crisp text, photographs placed inside it"),
    fixed_template:{
      warning:"Fixed for the whole page — only the two photos and the headline change between posts.",
      background:"#FFFFFF with a blueprint grid over the full canvas: 1 px #E8E8E8 lines at 40 px, a #DCDCDC line every 5th square, straight and low contrast. No gradient, no noise, no texture.",
      geometry:z,
      split:r.split + ", " + (stacked?"BEFORE on top, AFTER below":"BEFORE left, AFTER right") + ", both media areas identical to the pixel",
      photo_treatment:"16 px corner radius, drop shadow 0 8px 24px rgba(0,0,0,0.10), the white grid left as a margin around each photo. Both cropped to the same ratio, zoom and viewpoint so the halves read as one place. Never mirror, flip or crop them differently.",
      badges:"pill on the top-left of each photo: BEFORE white on #111111, AFTER #111111 on white with a 2 px #111111 border. Uppercase, 2 px letter-spacing, identical size, padding and position.",
      headline:{placement:"centred in the headline band, full width, crossing the divider",
        type:"geometric sans-serif, weight 800, tight tracking, #111111, very large, max 2 lines, max 7 words, sentence case",
        content:headline},
      footer:{cue:(stacked?"WATCH plus a thin-line play triangle":"SWIPE plus a thin-line right chevron") + ", bottom-right, small bold uppercase #111111, 2 px letter-spacing",
        handle:S.handle.trim() ? S.handle.trim() + " — bottom-left, small lowercase #888888, 2 px letter-spacing"
                               : "none — leave the bottom-left empty"},
      colour_discipline:"type only in #111111 and #888888; no colour on the canvas except inside the two photographs."
    },
    context:{subject:sp.n, group:sp.g,
      theme_in_after_image:TH() ? TH().n : "whichever theme you used in the previous step",
      audience:"Instagram, Indian home and design audience, viewed on a phone"},
    quality_rules:["pixel-perfect alignment, even margins, a true 50/50 split",
      "minimalist editorial premium, generous white space",
      "text spelled exactly as specified, no gibberish letterforms, readable at 120 px wide", r.safe],
    negative_prompt:negJoin(["no arrows over the photos","no emojis","no stickers","no gradient text",
      "no text shadow or outline","no third photo","no diagonal split","no torn-paper effect",
      "no brush strokes","no extra decorative shapes","no frame around the canvas",
      "no misspelled or malformed letters","no duplicated headline","no watermark",
      "no logo other than the handle","no colour outside #111111, #888888 and #FFFFFF on the canvas"])
  };
}
function P3(){
  return wrap("Build ONE image from this JSON specification. This is a precision layout task — the pixel "
    + "coordinates are exact and all text is spelled exactly as given. Produce the image, do not restate the JSON.", D3());
}

/* =====================================================================
   PROMPT 4 — caption, description, hashtags
   ===================================================================== */
function D4(){
  const o=OUT(), sp=SP();
  const mkt = (S.opts.market && S.vals.market) ? S.vals.market.trim() : "";
  const isReel = S.ratio === "reel";
  return {
    task:"write_instagram_copy",
    post_id:S.pid, format:isReel ? "reel" : "carousel post",
    reference:"the images above and the DESIGN_SUMMARY you produced. Every line must name something actually visible in the after image — if unsure, leave it out.",
    context:{
      subject:sp.n, group:sp.g,
      theme:TH() ? TH().n : "the theme you selected above",
      accent_colour:accentVal(),
      audience:(o?"Indian homeowners, plot owners and builders":"Indian homeowners and interior clients") + ", plus designers",
      market:mkt || "pan-India",
      language:S.flags.hindi
        ? "natural Hinglish — English structure with common Hindi design words. No formal Hindi, no Devanagari."
        : "clear conversational English, short sentences, no jargon"
    },
    voice:{tone:"expert but friendly, like a designer casually explaining a decision",
      banned:"filler phrases like 'transform your space', AI-words like 'elevate' or 'delve', emoji spam, fake urgency"},
    deliverables:[
      {n:1, name:"TITLE",
        spec:"A single bold headline for this post. Under 50 characters. Reference the actual space and theme. No hashtags, no emoji. Example style: 'Raw kitchen to minimal industrial loft' or 'South Indian temple entrance — stone-and-teak edition'. Make it specific to THIS design."},
      {n:2, name:"SHORT_DESCRIPTION",
        spec:"2 to 4 lines of natural conversational copy. Mention the space (" + sp.n + "), the theme, one material and one design decision actually visible in the image. Friendly and specific — do not be generic. No hashtags. No more than 4 lines."},
      {n:3, name:"HASHTAGS",
        spec:"Exactly 5 hashtags. Lowercase. One copy-paste line. All must be directly relevant to this exact image: the " + sp.n + ", the " + (TH() ? TH().n : "design theme") + " style, and the visible materials or palette." +
          (mkt ? " Include one location hashtag for " + mkt + "." : "") +
          " Do not pad with generic tags like #interiordesign or #home — every tag must be specific."}
    ],
    output_format:"Return each deliverable in its own copy-paste-ready code block, labelled with its name. No commentary between blocks."
  };
}
function P4(){
  return wrap("Write the Instagram copy for the post we just built, following this JSON specification exactly. " +
    "Return only the 3 deliverables — TITLE, SHORT_DESCRIPTION and HASHTAGS — each in its own code block. Nothing else.", D4());
}



/* =====================================================================
   FULL TOUR MODE — one property, every room, one locked design
   Only the first prompt describes a design. Prompts 2..n say which room
   comes next and nothing more, so the model carries the locked scheme
   over instead of inventing a new interior for every image.
   ===================================================================== */
function TOUR(){ return S.mode === "tour"; }
function TSP(){
  const list = DATA.tour.spaces;
  return list.find(x => x.n === S.space) || list[0];
}
function ROOMS(){ return TSP().rooms; }

/* the design language is seeded, so the same package invents a
   completely different property every time it is picked */
function dnaLine(){
  const P = VARY_TOUR, r = prng(seedNum() + 31337);
  const p = a => a[Math.floor(r() * a.length) % a.length];
  const parts = [p(P.neutral.plan), p(P.neutral.ceiling), p(P.neutral.floor_format),
    p(P.neutral.signature_move), p(P.neutral.joinery_logic),
    p(P.neutral.light_mood), p(P.neutral.styling_density)];
  /* material and era only when the theme is left to the model — with a
     theme selected these axes would fight the theme */
  if(!TH()) parts.push(p(P.material.lead_material), p(P.material.palette_temp),
    p(P.material.metal_finish), p(P.material.era));
  return "Design this property around: " + parts.join("; ")
    + ". Invent everything else yourself at that level of quality. This scheme belongs to THIS property only and overrides any default interior you would otherwise reach for.";
}
/* one time of day for the whole set, so the images read as one visit */
function tourLight(){
  const P = VARY_TOUR.cam.light_time, r = prng(seedNum() + 555);
  return (S.opts.light && S.vals.light)
    ? String(S.vals.light).trim() + ", identical in every image of this set"
    : P[Math.floor(r() * P.length) % P.length] + ", identical in every image of this set";
}
function camOf(i){
  const P = VARY_TOUR.cam, rm = ROOMS()[i];
  const r = prng(seedNum() + 911 * (i + 1));
  const p = a => a[Math.floor(r() * a.length) % a.length];
  return {
    lens: rm.lens === "wide"
      ? "18 to 24 mm equivalent, verticals corrected, no barrel distortion"
      : "35 mm equivalent, natural perspective",
    station: p(P.station),
    height: p(P.height),
    daylight: tourLight(),
    settings:"f/8, 1/60, ISO 200, hyperfocal, tripod level, verticals dead straight",
    must_show: rm.hero,
    frame:"two walls meeting at a corner with the ceiling line in shot — it must read as a room, never as a flat wall"
  };
}
function tourReal(){
  return [
    "a photograph, not a render — a human photographer walked into this space with a full-frame DSLR or mirrorless camera on a tripod and shot it; real optics, real falloff, no AI composite flatness",
    "camera optics: 18-35mm range, f/5.6 to f/8, slight natural lens vignette at corners, micro chromatic aberration fringe at high-contrast edges, no software sharpening halo",
    "physically based materials — correct roughness per surface, grain running with the piece, continuous stone veining across grout joints, visible fabric weave at 1:1 zoom, glass with real refraction not a flat mirror plane",
    "light: global illumination with colour bleed onto adjacent surfaces, soft penumbra shadows with inverse-square falloff, a contact shadow under every piece of furniture so nothing floats",
    "buildable by an Indian contractor: real joinery, real bracket logic, no floating cantilevers, no invented hardware",
    "clean unstaged realism: straight verticals, neutral to warm grade (3200-4500K), no CGI sheen, no Unreal Engine smoothness, no clay render, no oversaturated colour grade, detail held into the corners"
  ];
}
function tourRealShort(){
  return "identical treatment to image 1: real DSLR optics and falloff, contact shadows under everything, " +
    "physically based materials, buildable joinery, straight verticals, no CGI sheen, no clay render, no AI flatness";
}
function tourNeg(extra){
  return negJoin([extra,
    "no text", "no watermark", "no logo", "no people", "no pets",
    "no fisheye", "no tilted horizon", "no warped or melted geometry",
    "no duplicated or impossible corners", "no floating furniture",
    "no CGI or 3D-render sheen", "no plastic-looking materials",
    "no HDR halo", "no heavy grade", "no oversaturation",
    "no clutter without purpose", "no borders", "no collage", "no split screen"]);
}

/* ---------------- prompt 1: the master, locks the design ---------------- */
function DT1(){
  const t = TSP(), rooms = ROOMS(), r0 = rooms[0];
  return {
    task:"text_to_image",
    generation_mode:"text_to_image_from_scratch",
    reference_image_required:false,
    input_image:"none — generate this property interior purely from text description, no existing or before image exists or is required",
    critical_instruction:"Create this property from text only. Do NOT ask for an existing image, reference photo, or upload. Invent the complete original design right now from the specifications below.",
    post_id:S.pid,
    image:"1 of " + rooms.length + " — " + r0.n,
    goal:"One finished, photographed " + r0.n.toLowerCase() + " in this " + t.n
      + ". This image fixes the design language for the whole property, so every decision here has to be worth repeating in every other room.",
    output:outputBlock("finished interior photograph, architectural magazine quality, not a render"),
    property:{
      type:t.n, brief:t.s, region:"India",
      city:(S.opts.market && S.vals.market) ? String(S.vals.market).trim() : undefined,
      area:v("scale","use the realistic carpet area for this package"),
      images_in_this_set:rooms.map(x => x.n).join(" | ")
    },
    room:{name:r0.n, must_have:r0.m,
      also_include:(S.opts.must && S.vals.must) ? String(S.vals.must).trim() : undefined},
    design_dna:{
      instruction:"You are inventing the design language for this property right now. Fix it here — every later image in this set reuses it without being told again.",
      variation:dnaLine(),
      variation_seed:S.pid + "-" + (S.seed || 0),
      theme:themeName(),
      theme_material_language:themeLang(),
      accent_colour:accentVal(),
      colour_rule:"60 percent dominant neutral, 30 secondary, 10 accent — the accent reappears in every room of this set",
      budget_tier:budgetVal(),
      lock:"Settle on ONE flooring, ONE wall finish, ONE ceiling strategy, ONE joinery language, ONE hardware finish and ONE light temperature. They now apply to the whole property."
    },
    photography:camOf(0),
    ergonomics_mm:ergonomics(),
    realism:tourReal(),
    negative_prompt:tourNeg("no second design scheme inside one image"),
    after_generation_output:{
      block_title:"HOME_DNA",
      instruction:"After the image, print this block as plain text. Every later prompt in this set depends on it, so name real specific things — no vague adjectives.",
      fields:["theme and a one-line design intent",
        "palette: 4 to 5 colours with hex codes and rough percentages",
        "floor: material, format in mm, laying pattern",
        "walls: finish and colour, plus any panelling detail and its module in mm",
        "ceiling: strategy, drop in mm, cove or profile detail",
        "joinery: shutter type, veneer or laminate, handle or shadow-gap detail, hardware finish",
        "curtains and upholstery: fabric families",
        "lighting: fixture families and colour temperature in K",
        "styling language and the accent colour with its hex"]
    }
  };
}
function PT1(){
  return wrap("Generate ONE image from this JSON specification entirely FROM SCRATCH. "
    + "NO EXISTING OR BEFORE IMAGE IS REQUIRED — this is a brand-new property created purely from text. "
    + "Do not ask for an image, reference photo, or file upload. Invent the complete design directly from the specification below and render the image immediately. "
    + "After the image, print the HOME_DNA block exactly as asked. Do not describe the JSON back to me.", DT1());
}

/* ------- prompts 2..n: which room comes next, continuing the locked design ------- */
function DTn(i){
  const rooms = ROOMS(), rm = rooms[i], t = TSP();
  return {
    task:"text_to_image",
    generation_mode:"text_to_image_continuity",
    reference_image_required:false,
    input_image:"none — render purely from text, continuing the design language established in image 1",
    post_id:S.pid,
    image:(i + 1) + " of " + rooms.length + " — " + rm.n,
    goal:"The " + rm.n.toLowerCase() + " of the SAME property from image 1. Somebody scrolling this set must never doubt it is one continuous place.",
    output:outputBlock("finished interior photograph, architectural magazine quality, not a render"),
    property:{type:t.n, region:"India", room_index:(i + 1) + " of " + rooms.length},
    room:{name:rm.n, must_have:rm.m},
    design_continuity:{
      rule:"Continue the EXACT design language established in image 1 for this property. If running in the same conversation, match image 1 and its HOME_DNA block. If running standalone, apply the locked design specifications below.",
      locked_design_specs:{
        theme:themeName(),
        theme_material_language:themeLang(),
        accent_colour:accentVal(),
        budget_tier:budgetVal()
      },
      carry_over_unchanged:"floor material, format and laying pattern; wall finish and colour; panelling module; ceiling strategy and drop; joinery shutter finish and edge detail; handle and hardware metal finish; accent colour and where it lands; curtain and upholstery fabric family; light fixture family and colour temperature; styling density; era of the detailing",
      continuity_anchor:rm.link,
      room_specific_elements:rm.m,
      variation_seed:S.pid + "-" + (S.seed || 0)
    },
    photography:camOf(i),
    ergonomics_mm:ergonomics(),
    realism:tourRealShort(),
    self_check:"Before rendering, check four things against image 1: the floor, the wall colour, the shutter and hardware finish, the light temperature. Any mismatch is a failed image.",
    negative_prompt:tourNeg("no new colour scheme, no flooring or finish change from the earlier images, no style change mid-set, no mismatched light temperature")
  };
}
function PTn(i){
  const rooms = ROOMS();
  return wrap("Generate ONE image from this JSON specification. This is image " + (i + 1) + " of " + rooms.length
    + " of the SAME property. NO IMAGE UPLOAD IS NEEDED — render this room purely from text, continuing the exact design scheme from image 1. Restyle nothing, and do not describe the JSON back to me.", DTn(i));
}

/* ---------------- thumbnail: every room in one collage tile ---------------- */
/* row plan: a hero row for odd counts, otherwise even pairs */
function gridRows(n){
  if(n === 7) return [1, 3, 3];
  const rows = [];
  if(n % 2 === 1){ rows.push(1); for(let i = 0; i < (n - 1) / 2; i++) rows.push(2); return rows; }
  for(let i = 0; i < n / 2; i++) rows.push(2);
  return rows;
}
function tourGrid(){
  const r = RT(), rooms = ROOMS(), n = rooms.length;
  const d = r.px.replace(/[^0-9x]/g, "").split("x"), W = +d[0], H = +d[1];
  const M = 48, G = 24, reel = S.ratio === "reel";
  const top = reel ? 280 : M;
  const footTop = reel ? 1420 : H - 92;
  const avW = W - 2 * M, avH = footTop - 20 - top;
  const plan = gridRows(n);
  const wt = plan.map(c => c === 1 ? 1.5 : (c === 3 ? 0.8 : 1));
  const tw = wt.reduce((a, b) => a + b, 0);
  const free = avH - G * (plan.length - 1);
  const hs = wt.map(w => Math.floor(free * w / tw));
  hs[0] += free - hs.reduce((a, b) => a + b, 0);
  const cells = [];
  let y = top, k = 0;
  plan.forEach((cols, ri) => {
    const cw = Math.floor((avW - G * (cols - 1)) / cols);
    for(let c = 0; c < cols; c++){
      const x = M + c * (cw + G);
      cells.push((k + 1) + ". " + rooms[k].n + " — x " + x + ", y " + y + ", w "
        + (c === cols - 1 ? avW - c * (cw + G) : cw) + ", h " + hs[ri]);
      k++;
    }
    y += hs[ri] + G;
  });
  return {
    canvas:W + " x " + H + " px",
    outer_margin:M + " px left, right and top" + (reel ? ", content starts at y " + top + " to clear the Instagram UI" : ""),
    gutter:G + " px between every cell, kept exactly equal",
    layout:plan.map(c => c + " up").join(" then ") + " — " + n + " cells for " + n + " images",
    cells:cells,
    footer_band:"y " + footTop + " to y " + (reel ? 1500 : H - 20) + ", empty except the handle",
    safe_area:r.safe
  };
}

function DTC(){
  const t = TSP(), rooms = ROOMS();
  return {
    task:"graphic_design_composite",
    post_id:S.pid,
    use:"THUMBNAIL — the cover tile for the whole property tour",
    goal:"One tile that shows the entire property at a glance and stays template-identical to every other cover on the page. A grid of photographs on the page background. No text anywhere except the handle.",
    inputs:{
      images:"the " + rooms.length + " images you generated in this conversation, in the order they were made",
      mapping:rooms.map((x, i) => "cell " + (i + 1) + " = image " + (i + 1) + " (" + x.n + ")").join("; "),
      note:"place them as they are — no re-render, no restyle, no relighting, no mirroring"
    },
    output:outputBlock("flat graphic layout, photographs placed inside it"),
    fixed_template:{
      warning:"Fixed for the whole page — only the photographs change between posts.",
      background:"#FFFFFF with a blueprint grid over the full canvas: 1 px #E8E8E8 lines at 40 px, a #DCDCDC line every 5th square, straight and low contrast. No gradient, no noise, no texture.",
      geometry:tourGrid(),
      photo_treatment:"12 px corner radius, drop shadow 0 6px 18px rgba(0,0,0,0.10), the white grid left as an even margin around every photo. Fill each cell edge to edge, centre-crop to the cell ratio, and hold every photo at the same brightness, contrast and grade so the tile reads as one set.",
      text:"NONE. No headline, no room labels, no numbers, no badges, no captions, no arrows, no logo. The handle below is the only glyphs allowed on the canvas.",
      handle:S.handle.trim()
        ? S.handle.trim() + " — centred in the footer band, small lowercase #888888, 2 px letter-spacing, no box behind it"
        : "none — leave the footer band empty",
      colour_discipline:"no colour anywhere on the canvas except inside the photographs"
    },
    context:{subject:t.n, group:t.g, rooms:rooms.map(x => x.n).join(" | "),
      audience:"Instagram, Indian home and design audience, judged at 120 px wide"},
    quality_rules:["pixel-perfect alignment, identical gutters, every cell filled",
      "the grid must read instantly as one property, not a mood board",
      "sharp downscale — each photo still readable as a room at thumbnail size", RT().safe],
    negative_prompt:negJoin(["no text", "no room labels", "no numbers", "no headline", "no badges",
      "no watermark other than the handle", "no logo", "no emojis", "no stickers", "no arrows",
      "no frame around the canvas", "no drop shadow on the canvas itself", "no gradient",
      "no torn-paper or tape effects", "no overlapping photos", "no rotated or tilted photos",
      "no empty cell", "no duplicated photo", "no mismatched grade between cells",
      "no colour outside #FFFFFF, #E8E8E8, #DCDCDC and #888888 on the canvas"])
  };
}
function PTC(){
  return wrap("Build ONE image from this JSON specification: a collage tile of the " + ROOMS().length
    + " property images from this conversation. Follow the pixel geometry exactly and put NO text on it except the handle. Do not describe the JSON back to me.", DTC());
}

/* ---------------- post copy for the whole tour ---------------- */
function DTP(){
  const t = TSP(), rooms = ROOMS();
  const mkt = (S.opts.market && S.vals.market) ? S.vals.market.trim() : "";
  const isReel = S.ratio === "reel";
  return {
    task:"write_instagram_copy",
    post_id:S.pid,
    format:isReel ? "reel" : "carousel post, " + (rooms.length + 1) + " slides including the collage cover",
    reference:"the " + rooms.length + " images above and the HOME_DNA block you printed with image 1. Every line must name something actually visible in those images — if you are unsure, leave it out.",
    context:{
      property:t.n, group:t.g, brief:t.s,
      rooms:rooms.map(x => x.n).join(" | "),
      theme:TH() ? TH().n : "the theme you locked in image 1",
      accent_colour:accentVal(),
      budget_tier:budgetVal(),
      audience:"Indian homeowners planning a full interior, plus designers",
      market:mkt || "pan-India",
      language:S.flags.hindi
        ? "natural Hinglish — English structure with common Hindi design words. No formal Hindi, no Devanagari."
        : "clear conversational English, short sentences, no jargon"
    },
    voice:{tone:"expert but friendly, like a designer walking a client through a finished home",
      banned:"filler phrases like 'transform your space', AI-words like 'elevate' or 'delve', emoji spam, fake urgency"},
    deliverables:[
      {n:1, name:"TITLE",
        spec:"A single bold headline for this full-tour post. Under 50 characters. Reference the property type (" + t.n + ") and the design theme. No hashtags, no emoji. Be specific to THIS design — not generic."},
      {n:2, name:"SHORT_DESCRIPTION",
        spec:"2 to 4 lines of natural conversational copy. Mention the property type, the one design language that runs through every room, one standout room detail, and why a homeowner would want this. No hashtags. No more than 4 lines."},
      {n:3, name:"HASHTAGS",
        spec:"Exactly 5 hashtags. Lowercase. One copy-paste line. All must be directly relevant: the property type (" + t.n + "), the " + (TH() ? TH().n : "design theme") + " style, and the visible materials or palette." +
          (mkt ? " Include one location hashtag for " + mkt + "." : "") +
          " Do not pad with generic tags — every tag must earn its place."}
    ],
    output_format:"Return each deliverable in its own copy-paste-ready code block, labelled with its name. No commentary between blocks."
  };
}
function PTP(){
  return wrap("Write the Instagram copy for this property tour, following this JSON specification exactly. " +
    "Return only the 3 deliverables — TITLE, SHORT_DESCRIPTION and HASHTAGS — each in its own code block. Text only — do not generate an image.", DTP());
}

/* ---------------- the tour card set: n rooms + collage + copy ---------------- */
function tourCards(){
  const rooms = ROOMS(), n = rooms.length;
  const list = [{n:1, t:rooms[0].n + " — locks the design", tag:() => "Image 1 of " + n, f:PT1, neg:DT1,
    d:"Pure text-to-image from scratch — NO existing or before image needed! Paste this into a chat; the AI invents the property and locks the design language.",
    tip:["g","Full Tour starts completely from text without any before image. The whole design language is seeded from the post id — click 'New id' in the toolbar to reroll."]}];
  for(let i = 1; i < n; i++){
    const k = i;
    list.push({n:k + 1, t:rooms[k].n, tag:() => "Image " + (k + 1) + " of " + n,
      f:() => PTn(k), neg:() => DTn(k),
      d:"Same chat, straight after image " + k + ". No image upload needed — the model continues the exact design from image 1.",
      tip:k === 1
        ? ["","If the finishes drift, reply: “That is a different scheme. Re-read your HOME_DNA block and rebuild this room with the same floor, walls, joinery, hardware and light temperature.”"]
        : (k === n - 1 ? ["","Last room. Keep the chat open — the collage prompt needs every image still in it."] : ["",""])});
  }
  list.push({n:n + 1, t:"Thumbnail Collage", tag:() => "Cover tile", f:PTC, neg:DTC,
    d:"Run this in the same chat after the last room so the AI can place all " + n + " images into the collage tile. No text except your handle.",
    tip:["g","The AI places the images already generated in this chat into the grid. No manual upload needed."]});
  list.push({n:n + 2, t:"Caption, Description and Hashtags", tag:() => "Post copy", f:PTP, neg:null,
    d:"Text only. Same chat, so it can read the real design and every room in it.",
    tip:["","Post the caption first, then drop the first comment within a minute — it lifts early engagement."]});
  return list;
}

/* =====================================================================
   CARD REGISTRY
   ===================================================================== */
const CARDS_BA = [
 {n:1, t:"Raw Space", tag:()=>"Slide 2 · Before", f:P1, neg:D1,
  d:"Paste this as the first message in a brand-new chat. One post = one fresh chat.",
  tip:["g","shell_variation is seeded from the post id, so every post gets a different raw shell — different openings, different plan, different camera corner. Hit New id in the toolbar to reroll it before you generate."]},
 {n:2, t:"Design Layer", tag:()=>"Slide 3 · After", f:P2, neg:D2,
  d:"Attach the image from step 1, then paste this. It also works from the previous image in the chat.",
  tip:["","If the geometry drifts, reply: “The camera angle and openings changed. Regenerate using the reference as a locked plate — same corners, same openings, same camera height. Keep only the design layer.”"]},
 {n:3, t:"Cover", tag:()=>S.ratio==="reel" ? "Reel cover" : "Slide 1 · Cover", f:P3, neg:D3,
  d:"Attach both images. Every coordinate is fixed so your whole feed stays one visual series.",
  tip:["g","From post two onwards, also attach your first approved cover and add: “Match this template exactly. Only the two photos and the headline change.”"]},
 {n:4, t:"Caption, Description and Hashtags", tag:()=>"Post copy", f:P4, neg:null,
  d:"Text only. Run it in the same chat so it can read the real design.",
  tip:["","Post the caption first, then drop the first comment within a minute — it lifts early engagement."]}
];

/* the visible prompt set: 4 fixed before/after cards, or one card per room
   plus the collage and the copy prompt in tour mode */
function cards(){ return TOUR() ? tourCards() : CARDS_BA; }

