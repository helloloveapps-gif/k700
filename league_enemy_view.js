// 성검 리그전 → 적군 정보(이박사님 11-15). 자료는 league_enemy.js(enemy_league.py 가 MightPulse 에서 만든다)
(function () {
  const css = `
#vLEnemy .le{background:#0e1611;color:#d9e7d3;border:1px solid #2c4232;border-radius:14px;padding:14px;margin-bottom:12px}
#vLEnemy h2{margin:0 0 6px;font-size:17px;color:#e9d48a;border:none;padding:0}
#vLEnemy h3{margin:4px 0 8px;font-size:15px;color:#e9d48a}
#vLEnemy .d{font-size:12.5px;color:#9fb59a;margin-bottom:10px;line-height:1.5}
#vLEnemy .lescroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
#vLEnemy table{border-collapse:collapse;width:100%;font-size:13px;font-variant-numeric:tabular-nums}
#vLEnemy th,#vLEnemy td{padding:6px 8px;border-bottom:1px solid #22352a;text-align:right;white-space:nowrap}
#vLEnemy th{color:#9fb59a;font-weight:600;font-size:12px;position:sticky;top:0;background:#0e1611}
#vLEnemy td.nm,#vLEnemy th.nm{text-align:left;white-space:normal;min-width:110px;word-break:break-all}
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
      c: ["#", "이름", "시련", "TG", "전투력", "펫 전투력", "거장 전투력"], ol: "우리 참전 30 — 비교", miss: "자료 없음", nm: "명", rg: "순위 구간별 시련 비교", rgd: "시련 순으로 줄 세워 같은 순위끼리 견준다({0} 시련 상위 30 vs 우리 참전 30). 차이 + = {0} 쪽이 높음(빨강), − = 우리 쪽이 높음(초록).", rk: "시련 순위", gap: "차이", span: "범위", th: "위", one: "▸ 1:1 순위 비교(펼치기)"},
    zh: {h: "🛡 敵軍情報 — {0} 伺服器 {1}", d: "資料：{0} · {1} 更新。試煉 = 神秘試煉分數 · TG8 = 城鎮最高階段。寵物 · 大師戰力只顯示該伺服器前 100 名（— = 100 名外）。",
      sum: "一覽", all: "{0} 全員", top: "{0} 試煉前 30", ours: "我方參戰 30", cnt: "人數", tg8: "TG8", avg: "試煉平均", tot: "試煉合計", pw: "戰力合計", top3: "試煉 3000 以上",
      bk: "試煉區間人數", band: "試煉區間", none: "0（無紀錄）", tgd: "{0} TG 分布",
      list: "{0} 成員", byM: "依試煉", byP: "依寵物戰力", byA: "依大師戰力", byW: "依戰力",
      c: ["#", "名字", "試煉", "TG", "戰力", "寵物戰力", "大師戰力"], ol: "我方參戰 30 — 比較", miss: "無資料", nm: "人", rg: "試煉排名區間比較", rgd: "依試煉排序，同名次互相比較（{0} 試煉前 30 vs 我方參戰 30）。差距 + = {0} 較高（紅），− = 我方較高（綠）。", rk: "試煉名次", gap: "差距", span: "範圍", th: " 名", one: "▸ 1:1 名次比較（展開）"},
    en: {h: "🛡 Enemy intel — K{0} {1}", d: "Source: {0} · updated {1}. Trial = Mystic Trial score · TG8 = top Town Center tier. Pet and Master power show only for the kingdom's top 100 (— = outside).",
      sum: "Overview", all: "{0} all", top: "{0} top 30 by trial", ours: "Our 30 fighters", cnt: "Players", tg8: "TG8", avg: "Trial avg", tot: "Trial total", pw: "Total power", top3: "Trial 3000+",
      bk: "Players by trial band", band: "Trial band", none: "0 (no record)", tgd: "{0} TG spread",
      list: "{0} members", byM: "By trial", byP: "By pet power", byA: "By master power", byW: "By power",
      c: ["#", "Name", "Trial", "TG", "Power", "Pet power", "Master power"], ol: "Our 30 fighters — compare", miss: "no data", nm: "", rg: "Trial by rank group", rgd: "Both sides sorted by trial, same ranks compared ({0} top 30 vs our 30). Gap + = {0} higher (red), − = we are higher (green).", rk: "Trial rank", gap: "Gap", span: "Range", th: "", one: "▸ 1:1 rank comparison (expand)"}
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

  // 상대 서버 전체(이박사님 11-15): 연맹 수 · 상위 연맹 표 · 도시 배치 지도
  const COL = ["#e03131", "#f08c00", "#1c7ed6", "#37b24d", "#ae3ec9", "#0ca678", "#f783ac", "#fab005", "#74c0fc", "#a9e34b", "#ff922b", "#9775fa", "#66d9e8", "#ced4da", "#e599f7"];
  const S2 = {
    ko: {h: "🗺 {0}서버 전체", d: "영주 {0}명 · 지도 위 활동 {1}명 · 연맹 {2}개 · 서버 전투력 {3}. 위 15개 연맹은 연맹원 전원을 받아 TG8 · 시련 · 도시 위치를 셌다.",
      c: ["#", "연맹", "인원", "전투력", "TG8", "시련 3000+", "시련 2500+", "상위 30 시련 평균", "맹주"], rest: "16~100위 연맹 {0}개 · 전투력 합 {1} · 인원 {2}명",
      map: "도시 배치(위 15개 연맹 · 점 하나 = 도시 하나, 큰 점 = TG8, 가운데 ♛ = 왕좌)", note: "좌표는 MightPulse 가 마지막으로 본 위치라 이사한 사람은 옛 자리일 수 있다."},
    zh: {h: "🗺 {0} 伺服器全覽", d: "總督 {0} 人 · 地圖上活躍 {1} 人 · 聯盟 {2} 個 · 伺服器戰力 {3}。前 15 個聯盟已取得全員，統計 TG8 · 試煉 · 城市位置。",
      c: ["#", "聯盟", "人數", "戰力", "TG8", "試煉 3000+", "試煉 2500+", "前 30 試煉平均", "盟主"], rest: "第 16~100 名聯盟 {0} 個 · 戰力合計 {1} · 人數 {2}",
      map: "城市分布（前 15 個聯盟 · 一點 = 一座城，大點 = TG8，中央 ♛ = 王座）", note: "座標是 MightPulse 最後看到的位置，搬家的人可能還在舊位置。"},
    en: {h: "🗺 Kingdom {0} overview", d: "{0} governors · {1} active on the map · {2} alliances · kingdom power {3}. The top 15 alliances were loaded in full for TG8, trial and city positions.",
      c: ["#", "Alliance", "Members", "Power", "TG8", "Trial 3000+", "Trial 2500+", "Top-30 trial avg", "Leader"], rest: "Alliances #16–100: {0} · power {1} · {2} members",
      map: "City layout (top 15 alliances · one dot = one city, big dot = TG8, ♛ = throne)", note: "Positions are where MightPulse last saw each city; recent movers may show their old spot."}
  };
  function srvHtml(D, t) {
    const s = S2[CUR() === "ko" ? "ko" : CUR() === "zh" ? "zh" : "en"], V = D.srv, A = V.al, full = A.filter(a => a.xy);
    let h = '<div class="le"><h3>' + esc(f(s.h, D.ek)) + '</h3><div class="d">' + esc(f(s.d, num(V.pc), num(V.act), num(V.ac), big(V.pw))) + '</div>';
    h += '<div class="lescroll"><table><tr>' + s.c.map((c, i) => '<th' + (i === 1 || i === 8 ? ' class="nm"' : '') + '>' + c + '</th>').join("") + '</tr>';
    full.forEach((a, i) => {
      const me = a.t === D.tag;
      h += '<tr' + (me ? ' style="background:rgba(201,162,39,.12)"' : '') + '><td><span class="bar" style="width:10px;height:10px;border-radius:50%;background:' + COL[i] + '"></span> ' + (i + 1) + '</td><td class="nm"><b>' + esc(a.t) + '</b> <span class="rk">' + esc(a.nm) + '</span></td><td>' + a.c + '</td><td class="b">' + big(a.pw) + '</td><td' + (a.tg8 ? ' class="tg8"' : '') + '>' + a.tg8 + '</td><td>' + (a.m3 || '—') + '</td><td>' + (a.m25 || '—') + '</td><td>' + (a.m30 ? num(a.m30) : '—') + '</td><td class="nm">' + esc(a.ld) + '</td></tr>';
    });
    const rest = A.slice(full.length);
    h += '</table></div><div class="d" style="margin-top:8px">' + esc(f(s.rest, rest.length, big(rest.reduce((x, a) => x + a.pw, 0)), num(rest.reduce((x, a) => x + a.c, 0)))) + '</div>';
    // 지도(맵 0~1200)
    const W = 1200;
    let g = '<rect x="0" y="0" width="' + W + '" height="' + W + '" fill="#0a120d" stroke="#2c4232"/>';
    for (let i = 200; i < W; i += 200) g += '<line x1="' + i + '" y1="0" x2="' + i + '" y2="' + W + '" stroke="#16241a"/><line x1="0" y1="' + i + '" x2="' + W + '" y2="' + i + '" stroke="#16241a"/>';
    g += '<text x="600" y="616" text-anchor="middle" font-size="44" fill="#e9d48a">♛</text>';
    full.slice().reverse().forEach(a => { const c = COL[full.indexOf(a)]; a.xy.forEach(p => { g += '<circle cx="' + p[0] + '" cy="' + (W - p[1]) + '" r="' + (p[3] === 70 ? 9 : 5) + '" fill="' + c + '" fill-opacity=".85" stroke="#0a120d" stroke-width="1.5"/>'; }); });
    // 연맹 무리(가운데값) — 화면은 무리들과 왕좌가 다 들어오게 확대, 이름표는 겹치면 아래로 비킨다
    const mid = full.map(a => { const xs = a.xy.map(p => p[0]).sort((x, y) => x - y), ys = a.xy.map(p => p[1]).sort((x, y) => x - y); return xs.length ? [xs[xs.length >> 1], W - ys[ys.length >> 1]] : null; });
    const pts = mid.filter(Boolean).concat([[600, 600]]);
    let x0 = Math.min(...pts.map(p => p[0])) - 90, x1 = Math.max(...pts.map(p => p[0])) + 90, y0 = Math.min(...pts.map(p => p[1])) - 90, y1 = Math.max(...pts.map(p => p[1])) + 90;
    const side = Math.max(x1 - x0, y1 - y0, 300), cx0 = (x0 + x1) / 2, cy0 = (y0 + y1) / 2;
    x0 = Math.max(0, Math.min(W - side, cx0 - side / 2)); y0 = Math.max(0, Math.min(W - side, cy0 - side / 2));
    const k = side / 600, used = [];
    mid.forEach((m, i) => {
      if (!m) return;
      const fs = (i < 5 ? 30 : 21) * k, w = (full[i].t.length * 0.62 + 0.4) * fs;
      let y = m[1] - 12 * k;
      for (let n = 0; n < 12 && used.some(u => Math.abs(u[0] - m[0]) < (u[2] + w) / 2 && Math.abs(u[1] - y) < fs * 0.95); n++) y += fs;
      used.push([m[0], y, w]);
      g += '<text x="' + m[0] + '" y="' + y.toFixed(0) + '" text-anchor="middle" font-size="' + fs.toFixed(0) + '" font-weight="900" fill="' + COL[i] + '" stroke="#000" stroke-width="' + (5 * k).toFixed(1) + '" paint-order="stroke">' + esc(full[i].t) + '</text>';
    });
    h += '<div class="d" style="margin-top:12px">' + esc(s.map) + '</div><svg viewBox="' + x0.toFixed(0) + ' ' + y0.toFixed(0) + ' ' + side.toFixed(0) + ' ' + side.toFixed(0) + '" style="width:100%;max-width:640px;display:block;margin:0 auto;border-radius:10px">' + g + '</svg><div class="d" style="margin-top:6px">' + esc(s.note) + '</div></div>';
    return h;
  }

  window.renderLEnemy = function () {
    const box = document.getElementById("vLEnemy"), D = window.LEAGUE_ENEMY, t = L();
    if (!box || !D) return;
    const en = D.en, top = en.slice().sort((a, b) => b.mt - a.mt).slice(0, 30), ours = D.ours;
    const S = [stat(en), stat(top), stat(ours)];
    let h = '<div class="le"><h2>' + esc(f(t.h, D.ek, D.tag)) + '</h2><div class="d">' + esc(f(t.d, D.src, D.at)) + '</div>';
    // 한눈에
    h += '<h3>' + t.sum + '</h3><div class="lescroll"><table><tr><th class="nm"></th><th>' + esc(f(t.all, D.tag)) + '</th><th>' + esc(f(t.top, D.tag)) + '</th><th>' + t.ours + '</th></tr>';
    const row = (k, g, bold) => '<tr><td class="nm">' + k + '</td>' + S.map((s, i) => '<td' + (bold && i ? ' class="b"' : '') + '>' + g(s) + '</td>').join("") + '</tr>';
    h += row(t.cnt, s => s.n + t.nm) + row(t.tg8, s => s.tg8 + t.nm, true) + row(t.avg, s => num(s.avg), true) + row(t.tot, s => num(s.tot)) + row(t.top3, s => s.t3 + t.nm, true) + row(t.pw, s => big(s.pw));
    h += '</table></div></div>';
    if (D.srv) h += srvHtml(D, t);
    // 순위 구간별 시련 비교(이박사님 11-15): 시련 순 1~6 · 7~12 … 25~30 끼리 평균 · 범위 · 차이, 아래 1:1
    const os = ours.slice().sort((a, b) => b.mt - a.mt), gs = [[0, 6], [6, 12], [12, 18], [18, 24], [24, 30]];
    const avgOf = rows => { const v = rows.filter(x => x.mt); return v.length ? Math.round(v.reduce((a, x) => a + x.mt, 0) / v.length) : 0; };
    const rng = rows => { const v = rows.filter(x => x.mt).map(x => x.mt); return v.length ? num(Math.min(...v)) + '–' + num(Math.max(...v)) : '—'; };
    const dif = d => '<td class="b" style="color:' + (d > 0 ? '#ff7b5c' : d < 0 ? '#6fd08c' : '#9fb59a') + '">' + (d > 0 ? '+' : '') + num(d) + '</td>';
    h += '<div class="le"><h3>' + t.rg + '</h3><div class="d">' + esc(f(t.rgd, D.tag)) + '</div><div class="lescroll"><table><tr><th class="nm">' + t.rk + '</th><th>' + esc(D.tag) + ' ' + t.avg + '</th><th>' + t.ours + ' ' + t.avg + '</th><th>' + t.gap + '</th><th>' + esc(D.tag) + ' ' + t.span + '</th><th>' + t.ours + ' ' + t.span + '</th></tr>';
    gs.forEach(([a, b]) => { const A = top.slice(a, b), B = os.slice(a, b), x = avgOf(A), y = avgOf(B); h += '<tr><td class="nm">' + (a + 1) + '~' + b + t.th + '</td><td class="b">' + num(x) + '</td><td class="b">' + num(y) + '</td>' + dif(x - y) + '<td>' + rng(A) + '</td><td>' + rng(B) + '</td></tr>'; });
    h += '</table></div><details style="margin-top:10px"><summary style="cursor:pointer;color:#9fb59a;font-size:13px">' + t.one + '</summary><div class="lescroll" style="margin-top:8px"><table><tr><th>#</th><th class="nm">' + esc(D.tag) + '</th><th>' + t.c[2] + '</th><th class="nm">' + t.ours + '</th><th>' + t.c[2] + '</th><th>' + t.gap + '</th></tr>';
    top.forEach((x, i) => { const y = os[i] || {n: "—", mt: 0}; h += '<tr><td>' + (i + 1) + '</td><td class="nm">' + esc(x.n) + '</td><td class="b">' + num(x.mt) + '</td><td class="nm">' + esc(y.n) + (y.miss ? ' <span class="rk">' + t.miss + '</span>' : '') + '</td><td class="b">' + num(y.mt) + '</td>' + (y.miss ? '<td>—</td>' : dif(x.mt - y.mt)) + '</tr>'; });
    h += '</table></div></details></div>';
    // 구간
    const cnt = rows => { const c = {}; rows.forEach(x => { const b = band(x.mt); c[b[0]] = (c[b[0]] || 0) + 1; }); return c; };
    const C = [cnt(en), cnt(top), cnt(ours)], mx = Math.max(1, ...BK.map(b => Math.max(C[1][b[0]] || 0, C[2][b[0]] || 0)));
    h += '<div class="le"><h3>' + t.bk + '</h3><div class="lescroll"><table><tr><th class="nm">' + t.band + '</th><th>' + esc(f(t.all, D.tag)) + '</th><th>' + esc(f(t.top, D.tag)) + '</th><th>' + t.ours + '</th><th class="nm"></th></tr>';
    BK.forEach(b => {
      if (!C[0][b[0]] && !C[2][b[0]]) return;
      const a = C[1][b[0]] || 0, o = C[2][b[0]] || 0;
      h += '<tr><td class="nm">' + (b[1] || t.none) + '</td><td>' + (C[0][b[0]] || 0) + '</td><td class="b">' + a + '</td><td class="b">' + o + '</td><td class="nm"><span class="bar" style="width:' + Math.round(a / mx * 60) + 'px"></span><br><span class="bar o" style="width:' + Math.round(o / mx * 60) + 'px"></span></td></tr>';
    });
    h += '</table></div>';
    const tgc = {}; en.forEach(x => { const k = tg(x.tc); tgc[k] = (tgc[k] || 0) + 1; });
    h += '<div class="d" style="margin-top:10px">' + esc(f(t.tgd, D.tag)) + ': ' + Object.entries(tgc).sort((a, b) => (en.find(x => tg(x.tc) === b[0]).tc) - (en.find(x => tg(x.tc) === a[0]).tc)).map(([k, v]) => '<b' + (k === "TG8" ? ' class="tg8"' : '') + '>' + k + '</b> ' + v).join(" · ") + '</div></div>';
    // 명단
    const key = {mt: x => x.mt, pet: x => x.pet ? x.pet[0] : -1, mas: x => x.mas ? x.mas[0] : -1, pw: x => x.pw};
    const list = rows => rows.slice().sort((a, b) => key[SORT](b) - key[SORT](a));
    const cell = v => v ? big(v[0]) + '<span class="rk">#' + v[1] + '</span>' : '—';
    const tbl = rows => '<div class="lescroll"><table><tr>' + t.c.map((c, i) => '<th' + (i === 1 ? ' class="nm"' : '') + '>' + c + '</th>').join("") + '</tr>' + list(rows).map((x, i) =>
      '<tr><td>' + (i + 1) + '</td><td class="nm">' + (x.mt >= 3000 ? '<span class="star">★</span> ' : '') + esc(x.n) + (x.miss ? ' <span class="rk">' + t.miss + '</span>' : '') + '</td><td class="b">' + num(x.mt) + (x.mr ? '<span class="rk">#' + x.mr + '</span>' : '') + '</td><td' + (x.tc === 70 ? ' class="tg8"' : '') + '>' + tg(x.tc) + '</td><td>' + big(x.pw) + '</td><td>' + cell(x.pet) + '</td><td>' + cell(x.mas) + '</td></tr>').join("") + '</table></div>';
    const tabs = '<div class="tabs">' + [["mt", t.byM], ["pet", t.byP], ["mas", t.byA], ["pw", t.byW]].map(([k, v]) => '<button data-s="' + k + '"' + (SORT === k ? ' class="on"' : '') + '>' + v + '</button>').join("") + '</div>';
    h += '<div class="le"><h3>' + esc(f(t.list, D.tag)) + ' (' + en.length + t.nm + ')</h3>' + tabs + tbl(en) + '</div>';
    h += '<div class="le"><h3>' + t.ol + '</h3>' + tabs + tbl(ours) + '</div>';
    box.innerHTML = h;
    box.querySelectorAll(".tabs button").forEach(b => b.onclick = () => { SORT = b.dataset.s; renderLEnemy(); });
  };
})();
if (typeof VIEW !== "undefined" && VIEW === "lenemy") window.renderLEnemy();   // #lenemy 로 바로 열었을 때(이 파일이 setView 뒤에 읽힘)
