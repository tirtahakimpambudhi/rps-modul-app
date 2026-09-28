/**
 * GOOGLE APPS SCRIPT — Backend penyimpanan untuk
 * "Generator & Editor Modul Ajar Kurikulum Merdeka"
 *
 * CARA PAKAI:
 * 1. Buat Google Spreadsheet baru (mis. "Database Modul Ajar").
 * 2. Buka menu Extensions > Apps Script pada spreadsheet tersebut.
 * 3. Hapus kode default, lalu tempel (paste) seluruh isi file ini.
 * 4. Ganti nilai SECRET di bawah dengan token rahasia Anda sendiri
 *    (harus sama dengan GOOGLE_SHEETS_SECRET di file .env Next.js Anda).
 * 5. Klik Deploy > New deployment > pilih tipe "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Salin URL Web App yang diberikan, lalu tempel sebagai nilai
 *    GOOGLE_SHEETS_WEBAPP_URL di file .env aplikasi Next.js Anda.
 */

const SECRET = "ganti-dengan-secret-anda"; // HARUS sama dengan GOOGLE_SHEETS_SECRET
const SHEET_NAME = "ModulAjar";

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["rowId", "timestamp", "topikMateri", "namaPenyusun", "dataJSON"]);
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (SECRET && body.secret !== SECRET) {
      return jsonResponse_({ success: false, message: "Token akses tidak valid." });
    }

    const sheet = getSheet_();
    const data = body.data || {};
    const rowId = body.rowId || Utilities.getUuid();
    const timestamp = body.timestamp || new Date().toISOString();
    const topikMateri = (data.informasiUmum && data.informasiUmum.topikMateri) || "";
    const namaPenyusun = (data.informasiUmum && data.informasiUmum.namaPenyusun) || "";

    // Cari baris dengan rowId yang sama (update), jika tidak ada -> tambah baris baru
    const values = sheet.getDataRange().getValues();
    let targetRow = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === rowId) {
        targetRow = i + 1;
        break;
      }
    }

    const rowData = [rowId, timestamp, topikMateri, namaPenyusun, JSON.stringify(data)];

    if (targetRow > 0) {
      sheet.getRange(targetRow, 1, 1, rowData.length).setValues([rowData]);
    } else {
      sheet.appendRow(rowData);
    }

    return jsonResponse_({ success: true, message: "Data berhasil disimpan.", rowId: rowId });
  } catch (err) {
    return jsonResponse_({ success: false, message: "Error: " + err.message });
  }
}

function doGet(e) {
  try {
    const params = e.parameter || {};

    if (SECRET && params.secret !== SECRET) {
      return jsonResponse_({ success: false, message: "Token akses tidak valid." });
    }

    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();

    if (values.length <= 1) {
      return jsonResponse_({ success: false, message: "Belum ada data tersimpan di Google Sheets." });
    }

    let row = null;
    if (params.rowId) {
      for (let i = 1; i < values.length; i++) {
        if (values[i][0] === params.rowId) {
          row = values[i];
          break;
        }
      }
      if (!row) {
        return jsonResponse_({ success: false, message: "rowId tidak ditemukan." });
      }
    } else {
      row = values[values.length - 1]; // baris terakhir
    }

    const data = JSON.parse(row[4]);
    return jsonResponse_({ success: true, message: "Data berhasil dimuat.", data: data });
  } catch (err) {
    return jsonResponse_({ success: false, message: "Error: " + err.message });
  }
}
