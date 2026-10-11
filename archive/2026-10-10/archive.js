// 2026-10-10 KvK 보관판. 구글 시트 대신 이 폴더 data/<gid>.csv(그날 떠 둔 값)를 읽고, 저장·제출은 보내지 않는다
(function () {
  const real = window.fetch.bind(window);
  window.fetch = function (url, opt) {
    const u = String(url && url.url || url);
    if (u.indexOf("docs.google.com/spreadsheets") >= 0) {
      const g = (u.match(/gid=(\d+)/) || [])[1];
      return real("data/" + g + ".csv");
    }
    if (u.indexOf("docs.google.com/forms") >= 0) return Promise.resolve(new Response("", {status: 200}));
    return real(url, opt);
  };
  document.addEventListener("DOMContentLoaded", function () {
    const b = document.createElement("div");
    b.textContent = "📦 2026-10-10 KvK 보관판 — 읽기 전용 (저장·제출 안 됨)";
    b.style.cssText = "position:sticky;top:0;z-index:99999;background:#5a3e00;color:#ffe9a8;text-align:center;font:600 13px/1.6 sans-serif;padding:4px 8px";
    document.body.insertBefore(b, document.body.firstChild);
  });
})();
