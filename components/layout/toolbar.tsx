"use client";

import { useRef, useState } from "react";
import {
  Cloud,
  CloudDownload,
  Download,
  Upload,
  Printer,
  Sparkles,
  Menu,
  FileText,
  LayoutGrid,
  RotateCcw,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModulAjarStore } from "@/lib/store";
import {
  exportJSON,
  importJSON,
  saveToGoogleSheets,
  loadFromGoogleSheets,
} from "@/lib/google-sheets";

export function Toolbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const data = useModulAjarStore((s) => s.data);
  const viewMode = useModulAjarStore((s) => s.viewMode);
  const setViewMode = useModulAjarStore((s) => s.setViewMode);
  const loadDummyData = useModulAjarStore((s) => s.loadDummyData);
  const resetData = useModulAjarStore((s) => s.resetData);
  const loadData = useModulAjarStore((s) => s.loadData);
  const syncStatus = useModulAjarStore((s) => s.syncStatus);
  const syncMessage = useModulAjarStore((s) => s.syncMessage);
  const setSyncStatus = useModulAjarStore((s) => s.setSyncStatus);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<"save" | "load" | null>(null);

  async function handleSaveSheets() {
    setBusy("save");
    setSyncStatus("saving", "Menyimpan ke Google Sheets...");
    const res = await saveToGoogleSheets(data);
    setSyncStatus(res.success ? "success" : "error", res.message);
    setBusy(null);
    window.setTimeout(() => setSyncStatus("idle", ""), 4000);
  }

  async function handleLoadSheets() {
    setBusy("load");
    setSyncStatus("saving", "Memuat data dari Google Sheets...");
    const res = await loadFromGoogleSheets();
    if (res.success && res.data) {
      loadData(res.data);
    }
    setSyncStatus(res.success ? "success" : "error", res.message);
    setBusy(null);
    window.setTimeout(() => setSyncStatus("idle", ""), 4000);
  }

  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const parsed = await importJSON(file);
      loadData(parsed);
      setSyncStatus("success", "Berhasil mengimpor data dari file JSON.");
    } catch (err) {
      setSyncStatus("error", err instanceof Error ? err.message : "Gagal mengimpor file.");
    } finally {
      window.setTimeout(() => setSyncStatus("idle", ""), 4000);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="no-print sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 lg:px-6">
        <button
          onClick={onOpenSidebar}
          className="mr-1 rounded-md p-1.5 hover:bg-muted lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "form" | "preview")}>
          <TabsList>
            <TabsTrigger value="form" className="gap-1.5">
              <LayoutGrid className="h-3.5 w-3.5" /> Form Input
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-1.5">
              <FileText className="h-3.5 w-3.5" /> Tampilan Dokumen
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex-1" />

        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm("Muat contoh data Akuntansi Fase E? Data form saat ini akan diganti.")) {
                loadDummyData();
              }
            }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Contoh Data
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm("Kosongkan seluruh form? Tindakan ini tidak dapat dibatalkan.")) {
                resetData();
              }
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>

          <div className="mx-1 h-5 w-px bg-border" />

          <Button variant="outline" size="sm" onClick={() => exportJSON(data)}>
            <Download className="h-3.5 w-3.5" /> Export JSON
          </Button>

          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-3.5 w-3.5" /> Import JSON
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImportFile}
          />

          <div className="mx-1 h-5 w-px bg-border" />

          <Button variant="outline" size="sm" onClick={handleLoadSheets} disabled={busy !== null}>
            {busy === "load" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CloudDownload className="h-3.5 w-3.5" />
            )}
            Muat dari Sheets
          </Button>

          <Button size="sm" onClick={handleSaveSheets} disabled={busy !== null}>
            {busy === "save" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Cloud className="h-3.5 w-3.5" />
            )}
            Simpan ke Sheets
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setViewMode("preview");
              window.setTimeout(() => window.print(), 150);
            }}
          >
            <Printer className="h-3.5 w-3.5" /> Cetak / PDF
          </Button>
        </div>
      </div>

      {syncStatus !== "idle" && (
        <div
          className={`flex items-center gap-2 px-4 py-1.5 text-xs lg:px-6 ${
            syncStatus === "success"
              ? "bg-emerald-50 text-emerald-700"
              : syncStatus === "error"
              ? "bg-red-50 text-red-700"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          {syncStatus === "saving" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {syncStatus === "success" && <CheckCircle2 className="h-3.5 w-3.5" />}
          {syncStatus === "error" && <XCircle className="h-3.5 w-3.5" />}
          <span>{syncMessage}</span>
        </div>
      )}
    </div>
  );
}
