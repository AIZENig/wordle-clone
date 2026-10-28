"use strict";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const STORAGE_KEY = "wordle-refined-v3";

const ANSWERS = `
ABOUT ABOVE ABUSE ACTOR ACUTE ADMIT ADOBE ADOPT ADULT AFTER AGAIN AGENT AGREE AHEAD ALARM ALBUM ALERT ALIKE ALIVE ALLOW ALONE ALONG ALTER AMONG ANGER ANGLE ANGRY APART APPLE APPLY ARENA ARGUE ARISE ARMOR ARRAY ARROW ASIDE ASSET AUDIO AUDIT AVOID AWAKE AWARD AWARE BADGE BADLY BAKER BASIC BASIS BEACH BEGAN BEGIN BEING BELOW BENCH BERRY BIRTH BLACK BLAME BLANK BLAST BLEND BLESS BLIND BLOCK BLOOD BOARD BOOST BOOTH BOUND BRAIN BRAND BRAVE BREAD BREAK BRICK BRIDE BRIEF BRING BROAD BROKE BROWN BRUSH BUILD BUYER CABIN CABLE CANDY CARGO CARRY CATCH CAUSE CHAIN CHAIR CHARM CHART CHASE CHEAP CHEST CHIEF CHILD CHOSE CIVIL CLAIM CLASS CLEAN CLEAR CLERK CLICK CLIMB CLOCK CLOSE CLOUD COACH COAST COLOR COMET CORAL COUCH COULD COUNT COURT COVER CRAFT CRANE CRASH CREAM CRIME CROSS CROWD CROWN CRUDE CURVE CYCLE DAILY DAIRY DANCE DEALT DEBUT DELAY DEPTH DIARY DIRTY DODGE DOING DOUBT DOZEN DRAFT DRAIN DREAM DRINK DRIVE EAGER EARLY EARTH EIGHT ELBOW ELDER ELECT ELITE EMPTY ENEMY ENJOY ENTER ENTRY EQUAL ERROR EVENT EVERY EXACT EXIST EXTRA FAITH FALSE FANCY FATAL FAULT FAVOR FEAST FENCE FEVER FEWER FIBER FIELD FIERY FIFTY FIGHT FINAL FIRST FLAME FLASH FLEET FLOOR FLOUR FLUID FOCUS FORCE FORTH FORTY FORUM FOUND FRAME FRESH FRONT FROST FRUIT FUNNY GIANT GLASS GLOBE GLORY GRACE GRADE GRAIN GRAND GRANT GRAPE GRAPH GRASS GREAT GREEN GREET GRIEF GROSS GROUP GUARD GUESS GUEST GUIDE HABIT HAPPY HEART HEAVY HONEY HORSE HOTEL HOUSE HUMAN IDEAL IMAGE IMPLY INDEX INNER INPUT ISSUE IVORY JOINT JUDGE JUICE KNIFE KNOCK KNOWN LABEL LARGE LASER LATER LAUGH LAYER LEARN LEAST LEAVE LEGAL LEMON LEVEL LIGHT LIMIT LIVER LOCAL LODGE LOGIC LOOSE LUCKY LUNAR LUNCH MAGIC MAJOR MAKER MANGO MAPLE MARCH MATCH MAYBE MAYOR MEANT MEDAL MEDIA MERCY MERIT METAL MIGHT MINOR MINUS MODEL MONEY MONTH MORAL MOTOR MOUNT MOUSE MOUTH MOVIE MUSIC NAIVE NERVE NEVER NIGHT NOBLE NOISE NORTH NOTED NOVEL NURSE OCEAN OFFER OFTEN OLIVE ONION OPERA ORBIT ORDER OTHER OUGHT OUTER OWNER PAINT PANEL PAPER PARTY PASTA PATCH PAUSE PEACE PEACH PEARL PHASE PHONE PHOTO PIANO PIECE PILOT PITCH PIVOT PIZZA PLACE PLAIN PLANE PLANT PLATE PLAZA POINT POLAR POUND POWER PRESS PRICE PRIDE PRIME PRINT PRIOR PRIZE PROOF PROUD PUPIL QUEEN QUERY QUEST QUICK QUIET RADIO RAISE RANCH RANGE RAPID RATIO REACH REACT READY REALM REBEL REFER RELAX REPLY RIDER RIDGE RIGHT RIVER ROBIN ROUGH ROUND ROUTE ROYAL RURAL SALAD SAUCE SCALE SCARE SCARF SCENE SCOPE SCORE SCREW SENSE SERVE SEVEN SHADE SHAKE SHAKY SHAPE SHARE SHARP SHEEP SHEET SHELF SHELL SHIFT SHINE SHIRT SHOCK SHORE SHORT SHOUT SHOWN SIGHT SINCE SIXTY SKILL SKIRT SLEEP SLICE SLIDE SLOPE SMALL SMART SMILE SMOKE SNAKE SOLAR SOLID SOLVE SORRY SOUND SOUTH SPACE SPARE SPARK SPEAK SPEED SPEND SPICE SPINE SPITE SPLIT SPOKE SPORT SPRAY SQUAD STACK STAFF STAGE STAIR STAKE STAMP STAND STARE START STATE STEAM STEEL STEEP STICK STILL STOCK STONE STORE STORM STORY STOVE STRIP STUDY STYLE SUGAR SUITE SUNNY SUPER SWEET SWIFT TABLE TAKEN TASTE TEACH TEETH THANK THEIR THEME THERE THESE THICK THING THINK THIRD THORN THOSE THREE THROW THUMB TIGER TIGHT TITLE TODAY TOKEN TOOTH TOPIC TOTAL TOUCH TOUGH TOWEL TOWER TRACE TRACK TRADE TRAIL TRAIN TRAIT TREAT TREND TRIAL TRIBE TRICK TRIED TROOP TRUCK TRULY TRUNK TRUST TRUTH TWICE UNCLE UNDER UNION UNITE UNITY UNTIL UPPER UPSET URBAN USAGE USUAL VALID VALUE VAPOR VIDEO VIGOR VIRUS VISIT VITAL VIVID VOICE WAGON WASTE WATCH WATER WEARY WEAVE WEDGE WEIGH WEIRD WHALE WHEAT WHEEL WHERE WHICH WHILE WHITE WHOLE WHOSE WIDEN WOMAN WORLD WORRY WORTH WOULD WOUND WOVEN WRIST WRITE WRONG YEAST YIELD YOUNG YOUTH ZEBRA
`.trim().split(/\s+/);

