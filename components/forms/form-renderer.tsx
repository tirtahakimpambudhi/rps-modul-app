"use client";

import { useModulAjarStore } from "@/lib/store";
import { NAV_ITEMS } from "@/lib/types";
import { Bab1Identitas } from "./bab1-identitas";
import { Bab1KompetensiAwal } from "./bab1-kompetensi-awal";
import { Bab1ProfilPancasila } from "./bab1-profil-pancasila";
import { Bab1SaranaTargetModel } from "./bab1-sarana-target-model";
import { Bab2CapaianPembelajaran } from "./bab2-capaian-pembelajaran";
import { Bab2TujuanKktp } from "./bab2-tujuan-kktp";
import { Bab2PemahamanPemantik } from "./bab2-pemahaman-pemantik";
import { Bab2LangkahPembelajaran } from "./bab2-langkah-pembelajaran";
import { Bab2RencanaAsesmen } from "./bab2-rencana-asesmen";
import { Bab2DiferensiasiRemedial } from "./bab2-diferensiasi-remedial";
import { Bab2Refleksi } from "./bab2-refleksi";
import { Bab3BahanLkpd } from "./bab3-bahan-lkpd";
import { Bab3MediaInstrumenPustaka } from "./bab3-media-instrumen-pustaka";

const BAB_LABEL: Record<"I" | "II" | "III", string> = {
  I: "Bab I · Informasi Umum",
  II: "Bab II · Komponen Inti",
  III: "Bab III · Lampiran",
};

export function FormRenderer() {
  const activeSection = useModulAjarStore((s) => s.activeSection);
  const navItem = NAV_ITEMS.find((n) => n.id === activeSection);

  return (
    <div className="mx-auto max-w-4xl">
      {navItem && (
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-primary">
          {BAB_LABEL[navItem.bab]}
        </p>
      )}
      {activeSection === "identitas" && <Bab1Identitas />}
      {activeSection === "kompetensi-awal" && <Bab1KompetensiAwal />}
      {activeSection === "profil-pancasila" && <Bab1ProfilPancasila />}
      {activeSection === "sarana-target-model" && <Bab1SaranaTargetModel />}
      {activeSection === "capaian-pembelajaran" && <Bab2CapaianPembelajaran />}
      {activeSection === "tujuan-kktp" && <Bab2TujuanKktp />}
      {activeSection === "pemahaman-pemantik" && <Bab2PemahamanPemantik />}
      {activeSection === "langkah-pembelajaran" && <Bab2LangkahPembelajaran />}
      {activeSection === "rencana-asesmen" && <Bab2RencanaAsesmen />}
      {activeSection === "diferensiasi-remedial" && <Bab2DiferensiasiRemedial />}
      {activeSection === "refleksi" && <Bab2Refleksi />}
      {activeSection === "bahan-lkpd" && <Bab3BahanLkpd />}
      {activeSection === "media-instrumen-pustaka" && <Bab3MediaInstrumenPustaka />}
    </div>
  );
}
