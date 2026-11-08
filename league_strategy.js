// 성검 리그전 작전 설명 — 이박사님 글(2026-11-08). 한국어 + 繁體中文(zh) + English(en, 그 밖의 언어도)
window.LEAGUE_STRATEGY = {
  intro: "저희는 다수 중고래 연합이며 1인 체제의 핵고래 연맹이 아닙니다. 앞으로 1인 체제의 핵고래 연합과 만날 가능성이 매우 높습니다.\n저희는 2~3인이 한 팀으로 핵고래의 1~3군을 부수고, 상대 고래가 장비를 스왑하기 전에 동시 공격하여 쌓인 전리품을 뺏는 것이 핵심입니다.",
  phases: [
    {t: "1단계 · 초반 전략 (0~15분)", b: "집결장 6인이 동시 진출하여 6개의 성소 · 수도원 첫 점령 보너스를 먹는 것이 핵심 목표입니다.\n첫 점령에 실패하더라도 최소 5개를 보유하기 위해 공격과 수비를 합니다.\n상대와 싸움이 붙으면 자리를 지켜야 하며, 적군이 다른 곳으로 이동하지 못하게 계속 공격합니다.\n점수가 뒤처져도 조급해하지 않습니다."},
    {t: "2단계 · 중반 전략 (15~30분)", b: "강한 2인이 제단 · 교화의 홀을 빠르게 점령합니다.\n그 뒤 적군 성소를 타격합니다(없으면 패스).\n회수팀은 군수물자를 빠르게 습득하는 데 집중합니다."},
    {t: "3단계 · 후반 전략 (30~60분)", b: "후반전은 뺏고 뺏기는 싸움입니다. 서브 집결장 · 회수팀의 역할이 아주 중요합니다.\n서브 집결장은 메인 집결장이 빠져 있는 곳에 1군을 넣어 주셔야 합니다.\n우리는 빠르게 뺏고 늦게 뺏겨야 합니다."}
  ],
  note: "※ 군수물자: 거점 공격 성공 · 수비 실패 시 주변에 떨어지는 포인트.",
  // 회수조(이박사님 11-08): 12명 → 4명씩 3조 · 조 안에서 북 · 동 · 남 · 서 한 명씩. AEH · 한자 이름끼리 최대한 같은 조(aehFirst). 큰 지도에는 안 그리고 따로 짧은 영상(수도원 하나)으로 보여 준다
  recover: {teams: [{t: "회수 1조"}, {t: "회수 2조"}, {t: "회수 3조"}], title: "회수조 12명 — 3조 · 4인 1조 · 동서남북", text: "회수조 12명은 시련 순으로 4명씩 3조로 나눕니다. 조마다 싸움이 붙은 거점 둘레의 동 · 서 · 남 · 북에 한 명씩 자리를 잡고, 자기 구역에 튄 전리품만 줍고 바로 제자리로 돌아옵니다. 서로 겹치지 않아 빠짐없이 가장 빨리 회수합니다. 회수조는 18만이 넘었거나 병사가 다 죽어 전투에 참가하지 못하면 대체 인원과 교체 바랍니다. 아래 영상은 회수 1조 예시입니다."},
  // 역할 — pair = 같은 번호끼리 짝(서브 n번 ↔ 집결장 n번, 이박사님 11-08). 참전자를 시련 점수 순으로 위에서부터 나눈다(이박사님: 6 · 6 · 4 · 2 · 12). fix = 이 역할에 꼭 넣을 사람(이박사님 지정, 시련 순보다 먼저)
  // AEH 연맹 · 한자 이름은 되도록 AEH 집결장 밑으로(이박사님 11-08)
  // 팀(이박사님 11-08): 집결장 셋씩 두 팀 · 서브 집결장은 파트너(짝인 집결장)의 팀
  teams: [
    {t: "1팀", c: "#ff8787", ld: ["Yui", "小昇昇son", "Feng 狂風"]},
    {t: "2팀", c: "#4dabf7", ld: ["Lotto", "Imnotdonn", "Captain Q"]}
  ],
  // 1단계 동선(이박사님 11-08): 집결장 1~6번 순서대로. 아군 진입 왼쪽 기준 건물 id — 오른쪽은 대칭(MIR)으로 바뀐다
  //   1 적군 성소(sa2) · 2 적군 수도원1(ab2, 적 진입 가까운 쪽) · 3 아군 성소(sa1) · 4 시계탑(bel) · 5 적군 수도원2(ab1) · 6 아군 수도원1(ab3)
  route: {left: ["sa2", "ab2", "sa1", "bel", "ab1", "ab3"],
    // 15분(2단계): 1번 Yui → 성검 제단 · 2번 Lotto → 교화의 홀. 나머지는 1단계 거점을 지킨다
    p2: ["alt", "hal"],
    // 채집조 4명: 집결 · 수비에도 들어가고(남은 2행군), 30분 땅굴이 열리면 각자 맡은 땅굴 1~4 로 동시에(이박사님 11-08)
    gather: ["tu1", "tu2", "tu3", "tu4"]},
  // 작전 재생 자막: a~b 분 동안만 지도 위에 나타났다가 사라진다. {1} {2} = 1번 · 2번 집결장 이름
  captions: [
    {a: 0, b: 7, t: "시작 — 집결장 6명이 각자 위치로 이동"},
    {a: 7.5, b: 14.5, t: "거점을 지킨다 · 공격받으면 회수조에게 알린다"},
    {a: 15, b: 22, t: "15분 — 1번 {1} → 성검 제단 · 2번 {2} → 교화의 홀"},
    {a: 22.5, b: 29.5, t: "서브 집결장은 파트너가 비운 곳을 지킨다"},
    {a: 30, b: 37, t: "30분 — 땅굴 개방 · 채집조 각자 땅굴로 동시에"},
    {a: 38, b: 46, t: "빠르게 뺏고 늦게 뺏긴다"}
  ],
  roles: [
    {k: "lead", n: 6, fix: ["Yui"], t: "집결장", c: "#ffd43b", d: ["1단계 동선(집결장 순서대로): 1 적군 성소 → 2 적군 수도원1 → 3 아군 성소 → 4 시계탑 → 5 적군 수도원2 → 6 아군 수도원1.", "1 · 2군으로 성소 · 수도원을 점령한다.", "공격 시 1군 3~5분 집결.", "수비 시 1 · 2군 장비 교체한다.", "15분: 1번 Yui → 성검 제단 · 2번 Lotto → 교화의 홀 이동. 나머지는 1단계 거점을 지킨다.", "★ 수비하고 있는 거점(성소 · 수도원 · 시계탑 등)이 공격받으면 바로 회수조에게 알린다."]},
    {k: "sub", n: 6, fix: ["방울찡", "mina"], pair: "lead", t: "서브 집결장", c: "#ff922b", d: ["순위대로 파트너가 정해진다 — 1번 ↔ 7번, 2번 ↔ 8번 … 6번 ↔ 12번(↔ 표시).", "★ 파트너(메인 집결장)가 빠진 빈 곳을 반드시 1군으로 지킨다.", "서브 집결장은 파트너와 같은 팀 소속(1팀 · 2팀).", "★ 수비하고 있는 거점(성소 · 수도원 · 시계탑 등)이 공격받으면 바로 회수조에게 알린다.", "10% 이상 버프.", "집결장이 포함된 성소 · 수도원을 1군으로 수비한다.", "아군 성소 · 수도원에 방어 리필한다.", "집결원 빠진 곳을 집결원에게 알린다."]},
    {k: "gather", n: 4, t: "채집조", c: "#63e6be", d: ["행군 1~4 는 채집, 나머지 2행군은 집결 · 수비 지원 — 집결 · 수비에서 빠지면 안 된다.", "30분에 땅굴이 열리면 각자 맡은 땅굴(1~4)로 동시에 간다(지도의 채1~채4).", "채집지가 열리면 진격한다.", "적군 · 아군 채집지를 2개 점령한다.", "행군 4 성소 · 수도원 방어."]},
    {k: "scout", n: 2, fix: ["ImsorryPIG", "晚睡覺SleepySwim"], t: "정찰조", c: "#74c0fc", d: ["행군 4 — 성소 · 수도원 방어.", "2랠리 — 적군 성소 · 수도원 정찰 및 적군 1군 위치 확인.", "★ 회수조가 텔레포트로 먼저 자리를 잡게 하고, 빈 곳(회수 자리 · 거점)이 있으면 정찰조가 그곳으로 이동해 채운다."]},
    {k: "recover", n: 12, aehFirst: true, t: "회수조", c: "#b197fc", d: ["동 · 서 · 남 · 북으로 배치하여 전리품을 회수하는 것이 목적이다(4명씩 3조).", "★ 18만이 넘었거나 병사가 다 죽어 전투에 참가하지 못하면 대체 인원과 교체 바랍니다.", "중반: 군수물자를 빠르게 습득하는 데 집중한다.", "후반: 서브 집결장과 함께 뺏고 뺏기는 싸움의 핵심이다."]}
  ]
};
// 繁體中文(대만) — 이박사님 11-08. 화면 언어가 繁體中文(zh)일 때 위 글 대신 쓴다(구조 · 이름 · 동선은 위 그대로)
window.LEAGUE_STRATEGY.zh = {
  intro: "我們是由多位中型鯨組成的聯盟，不是單人核心巨鯨的聯盟。接下來很有可能會遇到單人核心巨鯨的聯盟。\n我們的核心是 2~3 人一組擊破巨鯨的第 1~3 軍，並在對方巨鯨換裝之前同時進攻，奪走累積的戰利品。",
  phases: [
    {t: "第 1 階段 · 前期戰略（0~15 分）", b: "6 位集結隊長同時出發，拿下 6 座聖所 · 修道院的首佔獎勵是核心目標。\n即使首佔失敗，也要透過攻守至少保住 5 座。\n與對手交戰時必須守住位置，並持續進攻，讓敵軍無法移動到其他地方。\n分數落後也不要著急。"},
    {t: "第 2 階段 · 中期戰略（15~30 分）", b: "最強的 2 人快速佔領祭壇 · 教化之廳。\n之後打擊敵方聖所（沒有就跳過）。\n回收組專心快速撿取軍需物資。"},
    {t: "第 3 階段 · 後期戰略（30~60 分）", b: "後期是互相搶奪的戰鬥，副集結隊長 · 回收組的角色非常重要。\n副集結隊長要把第 1 軍派到主集結隊長離開的空位。\n我們要搶得快、被搶得慢。"}
  ],
  note: "※ 軍需物資：進攻據點成功 · 防守失敗時掉落在周圍的點數。",
  recover: {teams: [{t: "回收 1 組"}, {t: "回收 2 組"}, {t: "回收 3 組"}], title: "回收組 12 人 — 3 組 · 每組 4 人 · 東西南北", text: "回收組 12 人分成 3 組，每組 4 人。每組在交戰據點周圍的東 · 西 · 南 · 北各站一人，只撿自己區域裡噴出的戰利品，撿完立刻回到原位。彼此不重疊，所以能最快、不漏地回收。回收組若超過 18 萬，或士兵全部陣亡無法參戰，請與替補人員交換。下面的影片是回收 1 組的示範。"},
  teams: [{t: "1 隊"}, {t: "2 隊"}],
  captions: [
    {t: "開始 — 6 位集結隊長各自前往位置"},
    {t: "守住據點 · 被攻擊時通知回收組"},
    {t: "15 分 — 1 號 {1} → 聖劍祭壇 · 2 號 {2} → 教化之廳"},
    {t: "副集結隊長守住搭檔離開的空位"},
    {t: "30 分 — 地道開放 · 採集組各自同時前往地道"},
    {t: "搶得快、被搶得慢"}
  ],
  rvCap: [[0, 1.5, "① 據點發生攻擊 · 防守時"], [1.5, 3.3, "② 戰利品（金幣）向四周噴出"], [3.3, 6.8, "③ 東 · 西 · 南 · 北 — 只用行軍（線）回收自己的區域"], [6.8, 9.5, "④ 守在原位，用行軍把戰利品帶回"]],
  roles: {
    lead: {t: "集結隊長", d: ["第 1 階段路線（依集結隊長順序）：1 敵方聖所 → 2 敵方修道院 1 → 3 我方聖所 → 4 鐘樓 → 5 敵方修道院 2 → 6 我方修道院 1。", "用第 1 · 2 軍佔領聖所 · 修道院。", "進攻時第 1 軍集結 3~5 分鐘。", "防守時更換第 1 · 2 軍裝備。", "15 分：1 號 Yui → 聖劍祭壇 · 2 號 Lotto → 教化之廳。其餘守住第 1 階段的據點。", "★ 正在防守的據點（聖所 · 修道院 · 鐘樓等）被攻擊時，立刻通知回收組。"]},
    sub: {t: "副集結隊長", d: ["依排名決定搭檔 — 1 號 ↔ 7 號、2 號 ↔ 8 號 … 6 號 ↔ 12 號（↔ 標示）。", "★ 搭檔（主集結隊長）離開的空位，一定要用第 1 軍守住。", "副集結隊長與搭檔同屬一隊（1 隊 · 2 隊）。", "★ 正在防守的據點（聖所 · 修道院 · 鐘樓等）被攻擊時，立刻通知回收組。", "增益 10% 以上。", "用第 1 軍防守有集結隊長的聖所 · 修道院。", "為我方聖所 · 修道院補防守。", "把集結缺人的地方告訴集結成員。"]},
    gather: {t: "採集組", d: ["行軍 1~4 採集，其餘 2 個行軍支援集結 · 防守 — 不可缺席集結 · 防守。", "30 分地道開放時，各自同時前往負責的地道 1~4（地圖上的 採1~採4）。", "採集點開放時前進。", "佔領敵方 · 我方採集點 2 個。", "行軍 4 防守聖所 · 修道院。"]},
    scout: {t: "偵察組", d: ["行軍 4 — 防守聖所 · 修道院。", "第 2 集結 — 偵察敵方聖所 · 修道院，並確認敵方第 1 軍位置。", "★ 讓回收組先用傳送就位；若有空位（回收位置 · 據點），由偵察組移動過去補上。"]},
    recover: {t: "回收組", d: ["目的是站在東 · 西 · 南 · 北回收戰利品（每組 4 人，共 3 組）。", "★ 超過 18 萬，或士兵全部陣亡無法參戰時，請與替補人員交換。", "中期：專心快速撿取軍需物資。", "後期：與副集結隊長一起，是互相搶奪戰鬥的核心。"]}
  }
};
// English — 이박사님 11-08. 한국어 · 繁體中文 밖의 화면 언어는 이 글을 쓴다
window.LEAGUE_STRATEGY.en = {
  intro: "We are an alliance of many mid-sized whales, not a one-whale alliance. We will very likely face alliances carried by a single big whale.\nOur key: teams of 2–3 break the big whale's 1st–3rd marches, and we hit at the same time before the enemy whale can swap gear, taking the loot they have piled up.",
  phases: [
    {t: "Phase 1 · Early (0–15 min)", b: "All 6 rally leaders head out together. The key goal is the first-capture bonus on all 6 Sanctums · Abbeys.\nEven if a first capture fails, attack and defend so we hold at least 5.\nOnce a fight starts, hold your spot and keep attacking so the enemy cannot move elsewhere.\nDon't panic if we fall behind on points."},
    {t: "Phase 2 · Mid (15–30 min)", b: "The 2 strongest quickly take the Swordshrine · Hall of Reformation.\nThen hit the enemy Sanctum (skip if none).\nThe recovery team focuses on picking up supplies fast."},
    {t: "Phase 3 · Late (30–60 min)", b: "The late game is take-and-retake. Sub-leaders and the recovery team matter most.\nSub-leaders must put their 1st march into any spot a main rally leader has left.\nWe take fast and lose slowly."}
  ],
  note: "※ Supplies: points dropped around a building when an attack succeeds or a defense fails.",
  recover: {teams: [{t: "Recovery 1"}, {t: "Recovery 2"}, {t: "Recovery 3"}], title: "Recovery team of 12 — 3 squads · 4 each · N/E/S/W", text: "The 12 recovery players form 3 squads of 4. Each squad takes the north · east · south · west sides around the building being fought over, one player per side, and picks up only the loot that lands in their own zone, then returns to their spot. No overlap, so nothing is missed and recovery is fastest. If a recovery player is over 180,000 or has lost all troops and can no longer fight, please swap with a substitute. The video below shows Recovery squad 1."},
  teams: [{t: "Team 1"}, {t: "Team 2"}],
  captions: [
    {t: "Start — 6 rally leaders move to their spots"},
    {t: "Hold your building · tell recovery when attacked"},
    {t: "15 min — #1 {1} → Swordshrine · #2 {2} → Hall of Reformation"},
    {t: "Sub-leaders cover the spot their partner left"},
    {t: "30 min — tunnels open · gatherers go to their tunnels together"},
    {t: "Take fast, lose slowly"}
  ],
  rvCap: [[0, 1.5, "① A fight breaks out at the building"], [1.5, 3.3, "② Loot (coins) sprays in every direction"], [3.3, 6.8, "③ N · E · S · W — each recovers only their zone by march line"], [6.8, 9.5, "④ Stay on your spot and bring loot in by march"]],
  roles: {
    lead: {t: "Rally leaders", d: ["Phase 1 route (by leader order): 1 enemy Sanctum → 2 enemy Abbey 1 → 3 our Sanctum → 4 Bell Tower → 5 enemy Abbey 2 → 6 our Abbey 1.", "Take Sanctums · Abbeys with your 1st · 2nd marches.", "When attacking, 1st march rallies for 3–5 min.", "When defending, swap gear on 1st · 2nd marches.", "15 min: #1 Yui → Swordshrine · #2 Lotto → Hall of Reformation. Everyone else holds their phase-1 building.", "★ If the building you are defending (Sanctum · Abbey · Bell Tower, etc.) is attacked, tell the recovery team at once."]},
    sub: {t: "Sub-leaders", d: ["Partners are set by rank — #1 ↔ #7, #2 ↔ #8 … #6 ↔ #12 (shown with ↔).", "★ Always cover the spot your partner (main rally leader) left with your 1st march.", "Sub-leaders belong to their partner's team (Team 1 · Team 2).", "★ If the building you are defending (Sanctum · Abbey · Bell Tower, etc.) is attacked, tell the recovery team at once.", "10%+ buffs.", "Defend Sanctums · Abbeys that include a rally leader with your 1st march.", "Refill defense on our Sanctums · Abbeys.", "Tell joiners where a rally is short."]},
    gather: {t: "Gatherers", d: ["Marches 1–4 gather; the other 2 marches support rallies · defense — never skip rallies · defense.", "When tunnels open at 30 min, everyone goes to their own tunnel (1–4) at the same time (G1–G4 on the map).", "Advance when gathering spots open.", "Take 2 gathering spots (enemy · ours).", "March 4 defends Sanctums · Abbeys."]},
    scout: {t: "Scouts", d: ["March 4 — defend Sanctums · Abbeys.", "2nd rally — scout enemy Sanctums · Abbeys and find the enemy 1st march.", "★ Let the recovery team teleport in first; if any spot is empty (recovery post · building), a scout moves there to fill it."]},
    recover: {t: "Recovery", d: ["Purpose: stand N · E · S · W and recover the loot (3 squads of 4).", "★ Over 180,000, or all troops dead and unable to fight — please swap with a substitute.", "Mid game: focus on picking up supplies fast.", "Late game: with the sub-leaders, the core of the take-and-retake fight."]}
  }
};
