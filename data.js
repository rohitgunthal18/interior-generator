/* =====================================================================
   data.js — vocabulary for the prompt builder
   g = group, n = name, s = typical Indian dimension, m = essential elements
   ===================================================================== */

const SPACES_IN = [
/* ---------------- Residential ---------------- */
{g:"Residential",n:"Living room",s:"12x16 ft, 10 ft slab height, 9 ft finished ceiling",m:"L-shaped or 3+2 seater sofa, centre table, TV media wall with a recessed niche and back-lit reveal, one accent chair, side table, floor lamp, area rug anchoring the seating island, floor-length curtains, one large artwork or a gallery cluster, entry console with a mirror"},
{g:"Residential",n:"Bedroom",s:"11x12 ft",m:"queen bed with an upholstered headboard, matched bedside tables with reading lights, 6 ft sliding wardrobe, compact dresser or study nook, blackout plus sheer curtains, bedside rug on the walking side, overhead luggage loft, laundry basket tucked in"},
{g:"Residential",n:"Master bedroom",s:"13x15 ft",m:"king bed with a full-height upholstered or fluted headboard panel, symmetrical bedside tables with hanging pendants, 8 ft wardrobe with one mirrored shutter or a walk-in entry, dressing unit with a lit mirror, lounge chair with a side table and floor lamp, slim TV panel, layered sheer and blackout curtains on a recessed track, ensuite door, luggage loft"},
{g:"Residential",n:"Children's room",s:"10x11 ft",m:"single or bunk bed with a safety rail and a ladder, study desk with a pinboard and cable slot, low open storage with pull-out toy bins, one playful accent wall or wall decal, soft washable rug, wardrobe with hanging rod lowered to child height, warm bedside light, growth chart or name lettering, rounded furniture edges"},
{g:"Residential",n:"Kitchen (modular)",s:"8x10 ft, 900 mm counter height, 600 mm counter depth",m:"L or U-shaped platform with a granite or quartz counter, tall unit for the fridge and pantry, base drawer stacks with cutlery inserts, wall units up to 7 ft, dado tile or back-painted glass backsplash, single-bowl sink with a drainboard and pull-out faucet, hob with a chimney at 650 mm above, built-in microwave and oven housing, RO purifier point, exhaust provision, profile-lit under-cabinet strip, breakfast counter if the width allows"},
{g:"Residential",n:"Dining area",s:"10x12 ft",m:"6-seater dining table with matched chairs or one bench side, crockery unit or sideboard with closed and open storage, statement pendant centred 750 mm above the table top, framed art or a full mirror to widen the room, table runner with a low centrepiece, rug sized to hold pulled-out chairs"},
{g:"Residential",n:"Bathroom",s:"5x8 ft",m:"wall-hung WC with a concealed cistern and a health faucet, counter-top basin on a vanity with a mirror and mirror light, glass shower partition, rain plus hand shower, geyser neatly placed, towel rail and robe hook, recessed niche shelf in the shower wall, anti-skid floor tile with a fall to the drain, dado tile to the ceiling, exhaust fan"},
{g:"Residential",n:"Study room",s:"9x10 ft",m:"L-shaped or straight desk with cable management, ergonomic task chair, open bookshelf plus closed base storage, 4000K task lamp, pinboard or writable panel, acoustic felt panel behind the desk, reading chair with a side table, blinds for glare control, plant on the desk"},
{g:"Residential",n:"Pooja room",s:"4x5 ft, or a 3 ft wide niche",m:"marble or teak mandir unit with a carved jaali back panel, raised platform with a threshold step, deity idols with a small brass diya and bell, drawer storage for samagri, warm 2700K concealed spotlight washing the deity, agarbatti stand, hanging bell chain, marble or Kota floor, east or north-east orientation as per vastu, no leather and no footwear in frame"},
{g:"Residential",n:"Balcony",s:"5x8 ft",m:"anti-skid outdoor tile or a wood deck, railing with a mounted planter box, two-seater bistro set or floor seating with bolsters, vertical green wall or a trellis, hanging planters at staggered heights, warm string lights or a wall lantern, screened drying provision, weatherproof outdoor fabric"},
{g:"Residential",n:"Foyer / entrance lobby",s:"6x7 ft",m:"shoe storage bench with a seat cushion, tall mirror, key and mail tray on a console, statement pendant or a wall sconce pair, patterned floor inlay marking the threshold, coat and bag hooks, one sculptural plant, warm welcome lighting"},
{g:"Residential",n:"Walk-in wardrobe",s:"7x9 ft",m:"open hanging modules at two heights, drawer stacks with velvet jewellery inserts, glass-front accessory display, island with a top drawer, full-height mirror, profile lighting inside every module with sensor switching, seating stool, laundry pull-out, ironing niche"},
{g:"Residential",n:"Utility / laundry area",s:"5x6 ft",m:"washing machine and dryer stacked or side by side under a counter, deep utility sink with a tall faucet, wall cabinets for detergent, pull-out drying rack, ironing board niche, mop and broom slot, water-resistant flooring with a floor drain, bright 4000K light"},
{g:"Residential",n:"Guest bedroom",s:"10x12 ft",m:"double bed with a simple headboard, two bedside tables, 4 ft wardrobe with luggage space, folding luggage rack, reading light, blackout curtain, small work-from-home desk, neutral art, water carafe tray"},
{g:"Residential",n:"Home office",s:"10x11 ft",m:"desk facing away from window glare, ergonomic chair, dual-monitor setup with cable trunking, credenza with printer storage, acoustic panelling behind the video-call wall, ring or panel light for calls, book and object display shelf, warm 3000K ambient plus 4000K task lighting"},
{g:"Residential",n:"Terrace / rooftop lounge",s:"15x20 ft",m:"weatherproof deck flooring, pergola or tensile shade, modular outdoor seating with sunbrella fabric, low fire pit or coffee table, planters framing the edge, festoon and step lighting, parapet-height bar counter with stools, wind-tolerant planting"},
/* ---------------- Commercial ---------------- */
{g:"Commercial",n:"Office — open workstation floor",s:"40x50 ft, 10 ft finished ceiling",m:"linear workstation clusters with 1200 mm desks and screen dividers, ergonomic task chairs, 900 mm circulation spine, phone booths, a stand-up collaboration table, acoustic baffles or a felt ceiling raft, glare-controlled linear lighting at 400 lux, planted breakout edge, lockers, wayfinding graphics"},
{g:"Commercial",n:"Office — MD / private cabin",s:"14x16 ft",m:"executive desk with a return unit, high-back leather chair, two visitor chairs, credenza with a display niche and back-lighting, a 4-seat discussion table, veneer or fluted feature wall behind the desk, task plus cove lighting, glass partition with a manifestation film, awards shelf, floor rug"},
{g:"Commercial",n:"Office — conference room",s:"14x20 ft",m:"10-seater boardroom table with integrated power and data pop-ups, matched executive chairs, wall-mounted display with a concealed cable route, video-conference camera and ceiling mic, acoustic wall panelling, dimmable cove plus focused table lighting, writable glass board, credenza, blackout blind on the glazing"},
{g:"Commercial",n:"Office — reception",s:"12x16 ft",m:"back-lit brand wall with the logo in metal or acrylic letters, reception desk with a raised transaction top and a lower accessible counter, two lounge chairs with a side table, visitor seating bench, magazine ledge, statement pendant, planter, subtle floor inlay leading in"},
{g:"Commercial",n:"Retail shop",s:"15x30 ft",m:"perimeter wall-hung display systems, mid-floor gondola or nesting tables, cash and wrap counter with a queue line, mirror station, trial room with a curtain or louvred door, track spotlights at 3000K with a 3:1 accent ratio, brand graphics, hero product plinth at the entrance, stock door"},
{g:"Commercial",n:"Showroom",s:"25x40 ft, double height where possible",m:"zoned product vignettes staged like rooms, a central hero display on a raised plinth, back-lit sample wall, consultation desk with material swatch drawers, high-CRI 90+ track lighting, polished large-format flooring, brand identity wall, seating for clients, clear sightline from the glazed frontage"},
{g:"Commercial",n:"Café",s:"18x25 ft",m:"service and display counter with a pastry vitrine and a visible espresso machine, menu board, mixed seating — a window bar with stools, two-seater tables, one long communal table and a soft corner banquette, warm 2700K pendants at 1500 mm above the tables, exposed or feature ceiling, plants, chalk or neon graphic, POS station, condiment and pickup ledge"},
{g:"Commercial",n:"Restaurant — dining hall",s:"30x45 ft",m:"mixed covers of 2s and 4s with one large family table, banquette seating along one edge, waiter service station, bar or display kitchen edge, layered lighting with dimmable table pendants at 2700K and accent-washed walls, acoustic treatment in the ceiling, feature partition or a jaali screen for zoning, coordinated table linen and crockery setting, entrance host desk"},
{g:"Commercial",n:"Bar / lounge",s:"20x30 ft",m:"back-bar bottle display with layered back-lighting, bar counter at 1100 mm with 750 mm stools, brass or blackened metal foot rail, low lounge seating groups, moody 2200K ambient with focused 3000K accents, textured dark wall finish, mirror and glassware detail, DJ or music corner, coat area"},
{g:"Commercial",n:"Salon",s:"15x22 ft",m:"styling stations with mirrors and integrated task lighting, hydraulic chairs, shampoo backwash units with a plumbing wall, colour bar with product storage, manicure and pedicure corner, waiting sofa with a magazine ledge, reception and retail display, high-CRI even lighting with no colour cast, wet-area flooring with a drain, product shelving"},
{g:"Commercial",n:"Hotel — guest room",s:"13x18 ft",m:"king bed with a full-width upholstered headboard and wall reading lights, bedside consoles with charging points, luggage bench, work desk and chair, wardrobe with a safe and a mini-bar, lounge chair by the window, wall-mounted TV, layered sheer and blackout drapes, ensuite door, bedside master light switching, carpet or wood flooring"},
{g:"Commercial",n:"Hotel — reception lobby",s:"30x40 ft, double height",m:"reception desk with a back-lit stone or veneer back panel, concierge station, statement chandelier or a sculptural light cluster, multiple lounge seating clusters with rugs, feature art or an installation wall, planted mass, luggage trolley bay, polished stone flooring with a border pattern, lift lobby framing"},
{g:"Commercial",n:"Co-working space — lounge",s:"25x35 ft",m:"mixed soft seating with modular sofas and poufs, high communal table with power grommets, phone and focus pods, café counter, event steps or bleacher seating, whiteboard wall, plants at three heights, mixed pendant and track lighting, lockers, playful branded graphics, acoustic ceiling clouds"},
{g:"Commercial",n:"Bakery / dessert counter",s:"12x18 ft",m:"refrigerated glass display counter with tiered trays, back-lit menu, packaging and pickup shelf, small marble-top standing counter, open kitchen window, warm 2700K accent lighting on the product, tiled apron wall, branded signage, queue line marking"},
/* ---------------- Institutional ---------------- */
{g:"Institutional",n:"Classroom",s:"24x30 ft, 40 seats",m:"rows or clusters of student desks with chairs sized to the age group, teacher desk and lectern, green chalkboard or a white writing board with a projector screen beside it, pinnable display boards for student work, lockable storage cupboard, ceiling fans, glare-free 300–500 lux linear lighting, cross-ventilated windows with a sill display ledge, clean circulation to the door"},
{g:"Institutional",n:"Library / reading room",s:"30x45 ft",m:"double-sided book stacks at reachable height with end-panel signage, long shared reading tables with individual task lamps, single carrel desks against the wall, soft reading corner with armchairs, issue and return counter, catalogue or search terminal, acoustic ceiling and carpet zoning, 500 lux even task lighting with no reflection on pages, display of new arrivals"},
{g:"Institutional",n:"Laboratory",s:"25x35 ft",m:"chemical-resistant island and perimeter work benches at 900 mm, reagent shelves with a lip, gas and power service spine, sinks with elbow taps, fume hood, emergency shower and eyewash station, safety signage and a first-aid box, stools at 600 mm, epoxy or vitrified anti-static flooring, bright shadow-free 500 lux lighting, storage cupboards under the bench"},
{g:"Institutional",n:"Computer lab",s:"24x32 ft",m:"rows of computer desks with cable trunking and monitor arms, ergonomic chairs, server or switch rack in a corner, projector and screen, whiteboard, AC with a planned throw, raised or trunked floor cabling, glare-free indirect lighting positioned to avoid screen reflection, blinds on the windows, printer station"},
{g:"Institutional",n:"Auditorium",s:"60x80 ft, 300 seats",m:"raked tiered seating with upholstered fold-down chairs and aisle numbering, stage with a proscenium edge and steps, acoustic wall panelling and diffusers, stage lighting bars and a wash of house lights, projection screen, control booth at the rear, aisle lighting strips, acoustic doors, wheelchair-accessible row, dark ceiling with concealed services"},
{g:"Institutional",n:"Administration area",s:"20x28 ft",m:"front counter with a queue rail, staff workstations with file storage, tall file racks and a records cupboard, small waiting bench for parents or visitors, notice and circular board, principal's cabin door, tokens or number display, neat cable and printer zone, even 400 lux lighting"},
{g:"Institutional",n:"Staff room",s:"18x24 ft",m:"individual staff desks or shared work tables, personal lockers, discussion table with chairs, tea and pantry counter with a water dispenser, notice board with the timetable, soft seating corner, book and copy-checking ledge, comfortable warm-neutral lighting, plants"},
{g:"Institutional",n:"Canteen / cafeteria",s:"35x50 ft",m:"long benched dining tables, serving counter with a tray rail and a sneeze guard, hand-wash trough, waste segregation station, menu display, easy-clean tiled walls to dado height, durable vitrified flooring with a fall to the drain, high-volume ventilation, bright even lighting, queue line marking"},
{g:"Institutional",n:"Hostel room",s:"10x14 ft, 2 sharing",m:"two single beds or a bunk with mattress and a headboard ledge, two study desks with task lights and a pinboard, two wardrobes with lockable shutters, luggage storage over the wardrobe, shared shelf, ceiling fan, sturdy easy-clean finishes, curtain, notice ledge"},
/* ---------------- Healthcare ---------------- */
{g:"Healthcare",n:"Reception (healthcare)",s:"16x22 ft",m:"reception desk with a raised privacy screen and a lower accessible counter, queue token display, hand-sanitiser station, wayfinding signage with clear typography, seating for 8 with armrests, wheelchair parking space, antimicrobial and seamless flooring with coved skirting, calm even 300 lux lighting, records storage behind the desk, plant for softness"},
{g:"Healthcare",n:"Clinic — consultation room",s:"10x12 ft",m:"doctor's desk with a monitor and a prescription pad, doctor's chair and two patient chairs, examination couch with a step stool and a privacy curtain, hand-wash basin with an elbow tap, X-ray view box or a wall-mounted screen, instrument trolley, lockable medicine and file cupboard, weighing scale and a height chart, wall-mounted BP unit, warm-neutral 4000K lighting with a bright examination task light"},
{g:"Healthcare",n:"Patient room",s:"12x14 ft",m:"electrically adjustable hospital bed with side rails, bedhead panel with oxygen, suction, nurse-call and reading light, bedside locker and an over-bed table, IV stand, attendant sofa-cum-bed, wall-mounted TV, wardrobe, ensuite door with a grab rail, dimmable ambient plus a focused examination light, seamless washable flooring, curtain track"},
{g:"Healthcare",n:"Waiting area",s:"20x26 ft",m:"linked seating rows with armrests and a wheelchair gap, side tables, water dispenser, token or queue display screen, reading material ledge, children's corner if paediatric, clear wayfinding, calming artwork and biophilic accents, indirect glare-free lighting, easy-clean upholstery, sanitiser stands"},
{g:"Healthcare",n:"Operation theatre",s:"20x22 ft",m:"OT table under a twin-dome surgical light, anaesthesia workstation and monitors on a pendant arm, instrument trolleys and a scrub-nurse table, laminar airflow ceiling diffuser, medical gas pendant, hands-free scrub sink outside the view, X-ray viewer, seamless antibacterial PVC flooring with coved corners, hermetically sealed doors, stainless steel storage cabinets, glare-free 5000K shadow-free lighting"},
{g:"Healthcare",n:"Pharmacy",s:"12x20 ft",m:"dispensing counter with a computer and a barcode scanner, tiered medicine racks with clear labelling and category signage, refrigerated vaccine unit, controlled-drug locked cabinet, prescription drop and pickup point, back-of-house stock shelving, bright even 500 lux lighting, easy-clean flooring, queue line, branded cross signage"},
{g:"Healthcare",n:"Dental clinic — operatory",s:"10x12 ft",m:"dental chair with an overhead operating light and a delivery unit, dentist and assistant stools, spittoon and suction, instrument tray and a mobile cabinet, X-ray unit with a viewer, sterilisation counter with an autoclave, hand-wash basin, patient-facing screen for education, seamless hygienic flooring and coved skirting, calm accent wall to reduce anxiety, glare-free 5000K task light"},
{g:"Healthcare",n:"Physiotherapy room",s:"18x24 ft",m:"treatment couches with privacy curtains, exercise mats and a mirror wall, parallel bars, wall-mounted pulley and resistance station, exercise ball and weight storage, therapy modality trolley for ultrasound and TENS, hand-wash basin, cushioned anti-slip flooring, motivational graphics, bright cheerful even lighting"},
/* ---------------- Recreational ---------------- */
{g:"Recreational",n:"Gym",s:"30x40 ft, 12 ft ceiling",m:"free-weight zone with racks and a mirror wall, cardio row facing a screen or the window, functional training rig with turf lanes, benches and a dumbbell rack sequenced by weight, stretching mat area, water station and towel shelf, heavy-duty rubber flooring with a lifting platform, high-bay or linear lighting at 500 lux, industrial ventilation with visible ducting, motivational typography, sound system"},
{g:"Recreational",n:"Spa",s:"18x24 ft",m:"massage bed with warm layered linen and a face cradle, therapist trolley with oils, curtained or louvred changing nook, foot-soak bowl and a low stool, wet-area shower with a stone floor, dim 2200K layered lighting with candles and a back-lit onyx or teak panel, water feature or a pebble tray, soft sheer drapes, towel warmer, plants and diffuser, hushed acoustic finishes"},
{g:"Recreational",n:"Sports centre / indoor court",s:"60x100 ft, 25 ft clear height",m:"marked sprung wooden or synthetic court surface with correct line marking, protective wall padding, retractable spectator seating, scoreboard, high-level shatterproof lighting on a wire guard with no glare into player sightlines, equipment store, player benches, high-level ventilation louvres, exposed steel truss ceiling"},
{g:"Recreational",n:"Gaming room",s:"12x16 ft",m:"racing or gaming desk with a triple-monitor rig, RGB-lit ergonomic gaming chair, console and controller shelving, acoustic foam or slat panelling, LED strip coving with an addressable accent wash, blackout treatment, bean bag second seating, cable management spine, mini fridge, collectible display shelf, dark low-reflectance finishes"},
{g:"Recreational",n:"Entertainment room / home theatre",s:"14x20 ft",m:"tiered recliner seating for 6 with a rear riser, acoustically transparent screen or a projector with a ceiling mount, in-wall or on-wall speakers with a subwoofer, acoustic fabric-wrapped wall panels and a bass trap corner, star-ceiling or cove-lit ceiling on a dimmer, blackout drapes, snack ledge with cup holders, step lighting on the riser, dark saturated wall colour"},
{g:"Recreational",n:"Clubhouse (indoor)",s:"35x50 ft",m:"multipurpose lounge seating clusters, indoor games zone with a pool or table-tennis table, small pantry and beverage counter, reception and notice board, TV wall, party or event floor with a stacked-chair store, kids corner, restroom entry, layered ambient and accent lighting, durable premium finishes, feature ceiling"},
{g:"Recreational",n:"Yoga / meditation studio",s:"20x25 ft",m:"warm wooden floor with mat markings, mirror or a plain calm feature wall, prop storage for blocks, bolsters and straps, instructor mat platform, sheer curtain filtering daylight, soft dimmable 2700K lighting with an indirect cove, plants, water dispenser, minimal acoustic softening, a single focal element such as a mandala or a Buddha niche"},
{g:"Recreational",n:"Kids play zone",s:"20x28 ft",m:"soft-play foam blocks and a padded climbing structure, ball pit, slide, mirror and sensory panel wall, low seating for parents, cubby storage with labelled bins, shoe rack at the entry, cushioned anti-skid flooring with a colourful pattern, rounded edges everywhere, bright cheerful lighting, height-appropriate graphics"},
{g:"Recreational",n:"Dance / music studio",s:"25x35 ft",m:"sprung wooden dance floor, full-height mirror wall with a ballet barre, acoustic panelling and a floating wall detail, instrument and speaker corner, recording booth with a glazed panel if music, storage for stands and cases, adjustable dimmable lighting on a track, seating bench, water station, exposed dark ceiling"},
{g:"Recreational",n:"Photography studio",s:"25x35 ft, 14 ft ceiling",m:"seamless white cyclorama corner, paper backdrop rolls on a wall mount, studio strobes with softboxes and umbrellas on stands, C-stands and sandbags, overhead lighting grid or truss, tethered laptop cart, prop and furniture store, blackout capability, matte black walls outside the shooting zone, hair and makeup station with mirror lights"},
{g:"Recreational",n:"Podcast / content studio",s:"12x14 ft",m:"round table with three broadcast mics on boom arms, acoustic slat and foam treatment, styled backdrop shelf with plants, books and a neon sign, key and fill light with a hair light, camera on a tripod, comfortable swivel chairs, cable management under the table, monitor for the guest, warm cinematic 3200K accent wash"}
];

