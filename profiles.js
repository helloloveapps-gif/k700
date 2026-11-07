// 프로필 갤러리 — 비밀번호를 넣어야 그림이 풀린다(profiles/*.bin 은 AES-GCM 으로 잠김, 만드는 곳 D:\킹샷\make_profiles.py)
// 썸네일 격자 → 누르면 화면 크기에 맞춰 크게 · 좌우 넘기기 · 받기
(() => {
  const T = {
    ko: {h: "🎭 프로필", d: "직업 · 능력별 프로필 그림입니다. 마음에 드는 그림을 눌러 크게 보고 받으세요.", pw: "비밀번호", open: "열기", bad: "비밀번호가 맞지 않습니다.", wait: "여는 중…", dl: "⬇ 받기", close: "닫기", none: "아직 그림이 없습니다."},
    en: {h: "🎭 Profiles", d: "Profile pictures by job and skill. Tap one to view it full size and download.", pw: "Password", open: "Open", bad: "Wrong password.", wait: "Opening…", dl: "⬇ Download", close: "Close", none: "No pictures yet."}
  };
  const st = k => (T[LANG === "ko" ? "ko" : "en"])[k];
  let IDX = null, KEY = null, THUMB = {}, BIG = {}, CUR = -1;
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const open = async (key, buf) => new Uint8Array(await crypto.subtle.decrypt({name: "AES-GCM", iv: buf.slice(0, 12)}, key, buf.slice(12)));
  const css = `
#vProf .pf{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;margin-bottom:12px}
#vProf h2{margin:0 0 6px;font-size:17px}
#vProf .d{font-size:13px;color:var(--sub);margin-bottom:10px}
#vProf .lock{display:flex;gap:8px;flex-wrap:wrap}
#vProf .lock input{min-height:40px;flex:1;min-width:160px}
#vProf .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}
#vProf .it{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--bar);cursor:pointer;padding:0;text-align:center;display:block;width:100%}
#vProf .it img{display:block;width:100%;aspect-ratio:1;object-fit:cover;background:#ddd}
#vProf .it b{display:block;font-size:13px;padding:6px 4px 2px}
#vProf .it small{display:block;font-size:11px;color:var(--sub);padding:0 4px 7px}
#pfBox{position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.9);display:none;flex-direction:column;align-items:center;justify-content:center;padding:12px}
#pfBox.on{display:flex}
#pfBox img{max-width:100%;max-height:calc(100vh - 130px);object-fit:contain;border-radius:10px}
#pfBox .cap{color:#fff;text-align:center;margin:10px 0 6px;font-size:15px}
#pfBox .cap small{display:block;opacity:.75;font-size:12px;margin-top:2px}
#pfBox .bar{display:flex;gap:8px}
#pfBox .bar button,#pfBox .bar a{min-height:40px;padding:0 16px;border-radius:999px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.12);color:#fff;font-weight:700;text-decoration:none;display:inline-flex;align-items:center}
#pfBox .nav{position:absolute;top:50%;transform:translateY(-50%);width:46px;height:64px;border-radius:12px;border:none;background:rgba(255,255,255,.15);color:#fff;font-size:28px}
#pfBox .nav.l{left:8px} #pfBox .nav.r{right:8px}
`;
  function box() {
    let b = document.getElementById("pfBox");
    if (b) return b;
    const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
    b = document.createElement("div"); b.id = "pfBox";
    b.innerHTML = '<button class="nav l" data-go="-1">‹</button><img alt=""><div class="cap"></div><div class="bar"><a class="dl" download></a><button class="x"></button></div><button class="nav r" data-go="1">›</button>';
    document.body.appendChild(b);
    b.addEventListener("click", e => {
      if (e.target === b || e.target.closest(".x")) { b.classList.remove("on"); return; }
      const g = e.target.closest("[data-go]"); if (g) show(CUR + +g.dataset.go);
    });
    document.addEventListener("keydown", e => {
      if (!b.classList.contains("on")) return;
      if (e.key === "Escape") b.classList.remove("on"); else if (e.key === "ArrowLeft") show(CUR - 1); else if (e.key === "ArrowRight") show(CUR + 1);
    });
    let sx = null;
    b.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, {passive: true});
    b.addEventListener("touchend", e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(CUR + (dx < 0 ? 1 : -1)); sx = null; });
    return b;
  }
  async function show(i) {
    const n = IDX.items.length; i = (i + n) % n; CUR = i;
    const it = IDX.items[i], b = box(), im = b.querySelector("img");
    b.querySelector(".cap").innerHTML = '<b>' + esc(it.j[LANG === "ko" ? 0 : 1] || it.j[0]) + '</b><small>' + esc(it.j[2] || "") + '</small>';
    b.querySelector(".x").textContent = st("close");
    im.src = THUMB[it.f] || "";
    b.classList.add("on");
    if (!BIG[it.f]) {
      const buf = new Uint8Array(await (await fetch("profiles/" + it.f + ".bin")).arrayBuffer());
      BIG[it.f] = URL.createObjectURL(new Blob([await open(KEY, buf)], {type: "image/webp"}));
    }
    if (CUR !== i) return;
    im.src = BIG[it.f];
    const a = b.querySelector(".dl"); a.href = BIG[it.f]; a.download = "k700_" + (it.j[1] || it.f).replace(/\W+/g, "_") + ".webp"; a.textContent = st("dl");
  }
  function render(msg) {
    const V = $("vProf"); if (!V) return;
    box();
    let h = '<div class="pf"><h2>' + st("h") + '</h2><div class="d">' + esc(st("d")) + '</div>';
    if (!KEY) h += '<div class="lock"><input type="password" id="pfPw" placeholder="' + esc(st("pw")) + '" autocomplete="off"><button class="primary" id="pfOpen">' + st("open") + '</button></div><div class="d" id="pfMsg" style="margin-top:8px;color:var(--warn)">' + esc(msg || "") + '</div>';
    else if (!IDX.items.length) h += '<div class="d">' + st("none") + '</div>';
    else h += '<div class="grid">' + IDX.items.map((it, i) => '<button class="it" data-i="' + i + '"><img alt="" src="' + (THUMB[it.f] || "") + '"><b>' + esc(it.j[LANG === "ko" ? 0 : 1] || it.j[0]) + '</b><small>' + esc(it.j[2] || "") + '</small></button>').join("") + '</div>';
    V.innerHTML = h + '</div>';
  }
  async function unlock(pw) {
    if (!IDX) IDX = await (await fetch("profiles/index.json?_=" + Date.now())).json();
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({name: "PBKDF2", salt: b64(IDX.salt), iterations: IDX.iter, hash: "SHA-256"}, base, {name: "AES-GCM", length: 256}, false, ["decrypt"]);
    try { await open(key, b64(IDX.check)); } catch (e) { return false; }
    KEY = key;
    try { sessionStorage.setItem("k700pf", pw); } catch (e) {}
    render();
    for (const it of IDX.items) {
      const buf = new Uint8Array(await (await fetch("profiles/" + it.f + "_t.bin")).arrayBuffer());
      THUMB[it.f] = URL.createObjectURL(new Blob([await open(KEY, buf)], {type: "image/webp"}));
      const img = document.querySelector('#vProf .it[data-i="' + IDX.items.indexOf(it) + '"] img'); if (img) img.src = THUMB[it.f];
    }
    return true;
  }
  let bound = false;
  window.renderProf = () => {
    const V = $("vProf"); if (!V) return;
    if (!bound) {
      bound = true;
      const go = async () => { const pw = ($("pfPw") || {}).value || ""; if (!pw) return; $("pfMsg").textContent = st("wait"); if (!(await unlock(pw))) render(st("bad")); };
      V.addEventListener("click", e => { if (e.target.closest("#pfOpen")) go(); const it = e.target.closest(".it"); if (it) show(+it.dataset.i); });
      V.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.id === "pfPw") go(); });
      let saved = ""; try { saved = sessionStorage.getItem("k700pf") || ""; } catch (e) {}
      if (saved) { render(st("wait")); unlock(saved).then(ok => { if (!ok) render(); }); return; }
    }
    render();
  };
  if (typeof VIEW !== "undefined" && VIEW === "prof") window.renderProf();
})();
