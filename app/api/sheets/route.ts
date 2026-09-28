import { NextRequest, NextResponse } from "next/server";
import { getWebAppUrl, getSecret, callAppsScript } from "../../../lib/apps-scripts";

export const dynamic = "force-dynamic";

/**
 * POST /api/sheets
 * Menerima seluruh data Modul Ajar (JSON) dari client, lalu meneruskannya
 * ke Google Apps Script Web App yang terhubung ke Google Sheets.
 *
 * Environment variable yang dibutuhkan (lihat .env.example / README.md):
 * - GOOGLE_SHEETS_WEBAPP_URL : URL deployment Web App Apps Script
 * - GOOGLE_SHEETS_SECRET     : (opsional) token sederhana untuk verifikasi
 */
export async function POST(req: NextRequest) {
  const webAppUrl = getWebAppUrl();

  if (!webAppUrl) {
    return NextResponse.json(
      {
        success: false,
        message:
          "GOOGLE_SHEETS_WEBAPP_URL belum dikonfigurasi atau formatnya tidak valid di environment variables. Lihat README.md bagian 'Integrasi Google Sheets'.",
      },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    const payload = {
      action: "save",
      secret: getSecret(),
      rowId: body?.rowId || null,
      data: body?.data,
      timestamp: new Date().toISOString(),
    };

    const upstream = await callAppsScript(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    let json: any;
    try {
      json = JSON.parse(text);
    } catch {
      json = { success: upstream.ok, message: text.slice(0, 300) };
    }

    if (!upstream.ok || json?.success === false) {
      return NextResponse.json(
        {
          success: false,
          message:
            json?.message || "Google Apps Script menolak permintaan penyimpanan.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: json?.message || "Data berhasil disimpan ke Google Sheets.",
      rowId: json?.rowId,
    });
  } catch (err) {
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