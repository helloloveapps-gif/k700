// LOVEAPPS 채팅 알림 일꾼(서비스 워커) — 푸시 알림 받기 · 누르면 채팅 열기. 페이지 저장(캐시)은 하지 않는다(늘 새 판)
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = {body: e.data ? e.data.text() : ""}; }
  e.waitUntil((async () => {
    // 지금 채팅을 보고 있으면 안 띄운다(아이폰은 매번 띄워야 알림 권한이 유지돼 늘 띄움)
    const ios = /iPhone|iPad|iPod/.test(self.navigator.userAgent);
    // 소리 끄기(⋯ → 소리) — 채팅 화면이 캐시에 둔 값
    let quiet = false;
    try { const r = await (await caches.open("chat-cfg")).match("cfg"); if (r) quiet = !!(await r.json()).quiet; } catch (x) {}
    const cs = await self.clients.matchAll({type: "window", includeUncontrolled: true});
    if (!ios && cs.some(c => c.visibilityState === "visible" && c.focused)) return;
    // 채팅 화면이 살아 있으면(내려 둔 상태) 그 화면이 「슬립~ 슬립~」을 낸다 → 알림은 소리 없이(소리 두 번 겹치지 않게). 아이폰은 화면이 멈춰 있어 기본음 유지
    const alive = !ios && cs.some(c => /chat\.html/.test(c.url));
    // 소리 · 진동: silent:false + renotify(같은 방 알림이 겹쳐도 매번 울림) + 진동 무늬. 소리 종류는 폰 설정을 따른다(웹 알림은 소리 파일을 못 고름)
    await self.registration.showNotification(d.title || "LOVEAPPS", {body: d.body || "", tag: d.tag || "chat", renotify: !(quiet || alive), silent: quiet || alive, vibrate: quiet ? [] : [200, 100, 200], icon: "icon-192.png", badge: "icon-192.png", timestamp: Date.now()});
  })());
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil((async () => {
    const cs = await self.clients.matchAll({type: "window", includeUncontrolled: true});
    const c = cs.find(x => /chat\.html/.test(x.url));
    if (c) return c.focus();
    return self.clients.openWindow("chat.html");
  })());
});
