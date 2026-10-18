// 성검 쟁탈 작전실 — ① 군단 명단(참전 20 · 후보 10) → ② 집결장 → 집결원 자동 배치 → ③ 단계별(초반 · 중반 · 후반) 작전 지도 → ④ 브리핑
// 저장: 편성 설정 시트에 ally "SWORD" 줄을 쌓고, 닉네임 칸에 JSON {a: 연맹, L: [군단1, 군단2]} 을 넣는다. 연맹마다 가장 최근 것만 쓴다
// 규칙 · 점수 출처: 게임 안 [성검 쟁탈] 규칙 설명(디시 킹샷 갤 8533 캡처), kingshotguide · kingshothandbook 공략
(() => {
  // 건물 11개. x · y 는 전장 그림(파란 진영 왼쪽, 빨간 진영 오른쪽)에서의 자리. ph = 열리는 단계, f = 첫 점령, m = 분당(연맹 점수)
  const B = [
    {id: "alt", ko: "성검 제단", en: "Swordshrine", ph: 2, f: 9000, m: 1800, x: 225, y: 182, k: "alt"},
    {id: "sa1", ko: "성소 (서)", en: "Sanctum W", ph: 1, f: 6000, m: 1200, x: 122, y: 150, k: "san"},
    {id: "sa2", ko: "성소 (동)", en: "Sanctum E", ph: 1, f: 6000, m: 1200, x: 328, y: 214, k: "san"},
    {id: "ab1", ko: "수도원 북서", en: "Abbey NW", ph: 1, f: 3000, m: 600, x: 158, y: 60, k: "abb"},
    {id: "ab2", ko: "수도원 북동", en: "Abbey NE", ph: 1, f: 3000, m: 600, x: 284, y: 64, k: "abb"},
    {id: "ab3", ko: "수도원 남서", en: "Abbey SW", ph: 1, f: 3000, m: 600, x: 166, y: 300, k: "abb"},
    {id: "ab4", ko: "수도원 남동", en: "Abbey SE", ph: 1, f: 3000, m: 600, x: 292, y: 304, k: "abb"},
    {id: "sta", ko: "마구간", en: "Royal Stables", ph: 1, f: 1200, m: 240, x: 96, y: 212, k: "sta", fx: {ko: "고급 이전 충전 −50%", en: "Teleport recharge −50%"}},
    {id: "bel", ko: "시계탑", en: "Bell Tower", ph: 1, f: 1200, m: 240, x: 354, y: 152, k: "bel", fx: {ko: "건물 점령 시간 −50%", en: "Capture time −50%"}},
    {id: "mer", ko: "용병 주둔지", en: "Mercenary Camp", ph: 2, f: 1200, m: 240, x: 225, y: 100, k: "mer", fx: {ko: "적군 건물 공격용 용병 파견", en: "Mercenaries weaken enemy buildings"}},
    {id: "hal", ko: "교화의 홀", en: "Hall of Reformation", ph: 2, f: 1200, m: 240, x: 225, y: 266, k: "hal", fx: {ko: "부대 공방 +15% / −15%", en: "Troop ATK/DEF +15% / −15%"}}
  ];
  const ICON = {alt: "🗡", san: "⛪", abb: "🏰", sta: "🐎", bel: "🔔", mer: "⚔", hal: "🛡"};
  const BLUE = [22, 182], RED = [428, 182];
  const LC = ["#ffd43b", "#ff922b", "#74c0fc", "#b197fc", "#63e6be", "#f783ac", "#ced4da", "#a9e34b"];   // 집결장 색
  const T = {
    ko: {
      h: "🗡 성검 쟁탈 작전실", sub: "군단 명단 → 집결장 → 집결원 자동 배치 → 단계별 작전 지도 → 브리핑. 1시간 전투 · 더 많은 [성스러운 계약 포인트]를 모은 쪽이 승리",
      ally: "연맹", leg: "군단 {0}", rules: "📜 규칙 · 건물 브리핑 (게임 규칙 설명 기준)",
      s1: "① 참전 명단", s1d: "참전 최대 20명 + 후보 10명 · 한 사람은 한 군단에만. 매칭은 지원자 중 부대 전투력 상위 25명 기준이라, 실제로 들어올 사람만 넣으세요.",
      auto: "⚡ 전투력 순 자동 선발", clr: "비우기", cnt: "참전 {0}/20 · 후보 {1}/10", inP: "참전", inS: "후보", inN: "—", other: "군단 {0}", absent: "KvK 불참",
      s2: "② 집결장 · 집결원 자동 배치", s2d: "참전 명단에서 집결장을 고르면(이름을 누르기) 나머지가 TG → 전투력 순으로 집결장마다 번갈아(뱀 순서) 들어갑니다. 집결 인원수를 넘으면 개인 부대로 남습니다. 집결원 출정은 버프 OFF 기본값.",
      pickL: "집결장으로 쓸 사람 (참전 명단에서 누르기)", cap: "집결 인원수", own: "본인", sum: "채움 {0} / {1}", solo: "개인 부대 (점령 유지 · 수송차 줍기 · 땅굴)", none: "없음",
      s3: "③ 작전 지도", s3d: "단계를 고르고, 아래에서 집결장(또는 개인 부대)을 누른 뒤 지도의 건물이나 원하는 지점을 누르면 공격 좌표가 찍힙니다. 다시 누르면 바뀝니다.",
      ph: ["초반 · 1단계", "중반 · 2단계", "후반 · 3단계"], phd: ["성소 · 수도원 · 시계탑 · 마구간 개방", "성검 제단 · 교화의 홀 · 용병 주둔지 개방", "숨겨진 땅굴 2개가 무작위로 출현"],
      cel: "⛏ 땅굴 표시", del: "✕ 좌표 지우기", soloL: "개인 부대", memo: "이 단계 작전 지시 (자유롭게)", lock: "{0}단계 개방",
      val: "이 단계 목표 건물: 첫 점령 합 {0} · 지속 {1}/분 (연맹 점수)", free: "지정 좌표",
      s4: "④ 작전 브리핑", copy: "📋 복사", copied: "복사했습니다", brief: "🗡 성검 쟁탈 작전 — {0} 군단 {1}", bMem: "집결원 {0}명", bSolo: "개인 부대",
      save: "💾 작전 저장", saving: "저장 중…", saved: "저장했습니다", fail: "저장 확인이 안 됩니다. 잠시 뒤 새로 고침해 보세요.", dirty: "저장하지 않은 변경이 있습니다",
      view: "보기 전용 — 관리자 링크로 열면 고칠 수 있습니다.", at: "저장 {0} · {1}", noSave: "아직 저장된 작전이 없습니다.",
      bTh: ["건물", "개방", "첫 점령", "지속", "효과"]
    },
    en: {
      h: "🗡 Swordland Showdown — War Room", sub: "Legion roster → rally leaders → auto-placed joiners → phase-by-phase battle map → briefing. 1-hour battle; the side with more Relic Points wins.",
      ally: "Alliance", leg: "Legion {0}", rules: "📜 Rules & building briefing (in-game rules)",
      s1: "① Legion roster", s1d: "Up to 20 combatants + 10 substitutes; one legion per person. Matchmaking uses the squad power of the top 25 registered, so register only people who will log in.",
      auto: "⚡ Auto-pick by power", clr: "Clear", cnt: "Combatants {0}/20 · Subs {1}/10", inP: "Fight", inS: "Sub", inN: "—", other: "Legion {0}", absent: "KvK absent",
      s2: "② Rally leaders & auto-placed joiners", s2d: "Tap names in the roster to make them rally leaders. Everyone else is dealt to the leaders in snake order (TG, then power). Anyone over capacity stays as a solo squad. Joiner march = buff-OFF size.",
      pickL: "Rally leaders (tap from the roster)", cap: "Rally capacity", own: "own", sum: "Filled {0} / {1}", solo: "Solo squads (hold · carts · tunnels)", none: "none",
      s3: "③ Battle map", s3d: "Pick a phase, tap a leader (or solo squads) below, then tap a building or any spot on the map to set the target. Tap again to change.",
      ph: ["Early · Phase 1", "Mid · Phase 2", "Late · Phase 3"], phd: ["Sanctums · Abbeys · Bell Tower · Stables open", "Swordshrine · Hall of Reformation · Mercenary Camp open", "Two hidden Undercellars appear at random"],
      cel: "⛏ Mark tunnel", del: "✕ Clear target", soloL: "Solo squads", memo: "Orders for this phase (free text)", lock: "opens in phase {0}",
      val: "Targets this phase: first capture {0} · hold {1}/min (alliance points)", free: "map point",
      s4: "④ Briefing", copy: "📋 Copy", copied: "Copied", brief: "🗡 Swordland plan — {0} Legion {1}", bMem: "{0} joiners", bSolo: "Solo squads",
      save: "💾 Save plan", saving: "Saving…", saved: "Saved", fail: "Could not confirm the save. Reload in a moment.", dirty: "Unsaved changes",
      view: "View only — open with an admin link to edit.", at: "Saved {0} · {1}", noSave: "No saved plan yet.",
      bTh: ["Building", "Opens", "First", "Hold", "Effect"]
    }
  };
  const st = (k, ...a) => { const d = T[LANG === "ko" ? "ko" : "en"]; let s = d[k] != null ? d[k] : T.ko[k]; if (typeof s === "string") a.forEach((v, i) => { s = s.split("{" + i + "}").join(v); }); return s; };
  const bn = b => LANG === "ko" ? b.ko : b.en;
  const blankLeg = () => ({m: [], s: [], ld: [], ph: [{t: {}, memo: ""}, {t: {}, memo: ""}, {t: {}, memo: ""}], cel: []});
  const blank = a => ({a, L: [blankLeg(), blankLeg()]});
  let SA = "", SL = 0, SP = 0, SEL = null, BL = "ko", MSG = "";
  const SWD = {}, SDIRTY = {};
  const saved = a => ((CFG.sword || {})[a]) || null;
  const plan = a => {
    if (!SWD[a]) { const s = saved(a); SWD[a] = s ? JSON.parse(JSON.stringify(s.P)) : blank(a); }
    const P = SWD[a];
    P.L = (P.L || []).slice(0, 2); while (P.L.length < 2) P.L.push(blankLeg());
    P.L.forEach(L => { ["m", "s", "ld", "cel"].forEach(k => { if (!Array.isArray(L[k])) L[k] = []; }); if (!Array.isArray(L.ph)) L.ph = []; while (L.ph.length < 3) L.ph.push({t: {}, memo: ""}); L.ph.forEach(p => { if (!p.t) p.t = {}; }); });
    return P;
  };
  const editable = () => IS_ADMIN && typeof can === "function" && can(SA);

  // 연맹 사람: 명단(ROSTER) + 응답자. 게임 ID 를 알면 ID 로, 모르면 "n:닉네임"
  const nameMap = () => {
    const m = {};
    Object.keys(LOOKUP).forEach(id => { if (LOOKUP[id].n) m[norm(LOOKUP[id].n)] = id; });
    Object.keys(SOLD).forEach(id => { if (SOLD[id].n) m[norm(SOLD[id].n)] = id; });
    DATA.forEach(p => { m[norm(p.name)] = p.id; if (p.gname) m[norm(p.gname)] = p.id; });
    return m;
  };
  let PC = {a: "", n: -1, list: []};
  const people = a => {
    if (PC.a === a && PC.n === DATA.length) return PC.list;
    const nm = nameMap(), out = [], seen = new Set();
    ((ROSTER[a] || {}).members || []).forEach(r => { const id = nm[norm(r[0])] || "", k = id || "n:" + r[0]; if (seen.has(k)) return; seen.add(k); out.push({k, id, n: r[0], p: +r[1] || 0, tg: +String(r[2] || "").replace(/[^0-9]/g, "") || 0}); });
    DATA.filter(p => p.ally === a && !seen.has(p.id)).forEach(p => { seen.add(p.id); out.push({k: p.id, id: p.id, n: p.gname || p.name, p: p.power || (LOOKUP[p.id] || {}).p || 0, tg: 0}); });
    out.forEach(q => { const d = q.id && DATA.find(x => x.id === q.id); q.d = d || null; const s = d && troops(d); if (s && !q.tg) q.tg = Math.max(s[0][0], s[1][0], s[2][0]); });
    out.sort((x, y) => y.p - x.p);
    PC = {a, n: DATA.length, list: out};
    return out;
  };
  const who = k => people(SA).find(q => q.k === k) || {k, id: "", n: k.replace(/^n:/, ""), p: 0, tg: 0};
  const marchK = k => { const q = who(k); return (q.id && offOf(q.id)) || DEF_MARCH; };
  const capOf = l => +l.cap || (who(l.k).id && RALLY[who(l.k).id]) || DEF_RALLY;
  const pw = p => !p ? "·" : LANG === "ko" ? (p / 1e8).toFixed(1) + "억" : Math.round(p / 1e6) + "M";
  const score = k => { const q = who(k), s = q.d && troops(q.d); return (q.tg || 0) * 1e15 + (s ? TGW(s, 0) + TGW(s, 1) + TGW(s, 2) : 0) * 1e3 + (q.p || 0) / 1e6; };

  // 집결원 자동 배치: TG → 전투력 순으로 뱀 순서(1→N, N→1)로 나눠 준다. 집결 인원수를 넘으면 개인 부대
  function assign(L) {
    const R = L.ld.filter(l => L.m.includes(l.k)).map((l, i) => { const cap = capOf(l), own = Math.min(marchK(l.k), cap); return {l, i, cap, own, mem: [], sum: own}; });
    const lk = new Set(R.map(r => r.l.k)), pool = L.m.filter(k => !lk.has(k)).sort((x, y) => score(y) - score(x)), solo = [];
    let pos = 0, dir = 1;
    pool.forEach(k => {
      const v = marchK(k);
      let done = false;
      for (let t = 0; t < R.length * 2 && !done; t++) {
        const r = R[pos];
        pos += dir; if (pos >= R.length) { pos = R.length - 1; dir = -1; } else if (pos < 0) { pos = 0; dir = 1; }
        if (r.sum + v <= r.cap) { r.mem.push({k, v}); r.sum += v; done = true; }
      }
      if (!done) solo.push(k);
    });
    return {R, solo};
  }

  const css = `
#vSword .sw{background:#0e1611;color:#d9e7d3;border:1px solid #2c4232;border-radius:14px;padding:14px;margin-bottom:12px;box-shadow:inset 0 0 0 1px rgba(201,162,39,.08)}
#vSword .sw h2{margin:0 0 6px;font-size:17px;letter-spacing:.04em;color:#e9d48a;border:none;padding:0}
#vSword .sw .d{font-size:12.5px;color:#9fb59a;margin-bottom:10px;line-height:1.5}
#vSword .swtop{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
#vSword .swtop select{min-height:38px;background:#16241a;color:#e9f2e4;border:1px solid #3a5641;border-radius:8px;padding:0 10px}
#vSword .tabs{display:flex;gap:6px;flex-wrap:wrap}
#vSword .tabs button{min-height:36px;padding:0 14px;border-radius:999px;border:1px solid #3a5641;background:#16241a;color:#cfe0c8;font-weight:700}
#vSword .tabs button.on{background:#c9a227;border-color:#c9a227;color:#1b1503}
#vSword .tabs.ph button.on{background:#e8590c;border-color:#e8590c;color:#fff}
#vSword details.rl summary{cursor:pointer;font-weight:800;color:#e9d48a}
#vSword .rl ul{margin:8px 0;padding-inline-start:18px;font-size:13px;line-height:1.6}
#vSword table.bt{width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px}
#vSword table.bt th,#vSword table.bt td{border-bottom:1px solid #24372a;padding:5px 4px;text-align:start}
#vSword table.bt td.n{text-align:end;font-variant-numeric:tabular-nums;white-space:nowrap}
#vSword .ros{max-height:380px;overflow:auto;border:1px solid #24372a;border-radius:10px}
#vSword .rr{display:flex;align-items:center;gap:8px;padding:6px 8px;border-bottom:1px solid #1d2d22;font-size:13px}
#vSword .rr.p{background:rgba(201,162,39,.10)} #vSword .rr.s{background:rgba(116,192,252,.08)}
#vSword .rr .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#vSword .rr .pw{color:#9fb59a;font-variant-numeric:tabular-nums;white-space:nowrap;font-size:12px}
#vSword .seg{display:flex;flex:none} #vSword .seg button{min-height:28px;padding:0 9px;font-size:12px;border:1px solid #3a5641;background:#132017;color:#cfe0c8;border-radius:0}
#vSword .seg button:first-child{border-radius:6px 0 0 6px} #vSword .seg button:last-child{border-radius:0 6px 6px 0}
#vSword .seg button.on.p{background:#c9a227;color:#1b1503;border-color:#c9a227} #vSword .seg button.on.s{background:#1c7ed6;color:#fff;border-color:#1c7ed6} #vSword .seg button.on.n{background:#2b3d2f}
#vSword .tag{font-size:11px;padding:1px 6px;border-radius:4px;background:#2b3d2f;color:#cfe0c8;white-space:nowrap}
#vSword .chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}
#vSword .chip{min-height:32px;padding:0 10px;border-radius:999px;border:1px solid #3a5641;background:#16241a;color:#e9f2e4;font-size:13px;font-weight:700;display:inline-flex;align-items:center;gap:6px}
#vSword .chip i{font-style:normal;display:inline-flex;width:20px;height:20px;border-radius:50%;align-items:center;justify-content:center;color:#111;font-size:12px}
#vSword .chip.on{outline:2px solid #fff;outline-offset:1px}
#vSword .rc{border:1px solid #2c4232;border-radius:10px;padding:8px 10px;margin-bottom:8px;background:#122017}
#vSword .rc .hd{display:flex;align-items:center;gap:8px;font-weight:800;flex-wrap:wrap}
#vSword .rc .hd .sp{flex:1}
#vSword .rc input{width:110px;min-height:30px;background:#0b130e;color:#fff;border:1px solid #3a5641;border-radius:6px;text-align:end;padding:0 6px}
#vSword .bar{height:6px;border-radius:3px;background:#24372a;margin:6px 0;overflow:hidden} #vSword .bar b{display:block;height:100%;background:#c9a227}
#vSword .ml{display:flex;flex-wrap:wrap;gap:4px 10px;font-size:12.5px;color:#cfe0c8}
#vSword .map{width:100%;max-width:760px;display:block;margin:0 auto;touch-action:manipulation;border-radius:10px}
#vSword .map text{font-family:inherit;pointer-events:none}
#vSword .map .bd{cursor:pointer}
#vSword textarea{width:100%;min-height:70px;background:#0b130e;color:#e9f2e4;border:1px solid #3a5641;border-radius:8px;padding:8px;font:inherit;font-size:13px;box-sizing:border-box}
#vSword .val{font-size:12.5px;color:#ffd8a8;margin:6px 0}
#vSword pre{white-space:pre-wrap;background:#0b130e;border:1px solid #24372a;border-radius:8px;padding:10px;font-size:12.5px;line-height:1.55;margin:8px 0;color:#e9f2e4}
#vSword .sv{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
#vSword .sv .pass{max-width:140px}
#vSword .warn{color:#ffa94d;font-weight:700;font-size:12.5px}
#vSword .phd{font-size:12px;color:#ffc078;margin:4px 0 8px}
`;
  function ensureCss() { if (!document.getElementById("swCss")) { const s = document.createElement("style"); s.id = "swCss"; s.textContent = css; document.head.appendChild(s); } }

  function rulesHtml() {
    const ko = LANG === "ko";
    const li = ko ? [
      "상위 20위 연맹 참여 · 군단 2개(제2군단은 연맹 Lv.6 + 이번 주 누적 접속 40명) · 참전+후보 15명 이상이어야 매칭",
      "맹주 · R4 이상이 참전 최대 30명 · 후보 10명 선택(본 사이트는 참전 20 · 후보 10 기준) · 한 사람은 한 군단에만",
      "매칭 점수 = 지원자 중 부대 전투력 상위 25명(영주 장비 · 영웅 장비 · 전투 과학). 연맹 보상은 군단 1의 승패 기준",
      "병사는 죽지 않음 — 부상병은 전장 병원(무제한)으로, 전장을 나가면 즉시 완쾌. 도움 버튼은 없으니 치료 가속 준비",
      "전투 시작 시 고급 도시 이전 1회 무료(쿨타임 뒤 회복) · 전장을 떠나면 12분 뒤 복귀 가능",
      "포인트: 첫 점령 + 지속 점령 + 처치(방어 중 처치 전투력 1만당 개인 40 · 공격 중 1만당 개인 80, 연맹 점수는 없음)",
      "건물 상한을 넘은 점수는 [군수 물자]로 흩어짐 → 주워서 획득. 점령당하면 쌓인 점수의 50%는 점령 측, 50%는 방어 측(방어 실패 시 잃음)",
      "1단계: 성소 · 수도원 · 시계탑 · 마구간 / 2단계: 성검 제단 · 교화의 홀 · 용병 주둔지 / 3단계: 땅굴 2개 무작위"
    ] : [
      "Top 20 alliances · two legions (Legion 2 needs alliance Lv.6 + 40 weekly logins) · 15+ combatants and subs to match",
      "R4+ choose up to 30 combatants + 10 substitutes (this page uses 20 + 10) · one legion per person",
      "Matchmaking = squad power of the top 25 registered. Alliance rewards follow Legion 1's result",
      "Troops never die — wounded go to an unlimited field infirmary and heal on leaving. No help button, bring healing speedups",
      "One free advanced teleport at start (recharges) · leaving the field means a 12-minute re-entry cooldown",
      "Points: first capture + holding + kills (10k power killed while defending = 40 personal, while attacking = 80 personal; no alliance points)",
      "Points above a building's cap drop as supply carts to pick up. When a building falls, 50% of stored points go to the attacker, 50% to the defender (lost if defence fails)",
      "Phase 1: Sanctums · Abbeys · Bell Tower · Stables / Phase 2: Swordshrine · Hall · Mercenary Camp / Phase 3: two random Undercellars"
    ];
    const rows = B.map(b => '<tr><td>' + ICON[b.k] + ' ' + esc(bn(b)) + '</td><td class="n">' + b.ph + '</td><td class="n">' + fmt(b.f) + '</td><td class="n">+' + fmt(b.m) + '</td><td>' + esc(b.fx ? b.fx[ko ? "ko" : "en"] : "") + '</td></tr>').join("");
    return '<details class="rl"><summary>' + st("rules") + '</summary><ul>' + li.map(x => '<li>' + esc(x) + '</li>').join("") + '</ul><table class="bt"><tr>' + st("bTh").map(h => '<th>' + esc(h) + '</th>').join("") + '</tr>' + rows + '</table></details>';
  }

  function mapSvg(L, A) {
    const ph = L.ph[SP], E = editable();
    const lead = A.R.map(r => r.l.k);
    let s = '<svg class="map" id="swMap" viewBox="0 0 450 365" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><pattern id="swg" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M18 0H0V18" fill="none" stroke="#2a3a24" stroke-width=".6"/></pattern>' +
      '<marker id="swa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs>' +
      '<rect width="450" height="365" fill="#0b120d"/>' +
      '<polygon points="12,182 225,8 438,182 225,356" fill="#3b2f1c" stroke="#7a6237" stroke-width="2"/>' +
      '<polygon points="12,182 225,8 438,182 225,356" fill="url(#swg)"/>' +
      '<polygon points="' + [[BLUE[0] - 14, BLUE[1]], [BLUE[0], BLUE[1] - 11], [BLUE[0] + 14, BLUE[1]], [BLUE[0], BLUE[1] + 11]].map(p => p.join(",")).join(" ") + '" fill="rgba(51,154,240,.35)" stroke="#4dabf7" stroke-width="2"/>' +
      '<polygon points="' + [[RED[0] - 14, RED[1]], [RED[0], RED[1] - 11], [RED[0] + 14, RED[1]], [RED[0], RED[1] + 11]].map(p => p.join(",")).join(" ") + '" fill="rgba(240,62,62,.35)" stroke="#ff6b6b" stroke-width="2"/>' +
      '<text x="' + BLUE[0] + '" y="' + (BLUE[1] + 26) + '" text-anchor="middle" font-size="10" fill="#74c0fc" font-weight="700">' + (LANG === "ko" ? "아군" : "ALLY") + '</text>' +
      '<text x="' + RED[0] + '" y="' + (RED[1] + 26) + '" text-anchor="middle" font-size="10" fill="#ff8787" font-weight="700">' + (LANG === "ko" ? "적군" : "ENEMY") + '</text>';
    // 건물
    B.forEach(b => {
      const open = b.ph <= SP + 1, r = b.k === "alt" ? 17 : b.k === "san" ? 14 : 11;
      s += '<g class="bd" data-b="' + b.id + '" opacity="' + (open ? 1 : .38) + '"><circle cx="' + b.x + '" cy="' + b.y + '" r="' + r + '" fill="' + (b.k === "alt" ? "#5c3d0e" : "#2e2a20") + '" stroke="' + (open ? "#e9c46a" : "#6b6150") + '" stroke-width="' + (b.k === "alt" ? 2.5 : 1.5) + '"/>' +
        '<text x="' + b.x + '" y="' + (b.y + 4) + '" text-anchor="middle" font-size="' + (r + 1) + '">' + ICON[b.k] + '</text>' +
        '<text x="' + b.x + '" y="' + (b.y + r + 10) + '" text-anchor="middle" font-size="8.5" fill="' + (open ? "#f1e3b0" : "#8a826e") + '" font-weight="700">' + esc(bn(b)) + (open ? '' : ' 🔒') + '</text></g>';
    });
    // 땅굴(3단계)
    if (SP === 2) L.cel.forEach((c, i) => { s += '<g><circle cx="' + c[0] + '" cy="' + c[1] + '" r="11" fill="#4a3415" stroke="#ffa94d" stroke-width="2" stroke-dasharray="3 2"/><text x="' + c[0] + '" y="' + (c[1] + 4) + '" text-anchor="middle" font-size="11">⛏</text><text x="' + c[0] + '" y="' + (c[1] + 21) + '" text-anchor="middle" font-size="8.5" fill="#ffc078" font-weight="700">' + (LANG === "ko" ? "땅굴 " : "Tunnel ") + (i + 1) + '</text></g>'; });
    // 공격 좌표: 아군 진영에서 목표까지 화살표
    const stack = {};
    const tgt = (k, n, color) => {
      const t = ph.t[k];
      if (!t) return;
      const b = t.b && B.find(x => x.id === t.b), x = b ? b.x : +t.x, y = b ? b.y : +t.y;
      if (!isFinite(x) || !isFinite(y)) return;
      const key = Math.round(x) + ":" + Math.round(y), j = stack[key] = (stack[key] || 0) + 1;
      s += '<path d="M' + (BLUE[0] + 12) + ' ' + BLUE[1] + ' Q ' + ((BLUE[0] + x) / 2) + ' ' + (Math.min(BLUE[1], y) - 30 - j * 6) + ' ' + (x - 6) + ' ' + y + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#swa)" opacity=".9"/>';
      if (!b) s += '<g stroke="' + color + '" stroke-width="2"><line x1="' + (x - 8) + '" y1="' + y + '" x2="' + (x + 8) + '" y2="' + y + '"/><line x1="' + x + '" y1="' + (y - 8) + '" x2="' + x + '" y2="' + (y + 8) + '"/></g><circle cx="' + x + '" cy="' + y + '" r="5" fill="none" stroke="' + color + '" stroke-width="2"/>';
      const bx = x + 14 + (j - 1) * 15, by = y - 16;
      s += '<circle cx="' + bx + '" cy="' + by + '" r="7.5" fill="' + color + '" stroke="#111" stroke-width="1"/><text x="' + bx + '" y="' + (by + 3.5) + '" text-anchor="middle" font-size="9.5" font-weight="800" fill="#111">' + n + '</text>';
    };
    lead.forEach((k, i) => tgt(k, i + 1, LC[i % LC.length]));
    tgt("solo", "S", "#adb5bd");
    s += '</svg>';
    return s + (E ? '' : '');
  }

  const tName = t => { if (!t) return ""; const b = t.b && B.find(x => x.id === t.b); return b ? bn(b) : st("free") + " (" + Math.round(t.x) + ", " + Math.round(t.y) + ")"; };
  function briefText(L, A, lang) {
    const keep = LANG; LANG = lang;   // 브리핑 언어만 잠깐 바꿔 쓴다
    try {
      const nm = k => who(k).n;
      let out = st("brief", SA, SL + 1) + "\n";
      [0, 1, 2].forEach(p => {
        const ph = L.ph[p], lines = [];
        A.R.forEach((r, i) => { const t = ph.t[r.l.k]; lines.push("①②③④⑤⑥⑦⑧".charAt(i) + " " + nm(r.l.k) + (t ? " → " + tName(t) : "") + "  (" + st("bMem", r.mem.length) + (r.mem.length ? ": " + r.mem.map(m => nm(m.k)).join(", ") : "") + ")"); });
        const ts = ph.t.solo;
        if (A.solo.length || ts) lines.push("Ⓢ " + st("bSolo") + (ts ? " → " + tName(ts) : "") + (A.solo.length ? ": " + A.solo.map(nm).join(", ") : ""));
        if (!lines.length && !ph.memo) return;
        out += "\n━ " + st("ph")[p] + " — " + st("phd")[p] + " ━\n" + lines.join("\n") + (ph.memo ? "\n📝 " + ph.memo : "") + "\n";
      });
      return out.trim();
    } finally { LANG = keep; }
  }

  function render() {
    const V = $("vSword");
    if (!V) return;
    ensureCss();
    if (!SA || ALLIES.indexOf(SA) < 0) SA = ALLIES.find(x => DATA.some(p => p.ally === x)) || ALLIES[0];
    const P = plan(SA), L = P.L[SL], O = P.L[1 - SL], E = editable(), ppl = people(SA), A = assign(L), sv = saved(SA);
    const inO = new Set(O.m.concat(O.s));
    let h = '<div class="sw"><h2>' + st("h") + '</h2><div class="d">' + esc(st("sub")) + '</div><div class="swtop"><select id="swAlly">' + ALLIES.map(a => '<option' + (a === SA ? ' selected' : '') + '>' + esc(a) + '</option>').join("") + '</select><div class="tabs" id="swLeg">' + [0, 1].map(i => '<button data-leg="' + i + '"' + (i === SL ? ' class="on"' : '') + '>' + st("leg", i + 1) + '</button>').join("") + '</div></div>' +
      '<div class="d" style="margin:8px 0 0">' + (sv ? esc(st("at", sv.at, sv.by || "")) : st("noSave")) + (SDIRTY[SA] ? ' · <span class="warn">' + st("dirty") + '</span>' : '') + (E ? '' : '<br>' + st("view")) + '</div>' + rulesHtml() + '</div>';
    // ① 명단
    h += '<div class="sw"><h2>' + st("s1") + ' <span class="tag">' + st("cnt", L.m.length, L.s.length) + '</span></h2><div class="d">' + esc(st("s1d")) + '</div>' +
      (E ? '<div class="sv" style="margin-bottom:8px"><button class="primary" id="swAuto">' + st("auto") + '</button><button id="swClr">' + st("clr") + '</button></div>' : '') + '<div class="ros">';
    const rowOf = q => {
      const isP = L.m.includes(q.k), isS = L.s.includes(q.k), oth = inO.has(q.k);
      if (!E && !isP && !isS) return '';
      return '<div class="rr' + (isP ? ' p' : isS ? ' s' : '') + '"><span class="nm">' + esc(q.n) + (q.d && q.d.absent ? ' <span class="tag">' + st("absent") + '</span>' : '') + '</span><span class="pw">' + (q.tg ? 'TG' + q.tg + ' · ' : '') + pw(q.p) + '</span>' +
        (oth ? '<span class="tag">' + st("other", 2 - SL) + '</span>' : E ? '<span class="seg" data-k="' + esc(q.k) + '"><button class="p' + (isP ? ' on' : '') + '" data-st="p">' + st("inP") + '</button><button class="s' + (isS ? ' on' : '') + '" data-st="s">' + st("inS") + '</button><button class="n' + (!isP && !isS ? ' on' : '') + '" data-st="n">' + st("inN") + '</button></span>' : '<span class="tag">' + (isP ? st("inP") : st("inS")) + '</span>') + '</div>';
    };
    h += ppl.map(rowOf).join("") + '</div></div>';
    // ② 집결장 · 배치
    h += '<div class="sw"><h2>' + st("s2") + '</h2><div class="d">' + esc(st("s2d")) + '</div>';
    if (E) h += '<div class="d" style="margin:0">' + st("pickL") + '</div><div class="chips">' + L.m.map(k => { const i = L.ld.findIndex(l => l.k === k); return '<button class="chip' + (i >= 0 ? ' on' : '') + '" data-ld="' + esc(k) + '">' + (i >= 0 ? '<i style="background:' + LC[i % LC.length] + '">' + (i + 1) + '</i>' : '') + esc(who(k).n) + '</button>'; }).join("") + '</div>';
    A.R.forEach((r, i) => {
      h += '<div class="rc"><div class="hd"><span class="chip" style="min-height:26px"><i style="background:' + LC[i % LC.length] + '">' + (i + 1) + '</i>★ ' + esc(who(r.l.k).n) + '</span><span class="sp"></span><small>' + st("cap") + '</small>' + (E ? '<input data-cap="' + esc(r.l.k) + '" inputmode="numeric" value="' + r.cap + '">' : '<b>' + fmt(r.cap) + '</b>') + '</div>' +
        '<div class="bar"><b style="width:' + Math.min(100, Math.round(r.sum / r.cap * 100)) + '%"></b></div><div class="d" style="margin:0 0 4px">' + st("sum", fmt(r.sum), fmt(r.cap)) + ' · ' + st("own") + ' ' + fmt(r.own) + '</div>' +
        '<div class="ml">' + (r.mem.map(m => '<span>' + esc(who(m.k).n) + ' <small style="color:#8fa98a">' + fmt(m.v) + '</small></span>').join("") || st("none")) + '</div></div>';
    });
    h += '<div class="rc"><div class="hd"><span class="chip" style="min-height:26px"><i style="background:#adb5bd">S</i>' + st("solo") + '</span></div><div class="ml" style="margin-top:6px">' + (A.solo.map(k => '<span>' + esc(who(k).n) + '</span>').join("") || st("none")) + '</div></div></div>';
    // ③ 작전 지도
    const ph = L.ph[SP], tg = new Set(Object.values(ph.t).map(t => t && t.b).filter(Boolean)), tb = B.filter(b => tg.has(b.id) && b.ph <= SP + 1);
    h += '<div class="sw"><h2>' + st("s3") + '</h2><div class="d">' + esc(st("s3d")) + '</div><div class="tabs ph" id="swPh">' + [0, 1, 2].map(i => '<button data-ph="' + i + '"' + (i === SP ? ' class="on"' : '') + '>' + st("ph")[i] + '</button>').join("") + '</div><div class="phd">' + st("phd")[SP] + '</div>';
    if (E) h += '<div class="chips">' + A.R.map((r, i) => '<button class="chip' + (SEL === r.l.k ? ' on' : '') + '" data-sel="' + esc(r.l.k) + '"><i style="background:' + LC[i % LC.length] + '">' + (i + 1) + '</i>' + esc(who(r.l.k).n) + (ph.t[r.l.k] ? ' → ' + esc(tName(ph.t[r.l.k])) : '') + '</button>').join("") +
      '<button class="chip' + (SEL === "solo" ? ' on' : '') + '" data-sel="solo"><i style="background:#adb5bd">S</i>' + st("soloL") + (ph.t.solo ? ' → ' + esc(tName(ph.t.solo)) : '') + '</button>' +
      (SP === 2 ? '<button class="chip' + (SEL === "cel" ? ' on' : '') + '" data-sel="cel">' + st("cel") + '</button>' : '') + '<button class="chip" id="swDel">' + st("del") + '</button></div>';
    h += mapSvg(L, A) + '<div class="val">' + st("val", fmt(tb.reduce((t, b) => t + b.f, 0)), fmt(tb.reduce((t, b) => t + b.m, 0))) + '</div>' +
      (E ? '<textarea id="swMemo" placeholder="' + esc(st("memo")) + '">' + esc(ph.memo || "") + '</textarea>' : (ph.memo ? '<pre>📝 ' + esc(ph.memo) + '</pre>' : '')) + '</div>';
    // ④ 브리핑
    h += '<div class="sw"><h2>' + st("s4") + '</h2><div class="tabs" id="swBl">' + [["ko", "한국어"], ["en", "English"]].map(x => '<button data-bl="' + x[0] + '"' + (BL === x[0] ? ' class="on"' : '') + '>' + x[1] + '</button>').join("") + '</div><pre id="swBrief">' + esc(briefText(L, A, BL)) + '</pre><button id="swCopy">' + st("copy") + '</button></div>';
    if (E) h += '<div class="sw"><div class="sv">' + passMe("swPass") + '<button class="primary" id="swSave">' + st("save") + '</button><span id="swMsg" class="warn">' + esc(MSG) + '</span></div></div>';
    V.innerHTML = h;
  }

  const touch = () => { SDIRTY[SA] = true; MSG = ""; };
  function svgPt(e) {
    const svg = $("swMap"), r = svg.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width * 450, (e.clientY - r.top) / r.height * 365];
  }
  function onClick(e) {
    const V = $("vSword"), el = e.target;
    const btn = el.closest("button");
    const P = plan(SA), L = P.L[SL];
    if (el.closest("#swMap")) {
      if (!editable() || !SEL) return;
      const [x, y] = svgPt(e), ph = L.ph[SP];
      if (SEL === "cel") {
        const i = L.cel.findIndex(c => Math.hypot(c[0] - x, c[1] - y) < 14);
        if (i >= 0) L.cel.splice(i, 1); else { if (L.cel.length >= 2) L.cel.shift(); L.cel.push([Math.round(x), Math.round(y)]); }
      } else {
        const near = B.filter(b => b.ph <= SP + 1).map(b => ({b, d: Math.hypot(b.x - x, b.y - y)})).sort((p, q) => p.d - q.d)[0];
        const cel = SP === 2 ? L.cel.find(c => Math.hypot(c[0] - x, c[1] - y) < 16) : null;
        ph.t[SEL] = near && near.d < 22 ? {b: near.b.id} : cel ? {x: cel[0], y: cel[1]} : {x: Math.round(x), y: Math.round(y)};
      }
      touch(); render(); return;
    }
    if (!btn) return;
    if (btn.dataset.leg != null) { SL = +btn.dataset.leg; SEL = null; render(); return; }
    if (btn.dataset.ph != null) { SP = +btn.dataset.ph; if (SEL === "cel" && SP !== 2) SEL = null; render(); return; }
    if (btn.dataset.bl) { BL = btn.dataset.bl; render(); return; }
    if (btn.id === "swCopy") { const t = $("swBrief").textContent; (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => { btn.textContent = st("copied"); setTimeout(() => { btn.textContent = st("copy"); }, 1500); }, () => {}); return; }
    if (!editable()) return;
    const seg = btn.closest(".seg");
    if (seg) {
      const k = seg.dataset.k, s = btn.dataset.st;
      L.m = L.m.filter(x => x !== k); L.s = L.s.filter(x => x !== k);
      if (s === "p") { if (L.m.length >= 20) { MSG = st("cnt", 20, L.s.length); render(); return; } L.m.push(k); }
      if (s === "s") { if (L.s.length >= 10) { MSG = st("cnt", L.m.length, 10); render(); return; } L.s.push(k); }
      if (s !== "p") { L.ld = L.ld.filter(l => l.k !== k); L.ph.forEach(p => { delete p.t[k]; }); }
      touch(); render(); return;
    }
    if (btn.id === "swAuto" || btn.id === "swClr") {
      const O = P.L[1 - SL], used = new Set(O.m.concat(O.s));
      L.m = []; L.s = []; L.ld = []; L.ph.forEach(p => { p.t = {}; });
      if (btn.id === "swAuto") {
        const free = people(SA).filter(q => !used.has(q.k) && !(q.d && q.d.absent));
        L.m = free.slice(0, 20).map(q => q.k); L.s = free.slice(20, 30).map(q => q.k);
      }
      touch(); render(); return;
    }
    if (btn.dataset.ld) {
      const k = btn.dataset.ld, i = L.ld.findIndex(l => l.k === k);
      if (i >= 0) { L.ld.splice(i, 1); L.ph.forEach(p => { delete p.t[k]; }); } else if (L.ld.length < 8) L.ld.push({k, cap: 0});
      touch(); render(); return;
    }
    if (btn.dataset.sel) { SEL = SEL === btn.dataset.sel ? null : btn.dataset.sel; render(); return; }
    if (btn.id === "swDel") { if (SEL && SEL !== "cel") { delete L.ph[SP].t[SEL]; touch(); } render(); return; }
    if (btn.id === "swSave") { save(); return; }
  }
  function onChange(e) {
    const el = e.target, P = plan(SA), L = P.L[SL];
    if (el.id === "swAlly") { SA = el.value; SEL = null; MSG = ""; render(); return; }
    if (!editable()) return;
    if (el.dataset.cap) { const l = L.ld.find(x => x.k === el.dataset.cap); if (l) { l.cap = +String(el.value).replace(/[^0-9]/g, "") || 0; touch(); render(); } return; }
    if (el.id === "swMemo") { L.ph[SP].memo = el.value.slice(0, 1500); touch(); const b = $("swBrief"); if (b) b.textContent = briefText(L, assign(L), BL); }
  }

  async function save() {
    if (SAVING) return;
    const a = SA, msg = () => $("swMsg");
    const ok = await checkPass("swPass", a);
    if (ok.err) { MSG = tx(ok.err); render(); return; }
    SAVING = true; savBusy(true, LANG);
    try {
      const P = plan(a), stamp = Date.now(), at = new Date().toLocaleString("sv-SE").slice(0, 16);
      P.a = a;
      const body = new URLSearchParams();
      body.append(CF.batch, String(stamp)); body.append(CF.at, at); body.append(CF.by, ok.who.n || savedBy()); body.append(CF.ally, "SWORD");
      body.append(CF.lname, JSON.stringify(P)); body.append(CF.admin, ok.who.h);
      if (msg()) msg().textContent = st("saving");
      try { await fetch(CFG_POST, {method: "POST", mode: "no-cors", body}); } catch (e) {}
      for (let n = 0; n < 8; n++) {
        await new Promise(r => setTimeout(r, 2500));
        try {
          const c = await loadConfig();
          if (c.sword && c.sword[a] && c.sword[a].batch === stamp) {
            CFG.sword = c.sword; SDIRTY[a] = false; delete SWD[a]; MSG = st("saved"); render(); return;
          }
        } catch (e) {}
      }
      MSG = st("fail"); render();
    } finally { savBusy(false); SAVING = false; }
  }

  let bound = false;
  window.renderSword = () => {
    const V = $("vSword");
    if (!V) return;
    if (!bound) { bound = true; V.addEventListener("click", onClick); V.addEventListener("change", onChange); }
    // 고치는 중에는 새로 받은 설정으로 덮지 않는다
    Object.keys(SWD).forEach(a => { if (!SDIRTY[a]) delete SWD[a]; });
    if (V.contains(document.activeElement) && document.activeElement.tagName === "TEXTAREA") return;
    render();
  };
})();
