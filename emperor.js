// 엠페럴 정보 — 다른 서버(737 · 719 · 710)와 우리(700)의 정예 비교. 출처 jeabslist(2026-10-22 받음)
// sv: 서버마다 시련 점수대 인원(T 순서) · 전투력 10억+ · 상위 연맹 · KvK [성 점령, 함락, 준비 승, 패]
// pl: 시련 3,000+ [서버, 닉네임, 연맹, 시련, 전투력(백만), 펫투력(백만), 거장투력(백만), 영웅 총전투력(백만)]
(() => {
  const D = {"at":"2026-10-22","T":[3500,3400,3300,3200,3000,2700,2500],"sv":{"700":{"b":[0,0,0,0,3,10,18],"b1":2,"n":637,"top":[["NeX",94,431],["AEH",95,342],["LoV",96,167]],"kv":[3,5,5,9]},"710":{"b":[2,5,6,7,11,23,38],"b1":3,"n":681,"top":[["710",81,399],["RED",85,338],["SKY",96,305]],"kv":[5,2,5,9]},"719":{"b":[3,4,5,5,8,15,19],"b1":6,"n":618,"top":[["KOR",100,507],["TFF",82,299],["TFK",79,140]],"kv":[6,2,7,6]},"737":{"b":[2,3,3,4,7,10,19],"b1":3,"n":598,"top":[["KOR",97,499],["GGw",97,313],["DOM",95,200]],"kv":[3,4,6,7]}},
    "pl":[[737,"°꒰ঌＲＥΛＰＥＲ໒꒱°ᴷᴼᴿ","KOR",3413,1277,51.1,37,131],[737,"꒰ঌ C키즈ᶜᴷᴵᴰˢ ໒꒱༒࿐","KOR",3658,2509,57.8,46.9,193],[737,"°꒰ঌ ᎢΛΙᎫΙ ໒꒱°","KOR",3522,1572,53.4,38.6,165],[737,"༒커피향기 A R O M A༒","KOR",3020,736,32.1,27.5,113],[737,"༒ 찬 찬 K Y M ༒","KOR",3082,827,31.1,29.6,118],[737,"༒ E R I C ༒","KOR",3243,771,37.7,29.9,115],[737,"༒ 헨리 H E N R Y ༒","KOR",3077,701,35.1,32.2,107],[719,"꒰ঌ BL̇UEMÖÖƝ ໒꒱","KOR",3446,1306,49.6,39,141],[719,"꒰ঌ SONNY ໒꒱","KOR",3581,2312,53.9,38.6,167],[719,"꒰ঌ SOSO ໒꒱","KOR",3583,2011,52.4,43.3,181],[719,"꒰ঌ Magnus ໒꒱","KOR",3165,1027,43.2,24.7,117],[719,"꒰ঌ SÄNG JÏ ໒꒱","KOR",3334,1005,43,34,138],[719,"꒰ঌ Ari rang ໒꒱","KOR",3000,760,38,32.1,104],[719,"꒰ঌ ĊÖĊÖ ໒꒱","KOR",3000,626,38.6,30.3,108],[719,"꒰ঌ Gwangju ໒꒱","KOR",3551,1616,54.2,40.2,150],[710,"Khorr","710",3608,1826,57.9,47.4,182],[710,"Raddan","710",3418,1090,56.9,53.3,145],[710,"Julpaca","710",3485,936,51.8,32.3,136],[710,"Chunky","710",3633,921,57.4,45.6,117],[710,"ASSASSIN","710",3398,882,48.8,38.4,127],[710,"Woff","710",3004,710,34.5,25.9,96],[710,"漆黒堕天使SASAMIﾁｬﾝ໒꒱","710",3464,629,48.4,38.3,127],[710,"Andyᴾᴴ","710",3069,517,37.8,24.4,92],[710,"Qqq","710",3256,476,45.5,32.4,139],[710,"WEALTHY_ADS","710",3130,669,37,30.3,118],[710,"Darth Vader","RED",3106,419,45.8,32.2,81],[700,"Duby 1988","NeX",3000,1273,58.5,50,121],[700,"DA기부천사","NeX",3105,869,38.6,24.7,114],[700,"ᴮᴼˢˢ化神ᴳᵒᵈ","NeX",3028,748,33.5,29.2,103]]};
  // F: 서버마다 전체와 상위 5개 연맹 — n 인원, tg [TG8, TG7, TG6, TG5, TG4 이하](타운센터), b 시련 [3500+, 3000+, 2700+, 2500+], p 전투력(억)
  const F = {"700":{"all":{"n":637,"tg":[105,84,79,90,279],"b":[0,3,10,18],"p":1410},"als":[["NeX",{"n":94,"tg":[51,28,12,3,0],"b":[0,3,9,15],"p":436}],["AEH",{"n":95,"tg":[38,22,20,9,6],"b":[0,0,0,1],"p":340}],["LoV",{"n":96,"tg":[0,6,14,25,51],"b":[0,0,0,0],"p":167}],["nex",{"n":72,"tg":[4,5,9,13,41],"b":[0,0,0,0],"p":133}],["NvA",{"n":43,"tg":[8,13,10,6,6],"b":[0,0,1,1],"p":128}]]},"710":{"all":{"n":682,"tg":[153,62,53,57,357],"b":[2,11,23,38],"p":1384},"als":[["710",{"n":81,"tg":[67,6,5,1,2],"b":[2,10,15,23],"p":382}],["RED",{"n":85,"tg":[50,23,6,6,0],"b":[0,1,6,8],"p":337}],["SKY",{"n":96,"tg":[29,25,24,14,4],"b":[0,0,2,7],"p":318}],["red",{"n":74,"tg":[6,6,6,17,39],"b":[0,0,0,0],"p":118}],["GBS",{"n":94,"tg":[0,0,5,10,79],"b":[0,0,0,0],"p":106}]]},"719":{"all":{"n":680,"tg":[109,50,43,57,421],"b":[3,8,15,19],"p":1151},"als":[["KOR",{"n":100,"tg":[76,13,8,0,3],"b":[3,8,13,15],"p":508}],["TFF",{"n":82,"tg":[30,24,20,7,1],"b":[0,0,2,4],"p":304}],["TFK",{"n":79,"tg":[1,8,6,20,44],"b":[0,0,0,0],"p":136}],["TF2",{"n":67,"tg":[0,2,5,19,41],"b":[0,0,0,0],"p":91}],["ARB",{"n":98,"tg":[0,0,2,3,93],"b":[0,0,0,0],"p":42}]]},"737":{"all":{"n":659,"tg":[94,67,55,51,392],"b":[2,7,10,19],"p":1196},"als":[["KOR",{"n":97,"tg":[73,21,3,0,0],"b":[2,7,10,19],"p":499}],["GGw",{"n":97,"tg":[18,31,20,16,12],"b":[0,0,0,0],"p":313}],["DOM",{"n":95,"tg":[3,11,26,16,39],"b":[0,0,0,0],"p":199}],["ICE",{"n":61,"tg":[0,0,5,15,41],"b":[0,0,0,0],"p":73}],["Fin",{"n":95,"tg":[0,0,0,0,95],"b":[0,0,0,0],"p":33}]]}};
  const KS = [700, 710, 719, 737];
  const T = {
    ko: {h: "👑 엠페럴 정보 — 서버 정예 비교", d: "737 · 719 · 710 서버와 우리 700 서버의 시련 · 펫투력 · 거장투력 비교 (jeabslist {0} 기준, 서버마다 상위 12개 연맹)", srv: "서버", band: "시련 점수대 인원", b1: "전투력 10억+", top: "상위 연맹 (인원 · 전투력)", kv: "KvK 성 점령 / 함락", ppl: "시련 3,000+ 정예 {0}명", sort: "정렬", sM: "시련", sPet: "펫투력", sMs: "거장투력", sP: "전투력", sH: "영웅", all: "전체", rk: "#", nm: "이름", al: "연맹", sum: "서버별 평균 (시련 3,000+)", n: "명", avg: "평균", e: "억", tSrv: "📊 서버 비교", tE3k: "🏅 시련 3,000+", tTop: "💯 상위 100", topNone: "상위 100 자료가 아직 없습니다.", topSum: "💯 서버별 상위 100명 평균", topD: "서버마다 전투력 상위 100명(상위 15개 연맹 안) — jeabslist {0}. 영웅 장비는 출전 영웅 5명 × 4부위 평균", topList: "상위 100 명단 ({0}명)", gPlus: "장비 강화", gLv: "장비 Lv", gEx: "전용 장비", gGov: "영주 장비", gPub: "영주 장비 공개", gem: "보석", gHide: "비공개", topNote: "영주 장비 · 영주 보석은 본인이 공개한 사람만 보입니다(나머지는 비공개). 영웅 보석 · T11 병사는 jeabslist 에 없습니다.", tgH: "🏰 TG8 분포 (타운센터)", tgD: "서버마다 상위 12개 연맹 인원의 타운센터 TG 단계. 아래에서 서버를 고르면 그 서버 안의 연맹별로 나눠 봅니다.", byAl: "연맹별 보기", t11: "⚔ 우리 700 T11(순금 병사): 병사 정보가 있는 {0}명 중 T11 병과 하나 이상 {1}명 · 세 병과 모두 T11 {2}명", t11No: "T11(순금 병사)은 jeabslist 에 나오지 않아 다른 서버는 알 수 없습니다.", note: "펫투력 · 거장투력은 jeabslist 개인 순위(Total Pet Power · Master Total Power)에서 한 명씩 받은 값입니다. 서버 전체 순위가 아니라 시련 3,000+ 인원만 대상입니다."},
    en: {h: "👑 Emperor info — elite comparison", d: "Mystic Trial · pet power · master power for kingdoms 737 · 719 · 710 vs our 700 (jeabslist, {0}; top 12 alliances each)", srv: "Kingdom", band: "Players by Mystic Trial score", b1: "Power 1B+", top: "Top alliances (members · power)", kv: "KvK castles taken / lost", ppl: "{0} elites with Mystic Trial 3,000+", sort: "Sort", sM: "Trial", sPet: "Pet", sMs: "Master", sP: "Power", sH: "Hero", all: "All", rk: "#", nm: "Name", al: "Alliance", sum: "Averages by kingdom (Trial 3,000+)", n: "", avg: "avg", e: "B", tSrv: "📊 Kingdoms", tE3k: "🏅 Trial 3,000+", tTop: "💯 Top 100", topNone: "No top-100 data yet.", topSum: "💯 Top 100 averages by kingdom", topD: "Top 100 by power in each kingdom (within its top 15 alliances) — jeabslist {0}. Hero gear = average of 5 heroes × 4 pieces", topList: "Top 100 list ({0})", gPlus: "Gear +", gLv: "Gear Lv", gEx: "Exclusive", gGov: "Governor gear", gPub: "Gov. gear public", gem: "gem", gHide: "hidden", topNote: "Governor gear and charms show only for players who made them public. Hero gems and T11 troops are not on jeabslist.", tgH: "🏰 TG8 distribution (Town Center)", tgD: "Town Center TG tier of players in each kingdom's top 12 alliances. Pick a kingdom below to split it by alliance.", byAl: "By alliance", t11: "⚔ Our 700 T11 (true gold troops): of {0} players with troop info, {1} have at least one T11 type · {2} have all three T11", t11No: "T11 troops are not shown on jeabslist, so other kingdoms are unknown.", note: "Pet and master power come from each player's jeabslist personal rankings (Total Pet Power · Master Total Power). Only Mystic Trial 3,000+ players are included, not the whole kingdom."}
  };
  const st = (k, ...a) => { let s = (T[LANG === "ko" ? "ko" : "en"])[k]; a.forEach((v, i) => { s = s.split("{" + i + "}").join(v); }); return s; };
  const COLK = {700: "#3b5bdb", 710: "#e8590c", 719: "#2f9e44", 737: "#ae3ec9"};
  let SORT = 5, FIL = 0, FA = 710, TAB = "srv";
  const pw = m => LANG === "ko" ? (m / 100).toFixed(1) + st("e") : (m / 1000).toFixed(2) + st("e");
  const clean = s => s.replace(/[꒰ঌ໒꒱°༒࿐]/g, "").replace(/\s+/g, " ").trim();
  const css = `
#vEmp .ep{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;margin-bottom:12px}
#vEmp h2{margin:0 0 6px;font-size:17px}
#vEmp .d{font-size:12.5px;color:var(--sub);margin-bottom:10px;line-height:1.5}
#vEmp table{width:100%;border-collapse:collapse;font-size:13px}
#vEmp th,#vEmp td{padding:6px 5px;border-bottom:1px solid var(--line);text-align:start;white-space:nowrap}
#vEmp td.n,#vEmp th.n{text-align:end;font-variant-numeric:tabular-nums}
#vEmp .sc{overflow-x:auto}
#vEmp tr.us td{background:rgba(59,91,219,.10);font-weight:700}
#vEmp .kb{display:inline-block;padding:1px 7px;border-radius:999px;color:#fff;font-size:11.5px;font-weight:800}
#vEmp .chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px;align-items:center}
#vEmp .chips button{min-height:32px;padding:0 12px;border-radius:999px;font-size:13px}
#vEmp .chips button.on{background:var(--accent);color:#fff;border-color:var(--accent)}
#vEmp .bar{display:inline-block;height:8px;border-radius:4px;vertical-align:middle;margin-inline-start:6px}
#vEmp th.on{color:var(--accent)}
#vEmp .nmc{max-width:210px;overflow:hidden;text-overflow:ellipsis}
`;
  // T11(순금 병사)은 jeabslist 에 없다 — 우리 서버만 병사 정보 입력 · 병사 명단으로 센다
  function t11Html() {
    const L = DATA.filter(p => troops(p));
    if (!L.length) return '';
    const n11 = L.filter(p => troops(p).some(t => t[1] === 11)).length, all11 = L.filter(p => troops(p).every(t => t[1] === 11)).length;
    const by = ALLIES.map(a => { const q = L.filter(p => p.ally === a); return [a, q.length, q.filter(p => troops(p).some(t => t[1] === 11)).length]; }).filter(x => x[1]);
    return '<div class="d" style="margin-top:10px">' + esc(st("t11", L.length, n11, all11)) + '<br>' + by.map(x => esc(x[0]) + ' ' + x[2] + '/' + x[1]).join(" · ") + '</div><div class="d">' + esc(st("t11No")) + '</div>';
  }
  function render() {
    const V = $("vEmp");
    if (!V) return;
    if (!document.getElementById("empCss")) { const s = document.createElement("style"); s.id = "empCss"; s.textContent = css; document.head.appendChild(s); }
    const kb = k => '<span class="kb" style="background:' + COLK[k] + '">' + k + '</span>';
    // ① 서버 비교
    let h = '<div class="ep"><div class="sc"><table><tr><th>' + st("srv") + '</th>' + D.T.map(t => '<th class="n">' + fmt(t) + '+</th>').join("") + '<th class="n">' + st("b1") + '</th><th>' + st("kv") + '</th><th>' + st("top") + '</th></tr>' +
      KS.map(k => { const s = D.sv[k]; return '<tr' + (k === 700 ? ' class="us"' : '') + '><td>' + kb(k) + '</td>' + s.b.map(v => '<td class="n">' + v + '</td>').join("") + '<td class="n">' + s.b1 + '</td><td>' + (s.kv ? s.kv[0] + ' / ' + s.kv[1] : '·') + '</td><td>' + s.top.map(a => esc(a[0]) + ' ' + a[1] + st("n") + '·' + pw(a[2] * 100)).join(" | ") + '</td></tr>'; }).join("") + '</table></div></div>';
    // ② 서버별 평균
    const avg = (k, i) => { const r = D.pl.filter(x => x[0] === k); return r.length ? r.reduce((t, x) => t + x[i], 0) / r.length : 0; };
    const mx = [3, 5, 6].map(i => Math.max(...KS.map(k => avg(k, i))));
    h += '<div class="ep"><h2>' + st("sum") + '</h2><div class="sc"><table><tr><th>' + st("srv") + '</th><th class="n">' + st("n") + '</th><th>' + st("sM") + '</th><th>' + st("sPet") + '</th><th>' + st("sMs") + '</th></tr>' +
      KS.map(k => '<tr' + (k === 700 ? ' class="us"' : '') + '><td>' + kb(k) + '</td><td class="n">' + D.pl.filter(x => x[0] === k).length + '</td>' + [3, 5, 6].map((i, j) => { const v = avg(k, i); return '<td>' + (i === 3 ? Math.round(v) : v.toFixed(1) + 'M') + '<span class="bar" style="width:' + Math.round(v / mx[j] * 70) + 'px;background:' + COLK[k] + '"></span></td>'; }).join("") + '</tr>').join("") + '</table></div></div>';
    // ③ TG8 분포 · 연맹별 (서버를 고르면 그 서버 안의 연맹으로 나눠 본다)
    const tgMx = Math.max(...KS.map(k => F[k].all.tg[0]));
    h += '<div class="ep"><h2>' + st("tgH") + '</h2><div class="d">' + esc(st("tgD")) + '</div><div class="sc"><table><tr><th>' + st("srv") + '</th><th class="n">TG8</th><th class="n">TG7</th><th class="n">TG6</th><th class="n">TG5</th><th class="n">≤TG4</th><th class="n">' + st("n") + '</th></tr>' +
      KS.map(k => { const a = F[k].all; return '<tr' + (k === 700 ? ' class="us"' : '') + '><td>' + kb(k) + '</td><td class="n"><b>' + a.tg[0] + '</b><span class="bar" style="width:' + Math.round(a.tg[0] / tgMx * 70) + 'px;background:' + COLK[k] + '"></span></td>' + a.tg.slice(1).map(v => '<td class="n">' + v + '</td>').join("") + '<td class="n">' + a.n + '</td></tr>'; }).join("") + '</table></div>' +
      '<div class="chips" style="margin-top:12px"><b style="font-size:13px">' + st("byAl") + '</b>' + KS.map(k => '<button data-fa="' + k + '"' + (FA === k ? ' class="on"' : '') + '>' + k + '</button>').join("") + '</div>' +
      '<div class="sc"><table><tr><th>' + st("al") + '</th><th class="n">' + st("n") + '</th><th class="n">' + st("sP") + '</th><th class="n">TG8</th><th class="n">TG7</th><th class="n">TG6</th><th class="n">TG5</th><th class="n">≤TG4</th><th class="n">' + st("sM") + ' 3500+</th><th class="n">3000+</th><th class="n">2700+</th><th class="n">2500+</th></tr>' +
      F[FA].als.map(x => '<tr><td><b>' + esc(x[0]) + '</b></td><td class="n">' + x[1].n + '</td><td class="n">' + pw(x[1].p * 100) + '</td>' + x[1].tg.map((v, i) => '<td class="n">' + (i === 0 ? '<b>' + v + '</b>' : v) + '</td>').join("") + x[1].b.map(v => '<td class="n">' + v + '</td>').join("") + '</tr>').join("") + '</table></div>' + t11Html() + '</div>';
    const hS = h; h = '';
    // ④ 정예 명단
    const cols = [[3, "sM"], [5, "sPet"], [6, "sMs"], [4, "sP"], [7, "sH"]];
    const rows = D.pl.filter(x => !FIL || x[0] === FIL).slice().sort((a, b) => b[SORT] - a[SORT] || b[3] - a[3]);
    h += '<div class="ep"><h2>' + st("ppl", rows.length) + '</h2><div class="chips"><b style="font-size:13px">' + st("srv") + '</b>' + [0].concat(KS).map(k => '<button data-f="' + k + '"' + (FIL === k ? ' class="on"' : '') + '>' + (k ? k : st("all")) + '</button>').join("") + '</div>' +
      '<div class="chips"><b style="font-size:13px">' + st("sort") + '</b>' + cols.map(c => '<button data-s="' + c[0] + '"' + (SORT === c[0] ? ' class="on"' : '') + '>' + st(c[1]) + '</button>').join("") + '</div>' +
      '<div class="sc"><table><tr><th class="n">' + st("rk") + '</th><th>' + st("nm") + '</th><th>' + st("srv") + '</th><th>' + st("al") + '</th>' + cols.map(c => '<th class="n' + (SORT === c[0] ? ' on' : '') + '">' + st(c[1]) + '</th>').join("") + '</tr>' +
      rows.map((x, i) => '<tr' + (x[0] === 700 ? ' class="us"' : '') + '><td class="n">' + (i + 1) + '</td><td class="nmc">' + esc(clean(x[1])) + '</td><td>' + kb(x[0]) + '</td><td>' + esc(x[2]) + '</td><td class="n">' + fmt(x[3]) + '</td><td class="n">' + x[5].toFixed(1) + 'M</td><td class="n">' + x[6].toFixed(1) + 'M</td><td class="n">' + pw(x[4]) + '</td><td class="n">' + x[7] + 'M</td></tr>').join("") +
      '</table></div><div class="d" style="margin-top:8px">' + esc(st("note")) + '</div></div>';
    const head = '<div class="ep"><h2>' + st("h") + '</h2><div class="d">' + esc(st("d", D.at)) + '</div><div class="chips tabs">' + [["srv", "tSrv"], ["e3k", "tE3k"], ["top", "tTop"]].map(t => '<button data-tab="' + t[0] + '"' + (TAB === t[0] ? ' class="on"' : '') + '>' + st(t[1]) + '</button>').join("") + '</div></div>';
    V.innerHTML = head + (TAB === "top" ? topHtml(kb) : TAB === "e3k" ? h : hS);
  }
  // 상위 100: 서버마다 전투력 상위 100명 — emperor_top.js 의 EMP_TOP
  // 줄 = [닉네임, 연맹, 전투력(백만), 시련, 타운센터, 펫투력(백만), 거장투력(백만), 영웅 총전투력(백만), 영웅 장비 평균 강화(+), 평균 장비 Lv, 평균 전용 장비 Lv, 영주 장비 [평균 Lv, 평균 보석 Lv] | null(비공개)]
  let TS = 2, TF = 0;
  function topHtml(kb) {
    const E = window.EMP_TOP;
    if (!E) return '<div class="ep"><div class="d">' + st("topNone") + '</div></div>';
    const all = [];
    KS.forEach(k => (E.rows[k] || []).forEach(r => all.push([k].concat(r))));
    const val = (r, i) => i === 12 ? (r[12] ? r[12][0] : -1) : (r[i] == null ? -1 : r[i]);
    const avg = (k, i) => { const L = all.filter(r => r[0] === k && val(r, i) >= 0); return L.length ? L.reduce((t, r) => t + val(r, i), 0) / L.length : 0; };
    const cols = [[3, "sP"], [4, "sM"], [6, "sPet"], [7, "sMs"], [8, "sH"], [9, "gPlus"], [10, "gLv"], [11, "gEx"], [12, "gGov"]];
    let h = '<div class="ep"><h2>' + st("topSum") + '</h2><div class="d">' + esc(st("topD", E.at)) + '</div><div class="sc"><table><tr><th>' + st("srv") + '</th>' + cols.map(c => '<th class="n">' + st(c[1]) + '</th>').join("") + '<th class="n">' + st("gPub") + '</th></tr>' +
      KS.map(k => '<tr' + (k === 700 ? ' class="us"' : '') + '><td>' + kb(k) + '</td>' + cols.map(c => { const v = avg(k, c[0]); return '<td class="n">' + (c[0] === 3 ? pw(v) : c[0] === 4 ? Math.round(v) : c[0] >= 9 ? v.toFixed(1) : v.toFixed(1) + 'M') + '</td>'; }).join("") + '<td class="n">' + all.filter(r => r[0] === k && r[12]).length + ' / ' + all.filter(r => r[0] === k).length + '</td></tr>').join("") + '</table></div></div>';
    const rows = all.filter(r => !TF || r[0] === TF).sort((a, b) => val(b, TS) - val(a, TS) || b[3] - a[3]);
    h += '<div class="ep"><h2>' + st("topList", rows.length) + '</h2><div class="chips"><b style="font-size:13px">' + st("srv") + '</b>' + [0].concat(KS).map(k => '<button data-tf="' + k + '"' + (TF === k ? ' class="on"' : '') + '>' + (k ? k : st("all")) + '</button>').join("") + '</div>' +
      '<div class="chips"><b style="font-size:13px">' + st("sort") + '</b>' + cols.map(c => '<button data-ts="' + c[0] + '"' + (TS === c[0] ? ' class="on"' : '') + '>' + st(c[1]) + '</button>').join("") + '</div>' +
      '<div class="sc"><table><tr><th class="n">' + st("rk") + '</th><th>' + st("nm") + '</th><th>' + st("srv") + '</th><th>' + st("al") + '</th><th>TC</th>' + cols.map(c => '<th class="n' + (TS === c[0] ? ' on' : '') + '">' + st(c[1]) + '</th>').join("") + '</tr>' +
      rows.map((r, i) => '<tr' + (r[0] === 700 ? ' class="us"' : '') + '><td class="n">' + (i + 1) + '</td><td class="nmc">' + esc(clean(r[1])) + '</td><td>' + kb(r[0]) + '</td><td>' + esc(r[2]) + '</td><td>' + esc(typeof tcLabel === "function" ? tcLabel(r[5]) : r[5]) + '</td><td class="n">' + pw(r[3]) + '</td><td class="n">' + (r[4] ? fmt(r[4]) : '·') + '</td>' +
        [6, 7, 8].map(i => '<td class="n">' + (r[i] == null ? '·' : r[i] + 'M') + '</td>').join("") + [9, 10, 11].map(i => '<td class="n">' + (r[i] == null ? '·' : (i === 9 ? '+' : 'Lv ') + r[i]) + '</td>').join("") +
        '<td class="n">' + (r[12] ? 'Lv ' + r[12][0] + ' · ' + st("gem") + ' ' + r[12][1] : '<span style="color:var(--sub)">' + st("gHide") + '</span>') + '</td></tr>').join("") +
      '</table></div><div class="d" style="margin-top:8px">' + esc(st("topNote")) + '</div></div>';
    return h;
  }
  let bound = false;
  window.renderEmp = () => {
    const V = $("vEmp");
    if (!V) return;
    if (!bound) {
      bound = true;
      V.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; if (b.dataset.s) SORT = +b.dataset.s; if (b.dataset.f != null) FIL = +b.dataset.f; if (b.dataset.fa) FA = +b.dataset.fa; if (b.dataset.tab) TAB = b.dataset.tab; if (b.dataset.ts) TS = +b.dataset.ts; if (b.dataset.tf != null) TF = +b.dataset.tf; render(); });
    }
    render();
  };
  // 주소(#emp)로 바로 열었을 때: 메뉴가 이 파일보다 먼저 정해지므로 여기서 한 번 그린다
  if (typeof VIEW !== "undefined" && VIEW === "emp") window.renderEmp();
})();
