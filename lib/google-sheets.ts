import type { ModulAjarData } from "./types";

export interface SheetsSaveResponse {
  success: boolean;
  message: string;
  rowId?: string;
}

export interface SheetsLoadResponse {
  success: boolean;
  message: string;
  data?: ModulAjarData;
}

/**
 * Mengirim seluruh data Modul Ajar (JSON) ke Google Sheets melalui
 * API Route internal Next.js (/api/sheets), yang selanjutnya meneruskan
 * ke Google Apps Script Web App. Lihat README.md untuk panduan setup.
 */
export async function saveToGoogleSheets(
  data: ModulAjarData,
  rowId?: string
): Promise<SheetsSaveResponse> {
  try {
    const res = await fetch("/api/sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, rowId }),
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json?.message || `Gagal menyimpan (status ${res.status}).`,
      };
    }

    return {
      success: true,
      message: json?.message || "Data berhasil disimpan ke Google Sheets.",
      rowId: json?.rowId,
    };
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error
          ? `Terjadi kesalahan jaringan: ${err.message}`
          : "Terjadi kesalahan tak terduga saat menyimpan ke Google Sheets.",
    };
  }
}

/**
 * Memuat data Modul Ajar terakhir dari Google Sheets melalui API Route
 * internal (/api/sheets/load).
 */
export async function loadFromGoogleSheets(rowId?: string): Promise<SheetsLoadResponse> {
  try {
    const url = rowId
      ? `/api/sheets/load?rowId=${encodeURIComponent(rowId)}`
      : "/api/sheets/load";
    const res = await fetch(url, { method: "GET" });
    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json?.message || `Gagal memuat data (status ${res.status}).`,
      };
    }

    return {
      success: true,
      message: json?.message || "Data berhasil dimuat dari Google Sheets.",
      data: json?.data,
    };
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error
          ? `Terjadi kesalahan jaringan: ${err.message}`
          : "Terjadi kesalahan tak terduga saat memuat dari Google Sheets.",
    };
  }
}

/** Ekspor data sebagai file .json yang diunduh langsung di browser. */
export function exportJSON(data: ModulAjarData) {
  const fileName = `modul-ajar-${(data.informasiUmum.topikMateri || "draft")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}.json`;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Membaca file .json yang diunggah pengguna dan mengembalikan objeknya. */
export function importJSON(file: File): Promise<ModulAjarData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        resolve(parsed as ModulAjarData);
      } catch {
        reject(new Error("File JSON tidak valid atau rusak."));
      }
    };
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.readAsText(file);
  });
}