const SPACES_OUT = [
/* ---------------- Residential exteriors ---------------- */
{g:"Residential",n:"Independent house — front elevation",s:"30x50 ft plot, G+1",m:"finished facade with a paint or texture scheme and one cladding feature, main entrance door with a canopy or a deep recess, window frames with sunshade chajjas, parapet detail, plinth with a stone band, compound wall with a gate, paved driveway and a walkway, house number plate, letterbox, meter box neatly integrated, facade wall-washer and gate lights, lawn with layered shrub beds and one specimen tree"},
{g:"Residential",n:"Duplex bungalow — full facade",s:"40x60 ft plot, G+1",m:"double-height entrance feature, cantilevered slab or a balcony projection, vertical louvre or jaali screen on the stair core, two-tone facade material split, car porch for two cars, boundary wall with a sliding gate and a wicket gate, driveway paving pattern, entrance steps with a handrail, facade uplighters and soffit downlights, lawn with a border planting bed"},
{g:"Residential",n:"Villa — front elevation with driveway",s:"60x90 ft plot",m:"grand entrance portico with tall pivot or double doors, stone-clad feature mass, full-height glazing to the living room, cantilevered canopy, curved or patterned driveway paving with a wash bay, gate with a compound wall and pillar lights, water feature at the entrance, layered lawn and specimen palms, facade grazing light, house name signage"},
{g:"Residential",n:"Villa — rear garden and lawn",s:"40x50 ft rear yard",m:"clipped lawn with a defined edge, layered shrub and flowering beds, specimen tree with an under-canopy seat, pergola or gazebo sit-out with outdoor seating, paved patio off the living room, stepping-stone path, water feature or a birdbath, boundary green screen, garden bollard and spike lighting, outdoor dining set"},
{g:"Residential",n:"Villa — swimming pool deck",s:"30x50 ft pool zone",m:"pool with a coping edge and an infinity or skimmer detail, anti-skid stone or wood-look deck, sun loungers with a side table and an umbrella, shaded cabana or a pergola lounge, outdoor shower, pool-edge planting, underwater lights and deck-level step lights, towel and equipment store, glass or cable pool fencing where required, poolside bar counter"},
{g:"Residential",n:"Farmhouse — entrance gate and boundary wall",s:"100 ft frontage",m:"substantial gate in metal or wood with a stone-clad pillar pair, name plaque and lighting on the pillars, rustic boundary wall in random rubble or brick with a jaali band, gravel or paver approach road with a cattle grid, avenue planting on both sides, security cabin, mud-toned finishes, creeper on the wall, warm low-level path lighting"},
{g:"Residential",n:"Farmhouse — open courtyard",s:"30x40 ft courtyard",m:"paved courtyard with a central water body or a tulsi platform, verandah with columns and a sloping tiled roof edge, jhoola or a wooden swing, low seating plinths with cushions, potted plants and hanging lanterns, exposed brick or lime-plaster walls, stone flooring with a grass joint, cane and terracotta accessories, string and lantern lighting"},
{g:"Residential",n:"Row house — compact front yard",s:"20x12 ft front yard",m:"short driveway with a paving pattern, narrow lawn strip with a raised planter bed, entrance steps with a small porch and a bench, boundary with a low wall and railing, small gate, vertical green wall to gain depth, wall-mounted letterbox and number plate, two facade sconces, potted plants flanking the door, one climber"},
{g:"Residential",n:"Apartment flat — balcony garden",s:"6x12 ft balcony",m:"deck or anti-skid tile floor, railing planter run, vertical green wall with a drip line, tiered plant stands, compact bistro seating or a corner bench with cushions, hanging planters at varied heights, warm festoon lighting, wind-tolerant plant palette, watering point, screened utility corner"},
{g:"Residential",n:"Terrace garden / rooftop",s:"25x30 ft terrace",m:"waterproofed and paved deck with a slope to the drain, raised planter beds with a filter and drainage layer, pergola with a climber, lounge seating and an outdoor dining set, kitchen-garden section in grow bags, tensile or bamboo shade, festoon and step lighting, parapet with a safety height, water tank screening"},
{g:"Residential",n:"Pergola / gazebo sit-out",s:"12x14 ft",m:"timber or steel pergola with a slatted top and a climber, paved or decked base, built-in bench seating with cushions, low central table, planters framing the corners, hanging or festoon lighting, ceiling fan if enclosed, side screen for privacy, gravel border, outdoor rug"},
/* ---------------- Commercial and institutional exteriors ---------------- */
{g:"Commercial",n:"Commercial building — glass office facade",s:"G+4, 100 ft frontage",m:"unitised glazing with structural glazing joints and bronze or anodised fins, solid stone or ACP-clad service core, canopy over the entrance with the brand signage, revolving or sliding entrance doors, landscaped forecourt with a granite pavement, bollards and a drop-off lane, facade grazing and soffit lighting, name and logo in lit channel letters, flag masts, basement ramp entry"},
{g:"Commercial",n:"Showroom building — street frontage",s:"40 ft frontage, double height",m:"full-height display glazing with minimal mullions, back-lit brand signage band, canopy with concealed lighting, hero product visible through the glass, paved forecharge with parking bays, planters flanking the entrance, entrance mat and level threshold, evening facade lighting scheme, clean street kerb, wayfinding board"},
{g:"Commercial",n:"Restaurant — alfresco courtyard seating",s:"25x35 ft",m:"paved courtyard with a mixed table layout, pergola or umbrella shade, planter partitions defining zones, feature wall in brick or lime plaster, festoon and lantern lighting at 2200K, service pass or a bar edge, water feature or a green wall, weatherproof furniture with cushions, heaters or fans as per the climate, entrance host station and menu board"},
{g:"Commercial",n:"Rooftop bar / terrace restaurant",s:"30x45 ft",m:"deck flooring with a parapet-height bar counter and stools, low lounge seating with fire tables, tensile or pergola shade, planter screening the plant room, skyline sightline kept clear, festoon and concealed step lighting, DJ or live music corner, service station, wind screens in glass, statement lit signage"},
{g:"Commercial",n:"Resort property — poolside landscape",s:"60x90 ft",m:"free-form or lap pool with a stone coping, timber deck with loungers and umbrellas, thatch or tensile cabanas, palm and frangipani mass planting, pool bar with a swim-up edge, outdoor shower and towel counter, meandering paths in stone with a grass joint, underwater and coconut-trunk uplighting, lawn for events, water feature transition"},
{g:"Commercial",n:"Hotel — porte-cochère entrance",s:"40 ft frontage",m:"grand drop-off canopy with a lit soffit, tall entrance doors with a doorman podium, stone-clad columns, water feature and a sculpture on the axis, formal symmetrical planting with clipped hedges, luggage trolley bay, valet parking sign, flag masts, warm 2700K facade grazing, granite driveway with a border band"},
{g:"Institutional",n:"School building — entrance and campus frontage",s:"120 ft frontage",m:"main gate with the school name and emblem, security cabin, drop-off loop with a covered walkway, painted facade in cheerful accent bands, corridor railings visible on upper floors, assembly ground edge with a flag mast, tree-lined boundary, cycle stand, signage board with timings, wide accessible ramp and steps"},
{g:"Institutional",n:"Temple property — entrance plaza",s:"50x60 ft plaza",m:"stone-paved plaza with a border pattern, gopuram or a shikhara profile visible, carved entrance arch or a jaali screen, brass bell and a dhwaja stambha, steps with a ramp, footwear stand, tulsi or a peepal platform, diya niches in the compound wall, warm 2700K uplighting of the carving, marigold and banana-leaf festoon detail, low seating plinth"},
{g:"Institutional",n:"Gated society — clubhouse exterior",s:"80x100 ft",m:"clubhouse mass with a double-height entrance and a deep canopy, adjacent pool visible with a deck, lawn for events, paved plaza with feature planters, stone and wood-look cladding mix, ample glazing to the gym or lounge, drop-off and parking bays, facade grazing plus bollard lighting, signage with the society name, hedged boundary"},
{g:"Institutional",n:"Gated society — children play area",s:"40x50 ft",m:"rubber or EPDM safety surfacing in colour zones, multiplay structure with a slide and a climber, swings with impact zones, see-saw and spring riders, sand pit, shaded parent seating benches, drinking-water point, low fence with a self-closing gate, shade tree or a tensile canopy, safety signage, bright pole lighting"},
{g:"Institutional",n:"Apartment building — main entrance exterior",s:"G+8 tower base",m:"entrance canopy with the tower name in lit letters, double-height lobby glazing, stone-clad base band with a texture-paint upper facade, drop-off with a granite driveway and a kerb, security cabin and a boom barrier, landscaped forecourt with palms and shrub beds, letterbox bank, ramp and steps with a handrail, facade wall-washers, visitor parking marking"},
{g:"Institutional",n:"Apartment building — podium landscape",s:"70x90 ft podium",m:"paved podium deck with planter beds over a waterproofed slab, lawn pocket, seating clusters with pergolas, walking loop with a contrasting paving band, kids corner, water body or a fountain, gym or clubhouse edge glazing, palms and specimen trees in deep planters, bollard and step lighting, service and fire access kept clear"},
{g:"Industrial",n:"Industrial plot — factory gate and frontage",s:"200 ft frontage",m:"heavy-duty sliding or swing gate with a boom barrier and a weighbridge, security cabin, company name board with the logo, PEB shed profile visible behind, concrete road with truck turning radius and lane marking, boundary wall with concertina, avenue planting strip, high-mast lighting, parking marked for trucks and staff, drain and hydrant visible"},
{g:"Residential",n:"Empty plot — full landscape development",s:"50x80 ft plot",m:"complete masterplan built on the bare plot: entry gate and driveway, lawn with defined beds, specimen tree, seating deck or a gazebo, paved path loop, water feature, boundary green screen, service corner screened, layered lighting scheme, plinth and level treatment, irrigation points"},
{g:"Residential",n:"Boundary wall and main gate elevation",s:"60 ft run",m:"compound wall at 1.8 m with a material band and a jaali or louvre section, gate pillars with lit caps, main sliding gate plus a wicket gate in a matching design, house name plaque, intercom and letterbox panel, creeper or a vertical green section, kerb and drain edge, low path lighting, wall-mounted lanterns, matched paving apron"},
{g:"Residential",n:"Car porch / driveway",s:"20x22 ft, 2 cars",m:"cantilevered or column-supported porch roof with a lit soffit, cobble or large-format paver driveway with a laying pattern and a drainage channel, wash point and a floor drain, wall-mounted charging point, planter edge, step up to the entrance with a handrail, ceiling fan or a light in the porch, kerb detail, tyre-guard planting"}
];