const EXTRA_WORDS = `
ABACK ABBEY ABIDE ABLED ABODE ABYSS ACORN ACRID ADAGE ADEPT ADMIN AEGIS AESOP AFFIX AFIRE AFOOT AFOUL AGAPE AGATE AGLOW AGONY AIDED AIMER AISLE ALDER ALGAE ALIBI ALIEN ALIGN ALLAY ALLEY ALLOT ALLOY ALOFT ALOHA ALOUD ALPHA ALTAR AMASS AMAZE AMBER AMBLE AMEND AMITY AMPLE AMUSE ANCHO ANEON ANGEL ANIME ANKLE ANNEX ANNOY ANTIC ANVIL AORTA APHID APRON APTLY ARBOR ARDOR ARIEL ARSON ASCOT ASHEN ASKEW ASPEN ASSAY ATOLL ATONE ATTIC AVAIL AVERS AVIAN AWOKE AXIAL AXIOM AXION AZURE BACON BAGEL BAGGY BALMY BANAL BANJO BARGE BARON BASIL BASIN BASTE BATCH BATHE BATON BATTY BAWDY BAYOU BEARD BEAST BEECH BEEFY BEFIT BEGUN BEIGE BELLY BERTH BERYL BESET BIBLE BICEP BIDDY BINGE BINGO BIOME BIRCH BISON BLAND BLARE BLEAK BLEAT BLEED BLEEP BLIMP BLISS BLITZ BLOAT BLOKE BLOND BLOWN BLUFF BLUNT BLURB BLURT BLUSH BOAST BOGUS BOILS BOLTS BONUS BOOZE BORNE BOSOM BOUGH BOWEL BOWER BOXER BRACE BRAID BRASH BRAWL BRAWN BRAZE BREED BRIAR BRIBE BRINE BRISK BROIL BROOD BROOK BROOM BROTH BRUNT BUDDY BUDGE BUGGY BUGLE BUILT BULGE BULKY BULLY BUMPY BUNCH BUNNY BURLY BURNT BURST BUSED BUSHY BUTCH BUTTE BUXOM BYLAW CABAL CABBY CACHE CACTI CADDY CADET CAGEY CAIRN CAMEL CAMEO CANAL CANNA CANOE CANON CAPER CARAT CARDS CARET CAROL CAULK CAVIL CEASE CEDAR CHAFE CHAFF CHALK CHAMP CHANT CHAOS CHARD CHASM CHEER CHESS CHEWY CHICK CHIDE CHILI CHILL CHIME CHINA CHIRP CHOIR CHOKE CHORD CHORE CHUCK CHUMP CHUNK CHURN CHUTE CIDER CIGAR CINCH CIRCA CLACK CLAMP CLANG CLANK CLASH CLASP CLAWS CLEAT CLEFT CLIFF CLING CLINK CLOAK CLOTH CLOUT CLOVE CLOWN CLUCK CLUED CLUMP CLUNG COBRA COCOA COLON COMBO COMFY COMIC CONCH CONDO COPSE CORDS CORER COUGH COVET COVEY COWER COYLY CRABS CRACK CRAMP CRANK CRASS CRATE CRAVE CRAWL CRAZE CRAZY CREAK CREDO CREED CREEK CREEP CREPE CREPT CRESS CREST CRICK CRIED CRIER CROAK CROCK CRONE CRONY CROOK CROPS CROUP CRUMB CRUSH CRUST CRYPT CUBIC CUMIN CURIO CURLY CURRY CURSE CURVY CUTIE CYBER DAFFY DANDY DARIC DARTS DATED DATER DATUM DAUNT DEBAR DEBIT DEBTS DEBUG DECAL DECAY DECOR DECOY DECRY DEIGN DEITY DELTA DELVE DEMON DEMUR DENIM DENSE DEPOT DETER DETOX DEVIL DICEY DIGIT DIMLY DINER DINGO DINGY DIRGE DISCO DITCH DITTO DITTY DIVER DIZZY DOCKS DODGY DOGMA DOLLY DONOR DONUT DOPEY DOTTY DOUGH DOUSE DOWNY DOWRY DRAMA DRANK DRAPE DRAWL DRAWN DREAD DREGS DRIED DRIER DRILL DRONE DROOL DROOP DROSS DROVE DROWN DRUID DRUNK DRYER DUCHY DULLY DUMMY DUMPY DUNCE DUSKY DUSTY DUTCH DUVET DWARF DWELL DWELT DYING EASEL EATEN EATER EBONY ECLAT EDICT EDIFY EERIE EGRET EJECT EKING ELATE ELEGY ELFIN ELUDE EMAIL EMBED EMBER EMCEE EMOTE ENDOW ENEMA ENNUI ENSUE ENVOY EPOXY ERECT ERGOT ERUPT ESSAY ETHER ETHIC ETHOS EVADE EVICT EVOKE EXALT EXCEL EXERT EXILE EXPEL EXTOL EXULT EYING FABLE FACET FAINT FAIRY FARCE FATAL FATED FEIGN FEINT FELLA FELON FEMME FEMUR FERAL FERRY FETAL FETCH FETID FETUS FIBRE FICUS FIEND FILET FILLY FILMY FILTH FINCH FINER FJORD FLACK FLAIL FLAIR FLAKE FLAKY FLANK FLARE FLECK FLIER FLING FLINT FLIRT FLOAT FLOCK FLOOD FLOPP FLOSS FLOUT FLOWN FLUFF FLUKE FLUME FLUNG FLUNK FLUSH FLUTE FOAMY FOCAL FOGGY FOIST FOLIO FOLLY FORAY FORGE FORGO FORTE FOULS FOUND FOYER FRAIL FRANK FRAUD FREAK FREED FREER FRILL FRISK FRITH FRITZ FROCK FROND FROTH FROWN FROZE FUDGE FUGUE FULLY FUNGI FUROR FUSSY FUZZY GAFFE GAILY GAINS GAMER GAMMA GAMUT GAUDY GAUGE GAUNT GAUZE GAVEL GAWKY GAYLY GAZER GECKO GEESE GENIE GENRE GHOST GHOUL GIDDY GIPSY GIRLY GIRTH GIVEN GIVER GLADE GLAND GLARE GLAZE GLEAM GLEAN GLIDE GLINT GLOAT GLOOM GLOSS GLOVE GNASH GNOME GODLY GOLEM GONER GOODY GOOEY GOOFY GOOSE GORGE GOUGE GOURD GRAFT GRAIL GRASP GRAVE GRAVY GRAZE GREED GRILL GRIME GRIMY GRIND GRIPE GROAN GROIN GROOM GROPE GROVE GROWL GROWN GRUEL GRUFF GRUNT GUAVA GUILT GUISE GULCH GULLY GUMBO GUMMY GUPPY GUSHY GUSTO GUSTY HAIRY HALVE HANDY HAREM HARPY HARRY HARSH HASTE HASTY HATCH HATER HAULM HAUNT HAVOC HAZEL HEADY HEARD HEATH HEAVE HEDGE HEFTY HEIST HELIX HELLO HENCE HERON HILLY HINGE HIPPO HOBBY HOIST HOLLY HOMER HONED HOOKY HORDE HORNY HOTLY HOUND HOVEL HOVER HOWDY HUFFY HUMPH HUMUS HUNCH HUNKY HURLS HURRY HUSKY HUTCH HYDRO HYENA HYMEN ICING IDIOM IDIOT IDLER IDYLL IGLOO ILIAC INANE INBOX INCUR INEPT INERT INFER INLAY INLET IONIC IRATE IRONY ISLET ITCHY JAUNT JAZZY JELLY JERKY JETTY JEWEL JIFFY JOIST JOKER JOLLY JOUST JUMBO JUMPY JUNTA JUROR KAPPA KARMA KAYAK KEBAB KHAKI KIOSK KITTY KNACK KNAVE KNEAD KNEED KNEEL KNELT KNOLL KOALA KRILL LADEN LADLE LAGER LANCE LANKY LAPEL LAPSE LARCH LATCH LATHE LATTE LEACH LEAFY LEAKY LEAPT LEASE LEASH LEDGE LEECH LEERY LEFTY LIEGE LILAC LIMBO LINGO LINEN LINER LINGO LIPID LITHE LIVED LIVEN LLAMA LOAMY LOATH LOBBY LOCUS LOFTY LOOPY LOUSY LOWLY LOYAL LUCID LUMEN LUMPY LUNGE LUPUS LURCH LURID LUSTY LYING LYMPH LYRIC MACAW MACHO MACRO MADAM MADGE MAFIA MAIZE MAMBO MAMMA MANGE MANIA MANIC MANOR MARSH MASON MATEY MAUVE MAXIM MEALY MEATY MECCA MELEE MELON MERGE MERRY MESSY MICRO MIDGE MIDST MILKY MIMIC MINCE MINER MINTY MIRTH MISER MISSY MOCHA MODAL MODEM MOGUL MOIST MOLAR MOLDY MOODY MOOSE MOPED MORPH MOSSY MOTEL MOTTO MOULT MOUND MOURN MOWER MUCKY MUDDY MULCH MUMMY MUNCH MURAL MURKY MUSHY MUSKY MUSTY MUTED MYRRH NABOB NACHO NADIR NANNY NASAL NASTY NATAL NAVAL NAVEL NEIGH NEWLY NEXUS NICER NICHE NIECE NINJA NINNY NINTH NOBLY NOMAD NOOSE NOSEY NOTCH NUDGE NUTTY NYLON NYMPH OAKEN OBESE OCCUR OCTAL OCTET ODDER OLDEN OLDER OMBRE ONSET OOMPH OOZED OPINE OPIUM OPTIC OTTER OUNCE OUTDO OUTGO OVARY OVATE OVERT OVOID OWING OXIDE OZONE PADDY PAGAN PALSY PANDA PANSY PAPAL PARER PARKA PARRY PARSE PASTE PASTY PATIO PATSy PATTY PAYEE PAYER PEAKY PEARL PECAN PEDAL PENAL PENCE PENNE PENNY PEONY PERCH PERIL PERKY PESKY PETAL PETTY PHONY PICKY PIETY PIGGY PILAF PINCH PINEY PINKY PINTO PIPER PIQUE PITHY PIXIE PLAID PLAIT PLANK PLANT PLATE PLEAD PLEAT PLIED PLUCK PLUMB PLUME PLUMP PLUSH POISE POKER POLKA POLYP POOCH POPPY PORCH POSIT POSSE POUCH POULT POUTY PRANK PRAWN PREEN PRICK PRIED PRISM PRIVY PROBE PRONE PRONG PROSE PROXY PRUDE PRUNE PSALM PUBIC PUDGY PUFFY PULPY PULSE PUNCH PUPAL PURGE PURSE PUSHY PUTTY PYGMY QUACK QUAIL QUAKE QUALM QUARK QUART QUASH QUASI QUEER QUELL QUERN QUILT QUIRK QUITE QUOTA QUOTE RABBI RABID RACER RADAR RADII RAINY RAJAH RALLY RALPH RAMEN RANDY RARER RASPY RAVEN RAYON RAZOR REARM REBAR RECAP RECUR REEDY REGAL REHAB REIGN RELIC REMIT RENAL RENEW REPAY REPEL RERUN RESIN RETCH RETRO RETRY REVEL REVUE RHINO RHYME RIPEN RIPER RISEN RISKY RIVAL ROAST ROGER ROOST ROTOR ROUSE ROVER ROWDY RUDDY RUGBY RUING RUMBA RUMMY RUMOR RUPEE RUSTY SABLE SADLY SAFER SAINT SALON SALLY SALSA SALTY SALVE SALVO SANDY SANER SAPPY SASSY SATIN SATYR SAUNA SAUTE SAVVY SCALD SCALP SCALY SCAMP SCANT SCOFF SCOLD SCOOP SCOOT SCORN SCOUR SCOWL SCRAM SCRAP SCRUB SCUBA SEAMY SEEDY SEIZE SEPIA SERIF SERUM SETUP SHACK SHADY SHALE SHALL SHALT SHAME SHANK SHARD SHAVE SHAWL SHEAR SHEEN SHEIK SHIED SHIRE SHIRK SHOAL SHONE SHOOK SHOOT SHOVE SHRED SHREW SHRUB SHRUG SIEGE SIEVE SIGMA SILKY SILLY SINew SINGE SIREN SISSY SIXTH SKATE SKIER SKIFF SKULK SKULL SKUNK SLACK SLAIN SLANG SLANT SLASH SLATE SLEEK SLEET SLEPT SLICK SLIMY SLING SLINK SLOOP SLOSH SLOTH SLUMP SLUNG SLUNK SLURP SLUSH SLYLY SMACK SMASH SMEAR SMELL SMELT SMIRK SMITE SMITH SMOCK SMOKY SNACK SNAIL SNARE SNARL SNEAK SNEER SNIDE SNIPE SNOOP SNORE SNORT SNOUT SNOWY SNUCK SNUFF SOAPY SOBER SOGGY SONIC SOOTH SOOTY SOWED SPADE SPANK SPASM SPAWN SPECK SPEEL SPELL SPELT SPERM SPIEL SPIKE SPIKY SPILL SPILT SPIRY SPLAY SPOIL SPOOL SPOON SPORE SPOUT SPRIG SPUME SPUNK SPURN SPURT SQUAT SQUIB STAID STAIN STALE STALK STALL STANK STASH STAVE STEAD STEAK STEAL STEIN STENO STERN STILT STING STINK STINT STOAT STOIC STOKE STOMP STOOL STOOP STOUT STRAW STRAY STRUT STUCK STUFF STUMP STUNG STUNK STUNT SUAVE SUCKS SUING SULKY SULLY SUMAC SURGE SURLY SWAMI SWAMP SWARM SWATH SWEAR SWEAT SWEEP SWELL SWEPT SWILL SWINE SWING SWIRL SWISH SWOON SWOOP SWORD SWORE SWORN SWUNG SYNOD SYRUP TABBY TACIT TACKY TAFFY TAINT TALLY TALON TAMER TANGO TANGY TAPER TAPIR TARDY TAROT TAUNT TAWNY TEDDY TEMPT TENOR TENSE TEPID TERRA TERSE TESTY THANK THEFT THIGH THONG THORN THREW THROB THUMP THYME TIARA TIBIA TIDAL TILDE TIMER TIMID TIPSY TITAN TITHE TOAST TODDY TONAL TONGA TONIC TOPAZ TORAH TORCH TORSO TOTEM TOWED TRAMP TRASH TRAWL TREAD TRESS TRIAD TRILL TRITE TROLL TROPE TROUT TROVE TRUER TRUMP TRYST TUBAL TUBER TULIP TULLE TUMOR TUNIC TURBO TUTOR TWANG TWEAK TWEED TWEET TWINE TWIRL TWIST TWIXT TYING UDDER ULCER ULTRA UMBRA UNCUT UNDUE UNFED UNFIT UNIFY UNLIT UNMET UNPIN UNTIE UNWED UNZIP USHER UTTER VAGUE VALET VALOR VANIL VAUNT VENOM VENUE VERGE VERSE VERSO VERVE VICAR VIGIL VILLA VINYL VIOLA VIPER VISOR VIXEN VOCAL VODKA VOGUE VOMIT VOTER VOUCH VOWEL VYING WAFER WAGER WAIST WAIVE WALTZ WARTY WAXEN WEALD WEARY WEDGY WEEPY WELSH WENCH WHACK WHARF WHEED WHELM WHELP WHIFF WHINE WHINY WHIRL WHISK WICCA WIDOW WIDTH WIELD WIGHT WIMPY WINCE WINCH WINDY WIPER WIRED WISPY WITCH WITTY WOKEN WOODY WOOER WOOZY WORDY WREST WRING WRYLY YACHT YEARN YELLS YODEL YOKEL YUMMY ZESTY ZONAL
`.trim().toUpperCase().split(/\s+/);

