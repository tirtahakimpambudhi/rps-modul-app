// Ambil ID deployment saja, lalu susun ulang URL. Ini membuang semua
// karakter sisa (kutip, spasi, karakter tak terlihat) dari env var.
export function getWebAppUrl(): string {
  const raw = process.env.GOOGLE_SHEETS_WEBAPP_URL ?? "";
  const m = raw.match(/macros\/s\/([A-Za-z0-9_-]+)\/exec/);
  return m ? `https://script.google.com/macros/s/${m[1]}/exec` : "";
}

export function getSecret(): string {
  return (process.env.GOOGLE_SHEETS_SECRET ?? "")
    .trim()
    .replace(/^["'\s]+|["'\s]+$/g, "");
}

// Mengikuti redirect Apps Script secara manual sambil mencatat lokasinya.
export async function callAppsScript(url: string, init: RequestInit) {
  let res = await fetch(url, { ...init, redirect: "manual", cache: "no-store" });

  for (let i = 0; i < 5 && res.status >= 300 && res.status < 400; i++) {
    const loc = res.headers.get("location");
    console.log("Apps Script redirect:", res.status, JSON.stringify(loc?.slice(0, 90)));
    if (!loc) break;
    res = await fetch(new URL(loc, url).toString(), {
      method: "GET",
      redirect: "manual",
      cache: "no-store",
    });
  }
  return res;
}