/* =====================================================================
   THEMES — f = family, sw = swatches, d = material language, b = best for
   ===================================================================== */

const THEMES_IN = [
{n:"Modern Minimalist",f:"Minimal & Modern",sw:["#f7f5f2","#d9d6d1","#8f8b85","#111111"],d:"Flat-front handleless joinery with push-to-open, 800x1600 mm large-format matt porcelain, micro-topping walls, linear LED coves and shadow-gap skirting, one sculptural chair, wide negative space, everything concealed.",b:"Offices, clinics, classrooms, showrooms, apartments"},
{n:"Contemporary",f:"Minimal & Modern",sw:["#efece7","#c3bdb3","#6d7b7a","#1f1f1f"],d:"Current-season mix of matt laminate and veneer, soft curved seating, terrazzo or engineered stone tops, black metal slim frames, statement globe pendants, one bold graphic artwork, warm neutrals with a single saturated accent.",b:"Living rooms, cafés, co-working, retail, hotel rooms"},
{n:"Luxury Minimalist",f:"Minimal & Modern",sw:["#efe9e0","#cbbfae","#9a8c78","#1a1a1a"],d:"Very few but very expensive elements: book-matched marble in one continuous slab, full-height micro-cement, deep shadow gaps instead of trims, hidden doors flush with the panelling, tone-on-tone ivory and stone palette, one museum-grade light fixture, no visible hardware.",b:"Master suites, boardrooms, penthouse living, spas"},
{n:"Modern Luxe / Glam",f:"Minimal & Modern",sw:["#d8cfc2","#a9803f","#4a3226","#f2ece3"],d:"Book-matched marble feature wall, fluted and channelled wood panelling, brushed and antique brass inlays, velvet and boucle upholstery, smoked mirror, cove lighting plus a statement chandelier, high-gloss lacquer, tufted detailing.",b:"Living rooms, lobbies, boardrooms, master suites, bars"},
{n:"Transitional",f:"Minimal & Modern",sw:["#f1ece4","#cdbfa9","#7b8b8e","#2b2b2b"],d:"Classic silhouettes stripped of ornament: shaker joinery in a muted paint, simple cornice, linen-upholstered rolled-arm sofa, wood and metal mix, neutral base with soft blue-grey and taupe, symmetrical layouts, understated crystal or fabric-shade lighting.",b:"Family living rooms, guest rooms, hotel rooms, clinics"},
{n:"Japandi",f:"Warm & Natural",sw:["#e8dfd2","#c08e6b","#9aa88f","#3a3733"],d:"Light oak and ash with visible straight grain, rattan cane webbing, raw linen and cotton, washi paper pendants, low-slung furniture on tapered legs, hand-thrown ceramics, one ikebana branch, warm greige lime-wash walls, extreme restraint.",b:"Bedrooms, living rooms, cafés, reading rooms, spas"},
{n:"Wabi-Sabi",f:"Warm & Natural",sw:["#e4ddd0","#c2b49c","#8a7d6a","#443f38"],d:"Deliberately imperfect: hand-troweled clay and lime plaster with texture variation, reclaimed rough-sawn timber, unglazed and crackle-glazed ceramics, raw-edge stone, undyed hemp and khadi textiles, aged patinated brass, sparse asymmetric composition, natural wear celebrated.",b:"Bedrooms, meditation rooms, spas, cafés, boutique retail"},
{n:"Zen Japanese",f:"Warm & Natural",sw:["#efeae0","#d6cbb6","#7d8574","#2f2c28"],d:"Shoji screens in paper and slim timber, tatami-proportioned floor zoning, low platform beds and tables, dark stained timber frame lines, bonsai and moss, pebble tray, hidden storage behind sliding panels, deep shadow and soft indirect glow only.",b:"Bedrooms, yoga studios, spas, tea rooms, meditation"},
{n:"Scandinavian",f:"Warm & Natural",sw:["#ffffff","#ead9c2","#a8bcc9","#2f3336"],d:"Tapered light-wood legs, matt white or pale-grey walls, wool and sheepskin throws, abundant daylight with sheer linen, simple line-art graphic prints, chunky knit textures, functional open shelving, potted greenery, hygge candle moments.",b:"Kids rooms, classrooms, apartments, co-working, cafés"},
{n:"Modern Farmhouse",f:"Warm & Natural",sw:["#f6f3ec","#d9cbb3","#7e6a52","#33352f"],d:"Shaker cabinetry in off-white or sage, butcher-block or honed stone tops, apron-front sink, black slim-frame windows, exposed timber beam or a ceiling plank detail, woven jute rug, galvanised and matt-black hardware, open shelf with stoneware.",b:"Kitchens, dining areas, cafés, bakeries, guest rooms"},
{n:"Rustic",f:"Warm & Natural",sw:["#e3d6c1","#a9835c","#6b4c33","#3b332c"],d:"Rough-sawn and live-edge timber with visible knots, exposed brick or random rubble stone, wrought-iron hardware, terracotta and Kota flooring, chunky beams, jute and hand-woven wool, oil-lamp warm lighting, aged leather, unpolished natural imperfection.",b:"Farmhouses, restaurants, cafés, lounges, hill homes"},
{n:"Organic Modern",f:"Warm & Natural",sw:["#f0e9de","#d3c0a5","#93a184","#3c3a35"],d:"Curved plaster forms and arched niches, boucle and shearling upholstery, travertine and limestone, unstained oak, sculptural ceramic vessels, dried pampas and olive branches, warm off-white with sand and clay tones, no hard corners.",b:"Living rooms, bedrooms, boutique retail, salons, spas"},
{n:"Biophilic",f:"Warm & Natural",sw:["#eef0e6","#9db388","#5f7a52","#2f3a2c"],d:"Living green wall with a visible drip line, planters at three heights, natural timber and cork, water sound element, maximum daylight with light shelves, natural ventilation cues, earthy unpolished materials, botanical print, circadian tunable lighting from 2700K to 5000K.",b:"Offices, clinics, waiting areas, hotels, co-working"},
{n:"Coastal",f:"Global & Classic",sw:["#ffffff","#e6ddcb","#8fb4c4","#2d4a58"],d:"Whitewashed timber and shiplap panelling, pale bleached oak, natural jute and sisal, sheer white linen billowing, rope and driftwood accents, glass and coral objects, blue-and-white stripe, brushed nickel, sun-bleached breezy palette.",b:"Villas, beach homes, balconies, resorts, cafés"},
{n:"Tropical",f:"Global & Classic",sw:["#e9e4d8","#4f6b45","#8b5e34","#2c2c2a"],d:"Deep overhangs and timber louvres indoors, rattan and cane furniture, banana-leaf and monstera print, dark teak with brass, indoor palms and ferns, terrazzo or terracotta floor, ceiling fan with wooden blades, humid green-and-terracotta palette.",b:"Villas, resorts, cafés, Kerala and coastal homes, spas"},
{n:"Mediterranean",f:"Global & Classic",sw:["#f3ece1","#dcc9a6","#4a6f7c","#8a5a3b"],d:"Warm lime-plaster and tadelakt walls, arched openings and niches, terracotta and encaustic patterned tile, wrought-iron lanterns and railings, olive and bougainvillea, rush-seat chairs, heavy chunky wood table, blue-and-white ceramic accents.",b:"Villas, restaurants, cafés, poolside rooms, clubhouses"},
{n:"Moroccan",f:"Global & Classic",sw:["#efe0c8","#c96b3f","#2f6b6b","#3a2a20"],d:"Zellige glazed tile with visible tonal variation, carved plaster and mashrabiya screens, pierced-metal lanterns casting patterned shadows, low poufs and floor cushions, kilim and Beni Ourain rugs, arched mirrors, brass tea trays, jewel-tone accents on warm sand.",b:"Lounges, restaurants, spas, bedrooms, cafés"},
{n:"Art Deco",f:"Bold & Expressive",sw:["#efe6d5","#1d3b3a","#b8912f","#1a1a1a"],d:"Strong geometric symmetry, fluted and scalloped panelling, black and brass inlay lines, fan and sunburst motifs, marquetry veneer, emerald and navy velvet, curved bar-back forms, mirrored and lacquered surfaces, opaline glass globe lighting, terrazzo with brass dividers.",b:"Bars, lobbies, restaurants, salons, home theatres"},
{n:"Mid-Century Modern",f:"Bold & Expressive",sw:["#efe3cd","#c56a3a","#3f7168","#2e2a25"],d:"Walnut and teak with tapered splayed legs, low-slung lounge chairs, organic curves against clean lines, mustard, olive and burnt-orange upholstery, sputnik and cone pendants, slatted room dividers, abstract geometric art, terrazzo or parquet flooring.",b:"Living rooms, cafés, offices, lounges, showrooms"},
{n:"Bohemian",f:"Bold & Expressive",sw:["#f0e4d4","#c07a4e","#7d6a8a","#3a3230"],d:"Layered pattern-on-pattern textiles, macramé and woven wall hangings, floor cushions and low daybeds, rattan and cane, mixed vintage rugs overlapped, hanging planters and trailing pothos, brass and mirror-work accents, warm string and lantern lighting, collected-over-time feel.",b:"Living rooms, cafés, studios, balconies, salons"},
{n:"Eclectic",f:"Bold & Expressive",sw:["#f2ece2","#2f5d7c","#c2703f","#242424"],d:"Curated clash held together by one repeating colour: an antique piece next to a modern one, gallery wall of mismatched frames, bold patterned floor tile, mixed metals allowed, statement vintage lighting, unexpected material pairings, personality over consistency.",b:"Cafés, boutique retail, studios, living rooms, salons"},
{n:"Maximalist",f:"Bold & Expressive",sw:["#123a33","#c9992e","#8d2f3f","#f0e7d6"],d:"Saturated colour-drenched walls including the ceiling, large-scale botanical or chinoiserie wallpaper, layered art salon-style, velvet and fringe, marble and brass abundance, mirrored and lacquered surfaces, more is more but tonally controlled.",b:"Bars, restaurants, powder rooms, lounges, salons"},
{n:"Retro Pop",f:"Bold & Expressive",sw:["#fbe9c8","#e2603f","#3f7fa6","#241f1c"],d:"Bold primary and candy colour blocking, chrome and laminate, checkerboard flooring, curved tube seating, neon signage, geometric wallpaper, terrazzo with oversized chips, playful signage typography, glossy finishes.",b:"Cafés, gaming rooms, kids zones, retail, dessert counters"},
{n:"Dark Academia",f:"Bold & Expressive",sw:["#2a231d","#6b4a2c","#8b7345","#e6dcc6"],d:"Deep olive and oxblood walls, floor-to-ceiling dark-stained bookshelves with a ladder, brass picture lights, chesterfield leather, panelled wainscoting, globe and map objects, heavy velvet drapes, antique brass and green glass table lamps, warm 2400K pools of light.",b:"Studies, libraries, bars, home offices, lounges"},
{n:"Industrial",f:"Raw & Industrial",sw:["#9b9b98","#1c1c1c","#a9784b","#d6d2cb"],d:"Micro-cement and exposed brick walls, black steel section framing with clear glazing, exposed conduit, tray and ducting as design, Edison and cage lighting, reclaimed timber tops, riveted and blackened metal, polished concrete floor with saw-cut joints.",b:"Cafés, studios, gyms, tech offices, lofts, bars"},
{n:"Brutalist Concrete",f:"Raw & Industrial",sw:["#b6b3ac","#7d7a73","#3c3a37","#dedad2"],d:"Board-marked fair-face concrete as the primary finish, monolithic heavy forms, deep reveals and slot windows, raw steel and smoked glass, minimal furniture in leather and dark wood, dramatic single-direction light, no decoration, texture as the only ornament.",b:"Galleries, studios, showrooms, lobbies, cafés"},
{n:"Traditional Indian (Haveli)",f:"Indian",sw:["#e9d3ad","#9c3f2c","#1f5f56","#33261c"],d:"Carved teak and sheesham with brass fittings, jharokha and jaali screens, Athangudi or Kota patterned flooring, lime-plaster walls with fresco or Pichwai art, brass urlis and diyas, jhoola swing, block-print and bandhani textiles, temple bells, arched niches, mirror-work and inlay.",b:"Pooja rooms, dining, restaurants, foyers, heritage stays"},
{n:"Modern Indian",f:"Indian",sw:["#d8c3a0","#9c4a2f","#6b6f5c","#33302b"],d:"CNC or terracotta jaali as a modern screen, Kota, Jaisalmer and Kadappa stone with a honed finish, cane and rattan inserts in contemporary joinery, brass reveal lines, one Madhubani, Warli or Gond art moment, indigo and terracotta accents on a neutral base, ceiling fan integrated by design, tulsi or a brass urli in a courtyard nook.",b:"Living rooms, dining, foyers, cafés, offices, pooja rooms"},
{n:"Indo-Colonial",f:"Indian",sw:["#f0e8d8","#2f5148","#8c6239","#241f1a"],d:"Tall shuttered windows with louvred panels, dark polished teak furniture with cane seats and backs, monochrome or Athangudi patterned tile floor, planter chairs, brass and porcelain accessories, high ceilings with cornice and a rod-hung fan, botanical prints, deep verandah light.",b:"Living rooms, restaurants, heritage hotels, cafés, studies"},
{n:"Kerala Traditional",f:"Indian",sw:["#e8dcc2","#7d3f24","#4d5f3c","#2c221a"],d:"Exposed laterite and rosewood, sloping Mangalore-tile roof soffit visible, nadumuttam courtyard logic, carved wooden pillars and brackets, oil-lamp niches, coir and cane mats, brass uruli and nilavilakku, deep verandah with a thinnai bench, terracotta jaali ventilation.",b:"Villas, courtyards, resorts, restaurants, pooja rooms"}
];