const VALID_WORDS = new Set([...ANSWERS, ...EXTRA_WORDS].filter(word => /^[A-Z]{5}$/.test(word)));
const KEY_RANK = { absent: 1, present: 2, correct: 3 };

const grid = document.getElementById("grid");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const dailyModeBtn = document.getElementById("dailyModeBtn");
const practiceModeBtn = document.getElementById("practiceModeBtn");
const puzzleLabel = document.getElementById("puzzleLabel");
const attemptLabel = document.getElementById("attemptLabel");
const soundBtn = document.getElementById("soundBtn");
const resultDialog = document.getElementById("resultDialog");
const welcomeDialog = document.getElementById("welcomeDialog");

let data = loadData();
let game = { mode: "daily", answer: "", guesses: [], current: "", status: "playing", revealing: false };
let messageTimer = null;
let audioContext = null;
let resetArmed = false;

function freshData() {
  return {
    version: 3,
    hasSeenWelcome: false,
    settings: { hardMode: false, highContrast: false, theme: "dark", sound: true },
    stats: { played: 0, wins: 0, streak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0] },
    daily: null,
    practice: null
  };
}

function loadData() {
  const fallback = freshData();
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || parsed.version !== 3) return fallback;
    const settings = parsed.settings || {};
    const stats = parsed.stats || {};
    return {
      ...fallback,
      hasSeenWelcome: parsed.hasSeenWelcome === true,
      settings: {
        hardMode: settings.hardMode === true,
        highContrast: settings.highContrast === true,
        theme: settings.theme === "light" ? "light" : "dark",
        sound: settings.sound !== false
      },
      stats: {
        played: validCount(stats.played),
        wins: validCount(stats.wins),
        streak: validCount(stats.streak),
        maxStreak: validCount(stats.maxStreak),
        distribution: Array.from({ length: 6 }, (_, i) => validCount(stats.distribution?.[i]))
      },
      daily: parsed.daily || null,
      practice: parsed.practice || null
    };
  } catch (_) {
    return fallback;
  }
}

