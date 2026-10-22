// 엠페럴 정보 — 다른 서버(737 · 719 · 710)와 우리(700)의 정예 비교. 출처 jeabslist(2026-10-22 받음)
// sv: 서버마다 시련 점수대 인원(T 순서) · 전투력 10억+ · 상위 연맹 · KvK [성 점령, 함락, 준비 승, 패]
// pl: 시련 3,000+ [서버, 닉네임, 연맹, 시련, 전투력(백만), 펫투력(백만), 거장투력(백만), 영웅 총전투력(백만)]
(() => {
  const D = {"at":"2026-10-22","T":[3500,3400,3300,3200,3000,2700,2500],"sv":{"700":{"b":[0,0,0,0,3,10,18],"b1":2,"n":637,"top":[["NeX",94,431],["AEH",95,342],["LoV",96,167]],"kv":[3,5,5,9]},"710":{"b":[2,5,6,7,11,23,38],"b1":3,"n":681,"top":[["710",81,399],["RED",85,338],["SKY",96,305]],"kv":[5,2,5,9]},"719":{"b":[3,4,5,5,8,15,19],"b1":6,"n":618,"top":[["KOR",100,507],["TFF",82,299],["TFK",79,140]],"kv":[6,2,7,6]},"737":{"b":[2,3,3,4,7,10,19],"b1":3,"n":598,"top":[["KOR",97,499],["GGw",97,313],["DOM",95,200]],"kv":[3,4,6,7]}},
    "pl":[[737,"°꒰ঌＲＥΛＰＥＲ໒꒱°ᴷᴼᴿ","KOR",3413,1277,51.1,37,131],[737,"꒰ঌ C키즈ᶜᴷᴵᴰˢ ໒꒱༒࿐","KOR",3658,2509,57.8,46.9,193],[737,"°꒰ঌ ᎢΛΙᎫΙ ໒꒱°","KOR",3522,1572,53.4,38.6,165],[737,"༒커피향기 A R O M A༒","KOR",3020,736,32.1,27.5,113],[737,"༒ 찬 찬 K Y M ༒","KOR",3082,827,31.1,29.6,118],[737,"༒ E R I C ༒","KOR",3243,771,37.7,29.9,115],[737,"༒ 헨리 H E N R Y ༒","KOR",3077,701,35.1,32.2,107],[719,"꒰ঌ BL̇UEMÖÖƝ ໒꒱","KOR",3446,1306,49.6,39,141],[719,"꒰ঌ SONNY ໒꒱","KOR",3581,2312,53.9,38.6,167],[719,"꒰ঌ SOSO ໒꒱","KOR",3583,2011,52.4,43.3,181],[719,"꒰ঌ Magnus ໒꒱","KOR",3165,1027,43.2,24.7,117],[719,"꒰ঌ SÄNG JÏ ໒꒱","KOR",3334,1005,43,34,138],[719,"꒰ঌ Ari rang ໒꒱","KOR",3000,760,38,32.1,104],[719,"꒰ঌ ĊÖĊÖ ໒꒱","KOR",3000,626,38.6,30.3,108],[719,"꒰ঌ Gwangju ໒꒱","KOR",3551,1616,54.2,40.2,150],[710,"Khorr","710",3608,1826,57.9,47.4,182],[710,"Raddan","710",3418,1090,56.9,53.3,145],[710,"Julpaca","710",3485,936,51.8,32.3,136],[710,"Chunky","710",3633,921,57.4,45.6,117],[710,"ASSASSIN","710",3398,882,48.8,38.4,127],[710,"Woff","710",3004,710,34.5,25.9,96],[710,"漆黒堕天使SASAMIﾁｬﾝ໒꒱","710",3464,629,48.4,38.3,127],[710,"Andyᴾᴴ","710",3069,517,37.8,24.4,92],[710,"Qqq","710",3256,476,45.5,32.4,139],[710,"WEALTHY_ADS","710",3130,669,37,30.3,118],[710,"Darth Vader","RED",3106,419,45.8,32.2,81],[700,"Duby 1988","NeX",3000,1273,58.5,50,121],[700,"DA기부천사","NeX",3105,869,38.6,24.7,114],[700,"ᴮᴼˢˢ化神ᴳᵒᵈ","NeX",3028,748,33.5,29.2,103]]};
  const KS = [700, 710, 719, 737];
  const T = {
    ko: {h: "👑 엠페럴 정보 — 서버 정예 비교", d: "737 · 719 · 710 서버와 우리 700 서버의 시련 · 펫투력 · 거장투력 비교 (jeabslist {0} 기준, 서버마다 상위 12개 연맹)", srv: "서버", band: "시련 점수대 인원", b1: "전투력 10억+", top: "상위 연맹 (인원 · 전투력)", kv: "KvK 성 점령 / 함락", ppl: "시련 3,000+ 정예 {0}명", sort: "정렬", sM: "시련", sPet: "펫투력", sMs: "거장투력", sP: "전투력", sH: "영웅", all: "전체", rk: "#", nm: "이름", al: "연맹", sum: "서버별 평균 (시련 3,000+)", n: "명", avg: "평균", e: "억", note: "펫투력 · 거장투력은 jeabslist 개인 순위(Total Pet Power · Master Total Power)에서 한 명씩 받은 값입니다. 서버 전체 순위가 아니라 시련 3,000+ 인원만 대상입니다."},
    en: {h: "👑 Emperor info — elite comparison", d: "Mystic Trial · pet power · master power for kingdoms 737 · 719 · 710 vs our 700 (jeabslist, {0}; top 12 alliances each)", srv: "Kingdom", band: "Players by Mystic Trial score", b1: "Power 1B+", top: "Top alliances (members · power)", kv: "KvK castles taken / lost", ppl: "{0} elites with Mystic Trial 3,000+", sort: "Sort", sM: "Trial", sPet: "Pet", sMs: "Master", sP: "Power", sH: "Hero", all: "All", rk: "#", nm: "Name", al: "Alliance", sum: "Averages by kingdom (Trial 3,000+)", n: "", avg: "avg", e: "B", note: "Pet and master power come from each player's jeabslist personal rankings (Total Pet Power · Master Total Power). Only Mystic Trial 3,000+ players are included, not the whole kingdom."}
  };
  const st = (k, ...a) => { let s = (T[LANG === "ko" ? "ko" : "en"])[k]; a.forEach((v, i) => { s = s.split("{" + i + "}").join(v); }); return s; };
  const COLK = {700: "#3b5bdb", 710: "#e8590c", 719: "#2f9e44", 737: "#ae3ec9"};
  let SORT = 5, FIL = 0;
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
  function render() {
    const V = $("vEmp");
    if (!V) return;
    if (!document.getElementById("empCss")) { const s = document.createElement("style"); s.id = "empCss"; s.textContent = css; document.head.appendChild(s); }
    const kb = k => '<span class="kb" style="background:' + COLK[k] + '">' + k + '</span>';
    // ① 서버 비교
    let h = '<div class="ep"><h2>' + st("h") + '</h2><div class="d">' + esc(st("d", D.at)) + '</div><div class="sc"><table><tr><th>' + st("srv") + '</th>' + D.T.map(t => '<th class="n">' + fmt(t) + '+</th>').join("") + '<th class="n">' + st("b1") + '</th><th>' + st("kv") + '</th><th>' + st("top") + '</th></tr>' +
      KS.map(k => { const s = D.sv[k]; return '<tr' + (k === 700 ? ' class="us"' : '') + '><td>' + kb(k) + '</td>' + s.b.map(v => '<td class="n">' + v + '</td>').join("") + '<td class="n">' + s.b1 + '</td><td>' + (s.kv ? s.kv[0] + ' / ' + s.kv[1] : '·') + '</td><td>' + s.top.map(a => esc(a[0]) + ' ' + a[1] + st("n") + '·' + pw(a[2] * 100)).join(" | ") + '</td></tr>'; }).join("") + '</table></div></div>';
    // ② 서버별 평균
    const avg = (k, i) => { const r = D.pl.filter(x => x[0] === k); return r.length ? r.reduce((t, x) => t + x[i], 0) / r.length : 0; };
    const mx = [3, 5, 6].map(i => Math.max(...KS.map(k => avg(k, i))));
    h += '<div class="ep"><h2>' + st("sum") + '</h2><div class="sc"><table><tr><th>' + st("srv") + '</th><th class="n">' + st("n") + '</th><th>' + st("sM") + '</th><th>' + st("sPet") + '</th><th>' + st("sMs") + '</th></tr>' +
      KS.map(k => '<tr' + (k === 700 ? ' class="us"' : '') + '><td>' + kb(k) + '</td><td class="n">' + D.pl.filter(x => x[0] === k).length + '</td>' + [3, 5, 6].map((i, j) => { const v = avg(k, i); return '<td>' + (i === 3 ? Math.round(v) : v.toFixed(1) + 'M') + '<span class="bar" style="width:' + Math.round(v / mx[j] * 70) + 'px;background:' + COLK[k] + '"></span></td>'; }).join("") + '</tr>').join("") + '</table></div></div>';
    // ③ 정예 명단
    const cols = [[3, "sM"], [5, "sPet"], [6, "sMs"], [4, "sP"], [7, "sH"]];
    const rows = D.pl.filter(x => !FIL || x[0] === FIL).slice().sort((a, b) => b[SORT] - a[SORT] || b[3] - a[3]);
    h += '<div class="ep"><h2>' + st("ppl", rows.length) + '</h2><div class="chips"><b style="font-size:13px">' + st("srv") + '</b>' + [0].concat(KS).map(k => '<button data-f="' + k + '"' + (FIL === k ? ' class="on"' : '') + '>' + (k ? k : st("all")) + '</button>').join("") + '</div>' +
      '<div class="chips"><b style="font-size:13px">' + st("sort") + '</b>' + cols.map(c => '<button data-s="' + c[0] + '"' + (SORT === c[0] ? ' class="on"' : '') + '>' + st(c[1]) + '</button>').join("") + '</div>' +
      '<div class="sc"><table><tr><th class="n">' + st("rk") + '</th><th>' + st("nm") + '</th><th>' + st("srv") + '</th><th>' + st("al") + '</th>' + cols.map(c => '<th class="n' + (SORT === c[0] ? ' on' : '') + '">' + st(c[1]) + '</th>').join("") + '</tr>' +
      rows.map((x, i) => '<tr' + (x[0] === 700 ? ' class="us"' : '') + '><td class="n">' + (i + 1) + '</td><td class="nmc">' + esc(clean(x[1])) + '</td><td>' + kb(x[0]) + '</td><td>' + esc(x[2]) + '</td><td class="n">' + fmt(x[3]) + '</td><td class="n">' + x[5].toFixed(1) + 'M</td><td class="n">' + x[6].toFixed(1) + 'M</td><td class="n">' + pw(x[4]) + '</td><td class="n">' + x[7] + 'M</td></tr>').join("") +
      '</table></div><div class="d" style="margin-top:8px">' + esc(st("note")) + '</div></div>';
    V.innerHTML = h;
  }
  let bound = false;
  window.renderEmp = () => {
    const V = $("vEmp");
    if (!V) return;
    if (!bound) {
      bound = true;
      V.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; if (b.dataset.s) SORT = +b.dataset.s; if (b.dataset.f != null) FIL = +b.dataset.f; render(); });
    }
    render();
  };
})();