const THEMES_OUT = [
{n:"Contemporary Minimal",f:"Minimal & Modern",sw:["#ffffff","#c9c5be","#7a6a56","#161616"],d:"Crisp white rendered masses, cantilevered slabs with a sharp drip groove, thin black metal railings, tall pivot entrance door, one full-height wood or stone feature panel, clipped lawn with a hard edge, large-format grey paving, concealed gutters, linear step lighting.",b:"Independent houses, duplexes, row houses, showrooms"},
{n:"Contemporary Glass Box",f:"Minimal & Modern",sw:["#dfe4e6","#8fa0a6","#3e4a4f","#1a1a1a"],d:"Floor-to-ceiling glazing with slim mullions, cantilevered flat roof with a deep soffit, steel columns, reflecting pool at the base, minimal planting in gravel beds, warm interior glow read from outside at dusk, frameless glass railings.",b:"Luxury villas, farm villas, commercial facades, showrooms"},
{n:"Luxe Stone and Glass",f:"Minimal & Modern",sw:["#b9b2a6","#2f3438","#8d6a3f","#e6e2db"],d:"Full-height glazing framed by dry-clad stone masses, bronze or champagne metal fins, linear step and cove lighting, infinity water edge at the entrance, sculpted clipped greens, granite driveway with a border band, tall pivot door in a stone reveal.",b:"Luxury villas, commercial facades, gated clubhouses, hotels"},
{n:"Modern Tropical",f:"Warm & Natural",sw:["#e9e4d8","#4f6b45","#8b5e34","#2c2c2a"],d:"Deep sloping overhangs, timber louvre screens and sliding shutters, exposed brick or laterite base band, coconut, frangipani and traveller palm planting, water body at the entrance, terracotta or Mangalore-tile roof accents, rough stone plinth, warm timber soffits.",b:"Villas, farmhouses, resorts, Kerala and coastal builds"},
{n:"Modern Farmhouse Exterior",f:"Warm & Natural",sw:["#f5f1e8","#cbb99b","#5f5344","#2b2c28"],d:"White or off-white board-and-batten render, dark standing-seam or tiled gable roof, black slim-frame windows, timber-post porch with a bench swing, gravel driveway, picket or post-and-rail boundary, lantern sconces flanking the door, wildflower and hedge planting.",b:"Farmhouses, weekend homes, villas, cafés, homestays"},
{n:"Rustic Stone Cottage",f:"Warm & Natural",sw:["#ded1b8","#a08055","#6b533a","#3a3129"],d:"Random rubble or coursed stone walls, sloping tiled roof with exposed rafter ends, timber doors and shutters with iron hardware, stone-paved approach with grass joints, climbing creepers, lantern lighting, chimney stack, mud-toned lime plaster patches.",b:"Hill homes, farmhouses, resorts, cafés, boutique stays"},
{n:"Japanese Zen Garden",f:"Warm & Natural",sw:["#e7e2d6","#9aa590","#6e6353","#2c2a26"],d:"Raked gravel with placed boulders, moss and clipped mounds, bamboo screen fencing, timber deck engawa edge, stepping-stone path, stone water basin with a bamboo spout, maple or bamboo grove, stone lanterns with a low warm glow, restrained plant palette.",b:"Villas, courtyards, spas, resorts, meditation gardens"},
{n:"Biophilic Green Facade",f:"Warm & Natural",sw:["#e9efe2","#93ac7c","#4e6b45","#2c332a"],d:"Vertical green wall systems on the facade with a visible irrigation grid, planter-integrated balconies with cascading creepers, timber louvres, rainwater channel as a feature, terrace garden visible on top, warm concealed uplighting through the planting.",b:"Apartments, offices, cafés, clubhouses, schools"},
{n:"Coastal Exterior",f:"Global & Classic",sw:["#ffffff","#e6ddcb","#8fb4c4","#2d4a58"],d:"Whitewashed render with pale blue joinery, shiplap timber accents, wide shaded verandah with rope-detail railings, sand-toned paving, sea grass and palm planting, louvred shutters, lantern sconces, breezy open plan visible from outside.",b:"Beach villas, resorts, homestays, cafés, poolside builds"},
{n:"Mediterranean Modern",f:"Global & Classic",sw:["#f3ece1","#dcc9a6","#4a6f7c","#8a5a3b"],d:"Warm lime-plaster walls with soft rounded edges, arched openings and a barrel-vault entry, terracotta roof tiles, olive, cypress and bougainvillea, wrought-iron lanterns and gates, gravel and stone paving, blue-shuttered windows, courtyard fountain.",b:"Villas, resorts, poolside properties, clubhouses, cafés"},
{n:"Desert Xeriscape",f:"Global & Classic",sw:["#e8ddc9","#c19a6b","#8a7d5f","#40382e"],d:"Warm sand-toned render and rammed-earth walls, deep shaded recesses, gravel and decomposed-granite ground, agave, cactus, olive and ornamental grasses, minimal lawn, corten steel planters and edging, low warm path lighting, sculptural single specimen plants.",b:"Arid-region homes, resorts, low-water landscapes, cafés"},
{n:"Colonial Bungalow",f:"Global & Classic",sw:["#f2e9d6","#2f5148","#8c6239","#241f1a"],d:"Deep columned verandah with arches, tall louvred shutters, plinth with steps and a portico, monochrome tiled verandah floor, sloping tiled roof with a decorative fascia, hanging lanterns, mature avenue trees, clipped formal hedges, name plaque on a pillar.",b:"Bungalows, heritage stays, restaurants, clubhouses, schools"},
{n:"Art Deco Facade",f:"Bold & Expressive",sw:["#efe6d5","#1d3b3a","#b8912f","#1a1a1a"],d:"Stepped and symmetrical massing, horizontal banding and fluted pilasters, curved corner windows, brass or gold trim lines, geometric grille and gate motifs, terrazzo entrance floor, opaline globe lighting, bold sans-serif building name in metal letters.",b:"Apartment fronts, hotels, showrooms, restaurants, theatres"},
{n:"Mid-Century Exterior",f:"Bold & Expressive",sw:["#efe3cd","#c56a3a","#3f7168","#2e2a25"],d:"Low-pitched or butterfly roof with wide eaves, post-and-beam expression, breeze-block screen wall, clerestory windows, vertical timber cladding, a single bold-coloured front door, geometric paver path, spiky architectural planting, globe porch light.",b:"Villas, weekend homes, cafés, studios, showrooms"},
{n:"Industrial Exterior",f:"Raw & Industrial",sw:["#a2a09b","#1f1f1f","#a9784b","#d3cfc7"],d:"Exposed brick and corrugated metal cladding, black steel framed glazing with industrial grids, visible steel staircase, corten panels, concrete plinth, minimal gravel landscape, factory-style wall lamps, roller shutter and exposed rainwater downpipes.",b:"Cafés, studios, offices, warehouses, showrooms"},
{n:"Brutalist Concrete Exterior",f:"Raw & Industrial",sw:["#b6b3ac","#7d7a73","#3c3a37","#dedad2"],d:"Board-marked fair-face concrete masses, deep recessed slot windows, cantilevered volumes casting hard shadows, monolithic blank walls with one sculptural opening, gravel and grass strip landscape, hidden warm uplighting grazing the texture.",b:"Galleries, villas, institutions, studios, showrooms"},
{n:"Indian Contemporary",f:"Indian",sw:["#d8c3a0","#9c4a2f","#6b6f5c","#33302b"],d:"CNC or terracotta jaali screens as sun shading, Kota, Jaisalmer and Kadappa stone cladding, brick jaali panels, brass accents on the entrance door, courtyard with a tulsi platform, temple bells at the porch, exposed concrete with wood-look louvres, marigold-toned accent wall.",b:"Bungalows, farmhouses, temples, heritage-style plots"},
{n:"Traditional Indian Haveli",f:"Indian",sw:["#e9d3ad","#9c3f2c","#1f5f56","#33261c"],d:"Carved sandstone jharokha and chhajja, arched entrance with a heavy carved wooden door and brass studs, jaali parapet, frescoed lime-plaster bands, stone-paved courtyard, brass diya niches in the compound wall, stepped plinth, colourful mosaic inlay.",b:"Havelis, temples, heritage hotels, restaurants, farmhouses"},
{n:"Kerala Nalukettu",f:"Indian",sw:["#e8dcc2","#7d3f24","#4d5f3c","#2c221a"],d:"Steep Mangalore-tile sloping roofs with exposed rafters, laterite and lime-plaster walls, carved timber pillars on a raised verandah, central nadumuttam courtyard, thinnai seating plinth, brass lamps, coconut and plantain planting, red-oxide flooring.",b:"Villas, farmhouses, resorts, restaurants, homestays"}
];