function validCount(value) {
  return Number.isInteger(value) && value >= 0 ? value : 0;
}

function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) { /* The game remains playable without storage. */ }
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function puzzleNumber(date = new Date()) {
  const localDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((localDay - Date.UTC(2024, 0, 1)) / 86400000);
}

function dailyAnswer() {
  return ANSWERS[puzzleNumber() % ANSWERS.length];
}

function randomAnswer() {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  let answer = ANSWERS[values[0] % ANSWERS.length];
  if (answer === game.answer) answer = ANSWERS[(ANSWERS.indexOf(answer) + 1) % ANSWERS.length];
  return answer;
}

function cleanGuesses(value) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, MAX_ATTEMPTS).filter(guess => typeof guess === "string" && VALID_WORDS.has(guess));
}

function buildBoard() {
  grid.replaceChildren();
  for (let rowIndex = 0; rowIndex < MAX_ATTEMPTS; rowIndex++) {
    const row = document.createElement("div");
    row.className = "row";
    row.setAttribute("role", "row");
    row.dataset.row = rowIndex;
    for (let colIndex = 0; colIndex < WORD_LENGTH; colIndex++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.setAttribute("role", "gridcell");
      tile.setAttribute("aria-label", `Row ${rowIndex + 1}, letter ${colIndex + 1}, empty`);
      row.appendChild(tile);
    }
    grid.appendChild(row);
  }
}

