"use client";

import { useModulAjarStore } from "@/lib/store";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 break-inside-avoid">
      <h3 className="mb-1.5 text-sm font-bold uppercase tracking-wide text-slate-800">
        {title}
      </h3>
      <div className="text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}

function Multiline({ text, placeholder }: { text: string; placeholder: string }) {
  if (!text?.trim()) {
    return <p className="italic text-slate-400">{placeholder}</p>;
  }
  return (
    <div className="whitespace-pre-line">
      {text}
    </div>
  );
}

function BabHeading({ roman, title }: { roman: string; title: string }) {
  return (
    <h2 className="mb-4 mt-8 border-b-2 border-slate-800 pb-1.5 text-base font-bold uppercase tracking-wide text-slate-900 first:mt-0">
      Bab {roman} — {title}
    </h2>
  );
}

export function DocumentPreview() {
  const { informasiUmum, komponenInti, lampiran } = useModulAjarStore((s) => s.data);

  return (
    <div id="print-area" className="mx-auto max-w-4xl bg-white px-2 py-4 sm:px-8 sm:py-8 print:p-0">
      <div className="mb-8 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
          Modul Ajar — Kurikulum Merdeka
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          {informasiUmum.topikMateri || "Judul Topik / Materi Belum Diisi"}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          {informasiUmum.mataPelajaran || "Mata Pelajaran"} · {informasiUmum.kelasFase || "Kelas/Fase"}
        </p>
      </div>

      <BabHeading roman="I" title="Informasi Umum" />

      <div className="mb-5 grid grid-cols-1 gap-x-8 gap-y-1.5 rounded-md border border-slate-200 p-4 text-sm sm:grid-cols-2 print:border-slate-400">
        <InfoRow label="Nama Penyusun" value={informasiUmum.namaPenyusun} />
        <InfoRow label="Satuan Pendidikan" value={informasiUmum.satuanPendidikan} />
        <InfoRow label="Mata Pelajaran" value={informasiUmum.mataPelajaran} />
        <InfoRow label="Kelas / Fase" value={informasiUmum.kelasFase} />
        <InfoRow label="Semester / Tahun Ajaran" value={informasiUmum.semesterTahunAjaran} />
        <InfoRow label="Elemen" value={informasiUmum.elemen} />
        <InfoRow label="Topik / Materi" value={informasiUmum.topikMateri} />
        <InfoRow label="Alokasi Waktu" value={informasiUmum.alokasiWaktu} />
        <InfoRow label="Moda Pembelajaran" value={informasiUmum.modaPembelajaran} />
      </div>

      <Section title="Kompetensi Awal">
        <Multiline text={informasiUmum.kompetensiAwal} placeholder="Belum diisi." />
      </Section>

      <Section title="Profil Pelajar Pancasila">
        {informasiUmum.profilPancasila.length === 0 ? (
          <p className="italic text-slate-400">Belum diisi.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-left">
                <th className="py-1.5 pr-3 font-semibold">Dimensi</th>
                <th className="py-1.5 font-semibold">Bentuk Penguatan</th>
              </tr>
            </thead>
            <tbody>
              {informasiUmum.profilPancasila.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 align-top">
                  <td className="py-1.5 pr-3 font-medium">{p.dimensi || "-"}</td>
                  <td className="py-1.5">{p.bentukPenguatan || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      <Section title="Sarana & Prasarana">
        <Multiline text={informasiUmum.saranaPrasarana} placeholder="Belum diisi." />
      </Section>

      <Section title="Target Peserta Didik">
        <Multiline text={informasiUmum.targetPesertaDidik} placeholder="Belum diisi." />
      </Section>

      <Section title="Model & Metode Pembelajaran">
        <Multiline text={informasiUmum.modelMetodePembelajaran} placeholder="Belum diisi." />
      </Section>

      <BabHeading roman="II" title="Komponen Inti" />

      <Section title="Capaian Pembelajaran">
        <Multiline text={komponenInti.capaianPembelajaran} placeholder="Belum diisi." />
      </Section>

      <Section title="Tujuan Pembelajaran & KKTP">
        {komponenInti.tujuanPembelajaran.length === 0 ? (
          <p className="italic text-slate-400">Belum diisi.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-left">
                <th className="w-16 py-1.5 pr-2 font-semibold">Kode</th>
                <th className="py-1.5 pr-3 font-semibold">Rumusan TP</th>
                <th className="py-1.5 font-semibold">KKTP</th>
              </tr>
            </thead>
            <tbody>
              {komponenInti.tujuanPembelajaran.map((t) => (
                <tr key={t.id} className="border-b border-slate-100 align-top">
                  <td className="py-1.5 pr-2 font-medium">{t.kodeTP || "-"}</td>
                  <td className="whitespace-pre-line py-1.5 pr-3">{t.rumusanTP || "-"}</td>
                  <td className="whitespace-pre-line py-1.5">{t.kktp || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      <Section title="Pemahaman Bermakna">
        <Multiline text={komponenInti.pemahamanBermakna} placeholder="Belum diisi." />
      </Section>

      <Section title="Pertanyaan Pemantik">
        <Multiline text={komponenInti.pertanyaanPemantik} placeholder="Belum diisi." />
      </Section>

      <Section title="Langkah Pembelajaran">
        {komponenInti.langkahPembelajaran.length === 0 ? (
          <p className="italic text-slate-400">Belum diisi.</p>
        ) : (
          <div className="space-y-4">
            {komponenInti.langkahPembelajaran.map((l, idx) => (
              <div key={l.id} className="break-inside-avoid rounded-md border border-slate-200 p-3 print:border-slate-400">
                <p className="mb-2 text-sm font-semibold">
                  Pertemuan ke-{l.pertemuanKe || idx + 1}
                  {l.alokasiWaktu ? ` · ${l.alokasiWaktu}` : ""}
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium text-slate-800">Pendahuluan</p>
                    <Multiline text={l.pendahuluan} placeholder="Belum diisi." />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Kegiatan Inti / Sintaks</p>
                    <Multiline text={l.intiSintaks} placeholder="Belum diisi." />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Penutup</p>
                    <Multiline text={l.penutup} placeholder="Belum diisi." />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Rencana Asesmen">
        <div className="space-y-2">
          <div>
            <p className="font-medium text-slate-800">Diagnostik</p>
            <Multiline text={komponenInti.rencanaAsesmen.diagnostik} placeholder="Belum diisi." />
          </div>
          <div>
            <p className="font-medium text-slate-800">Formatif</p>
            <Multiline text={komponenInti.rencanaAsesmen.formatif} placeholder="Belum diisi." />
          </div>
          <div>
            <p className="font-medium text-slate-800">Sumatif</p>
            <Multiline text={komponenInti.rencanaAsesmen.sumatif} placeholder="Belum diisi." />
          </div>
        </div>
      </Section>

      <Section title="Pembelajaran Berdiferensiasi">
        <Multiline text={komponenInti.pembelajaranBerdiferensiasi} placeholder="Belum diisi." />
      </Section>

      <Section title="Remedial & Pengayaan">
        <Multiline text={komponenInti.remedialPengayaan} placeholder="Belum diisi." />
      </Section>

      <Section title="Refleksi Peserta Didik">
        <Multiline text={komponenInti.refleksiSiswa} placeholder="Belum diisi." />
      </Section>

      <Section title="Refleksi Guru">
        <Multiline text={komponenInti.refleksiGuru} placeholder="Belum diisi." />
      </Section>

      <BabHeading roman="III" title="Lampiran" />

      <Section title="Bahan Ajar Ringkas">
        <Multiline text={lampiran.bahanAjarRingkas} placeholder="Belum diisi." />
      </Section>

      <Section title="LKPD (Lembar Kerja Peserta Didik)">
        <Multiline text={lampiran.lkpd} placeholder="Belum diisi." />
      </Section>

      <Section title="Kunci Jawaban LKPD">
        <Multiline text={lampiran.kunciJawabanLkpd} placeholder="Belum diisi." />
      </Section>

      <Section title="Media Pembelajaran">
        <Multiline text={lampiran.mediaPembelajaran} placeholder="Belum diisi." />
      </Section>

      <Section title="Instrumen Asesmen">
        <Multiline text={lampiran.instrumenAsesmen} placeholder="Belum diisi." />
      </Section>

      <Section title="Rubrik Penilaian">
        <Multiline text={lampiran.rubrikPenilaian} placeholder="Belum diisi." />
      </Section>

      <Section title="Daftar Pustaka">
        <Multiline text={lampiran.daftarPustaka} placeholder="Belum diisi." />
      </Section>

      <p className="mt-10 text-center text-xs text-slate-400">
        Dokumen dibuat melalui Generator & Editor Modul Ajar Kurikulum Merdeka
      </p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-44 shrink-0 font-medium text-slate-600">{label}</span>
      <span className="text-slate-800">{value || <span className="italic text-slate-400">Belum diisi</span>}</span>
    </div>
  );
}