/* ---------------- accent colour library ---------------- */
const ACCENTS = [
{n:"Terracotta",h:"#C4673F"},{n:"Rust",h:"#9E4A32"},{n:"Mustard Ochre",h:"#D69A2D"},
{n:"Antique Brass",h:"#B08D57"},{n:"Emerald Green",h:"#1F6F5C"},{n:"Sage Green",h:"#9CAF88"},
{n:"Olive",h:"#6B6F4A"},{n:"Deep Navy",h:"#1C2A4A"},{n:"Peacock Teal",h:"#10656D"},
{n:"Blush Rose",h:"#E0B4AC"},{n:"Wine Maroon",h:"#6E2639"},{n:"Charcoal Black",h:"#242424"},
{n:"Warm Ivory",h:"#EFE5D5"},{n:"Dusty Lavender",h:"#9B8AA6"}
];

/* ---------------- output sizes ---------------- */
const RATIOS = {
  post:{n:"Post",ar:"1:1",px:"1080 x 1080 px",o:"square",split:"vertical",
    fig:"height:16px",safe:"no platform overlay to avoid",
    cam:{in:"16-18 mm equivalent, two-point perspective",out:"20-24 mm equivalent, three-quarter angle"}},
  portrait:{n:"Portrait",ar:"4:5",px:"1080 x 1350 px",o:"vertical portrait",split:"vertical",
    fig:"height:20px",safe:"no platform overlay to avoid",
    cam:{in:"20 mm equivalent held vertically, two-point perspective",out:"24 mm equivalent vertical, three-quarter angle"}},
  reel:{n:"Reel / Story",ar:"9:16",px:"1080 x 1920 px",o:"tall vertical",split:"horizontal",
    fig:"height:26px",safe:"keep the top 250 px and the bottom 420 px free of any text or key detail — Instagram overlays its own UI there",
    cam:{in:"24 mm equivalent held vertically, one-point perspective down the length of the space, more floor and ceiling in frame",
         out:"28 mm equivalent vertical, straight-on or slight three-quarter, full building height plus foreground ground"}}
};

/* ---------------- target models ---------------- */
const MODELS = {
  gpt:{n:"ChatGPT / GPT Image",note:"Paste the JSON as-is. Attach the reference image in step 2 and both images in step 3.",suffix:""},
  gemini:{n:"Gemini (Nano Banana)",note:"Best geometry preservation for step 2. Always attach the before image.",suffix:""},
  mj:{n:"Midjourney v7",note:"JSON is read loosely — the flag line at the end does the heavy lifting.",suffix:"--ar {AR} --style raw --v 7 --q 2 --seed {SEED} --no text,watermark,people"},
  flux:{n:"Flux / Stable Diffusion",note:"Paste negative_prompt into the tool's own negative field, not into the main box.",suffix:""},
  firefly:{n:"Adobe Firefly",note:"Use the Structure Reference slot for the before image to hold the geometry.",suffix:""}
};

const BUDGET = [
  {n:"budget",d:"laminate and MDF, tile flooring, surface-mounted lighting, ready-made furniture, no false ceiling beyond a border"},
  {n:"mid-range",d:"veneer and acrylic finishes, engineered stone tops, partial false ceiling with cove lighting, semi-custom furniture"},
  {n:"premium",d:"natural stone, solid wood and quality veneer, full false ceiling with layered lighting, custom joinery, designer fixtures"},
  {n:"ultra-luxury",d:"book-matched marble, imported hardware, bespoke everything, integrated automation, gallery-grade art and lighting"}
];
const CTA = ["DM for a design consultation","Save this for your project",
  "Follow for daily transformations","Comment your favourite half","Link in bio for a free quote"];
const LIGHT_IN = ["bright midday","soft morning light","golden hour","overcast diffused","warm evening with lights on","blue hour with interior lights on"];
const LIGHT_OUT = ["bright midday","soft morning light","golden hour","blue hour with facade lighting on","overcast diffused","night with full facade lighting"];
const COND_IN = ["bare new construction","freshly plastered, unpainted","old and worn, peeling paint","stripped-out renovation shell","functional but dated and cluttered"];
const COND_OUT = ["bare unfinished grey structure","completed but unpainted shell","old and weathered with stained walls","empty levelled plot with rubble","overgrown neglected yard"];
const PRESETS = [
  {n:"Budget 2BHK refresh",m:"indoor",sp:"Living room",th:"Scandinavian",o:{budget:"budget",accent:"Sage Green"}},
  {n:"Luxury villa living",m:"indoor",sp:"Living room",th:"Modern Luxe / Glam",o:{budget:"ultra-luxury",accent:"Antique Brass",light:"warm evening with lights on"}},
  {n:"Pooja room, traditional",m:"indoor",sp:"Pooja room",th:"Traditional Indian (Haveli)",o:{accent:"Antique Brass",light:"warm evening with lights on"}},
  {n:"Café that goes viral",m:"indoor",sp:"Café",th:"Industrial",o:{accent:"Rust",light:"soft morning light"}},
  {n:"Modular kitchen",m:"indoor",sp:"Kitchen (modular)",th:"Modern Minimalist",o:{budget:"premium",accent:"Charcoal Black"}},
  {n:"Villa facade, dusk",m:"outdoor",sp:"Villa — front elevation with driveway",th:"Luxe Stone and Glass",o:{light:"blue hour with facade lighting on"}},
  {n:"Kerala home",m:"outdoor",sp:"Independent house — front elevation",th:"Kerala Nalukettu",o:{accent:"Terracotta"}}
];

/* =====================================================================
   PROPERTY TOUR PACKAGES
   One entry = one whole place that gets generated as a SET of images,
   one per room, all sharing the design locked by the first image.
   rooms[0] is the hero room: it is the one the master prompt designs.
   m stays style-neutral on purpose - theme, palette and materials are
   chosen by the user or invented by the model, never baked in here.
   ===================================================================== */