function buildKeyboard() {
  document.querySelectorAll(".key-row").forEach(row => {
    [...row.dataset.row].forEach(letter => {
      const key = document.createElement("button");
      key.className = "key";
      key.dataset.key = letter;
      key.textContent = letter;
      key.setAttribute("aria-label", `Letter ${letter}`);
      row.appendChild(key);
    });
  });
  const backspace = document.createElement("button");
  backspace.className = "key key-wide";
  backspace.dataset.key = "BACKSPACE";
  backspace.setAttribute("aria-label", "Delete letter");
  backspace.textContent = "⌫";
  document.querySelector(".key-row:last-child").appendChild(backspace);
  keyboard.addEventListener("click", event => {
    const key = event.target.closest("[data-key]");
    if (!key) return;
    handleKey(key.dataset.key);
  });
}

function activateMode(mode, forceNew = false) {
  if (game.revealing) return;
  game.mode = mode;
  game.current = "";
  game.revealing = false;

  if (mode === "daily") {
    const today = localDateKey();
    const saved = data.daily;
    const canRestore = saved && saved.date === today;
    game.answer = dailyAnswer();
    game.guesses = canRestore ? cleanGuesses(saved.guesses) : [];
    game.status = canRestore && ["won", "lost"].includes(saved.status) ? saved.status : "playing";
    if (!canRestore) data.daily = null;
  } else {
    const saved = data.practice;
    const canRestore = !forceNew && saved && VALID_WORDS.has(saved.answer) && saved.status === "playing";
    game.answer = canRestore ? saved.answer : randomAnswer();
    game.guesses = canRestore ? cleanGuesses(saved.guesses) : [];
    game.status = "playing";
    if (!canRestore) data.practice = null;
  }
  saveProgress();
  renderAll();
}

function saveProgress() {
  const progress = { guesses: game.guesses, status: game.status };
  if (game.mode === "daily") data.daily = { date: localDateKey(), ...progress };
  else data.practice = { answer: game.answer, ...progress };
  saveData();
}

function renderAll() {
  dailyModeBtn.classList.toggle("active", game.mode === "daily");
  practiceModeBtn.classList.toggle("active", game.mode === "practice");
  dailyModeBtn.setAttribute("aria-pressed", String(game.mode === "daily"));
  practiceModeBtn.setAttribute("aria-pressed", String(game.mode === "practice"));
  puzzleLabel.textContent = game.mode === "daily" ? `PUZZLE #${puzzleNumber()}` : "UNLIMITED PRACTICE";
  renderBoard();
  renderKeyboard();
  syncSettings();
}

