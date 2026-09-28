import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/sheets/load?rowId=optional
 * Mengambil data Modul Ajar (baris terakhir, atau baris tertentu bila
 * rowId diberikan) dari Google Sheets melalui Google Apps Script Web App.
 */
export async function GET(req: NextRequest) {
  const webAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

  if (!webAppUrl) {
    return NextResponse.json(
      {
        success: false,
        message:
          "GOOGLE_SHEETS_WEBAPP_URL belum dikonfigurasi di environment variables. Lihat README.md bagian 'Integrasi Google Sheets'.",
      },
      { status: 500 }
    );
  }

  try {
    const rowId = req.nextUrl.searchParams.get("rowId");
    const clean = (v?: string) => (v ?? "").trim().replace(/^["'\s]+|["'\s]+$/g, "");

    const secret = clean(process.env.GOOGLE_SHEETS_SECRET || "");

    const params = new URLSearchParams({ action: "load", secret });
    if (rowId) params.set("rowId", rowId);

    const upstream = await fetch(`${webAppUrl}?${params.toString()}`, {
      method: "GET",
      redirect: "follow",
    });

    const text = await upstream.text();
    let json: any;
    try {
      json = JSON.parse(text);
    } catch {
      json = { success: upstream.ok, message: text };
    }

    if (!upstream.ok || json?.success === false) {
      return NextResponse.json(
        {
          success: false,
          message: json?.message || "Google Apps Script menolak permintaan pengambilan data.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: json?.message || "Data berhasil dimuat dari Google Sheets.",
      data: json?.data,
    });
  }  catch (err) {
    const cause = (err as any)?.cause;
    console.error("Sheets fetch error:", err, cause);
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? `Gagal menghubungi Google Apps Script: ${err.message}` +
              (cause ? ` (${cause.code || ""} ${cause.message || cause})` : "")
            : "Gagal menghubungi Google Apps Script.",
      },
      { status: 500 }
    );
  }
}