const TOURS = [
 {n:"1 RK studio apartment", g:"Homes", s:"280 to 420 sq ft, one working couple or a single tenant",
  rooms:[
   {n:"Studio main room", m:"1500x2000 bed against one wall, a 900 deep work-and-dine top, low storage bench, 2100 high wardrobe, one seating chair", lens:"wide", hero:"show the bed wall and the window in one frame", link:"the floor and skirting that run through the whole flat"},
   {n:"Kitchenette", m:"1800 long counter at 900, two-burner hob, sink with drainboard, upper cabinets from 1400, tall unit, 600 wide fridge gap", lens:"wide", hero:"show the full counter run and the upper cabinets above it", link:"the same shutter and hardware family as the wardrobe"},
   {n:"Bathroom", m:"900x900 shower corner, wall-hung WC, 600 counter basin with mirror, towel rail, 1200 high wall tile band, floor drain", lens:"wide", hero:"show the basin wall and the shower corner together", link:"the same tile family and metal finish used elsewhere"},
   {n:"Balcony", m:"1050 high railing, one compact chair with a side table, floor-standing planters, a wall-mounted drying line, one outdoor light", lens:"normal", hero:"shoot from inside the door so the room edge frames the balcony", link:"the flooring change at the door and the same railing metal finish"}]},

 {n:"1 BHK apartment", g:"Homes", s:"450 to 620 sq ft, a couple or a small family",
  rooms:[
   {n:"Bedroom", m:"1800x2000 bed with headboard, two side tables, 2100 high wardrobe with a full-height mirror shutter, dresser corner, blackout and sheer curtains", lens:"wide", hero:"show the headboard wall and the wardrobe run in one frame", link:"the floor, skirting and door family that repeat in every room"},
   {n:"Living and dining hall", m:"3 seater with one accent chair, centre table, TV wall with a recessed niche, 4 seater dining table at 750, entry console", lens:"wide", hero:"show the TV wall and the dining corner in one frame", link:"the same floor and ceiling strategy carried from the bedroom"},
   {n:"Kitchen", m:"L-shaped counter at 900 with a 600 deep base run, sink under the window, upper cabinets from 1400, tall unit, backsplash to the underside", lens:"wide", hero:"show the sink window and the return of the L in one frame", link:"the same shutter, handle and hardware family as the wardrobes"},
   {n:"Bathroom", m:"1200 shower zone with a glass partition, wall-hung WC, 600 counter basin, mirror with a profile light, 1800 high tile band, niche shelf", lens:"wide", hero:"show the basin and mirror wall with the shower behind", link:"the same tile family and metal finish as the rest of the flat"}]},

 {n:"2 BHK apartment", g:"Homes", s:"650 to 950 sq ft, a family of three or four",
  rooms:[
   {n:"Master bedroom", m:"1800x2000 bed with an upholstered headboard, two side tables, 2400 long wardrobe at 2100, dresser, reading chair, layered curtains", lens:"wide", hero:"show the headboard wall and the window corner in one frame", link:"the floor, skirting, door and hardware family used through the flat"},
   {n:"Second bedroom", m:"1350x1900 bed, study table at 750 with a task light, 1800 wardrobe, pinboard or open shelf run, one floor lamp", lens:"wide", hero:"show the bed and the study corner together", link:"the same floor and joinery language as the master bedroom"},
   {n:"Living and dining hall", m:"L-shaped or 3+2 seating, centre table, TV wall with a recessed niche and back-lit reveal, 6 seater dining at 750, crockery unit, entry console", lens:"wide", hero:"show the TV wall with the dining table reading in the depth of the frame", link:"the same floor and ceiling strategy carried from the bedrooms"},
   {n:"Kitchen", m:"L or U counter at 900, 600 deep base units, sink with a window above, upper cabinets from 1400, tall unit, hob with a chimney, full backsplash", lens:"wide", hero:"show the hob and chimney run with the sink corner in frame", link:"the same shutter, handle and hardware family as the wardrobes"},
   {n:"Bathroom", m:"1200x900 shower with a glass partition, wall-hung WC with a health faucet, 600 counter basin, mirror with a profile light, 1800 tile band, niche", lens:"wide", hero:"show the basin and mirror wall with the shower partition behind", link:"the same tile family and metal finish as the rest of the flat"}]},

 {n:"3 BHK apartment", g:"Homes", s:"1100 to 1500 sq ft, a family of four or five",
  rooms:[
   {n:"Master bedroom", m:"1800x2000 bed with a panelled headboard wall, two side tables, 3000 wardrobe at 2100, dresser, lounge chair with a side table, layered curtains", lens:"wide", hero:"show the headboard wall and the seating corner in one frame", link:"the floor, skirting, door and hardware family used through the flat"},
   {n:"Second bedroom", m:"1500x2000 bed, 2400 wardrobe, study table at 750, open shelf run, side table, one floor lamp", lens:"wide", hero:"show the bed wall and the wardrobe run together", link:"the same floor and joinery language as the master bedroom"},
   {n:"Kids bedroom", m:"1200x1900 bed with a guard rail, study desk at 700, low toy storage, 1800 wardrobe, pinboard wall, one soft rug", lens:"wide", hero:"show the bed and the study desk in one frame", link:"the same floor and shutter family, with the accent colour repeated"},
   {n:"Living and dining hall", m:"L-shaped seating with two accent chairs, centre table, TV wall with a recessed niche, 8 seater dining at 750, crockery unit, entry foyer console", lens:"wide", hero:"show the seating island with the dining zone beyond it", link:"the same floor and ceiling strategy carried from the bedrooms"},
   {n:"Kitchen", m:"U-shaped counter at 900 with a breakfast ledge, sink under the window, upper cabinets from 1400, tall units, hob with a chimney, service platform", lens:"wide", hero:"show the breakfast ledge with the working counter behind it", link:"the same shutter, handle and hardware family as the wardrobes"},
   {n:"Common bathroom", m:"1200 shower with a glass partition, wall-hung WC, 900 counter basin with storage under, mirror with a profile light, 2100 tile run, niche shelf", lens:"wide", hero:"show the basin counter and mirror with the shower behind", link:"the same tile family and metal finish as the rest of the flat"}]},

 {n:"4 BHK duplex villa", g:"Homes", s:"2200 to 3200 sq ft over two floors, a joint family",
  rooms:[
   {n:"Master bedroom", m:"1800x2000 bed on a panelled headboard wall, two side tables, walk-in wardrobe run at 2400, dresser, bay window seat, layered curtains", lens:"wide", hero:"show the headboard wall with the window seat in the same frame", link:"the floor, skirting, door and hardware family used through the villa"},
   {n:"Guest bedroom", m:"1500x2000 bed, 2400 wardrobe, luggage bench, side tables, one reading chair, sheer and blackout layers", lens:"wide", hero:"show the bed wall and the wardrobe run together", link:"the same floor and joinery language as the master bedroom"},
   {n:"Kids bedroom", m:"two 1050x1900 beds or one bunk, twin study desks at 700, low storage, 2100 wardrobe, pinboard wall", lens:"wide", hero:"show both beds and one study desk in a single frame", link:"the same floor and shutter family, with the accent colour repeated"},
   {n:"Double height living room", m:"5400 clear height, L-shaped seating with two accent chairs, large centre table, feature wall to full height, tall window run, statement pendant", lens:"wide", hero:"show the full height of the feature wall and the pendant drop", link:"the same floor and wall finish carried from the entrance"},
   {n:"Kitchen with breakfast counter", m:"island or peninsula at 900 with three stools, base run at 600 deep, tall units, hob with a chimney, sink under the window, full backsplash", lens:"wide", hero:"show the island with the working wall behind it", link:"the same shutter, handle and hardware family as the wardrobes"},
   {n:"Staircase and landing", m:"1050 wide flight, 300 treads with 165 risers, railing at 900, landing console, full-height window on the flight wall, under-stair storage", lens:"wide", hero:"shoot up the flight so the landing and the window both read", link:"the same floor material stepping onto the treads and the same metal finish"},
   {n:"Master bathroom", m:"1500x900 shower with glass, freestanding or built-in tub, twin basin counter at 1500, wall-hung WC, 2400 tile run, niche shelves, towel warmer", lens:"wide", hero:"show the twin basin counter with the shower and tub zone behind", link:"the same tile family and metal finish as the rest of the villa"}]},

 {n:"Penthouse", g:"Homes", s:"1800 to 2600 sq ft with a private terrace, a couple or a family of three",
  rooms:[
   {n:"Master bedroom", m:"1800x2000 bed facing the glazing, two side tables, wardrobe run at 2400, dresser, lounge chair, motorised sheer and blackout layers", lens:"wide", hero:"show the bed with the city glazing carrying the light", link:"the floor, skirting and hardware family used through the penthouse"},
   {n:"Second bedroom", m:"1500x2000 bed, 2400 wardrobe, work top at 750, side tables, one accent chair, layered curtains", lens:"wide", hero:"show the bed wall and the wardrobe run together", link:"the same floor and joinery language as the master bedroom"},
   {n:"Living lounge", m:"deep modular seating with two lounge chairs, low centre table, media wall with concealed storage, full-height glazing, sculptural floor lamp, large rug", lens:"wide", hero:"show the seating island against the full-height glazing", link:"the same floor and ceiling strategy carried from the bedrooms"},
   {n:"Kitchen and bar", m:"island at 900 with four stools, bar cabinet with glass shutters and internal light, tall units, hob with a concealed chimney, sink run, full backsplash", lens:"wide", hero:"show the island with the bar cabinet lit behind it", link:"the same shutter, handle and metal finish as the wardrobes"},
   {n:"Terrace deck", m:"outdoor deck flooring, lounge seating for four, planter run at 600, pergola or shade frame, low level lighting, 1050 glass railing", lens:"wide", hero:"shoot from the door line so the interior edge frames the deck", link:"the same accent colour and metal finish, with the flooring changing at the door"},
   {n:"Master bathroom", m:"1500 shower with glass, twin basin counter at 1500, wall-hung WC, tub or wet zone, 2400 tile run, backlit mirror, niche shelves", lens:"wide", hero:"show the twin basin counter with the wet zone behind", link:"the same tile family and metal finish as the rest of the penthouse"}]},

 {n:"Row house", g:"Homes", s:"1200 to 1700 sq ft over two levels, a family of four",
  rooms:[
   {n:"Master bedroom", m:"1800x2000 bed with a headboard wall, two side tables, 2700 wardrobe at 2100, dresser, one reading chair, layered curtains", lens:"wide", hero:"show the headboard wall and the window corner in one frame", link:"the floor, skirting, door and hardware family used through the house"},
   {n:"Second bedroom", m:"1350x1900 bed, study table at 750, 2100 wardrobe, open shelf run, side table, one floor lamp", lens:"wide", hero:"show the bed and the study corner together", link:"the same floor and joinery language as the master bedroom"},
   {n:"Living room", m:"3+2 seating with an accent chair, centre table, TV wall with a recessed niche, tall window with a seat ledge, console, large rug", lens:"wide", hero:"show the TV wall with the window ledge in the same frame", link:"the same floor and ceiling strategy carried from the bedrooms"},
   {n:"Kitchen and dining", m:"L counter at 900 open to a 6 seater dining table at 750, upper cabinets from 1400, tall unit, hob with a chimney, crockery unit, pendant over the table", lens:"wide", hero:"show the dining table with the working counter behind it", link:"the same shutter, handle and hardware family as the wardrobes"},
   {n:"Foyer and staircase", m:"entry console at 800 with a mirror, shoe storage bench, 900 wide flight with 300 treads, railing at 900, under-stair niche, one pendant in the void", lens:"wide", hero:"show the console wall with the flight rising behind it", link:"the same floor material stepping onto the treads and the same metal finish"},
   {n:"Bathroom", m:"1200 shower with a glass partition, wall-hung WC, 750 counter basin, mirror with a profile light, 2100 tile run, niche shelf, towel rail", lens:"wide", hero:"show the basin and mirror wall with the shower behind", link:"the same tile family and metal finish as the rest of the house"}]},

 {n:"Farmhouse", g:"Homes", s:"1600 to 2400 sq ft on open land, weekend use for a family",
  rooms:[
   {n:"Master bedroom", m:"1800x2000 bed with a solid headboard, two side tables, 2400 wardrobe, luggage bench, one lounge chair, wide doors opening to the land", lens:"wide", hero:"show the bed with the open doors carrying daylight in", link:"the floor, skirting and door family used through the farmhouse"},
   {n:"Guest bedroom", m:"1500x2000 bed, 1800 wardrobe, side tables, one chair with a side table, curtain layers, window seat if the wall allows", lens:"wide", hero:"show the bed wall and the window together", link:"the same floor and joinery language as the master bedroom"},
   {n:"Living room with high ceiling", m:"4200 clear height with exposed structure, deep seating for six, low centre table, feature wall, tall window run, statement light drop, large rug", lens:"wide", hero:"show the ceiling structure and the seating in one frame", link:"the same floor and wall finish carried from the veranda door"},
   {n:"Kitchen", m:"long counter at 900 with a 600 deep base run, open shelves instead of full uppers, sink under the window, hob with a chimney, tall pantry unit, work table", lens:"wide", hero:"show the open shelf run above the working counter", link:"the same shutter, handle and hardware family as the wardrobes"},
   {n:"Veranda", m:"3000 deep covered sit-out, swing or bench seating, two lounge chairs, planter run, column line at the edge, warm downlights, ceiling fan", lens:"wide", hero:"shoot along the veranda so the column line leads the eye out", link:"the same floor material and ceiling treatment continuing from inside"},
   {n:"Bathroom", m:"1500 wet zone with a glass partition, wall-hung WC, 900 counter basin, mirror with a profile light, 2100 tile run, niche shelves, ventilator window", lens:"wide", hero:"show the basin counter with the wet zone behind", link:"the same tile family and metal finish as the rest of the farmhouse"}]},

 {n:"Startup office, 8 to 12 seats", g:"Commercial", s:"800 to 1200 sq ft on one floor, a small product team",
  rooms:[
   {n:"Reception and waiting", m:"logo wall behind a 1100 high reception desk, two waiting chairs with a side table, magazine ledge, planter, ceiling light line leading in", lens:"wide", hero:"show the logo wall and the desk with the waiting seats in frame", link:"the floor, ceiling system and brand accent used through the office"},
   {n:"Open workstation floor", m:"two rows of 1200x600 desks at 750 with 400 high screens, task chairs, task lights, 1800 storage credenza, pinboard run, cable management", lens:"wide", hero:"shoot down the desk rows so the depth of the floor reads", link:"the same floor, ceiling and desk finish family as the reception"},
   {n:"Meeting room", m:"2400x1200 table at 750 with six chairs, 65 inch display on a clad wall, writable wall, ceiling light over the table, glass partition to the floor", lens:"wide", hero:"show the display wall with the table leading into it", link:"the same floor and ceiling system carried through the glass partition"},
   {n:"Founder cabin", m:"1600x800 desk at 750, ergonomic chair, two visitor chairs, 2100 storage with open shelves, one accent chair corner, floor lamp, glass front", lens:"wide", hero:"show the desk with the storage wall behind it", link:"the same desk finish, metal and accent colour as the open floor"},
   {n:"Break-out pantry", m:"1800 counter at 900 with a sink and a coffee machine, upper cabinets, high table with four stools, soft bench seating, open shelf run, planter", lens:"wide", hero:"show the pantry counter with the high table and stools in frame", link:"the same counter finish, hardware and accent colour as the reception"}]},

 {n:"Cafe", g:"Commercial", s:"600 to 900 sq ft, 24 to 32 covers with takeaway",
  rooms:[
   {n:"Main seating area", m:"mix of 600x600 two-seaters and one 1500 communal table at 750, banquette along one wall, chairs and low stools, feature wall, pendant light run", lens:"wide", hero:"show the banquette run with the communal table in the same frame", link:"the floor, ceiling and seating finish family used through the cafe"},
   {n:"Counter and barista bar", m:"3000 long counter at 1050 with a chilled display at 900, espresso machine, grinder, menu board above, back bar shelving, POS station", lens:"wide", hero:"show the full counter run with the menu board above it", link:"the same counter finish, tile family and light fittings as the seating area"},
   {n:"Window bar seating", m:"400 deep ledge at 1050 along the glazing, four high stools, coat hooks under the ledge, planter row on the sill, warm strip light under the ledge", lens:"normal", hero:"shoot along the window ledge so the stool line and the street glazing read", link:"the same ledge material and metal finish as the counter"},
   {n:"Washroom", m:"wall-hung WC, 600 counter basin with a mirror and a profile light, 1800 tile band, soap and towel fittings, one framed graphic, floor drain", lens:"wide", hero:"show the basin and mirror wall square on", link:"the same tile family, metal finish and accent colour as the cafe floor"}]},

 {n:"Unisex salon", g:"Commercial", s:"700 to 1000 sq ft, four styling stations",
  rooms:[
   {n:"Reception and waiting", m:"1100 high reception desk with a retail display behind, three waiting chairs with a side table, price board, planter, mirror panel, ceiling light line", lens:"wide", hero:"show the reception desk with the retail display wall behind it", link:"the floor, ceiling and brand accent used through the salon"},
   {n:"Styling stations", m:"four mirror stations at 1800 centres, 900 high ledges, hydraulic chairs, tool holders, lit mirror frames, trolley per station, mirror-facing task light", lens:"wide", hero:"shoot along the station row so all four mirrors read in depth", link:"the same floor, mirror frame finish and light temperature as the reception"},
   {n:"Hair wash bay", m:"two backwash units with basins, reclining chairs, towel storage at 1500, hand shower fittings, 2100 tile run behind, low ambient light", lens:"wide", hero:"show both backwash units with the tiled wall behind", link:"the same tile family and metal finish as the rest of the salon"},
   {n:"Beauty and nail room", m:"treatment bed at 700, nail table with two chairs, 1800 storage with glass shutters, trolley, wall mirror, soft wall light, privacy curtain", lens:"wide", hero:"show the treatment bed and the nail table in one frame", link:"the same floor, shutter finish and accent colour as the styling area"},
   {n:"Washroom", m:"wall-hung WC, 600 counter basin with a lit mirror, 1800 tile band, towel and soap fittings, small planter, floor drain", lens:"wide", hero:"show the basin and mirror wall square on", link:"the same tile family and metal finish as the wash bay"}]},

 {n:"Dental clinic", g:"Commercial", s:"600 to 900 sq ft, one dentist with an assistant",
  rooms:[
   {n:"Reception and waiting", m:"1100 high reception desk with a clinic name wall, four waiting chairs with a side table, brochure ledge, planter, soft ceiling light, hand sanitiser station", lens:"wide", hero:"show the name wall and the desk with the waiting seats in frame", link:"the floor, ceiling system and brand accent used through the clinic"},
   {n:"Consultation room", m:"1400x700 desk at 750, doctor chair and two patient chairs, X-ray viewer panel, 2100 storage with closed shutters, wash basin, wall diagram", lens:"wide", hero:"show the desk with the storage wall and viewer panel behind", link:"the same floor, shutter finish and light temperature as the reception"},
   {n:"Treatment room", m:"dental chair with an overhead light and delivery arm, assistant stool, 2400 base run at 900 with a scrub sink, wall-mounted cabinets, seamless washable floor", lens:"wide", hero:"show the dental chair with the counter run behind it", link:"the same counter finish, metal and washable wall system as the consultation room"},
   {n:"Sterilisation and X-ray corner", m:"1800 counter at 900 with dirty-to-clean flow, autoclave, sink, upper cabinets, X-ray unit on a lead-lined wall, waste bins under the counter", lens:"wide", hero:"show the counter flow with the autoclave and sink in one frame", link:"the same counter finish and hardware family as the treatment room"},
   {n:"Washroom", m:"wall-hung WC, 600 counter basin with a mirror and a profile light, 1800 tile band, grab rail, soap and towel fittings, floor drain", lens:"wide", hero:"show the basin and mirror wall square on", link:"the same tile family and metal finish as the clinic floor"}]},

 {n:"Boutique retail store", g:"Commercial", s:"450 to 700 sq ft, apparel and accessories",
  rooms:[
   {n:"Shopfront interior", m:"window display platform at 450 with two mannequins, brand wall behind, 900 high nesting tables, track spotlights, entry mat, floor-to-ceiling glazing", lens:"wide", hero:"show the window display with the brand wall reading behind it", link:"the floor, ceiling track and brand accent used through the store"},
   {n:"Display wall run", m:"perimeter system with hanging rails at 1400 and 1000, adjustable shelves at 300 deep, folded stock ledges, mirror panel, spotlight per bay, low bench", lens:"wide", hero:"shoot along the wall run so the rail lines lead the eye", link:"the same shelf finish, metal and light temperature as the shopfront"},
   {n:"Trial room lobby", m:"two 1200x1200 trial cubicles with 2100 curtains or shutters, full-height mirrors, hooks and a stool inside, waiting bench outside, warm even light", lens:"wide", hero:"show both cubicle fronts with the waiting bench in frame", link:"the same floor, curtain or shutter finish and accent colour as the display wall"},
   {n:"Billing counter", m:"1500 counter at 1050 with a POS terminal, packing ledge under, back wall with brand graphics and shelving, bag storage, pendant over the counter", lens:"normal", hero:"show the counter with the brand back wall behind it", link:"the same counter finish, metal and graphic language as the shopfront"}]},

 {n:"Restaurant", g:"Commercial", s:"1400 to 2000 sq ft, 48 to 64 covers",
  rooms:[
   {n:"Main dining hall", m:"mix of four-tops at 750 and two 1800 group tables, banquette along one wall, chairs, feature ceiling over the centre, pendant runs, service station", lens:"wide", hero:"shoot down the table rows so the feature ceiling and banquette both read", link:"the floor, ceiling feature and seating finish family used through the restaurant"},
   {n:"Private dining booth", m:"one 2100x1000 table at 750 for eight, high-back banquette on both sides, 2100 partition screens, one pendant cluster, wall art panel, soft dimmed light", lens:"wide", hero:"show the booth with the partition screens framing it", link:"the same upholstery, timber or metal finish and light temperature as the main hall"},
   {n:"Bar counter", m:"3600 counter at 1050 with six stools, back bar bottle display with internal light, 900 working counter behind, sink and chiller, overhead glass rack", lens:"wide", hero:"show the full counter with the lit back bar behind it", link:"the same counter finish, metal and accent colour as the dining hall"},
   {n:"Entrance and waiting lounge", m:"host podium at 1100, waiting bench for four, coat area, brand name wall, planter grouping, soft downlights, floor mat inset at the door", lens:"wide", hero:"show the brand name wall with the host podium and bench in frame", link:"the same floor inset, ceiling system and brand accent as the dining hall"},
   {n:"Washroom lobby", m:"shared vanity with two 600 counter basins, lit mirrors, 2100 tile run, two WC doors, hand dryer, framed graphic, floor drain", lens:"wide", hero:"show the vanity run with both mirrors and the WC doors beside", link:"the same tile family, metal finish and lighting as the bar"}]},
 {n:"Commercial gym & fitness club", g:"Commercial", s:"2500 to 4500 sq ft zoned fitness club, high-ceiling industrial aesthetic",
  rooms:[
   {n:"Entrance lobby & reception lounge", m:"curved reception desk with a back-lit logo wall, branded turnstiles, juice-bar counter with four stools, retail supplement shelving, planter and locker-preview wall", lens:"wide", hero:"show the reception desk with the logo wall lit behind it and the juice bar in the same frame", link:"the exposed concrete ceiling grid, brand colour and metal finish used through the club"},
   {n:"Free weights & dumbbell arena", m:"full-height mirror wall with an LED perimeter strip, tiered dumbbell rack from 2.5 to 50 kg, six adjustable benches, two Olympic lifting platforms on 20 mm rubber, chalk tray on a shelf, motivational typography mural", lens:"wide", hero:"shoot along the dumbbell rack so the mirror reflection doubles the depth of the room", link:"the same heavy-duty rubber flooring, exposed-structure ceiling and brand accent as the lobby"},
   {n:"Cardio & functional turf zone", m:"row of six treadmills and four stairmaster units facing a floor-to-ceiling screen or window, a 15-metre synthetic turf sprint lane with a sled track, kettlebell and battle-rope station, plyometric box stack, heart-rate monitor display panel", lens:"wide", hero:"show the green turf lane with the cardio row beside it and the ceiling truss above", link:"the same rubber border edging, graphic language and lighting temperature as the weights area"},
   {n:"Recovery lounge & locker corridor", m:"digital-lock matte lockers in two stacked rows, slatted timber bench with built-in charging points, backlit mirror vanity with two hair-dryer outlets, frosted-glass steam room door with a pull handle, cool-toned indirect strip in the ceiling", lens:"wide", hero:"show the locker corridor leading towards the illuminated vanity mirror station", link:"the same hardware finish, ceiling cove light temperature and accent tile as the rest of the club"}]},

 {n:"Luxury villa (full home + outdoor)", g:"Homes", s:"3500 to 5000 sq ft on a private plot with pool and landscaped garden",
  rooms:[
   {n:"Front elevation & arrival porch", m:"G+1 contemporary stone-and-glass massing, cantilevered entrance canopy, double-height entrance void, granite-patterned driveway, specimen palm flanking the gate, name plaque with back-lighting", lens:"wide", hero:"show the full facade in three-quarter view with the driveway and palm in the foreground", link:"the stone cladding type, metal finish and warm facade lighting tone carried into every interior"},
   {n:"Double-height grand living room", m:"5800 mm clear height, bespoke Italian leather sectional for eight, book-matched marble feature wall to the full height, sculptural marble coffee table, statement chandelier drop of 2400 mm, floor-to-ceiling glazing on one side", lens:"wide", hero:"show the full double-height marble wall and the chandelier drop with the seating island below", link:"the marble species, brass reveal lines and ambient light temperature fixed for all rooms"},
   {n:"Open show kitchen & formal dining", m:"large quartz waterfall island with four bar stools, handleless slab-door tall cabinets, 8-seater dining table with a sculptural base, linear brass-tube pendant centred 700 mm above the table, integrated appliances with a concealed chimney", lens:"wide", hero:"show the island and pendant with the formal dining zone framed in the background depth", link:"the same cabinet finish, brass hardware and ceiling cove as the living room"},
   {n:"Master bedroom suite", m:"king platform bed on a 150 mm base, floor-to-ceiling fluted acoustic panel headboard wall, walk-in wardrobe entry through a frameless door, chaise lounge by full-height glazing to the terrace, motorised sheer and blackout layers", lens:"wide", hero:"show the headboard wall with the glazed terrace corner reading in the same frame", link:"the same timber species, warm 3000K ambient and brass hardware as the living areas"},
   {n:"Private poolside deck & landscape", m:"infinity-edge pool with Sukabumi green stone lining and a stone coping edge, anti-skid composite teak deck, two in-pool sun loungers on a submerged ledge, pergola cabana with a deep outdoor sofa, layered tropical planting of palms and frangipani, 2700K underwater and deck-level lighting", lens:"wide", hero:"shoot across the pool surface towards the lit pergola cabana and illuminated villa facade at dusk", link:"the stone palette, metal finish and 2700K warm lighting established on the facade"}]}
];