function renderBoard() {
  const rows = grid.querySelectorAll(".row");
  rows.forEach((row, rowIndex) => {
    row.classList.toggle("active", rowIndex === game.guesses.length && game.status === "playing");
    row.querySelectorAll(".tile").forEach((tile, colIndex) => {
      tile.className = "tile";
      tile.textContent = "";
      tile.style.animationDelay = "";
      const guess = game.guesses[rowIndex];
      if (guess) {
        const state = evaluateGuess(guess, game.answer)[colIndex];
        tile.textContent = guess[colIndex];
        tile.classList.add(state);
        tile.setAttribute("aria-label", `${guess[colIndex]}, ${state}`);
      } else if (rowIndex === game.guesses.length && game.current[colIndex]) {
        tile.textContent = game.current[colIndex];
        tile.classList.add("filled");
        tile.setAttribute("aria-label", `${game.current[colIndex]}, current guess`);
      } else {
        tile.setAttribute("aria-label", `Row ${rowIndex + 1}, letter ${colIndex + 1}, empty`);
      }
    });
  });
  const remaining = Math.max(0, MAX_ATTEMPTS - game.guesses.length);
  attemptLabel.textContent = game.status === "playing" ? `${remaining} ${remaining === 1 ? "TRY" : "TRIES"} LEFT` : game.status === "won" ? "PUZZLE SOLVED" : "GAME COMPLETE";
}

function renderKeyboard() {
  const states = {};
  game.guesses.forEach(guess => {
    const result = evaluateGuess(guess, game.answer);
    [...guess].forEach((letter, index) => {
      if (!states[letter] || KEY_RANK[result[index]] > KEY_RANK[states[letter]]) states[letter] = result[index];
    });
  });
  keyboard.querySelectorAll(".key").forEach(key => {
    key.classList.remove("correct", "present", "absent");
    const state = states[key.dataset.key];
    if (state) key.classList.add(state);
    key.removeAttribute("data-state");
    if (state) key.setAttribute("data-state", state);
  });
}

function evaluateGuess(guess, answer) {
  const result = Array(WORD_LENGTH).fill("absent");
  const remaining = {};
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === answer[i]) result[i] = "correct";
    else remaining[answer[i]] = (remaining[answer[i]] || 0) + 1;
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    if (remaining[guess[i]] > 0) {
      result[i] = "present";
      remaining[guess[i]]--;
    }
  }
  return result;
}

function handleKey(key) {
  if (game.revealing || game.status !== "playing" || document.querySelector("dialog[open]")) return;
  if (key === "ENTER") submitGuess();
  else if (key === "BACKSPACE") deleteLetter();
  else if (/^[A-Z]$/.test(key)) typeLetter(key);
}

function typeLetter(letter) {
  if (game.current.length >= WORD_LENGTH) return;
  game.current += letter;
  renderBoard();
  flashKey(letter);
  playTone(340, .025, "sine", .014);
}

function deleteLetter() {
  if (!game.current) return;
  game.current = game.current.slice(0, -1);
  renderBoard();
  flashKey("BACKSPACE");
  playTone(220, .025, "sine", .012);
}

function flashKey(keyName) {
  const key = keyboard.querySelector(`[data-key="${keyName}"]`);
  if (!key) return;
  key.classList.add("pressed");
  setTimeout(() => key.classList.remove("pressed"), 90);
}

function submitGuess() {
  message.classList.remove("show");
  const guess = game.current;
  if (guess.length < WORD_LENGTH) {
    rejectGuess("Not enough letters");
    return;
  }
  if (!VALID_WORDS.has(guess)) {
    rejectGuess("Not in the word list");
    return;
  }
  if (data.settings.hardMode) {
    const error = hardModeError(guess);
    if (error) {
      rejectGuess(error);
      return;
    }
  }

  game.revealing = true;
  game.guesses.push(guess);
  game.current = "";
  const won = guess === game.answer;
  const lost = !won && game.guesses.length === MAX_ATTEMPTS;
  if (won || lost) {
    game.status = won ? "won" : "lost";
    recordResult(won);
  }
  saveProgress();
  revealGuess(game.guesses.length - 1, guess, won, lost);
}

function rejectGuess(text) {
  showMessage(text);
  const row = grid.children[game.guesses.length];
  if (row) {
    row.classList.remove("shake");
    void row.offsetWidth;
    row.classList.add("shake");
  }
  playTone(130, .12, "sawtooth", .025);
}

function hardModeError(guess) {
  const required = {};
  for (const previous of game.guesses) {
    const result = evaluateGuess(previous, game.answer);
    const seen = {};
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (result[i] === "correct" && guess[i] !== previous[i]) return `${ordinal(i + 1)} letter must be ${previous[i]}`;
      if (result[i] !== "absent") seen[previous[i]] = (seen[previous[i]] || 0) + 1;
    }
    Object.entries(seen).forEach(([letter, count]) => { required[letter] = Math.max(required[letter] || 0, count); });
  }
  for (const [letter, count] of Object.entries(required)) {
    const actual = [...guess].filter(char => char === letter).length;
    if (actual < count) return `Guess must contain ${count > 1 ? `${count} ${letter}s` : letter}`;
  }
  return "";
}

function ordinal(number) {
  return ["1st", "2nd", "3rd", "4th", "5th"][number - 1];
}

