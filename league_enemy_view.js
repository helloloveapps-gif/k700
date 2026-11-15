// 성검 리그전 → 적군 정보(이박사님 11-15). 자료는 league_enemy.js(enemy_league.py 가 MightPulse 에서 만든다)
(function () {
  const css = `
#vLEnemy .le{background:#0e1611;color:#d9e7d3;border:1px solid #2c4232;border-radius:14px;padding:14px;margin-bottom:12px}
#vLEnemy h2{margin:0 0 6px;font-size:17px;color:#e9d48a;border:none;padding:0}
#vLEnemy h3{margin:4px 0 8px;font-size:15px;color:#e9d48a}
#vLEnemy .d{font-size:12.5px;color:#9fb59a;margin-bottom:10px;line-height:1.5}
#vLEnemy .tw{overflow-x:auto;-webkit-overflow-scrolling:touch}
#vLEnemy table{border-collapse:collapse;width:100%;font-size:13px;font-variant-numeric:tabular-nums}
#vLEnemy th,#vLEnemy td{padding:6px 8px;border-bottom:1px solid #22352a;text-align:right;white-space:nowrap}
#vLEnemy th{color:#9fb59a;font-weight:600;font-size:12px;position:sticky;top:0;background:#0e1611}
#vLEnemy td.n,#vLEnemy th.n{text-align:left;white-space:normal;min-width:110px;word-break:break-all}
#vLEnemy td.b{color:#e9d48a;font-weight:800}
#vLEnemy .tg8{color:#f0b232;font-weight:800}
#vLEnemy .rk{color:#6f8a6b;font-size:11px;margin-left:3px}
#vLEnemy .tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
#vLEnemy .tabs button{background:#16241a;color:#cfe0c8;border:1px solid #2c4232;border-radius:999px;padding:6px 12px;font-size:13px;cursor:pointer}
#vLEnemy .tabs button.on{background:#c9a227;color:#1b1208;border-color:#c9a227;font-weight:800}
#vLEnemy .bar{height:8px;background:#c9a227;border-radius:4px;display:inline-block;vertical-align:middle}
#vLEnemy .bar.o{background:#4c9a6a}
#vLEnemy .star{color:#ff7b5c;font-weight:800}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const T = {
    ko: {h: "🛡 적군 정보 — {0}서버 {1}", d: "자료: {0} · {1} 갱신. 시련 = 미스틱 시련 점수 · TG8 = 도시 최고 단계. 펫 · 거장 전투력은 그 서버 100위 안에 든 사람만 나온다(— = 100위 밖).",
      sum: "한눈에", all: "{0} 전원", top: "{0} 시련 상위 30", ours: "우리 참전 30", cnt: "인원", tg8: "TG8", avg: "시련 평균", tot: "시련 합계", pw: "전투력 합계", top3: "시련 3000 넘는 사람",
      bk: "시련 구간별 인원", band: "시련 구간", none: "0(기록 없음)", tgd: "{0} TG 분포",
      list: "{0} 연맹원", byM: "시련 순", byP: "펫 전투력 순", byA: "거장 전투력 순", byW: "전투력 순",
      c: ["#", "이름", "시련", "TG", "전투력", "펫 전투력", "거장 전투력"], ol: "우리 참전 30 — 비교", miss: "자료 없음", nm: "명"},
    zh: {h: "🛡 敵軍情報 — {0} 伺服器 {1}", d: "資料：{0} · {1} 更新。試煉 = 神秘試煉分數 · TG8 = 城鎮最高階段。寵物 · 大師戰力只顯示該伺服器前 100 名（— = 100 名外）。",
      sum: "一覽", all: "{0} 全員", top: "{0} 試煉前 30", ours: "我方參戰 30", cnt: "人數", tg8: "TG8", avg: "試煉平均", tot: "試煉合計", pw: "戰力合計", top3: "試煉 3000 以上",
      bk: "試煉區間人數", band: "試煉區間", none: "0（無紀錄）", tgd: "{0} TG 分布",
      list: "{0} 成員", byM: "依試煉", byP: "依寵物戰力", byA: "依大師戰力", byW: "依戰力",
      c: ["#", "名字", "試煉", "TG", "戰力", "寵物戰力", "大師戰力"], ol: "我方參戰 30 — 比較", miss: "無資料", nm: "人"},
    en: {h: "🛡 Enemy intel — K{0} {1}", d: "Source: {0} · updated {1}. Trial = Mystic Trial score · TG8 = top Town Center tier. Pet and Master power show only for the kingdom's top 100 (— = outside).",
      sum: "Overview", all: "{0} all", top: "{0} top 30 by trial", ours: "Our 30 fighters", cnt: "Players", tg8: "TG8", avg: "Trial avg", tot: "Trial total", pw: "Total power", top3: "Trial 3000+",
      bk: "Players by trial band", band: "Trial band", none: "0 (no record)", tgd: "{0} TG spread",
      list: "{0} members", byM: "By trial", byP: "By pet power", byA: "By master power", byW: "By power",
      c: ["#", "Name", "Trial", "TG", "Power", "Pet power", "Master power"], ol: "Our 30 fighters — compare", miss: "no data", nm: ""}
  };
  const CUR = () => (typeof LANG !== "undefined" ? LANG : "ko");
  const L = () => { const l = CUR(); return T[l === "ko" ? "ko" : l === "zh" ? "zh" : "en"]; };
  const f = (s, ...a) => String(s).replace(/\{(\d)\}/g, (m, n) => a[+n] == null ? "" : a[+n]);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  const num = n => (n || 0).toLocaleString("en-US");
  const big = n => { if (!n) return "—"; const ko = CUR() === "ko"; return ko ? (n >= 1e8 ? (n / 1e8).toFixed(2) + "억" : Math.round(n / 1e4) + "만") : (n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : (n / 1e6).toFixed(1) + "M"); };
  const tg = v => { if (!v) return "—"; if (v <= 30) return "TC" + v; const t = Math.floor((v - 30) / 5), s = (v - 30) % 5; return t ? "TG" + t + (s ? "-" + s : "") : "TC30-" + s; };
  const BK = [[3000, "3000+"], [2800, "2800–2999"], [2600, "2600–2799"], [2400, "2400–2599"], [2200, "2200–2399"], [2000, "2000–2199"], [1500, "1500–1999"], [1, "1–1499"], [0, null]];
  const band = m => BK.find(b => m >= b[0]);
  const stat = rows => { const mt = rows.filter(x => x.mt).map(x => x.mt); return {n: rows.length, tg8: rows.filter(x => x.tc === 70).length, avg: mt.length ? Math.round(mt.reduce((a, b) => a + b, 0) / mt.length) : 0, tot: mt.reduce((a, b) => a + b, 0), pw: rows.reduce((a, x) => a + (x.pw || 0), 0), t3: rows.filter(x => x.mt >= 3000).length}; };
  let SORT = "mt";

  window.renderLEnemy = function () {
    const box = document.getElementById("vLEnemy"), D = window.LEAGUE_ENEMY, t = L();
    if (!box || !D) return;
    const en = D.en, top = en.slice().sort((a, b) => b.mt - a.mt).slice(0, 30), ours = D.ours;
    const S = [stat(en), stat(top), stat(ours)];
    let h = '<div class="le"><h2>' + esc(f(t.h, D.ek, D.tag)) + '</h2><div class="d">' + esc(f(t.d, D.src, D.at)) + '</div>';
    // 한눈에
    h += '<h3>' + t.sum + '</h3><div class="tw"><table><tr><th class="n"></th><th>' + esc(f(t.all, D.tag)) + '</th><th>' + esc(f(t.top, D.tag)) + '</th><th>' + t.ours + '</th></tr>';
    const row = (k, g, bold) => '<tr><td class="n">' + k + '</td>' + S.map((s, i) => '<td' + (bold && i ? ' class="b"' : '') + '>' + g(s) + '</td>').join("") + '</tr>';
    h += row(t.cnt, s => s.n + t.nm) + row(t.tg8, s => s.tg8 + t.nm, true) + row(t.avg, s => num(s.avg), true) + row(t.tot, s => num(s.tot)) + row(t.top3, s => s.t3 + t.nm, true) + row(t.pw, s => big(s.pw));
    h += '</table></div></div>';
    // 구간
    const cnt = rows => { const c = {}; rows.forEach(x => { const b = band(x.mt); c[b[0]] = (c[b[0]] || 0) + 1; }); return c; };
    const C = [cnt(en), cnt(top), cnt(ours)], mx = Math.max(1, ...BK.map(b => Math.max(C[1][b[0]] || 0, C[2][b[0]] || 0)));
    h += '<div class="le"><h3>' + t.bk + '</h3><div class="tw"><table><tr><th class="n">' + t.band + '</th><th>' + esc(f(t.all, D.tag)) + '</th><th>' + esc(f(t.top, D.tag)) + '</th><th>' + t.ours + '</th><th class="n"></th></tr>';
    BK.forEach(b => {
      if (!C[0][b[0]] && !C[2][b[0]]) return;
      const a = C[1][b[0]] || 0, o = C[2][b[0]] || 0;
      h += '<tr><td class="n">' + (b[1] || t.none) + '</td><td>' + (C[0][b[0]] || 0) + '</td><td class="b">' + a + '</td><td class="b">' + o + '</td><td class="n"><span class="bar" style="width:' + Math.round(a / mx * 60) + 'px"></span><br><span class="bar o" style="width:' + Math.round(o / mx * 60) + 'px"></span></td></tr>';
    });
    h += '</table></div>';
    const tgc = {}; en.forEach(x => { const k = tg(x.tc); tgc[k] = (tgc[k] || 0) + 1; });
    h += '<div class="d" style="margin-top:10px">' + esc(f(t.tgd, D.tag)) + ': ' + Object.entries(tgc).sort((a, b) => (en.find(x => tg(x.tc) === b[0]).tc) - (en.find(x => tg(x.tc) === a[0]).tc)).map(([k, v]) => '<b' + (k === "TG8" ? ' class="tg8"' : '') + '>' + k + '</b> ' + v).join(" · ") + '</div></div>';
    // 명단
    const key = {mt: x => x.mt, pet: x => x.pet ? x.pet[0] : -1, mas: x => x.mas ? x.mas[0] : -1, pw: x => x.pw};
    const list = rows => rows.slice().sort((a, b) => key[SORT](b) - key[SORT](a));
    const cell = v => v ? big(v[0]) + '<span class="rk">#' + v[1] + '</span>' : '—';
    const tbl = rows => '<div class="tw"><table><tr>' + t.c.map((c, i) => '<th' + (i === 1 ? ' class="n"' : '') + '>' + c + '</th>').join("") + '</tr>' + list(rows).map((x, i) =>
      '<tr><td>' + (i + 1) + '</td><td class="n">' + (x.mt >= 3000 ? '<span class="star">★</span> ' : '') + esc(x.n) + (x.miss ? ' <span class="rk">' + t.miss + '</span>' : '') + '</td><td class="b">' + num(x.mt) + (x.mr ? '<span class="rk">#' + x.mr + '</span>' : '') + '</td><td' + (x.tc === 70 ? ' class="tg8"' : '') + '>' + tg(x.tc) + '</td><td>' + big(x.pw) + '</td><td>' + cell(x.pet) + '</td><td>' + cell(x.mas) + '</td></tr>').join("") + '</table></div>';
    const tabs = '<div class="tabs">' + [["mt", t.byM], ["pet", t.byP], ["mas", t.byA], ["pw", t.byW]].map(([k, v]) => '<button data-s="' + k + '"' + (SORT === k ? ' class="on"' : '') + '>' + v + '</button>').join("") + '</div>';
    h += '<div class="le"><h3>' + esc(f(t.list, D.tag)) + ' (' + en.length + t.nm + ')</h3>' + tabs + tbl(en) + '</div>';
    h += '<div class="le"><h3>' + t.ol + '</h3>' + tabs + tbl(ours) + '</div>';
    box.innerHTML = h;
    box.querySelectorAll(".tabs button").forEach(b => b.onclick = () => { SORT = b.dataset.s; renderLEnemy(); });
  };
})();
if (typeof VIEW !== "undefined" && VIEW === "lenemy") window.renderLEnemy();   // #lenemy 로 바로 열었을 때(이 파일이 setView 뒤에 읽힘)