/* ---------------- mode bundles ---------------- */
const DATA = {
  indoor:{
    spaceLabel:"Space",
    spaceHint:"Building type and room. 58 spaces across 5 categories.",
    spaces:SPACES_IN, themes:THEMES_IN, light:LIGHT_IN, cond:COND_IN,
    scaleEx:"e.g. 12x16 ft with a 10 ft ceiling",
    mustEx:"e.g. study desks and a green chalkboard",
    word:"interior", noun:"room", zone:"Building and room"
  },
  tour:{
    spaceLabel:"Property package",
    spaceHint:"A whole place, generated room by room in one locked design.",
    spaces:TOURS.map(t => ({n:t.n, g:t.g, s:t.s, rooms:t.rooms,
      m:t.rooms.map(r => r.n).join(", ")})),
    themes:THEMES_IN, light:LIGHT_IN, cond:COND_IN,
    scaleEx:"e.g. 950 sq ft carpet area, two balconies",
    mustEx:"e.g. a pooja niche in the hall and a study nook in bedroom 2",
    word:"interior", noun:"property", zone:"Property and rooms"
  },
  outdoor:{
    spaceLabel:"Property / outdoor zone",
    spaceHint:"Indian property types and exterior zones.",
    spaces:SPACES_OUT, themes:THEMES_OUT, light:LIGHT_OUT, cond:COND_OUT,
    scaleEx:"e.g. 30x50 ft plot, G+1",
    mustEx:"e.g. car porch for 2 cars and a compound gate",
    word:"exterior", noun:"property", zone:"Property and outdoor zone"
  }
};

/* =====================================================================
   SHELL VARIATION POOLS
   The BEFORE plate used to describe a fixed shell (door left, window on
   the back wall, camera square to it), so every space came back looking
   like the same box. These pools are combined into ONE seeded line so
   each post gets a genuinely different raw shell to design.
   ===================================================================== */
const VARY_IN = {
  plan:[
    "a long rectangular plan with the short wall facing the camera",
    "a near-square plan with one deep alcove on the far side",
    "an L-shaped plan that turns out of frame to the right",
    "a narrow galley plan running away from the camera",
    "a wide shallow plan with the long wall facing the camera",
    "a squarish plan with one chamfered corner",
    "a rectangular plan with a 600 mm deep niche in the far wall",
    "a slightly trapezoidal plan following the building line",
    "a U-shaped plan wrapping a central kitchen island or work counter",
    "a square plan with one corner dramatically cut away to create a diagonal wall",
    "a rectangular plan with a stepped ceiling drop on one side only",
    "a wide open loft-like plan with no full-height partition visible"
  ],
  openings:[
    "two windows side by side on the left wall and none on the far wall",
    "one wide window on the far wall, pushed off-centre to the right",
    "a tall window on the right wall plus a high ventilator on the far wall",
    "a corner window wrapping the far-right corner",
    "one window on the left wall and a smaller one on the far wall",
    "a full-height glazed opening on the right wall and no other window",
    "a French door to a balcony on the far wall plus a small side window",
    "no window on any visible wall — daylight arrives from behind the camera",
    "two small high windows on the far wall and a wide one on the left",
    "a sliding window on the far-left wall with a deep sill",
    "three narrow slit windows stacked vertically on the right wall",
    "a large picture window centred exactly on the far wall with a wide sill bench below it",
    "a skylight cut into the ceiling above the left half of the room — no wall windows visible"
  ],
  door:[
    "the entry door in the near-left corner, behind the camera",
    "the entry door on the right wall, opening inward",
    "the doorway in the far-left corner leading to the next room",
    "a wide cased opening instead of a door on the left",
    "the door on the far wall, right of centre",
    "two doorways — the entry behind the camera and a second on the right wall",
    "a sliding pocket door recessed into the right wall",
    "an arched doorway on the far wall centred exactly on axis"
  ],
  quirk:[
    "a 300 x 450 mm column standing proud in one corner",
    "a 450 mm beam drop crossing the ceiling",
    "a 100 mm floor level change at the threshold",
    "an exposed lintel band running across the far wall",
    "a stub wall projecting 600 mm from the left wall",
    "a service duct boxed into the far-right corner",
    "a sill-height ledge along the window wall",
    "no structural obstruction — a clean rectangular volume",
    "a curved plaster arch punched into the far wall as a deep niche",
    "a low dropped soffit zone on the left side only — the right half stays full height",
    "a 200 mm raised platform occupying the far half of the room"
  ],
  view:[
    "from the near-left corner, looking diagonally across the volume",
    "from the near-right corner in two-point perspective",
    "from just inside the entry, slightly left of centre",
    "square down the length of the space in one-point perspective",
    "from the near-right corner with the window wall on the left",
    "from the middle of the near wall, a few degrees off-axis",
    "from a low crouching camera height looking slightly upward so the ceiling reads",
    "from the far corner looking back towards the doorway so the entry light frames the shot"
  ]
};

/* Residential / commercial outdoor — flat roofs, parapets, balconies */
const VARY_OUT_RESIDENTIAL = {
  plan:[
    "G+1 with the first-floor slab projecting over the entrance",
    "single storey with a parapet and the stair block visible behind",
    "G+2 with the middle floor recessed",
    "G+1 with a double-height entrance void",
    "single storey with a sloping tiled roof over the porch",
    "G+1 stepped back on the right side",
    "G+1 with the stair core expressed as a vertical mass on the left",
    "single storey with a wide frontage and a flat parapet",
    "G+2 with a roof terrace railing visible above the parapet",
    "G+1 with an integrated car porch taking up the left half of the ground level"
  ],
  openings:[
    "first-floor windows grouped in a horizontal band, one wide opening at ground level",
    "a tall stair-core slit window pushed off-centre to the right",
    "two balconies stacked on the left with railings at 1050 mm",
    "one cantilevered balcony on the right, small square windows elsewhere",
    "a full-height glazed entrance bay framed in dark metal",
    "punched windows in a deliberate irregular rhythm",
    "corner windows wrapping the far-right edge",
    "a jaali screen opening over the entrance porch",
    "a continuous horizontal louvre strip on the first floor only"
  ],
  door:[
    "the main gate on the left with the plot sloping gently up to the plinth",
    "the road running along the right edge of the plot",
    "a corner plot with two boundary faces visible",
    "a narrow frontage with a neighbour's boundary wall close on the left",
    "a wide frontage set well back from the gate with a long driveway",
    "the approach path entering diagonally from the right"
  ],
  quirk:[
    "an unfinished stair flight projecting above the parapet",
    "scaffolding pipes stacked against the left boundary wall",
    "a rubble mound on the approach from demolition",
    "shuttering ply leaning on the compound wall",
    "a temporary electrical pole on the gate line with hanging wires",
    "no debris — a bare levelled plot with only chalk set-out lines"
  ],
  view:[
    "three-quarter from the left so the front and left side faces both read",
    "three-quarter from the right so the front and right side faces both read",
    "nearly straight on, offset just a few degrees to the right",
    "from the far corner of the plot looking across diagonally",
    "from the road edge, looking slightly uphill towards the plinth"
  ]
};