function revealGuess(rowIndex, guess, won, lost) {
  const row = grid.children[rowIndex];
  const states = evaluateGuess(guess, game.answer);
  const tiles = row.querySelectorAll(".tile");
  row.classList.remove("active");

  tiles.forEach((tile, index) => {
    tile.textContent = guess[index];
    tile.classList.remove("filled");
    setTimeout(() => {
      tile.classList.add("reveal");
      playTone(240 + index * 35, .04, "triangle", .012);
      setTimeout(() => {
        tile.classList.add(states[index]);
        tile.setAttribute("aria-label", `${guess[index]}, ${states[index]}`);
        renderKeyboard();
      }, 250);
    }, index * 230);
  });

  setTimeout(() => {
    game.revealing = false;
    renderBoard();
    if (won) {
      tiles.forEach((tile, index) => {
        tile.style.animationDelay = `${index * 80}ms`;
        tile.classList.add("dance");
      });
      launchConfetti();
      playWinSound();
      setTimeout(showResult, 950);
    } else if (lost) {
      playTone(170, .35, "sine", .035);
      setTimeout(showResult, 450);
    }
  }, WORD_LENGTH * 230 + 380);
}

function recordResult(won) {
  const stats = data.stats;
  stats.played++;
  if (won) {
    stats.wins++;
    stats.streak++;
    stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    stats.distribution[game.guesses.length - 1]++;
  } else {
    stats.streak = 0;
  }
}

function showResult() {
  if (!["won", "lost"].includes(game.status)) return;
  const won = game.status === "won";
  const stats = data.stats;
  document.getElementById("resultIcon").textContent = won ? "✓" : "×";
  document.getElementById("resultIcon").classList.toggle("loss", !won);
  document.getElementById("resultEyebrow").textContent = won ? ["INCREDIBLE", "BRILLIANT", "WELL PLAYED"][Math.min(game.guesses.length - 1, 2)] : "GOOD EFFORT";
  document.getElementById("resultTitle").textContent = won ? "You found it!" : "Almost had it";
  document.getElementById("resultText").textContent = won
    ? `Solved in ${game.guesses.length} ${game.guesses.length === 1 ? "guess" : "guesses"}. That’s one for the books.`
    : "This one was tricky. A fresh word is waiting whenever you are.";
  document.getElementById("resultWord").textContent = game.answer;
  document.getElementById("resultAttempts").textContent = `${game.guesses.length}/6`;
  document.getElementById("resultStreak").textContent = stats.streak;
  document.getElementById("resultWins").textContent = `${stats.played ? Math.round(stats.wins / stats.played * 100) : 0}%`;
  document.getElementById("resultPrimaryBtn").textContent = "Play next word";
  openDialog("resultDialog");
}

function showMessage(text) {
  clearTimeout(messageTimer);
  message.textContent = text;
  message.classList.add("show");
  messageTimer = setTimeout(() => message.classList.remove("show"), 1900);
}

function openDialog(id) {
  document.querySelectorAll("dialog[open]").forEach(dialog => dialog.close());
  const dialog = document.getElementById(id);
  if (id === "statsDialog") renderStats();
  if (id === "settingsDialog") syncSettings();
  if (!dialog.open) dialog.showModal();
}

function closeDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog.open) dialog.close();
}

function renderStats() {
  const stats = data.stats;
  document.getElementById("statPlayed").textContent = stats.played;
  document.getElementById("statWinRate").textContent = stats.played ? Math.round(stats.wins / stats.played * 100) : 0;
  document.getElementById("statStreak").textContent = stats.streak;
  document.getElementById("statMaxStreak").textContent = stats.maxStreak;
  document.getElementById("statsEmpty").hidden = stats.played > 0;
  const max = Math.max(1, ...stats.distribution);
  const latestRow = game.status === "won" ? game.guesses.length - 1 : -1;
  const distribution = document.getElementById("distribution");
  distribution.replaceChildren();
  stats.distribution.forEach((count, index) => {
    const row = document.createElement("div");
    row.className = "distribution-row";
    const label = document.createElement("span");
    label.textContent = index + 1;
    const track = document.createElement("div");
    track.className = "distribution-track";
    const bar = document.createElement("div");
    bar.className = `distribution-bar${index === latestRow ? " highlight" : ""}`;
    bar.style.width = `${Math.max(10, count / max * 100)}%`;
    bar.textContent = count;
    track.appendChild(bar);
    row.append(label, track);
    distribution.appendChild(row);
  });
}

function syncSettings() {
  document.body.classList.toggle("high-contrast", data.settings.highContrast);
  document.body.classList.toggle("light-theme", data.settings.theme === "light");
  document.querySelector('meta[name="theme-color"]').content = data.settings.theme === "light" ? "#f2f4ef" : "#101614";
  setToggle("hardModeToggle", data.settings.hardMode);
  setToggle("contrastToggle", data.settings.highContrast);
  setToggle("themeToggle", data.settings.theme === "light");
  setToggle("soundToggle", data.settings.sound);
  document.getElementById("hardModeToggle").disabled = game.guesses.length > 0;
  soundBtn.classList.toggle("muted", !data.settings.sound);
  soundBtn.setAttribute("aria-label", data.settings.sound ? "Mute sound" : "Enable sound");
  soundBtn.title = data.settings.sound ? "Mute sound" : "Enable sound";
}

function setToggle(id, enabled) {
  const toggle = document.getElementById(id);
  toggle.classList.toggle("on", enabled);
  toggle.setAttribute("aria-checked", String(enabled));
}

function toggleSetting(setting) {
  if (setting === "hardMode" && game.guesses.length) return;
  if (setting === "theme") data.settings.theme = data.settings.theme === "dark" ? "light" : "dark";
  else data.settings[setting] = !data.settings[setting];
  saveData();
  syncSettings();
  if (setting === "sound" && data.settings.sound) playTone(440, .08, "sine", .03);
}