/* Sacred and monumental outdoor — temples, heritage plazas, mandirs */
const VARY_SACRED = {
  plan:[
    "a raised stone jagati plinth with a central garbhagriha sanctum topped by a curvilinear shikhara tower and an open pillared mandapa hall in front",
    "a flat-roofed South Indian temple with a towering gopuram gateway at the entrance axis and a paved prakaram courtyard inside",
    "a small neighbourhood mandir with a single curvilinear shikhara, a deep porch with carved stone pillars, and a stone-paved parikrama path around the sanctum",
    "a stepped-tank kund in front of the sanctum with tiered stone ghats descending to the water, the shikhara visible beyond",
    "a Kerala style temple with a steep copper-clad or Mangalore-tiled sloping roof, carved wooden corbels and a closed nalukettu outer hall"
  ],
  openings:[
    "ornate carved stone arched entrance doorway with deity panels on either jamb and a lintel motif",
    "a deep columned mandapa with open bays between each pair of carved stone pillars",
    "jaali stone perforated screens flanking the sanctum opening",
    "a narrow sandhara passage for pradakshina circumambulation between the inner and outer walls",
    "a large brass-sheet main door with raised relief panels, flanked by stone guardian figures"
  ],
  door:[
    "a dhwaja stambha flag mast on the central axis in front of the gopuram",
    "a pair of carved stone dvarapalas flanking the entrance threshold",
    "a tulsi or peepal platform on the approach axis with devotees path curving around it",
    "a carved stone nandi or guardian animal on the approach in front of the door"
  ],
  quirk:[
    "marigold garlands strung across the entrance arch, fresh orange against grey stone",
    "oil-lamp niches cut into the compound wall with brass diyas burning",
    "scaffolding around one pillar for restoration, the carved stone visible through it",
    "chalk rangoli kolam patterns on the stone pavement in front of the threshold"
  ],
  view:[
    "from the approach axis straight on so the entire height of the shikhara or gopuram reads against the sky",
    "three-quarter from the left so the shikhara and the mandapa hall are both in frame",
    "low camera angle tilting slightly up to emphasise the verticality of the tower",
    "from inside the mandapa looking back through the open columns towards the entrance with light streaming in"
  ]
};

/* Commercial / institutional outdoor — glass offices, showrooms, factories */
const VARY_COMMERCIAL = {
  plan:[
    "a multi-storey curtain-wall glass office facade with a projecting canopy over the entrance",
    "a double-height showroom frontage with full-height display glazing and minimal mullions",
    "a single-storey factory or warehouse with a PEB metal-clad shed visible behind the gate",
    "a school or institution with a wide painted facade, covered drop-off walkway, and flag mast",
    "a hospital or clinic with a clearly signed entrance porch, accessible ramp, and vehicle drop-off"
  ],
  openings:[
    "a continuous horizontal band of dark-frame glazing on the upper floors",
    "a full-height glass entrance bay framed by stone or metal cladding on both sides",
    "punched windows in a regular grid with sun-break fins projecting outward",
    "a louvred ventilation strip running the full width at mid-facade height",
    "clerestory glazing at the roof line with solid wall below"
  ],
  door:[
    "the main gate or entry with a security cabin and a boom barrier",
    "a forecourt with marked visitor parking and a pedestrian walkway to the door",
    "branded signage and the company logo above the entrance canopy",
    "bollards and planters defining the drop-off zone in front"
  ],
  quirk:[
    "a construction hoarding partially concealing the facade behind scaffolding",
    "drainage channels cut but not yet filled across the forecourt",
    "temporary site lighting poles still in place",
    "chalk line markings on the forecourt paving showing future parking bays"
  ],
  view:[
    "straight on so the full facade width reads — offset a few degrees left",
    "three-quarter from the left with the approach forecourt in the foreground",
    "from the road edge looking upward at the canopy and signage",
    "from across the forecourt so the full building height and plot boundary read"
  ]
};

/* Legacy alias kept for backward compatibility with existing code */
const VARY_OUT = VARY_OUT_RESIDENTIAL;



/* =====================================================================
   DESIGN DNA POOLS
   A tour package used to come back as the same interior every time: the
   same pale boxes, the same cove light, the same camera in every room.
   These pools are combined into ONE seeded line, so each regeneration is
   pushed into a different design language while all the rooms in one set
   still share it. neutral and cam are safe with any theme the user picks,
   material is only reached for when the theme is left to the AI.
   ===================================================================== */
const VARY_TOUR = {
  /* safe to use even when the user has picked a specific theme */
  neutral:{
    plan:[
      "an open hall and kitchen sharing one continuous floor with a low 900 mm counter as the only divider",
      "a small turning foyer that hides the hall until you are two steps inside",
      "every room opening off one long spine corridor that ends in a full-height window",
      "the public rooms on one side and the bedrooms on the other, separated by a single full-height storage wall",
      "rooms wrapped around a small internal courtyard that each space borrows light and view from",
      "a double-height main room with the upper landing and its railing looking down into it",
      "a continuous balcony along the full frontage, with every front room opening onto it through sliding doors",
      "the largest table in the property placed where all the circulation crosses, so it and not the seating is the centre"
    ],
    ceiling:[
      "a slim 300 mm cove-lit peripheral band with the centre of the slab left flat and painted",
      "no false ceiling anywhere, the slab skimmed flat with a surface-mounted linear profile and one fan hook per room",
      "the ceiling dropped to 2850 mm in the circulation only, every room kept at the full 3050 mm slab height",
      "one timber-batten raft floating over the main room, repeated smaller over each bed",
      "a flat gypsum plane with a 20 mm shadow gap all round, so the ceiling reads as floating free of the walls",
      "the beam drops left exposed and painted with the walls, false ceiling filling only the bays between them",
      "a stepped two-level drop that carries the concealed air-conditioning line and the curtain pocket in the same move",
      "ceiling fans treated as designed objects on 300 mm drop rods, all light kept to the perimeter so the blades throw no moving shadow"
    ],
    floor_format:[
      "1200x600 mm large-format tile laid stack bond with a 2 mm joint",
      "800x800 mm tile turned 45 degrees through the whole property with a cut border against every wall",
      "600x1200 mm tile in a half-offset running bond, the long joint pointing at the main window",
      "1200x200 mm plank format laid one way along the corridor and carried into every room with no threshold strip",
      "300x300 mm tile set as a framed 2400x2400 mm panel in the middle of each room with a plain field around it",
      "150x900 mm plank laid herringbone in the shared rooms and straight-laid in the private ones",
      "900x900 mm tile with a deliberately expressed 6 mm joint grid, set out from the door centre lines",
      "one seamless poured floor with saw-cut control lines at 1800 mm centres and no other joint anywhere"
    ],
    signature_move:[
      "a full-height fluted panel that reappears in every room at a different width, always on the wall you face first",
      "one 100 mm deep reveal line at 2100 mm running right round the property, with every door and shutter dying into it",
      "an arch in every room, all of them struck from the same 900 mm radius",
      "a single 40 mm thick shelf at 1100 mm that starts at the entry and turns up again in every room",
      "every doorway taken full-height to 2400 mm with the frame concealed, so the walls stay unbroken planes",
      "one jaali module repeated through the property, working as a partition in one room and a shutter or headboard in the next",
      "a 300 mm honed stone band used as skirting, counter upstand and window sill throughout",
      "every internal corner turned as a curve so no room has a hard 90 degree junction",
      "one lit niche per room, always 450 mm wide, always at the same height, always washed from a hidden slot",
      "a cane-webbed insert in every joinery piece, from wardrobe shutters to kitchen upper units"
    ],
    light_mood:[
      "3000K warm layers, visible cove glow, no ceiling downlight grid",
      "2700K from table lamps, floor lamps and wall-washers only, with nothing at all in the ceiling",
      "4000K neutral over the work surfaces dropping to 3000K in every seating and sleeping zone",
      "3500K with every source concealed, so the light seems to come off the surfaces rather than out of a fitting",
      "3000K profile lights grazing each wall from top and bottom, leaving the middle of the room dim",
      "one strong 4000K daylight-matched source per room set against 2700K everywhere else for contrast"
    ],
    styling_density:[
      "sparse and disciplined, three styled objects per room at most",
      "layered and collected, something on every horizontal surface but all of it in one material family",
      "only what the household actually uses on show, nothing bought purely to be looked at",
      "one oversized object per room doing all the work, every other surface left bare",
      "plants as the only styling, three planter sizes and nothing else",
      "books, textiles and lidded boxes on show, nothing fragile or dust-catching above 1500 mm"
    ],
    joinery_logic:[
      "handleless shutters with a continuous 20 mm shadow gap instead of any hardware",
      "a slim aluminium J-profile edge pull on every shutter and drawer, all of them running horizontally",
      "full-height storage finished exactly like the wall so it disappears, with only a fingertip groove to give away a shutter",
      "framed-and-panelled shutters with a 60 mm stile and one small turned knob per leaf",
      "carcass in one finish and shutters in another, with a 12 mm carcass edge left showing as a line",
      "every unit lifted on a 100 mm recessed plinth so the joinery clears a wet mopped floor"
    ]
  },
  /* only used when the theme is left to the AI, so these may imply a style */
  material:{
    lead_material:[
      "straight-grain oak veneer against hand-troweled lime plaster",
      "honed Kota stone on floors and counters with open-pore matt plywood joinery",
      "micro-cement carried over walls, counters and floor as one continuous skin",
      "dark teak joinery against smooth putty-finished walls, with cane webbing wherever a shutter can breathe",
      "one book-matched engineered stone wall per room and deliberately plain surfaces everywhere else",
      "one long exposed brick wall in each room with everything else plastered flat and painted",
      "fluted glass in slim steel sections for every partition, veneer kept only for storage",
      "rough stone or laterite up to a single datum with skimmed plaster above it",
      "terrazzo with oversized chips on floors and counters, answered by plain matt laminate joinery",
      "hand-polished oxide floors with rubberwood joinery left oiled and open-grained"
    ],
    palette_temp:[
      "warm neutrals grounded by one deep earth tone",
      "a cool-leaning neutral base warmed only by the timber tones in the joinery",
      "close-valued and tonal, three depths within half a step of each other and no hard jump anywhere",
      "high contrast, a very pale field against the deepest possible joinery tone with nothing in between",
      "mid-depth and enclosing throughout, no pale surface anywhere, so the rooms feel held",
      "pale and light-reflective on every vertical surface with all the depth kept down at floor level",
      "warm walls and ceiling over a cooler floor, so each change of plane reads as a change of temperature",
      "one deep tone drenched over walls, ceiling and joinery in the shared rooms, the palest possible in the private ones"
    ],
    metal_finish:[
      "brushed brass on every handle, hinge and profile light",
      "blackened mild steel on every frame, edge and leg, with no bright metal anywhere",
      "unlacquered brass left to patina, so the property is allowed to age",
      "brushed stainless steel throughout, specified for humid salt air rather than for looks",
      "champagne anodised aluminium on every profile, pull and frame, matched to the window sections",
      "antique-finish copper in the wet rooms and a dark powder coat everywhere else, split strictly by function"
    ],
    era:[
      "1930s streamlined curves with heavy rounded arms and stepped bases",
      "1950s light tapered-leg pieces that leave the floor visible under everything",
      "1960s thin-framed teak and cane furniture built like carpentry rather than upholstery",
      "1970s soft-edged low-slung silhouettes sitting close to the floor",
      "1990s oversized boxy upholstery with skirted bases and no visible legs",
      "2020s modular slab-sided seating in a few very large single forms"
    ]
  },
  /* per-room camera variation so one property does not read as one shot repeated */
  cam:{
    station:[
      "from just inside the doorway with two walls converging on the far corner",
      "from the deepest corner of the room looking back towards the entry",
      "standing in the circulation and framing the room through its doorway, a slice of corridor still in shot",
      "square down the longest axis in one-point perspective with the far wall centred",
      "from the window side looking back in, so the daylight falls away from the camera",
      "tight into the near corner with one piece of furniture cropped in the foreground",
      "from the widest opening in the room looking straight in through it, the opening frame just in shot",
      "hard against the long wall so the opposite wall reads flat and complete"
    ],
    height:[
      "camera at 140 cm, slightly lower than eye level",
      "camera at 165 cm at standing eye level with the lens held dead level",
      "camera at 110 cm, seated eye level, so the room reads the way it does from a chair",
      "camera at 95 cm, waist height, with more ceiling than floor in shot",
      "camera at 185 cm, above eye level, looking slightly down across the layout"
    ],
    light_time:[
      "late-morning daylight entering from the left",
      "early-morning low sun raking in through a sliding window from one side",
      "flat overcast monsoon daylight with no direct sun and no hard shadow",
      "mid-afternoon light bounced in off the building opposite rather than direct sun",
      "dusk with the interior lighting carrying the rooms and the sky outside already going dark"
    ]
  }
};