function shareResult() {
  const title = game.mode === "daily" ? `Wordle #${puzzleNumber()}` : "Wordle Practice";
  const score = game.status === "won" ? `${game.guesses.length}/6` : "X/6";
  const symbols = { correct: data.settings.highContrast ? "🟦" : "🟩", present: data.settings.highContrast ? "🟧" : "🟨", absent: "⬛" };
  const rows = game.guesses.map(guess => evaluateGuess(guess, game.answer).map(state => symbols[state]).join(""));
  const text = `${title} ${score}\n\n${rows.join("\n")}`;
  const shareButton = document.getElementById("shareBtn");
  const originalMarkup = shareButton.innerHTML;
  const done = () => {
    shareButton.textContent = "✓ Copied to clipboard";
    setTimeout(() => { shareButton.innerHTML = originalMarkup; }, 1600);
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  else fallbackCopy(text, done);
}

function fallbackCopy(text, done) {
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try { document.execCommand("copy"); done(); } catch (_) { showMessage("Could not copy result"); }
  area.remove();
}

function launchConfetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const container = document.getElementById("confetti");
  const colors = ["#2d9d78", "#d1a13b", "#7ee0b8", "#f4f7f5"];
  for (let i = 0; i < 34; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${(i * 37) % 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--drift", `${(i % 2 ? 1 : -1) * (20 + i % 7 * 12)}px`);
    piece.style.animationDelay = `${(i % 9) * 45}ms`;
    container.appendChild(piece);
  }
  setTimeout(() => container.replaceChildren(), 2600);
}

function playTone(frequency, duration, type = "sine", volume = .025, delay = 0) {
  if (!data.settings.sound) return;
  try {
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = audioContext.currentTime + delay;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + .008);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + .02);
  } catch (_) { /* Audio is optional. */ }
}

function playWinSound() {
  [392, 494, 587, 784].forEach((frequency, index) => playTone(frequency, .2, "sine", .035, index * .1));
}

function bindEvents() {
  document.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === "Escape" && !document.querySelector("dialog[open]") && game.status === "playing") {
      event.preventDefault();
      openDialog("pauseDialog");
      return;
    }
    if (document.querySelector("dialog[open]")) return;
    if (event.key === "Enter") { event.preventDefault(); handleKey("ENTER"); }
    else if (event.key === "Backspace") { event.preventDefault(); handleKey("BACKSPACE"); }
    else if (/^[a-zA-Z]$/.test(event.key)) handleKey(event.key.toUpperCase());
  });

  dailyModeBtn.addEventListener("click", () => activateMode("daily"));
  practiceModeBtn.addEventListener("click", () => activateMode("practice"));
  document.getElementById("helpBtn").addEventListener("click", () => openDialog("helpDialog"));
  document.getElementById("statsBtn").addEventListener("click", () => openDialog("statsDialog"));
  document.getElementById("settingsBtn").addEventListener("click", () => openDialog("settingsDialog"));
  document.getElementById("pauseBtn").addEventListener("click", () => game.status === "playing" ? openDialog("pauseDialog") : showResult());
  document.getElementById("resumeBtn").addEventListener("click", () => closeDialog("pauseDialog"));
  document.getElementById("pauseNewPracticeBtn").addEventListener("click", () => { closeDialog("pauseDialog"); activateMode("practice", true); });
  document.getElementById("resultPrimaryBtn").addEventListener("click", () => { closeDialog("resultDialog"); activateMode("practice", true); });
  document.getElementById("shareBtn").addEventListener("click", shareResult);
  soundBtn.addEventListener("click", () => toggleSetting("sound"));
  document.getElementById("hardModeToggle").addEventListener("click", () => toggleSetting("hardMode"));
  document.getElementById("contrastToggle").addEventListener("click", () => toggleSetting("highContrast"));
  document.getElementById("themeToggle").addEventListener("click", () => toggleSetting("theme"));
  document.getElementById("soundToggle").addEventListener("click", () => toggleSetting("sound"));

  document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => closeDialog(button.dataset.close)));
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target === dialog && dialog !== welcomeDialog) dialog.close();
    });
  });
  welcomeDialog.addEventListener("cancel", event => event.preventDefault());
  const dismissWelcome = mode => {
    data.hasSeenWelcome = true;
    saveData();
    closeDialog("welcomeDialog");
    activateMode(mode);
  };
  document.getElementById("welcomeDailyBtn").addEventListener("click", () => dismissWelcome("daily"));
  document.getElementById("welcomePracticeBtn").addEventListener("click", () => dismissWelcome("practice"));
  document.getElementById("welcomeCloseBtn").addEventListener("click", () => dismissWelcome("practice"));

  document.getElementById("resetStatsBtn").addEventListener("click", event => {
    const button = event.currentTarget;
    if (!resetArmed) {
      resetArmed = true;
      button.textContent = "Click again to confirm reset";
      setTimeout(() => { resetArmed = false; button.textContent = "Reset statistics"; }, 3000);
      return;
    }
    resetArmed = false;
    data.stats = freshData().stats;
    saveData();
    button.textContent = "Statistics reset ✓";
    setTimeout(() => { button.textContent = "Reset statistics"; }, 1600);
  });

  if (location.protocol === "http:" || location.protocol === "https:") {
    window.addEventListener("load", () => navigator.serviceWorker?.register("./service-worker.js").catch(() => {}));
  }
}

buildBoard();
buildKeyboard();
bindEvents();
activateMode("practice");
syncSettings();
if (!data.hasSeenWelcome) welcomeDialog.showModal();
window.__WORDLE_READY__ = true;