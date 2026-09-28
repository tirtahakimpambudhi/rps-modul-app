"use client";

import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Field, SectionHeading } from "./field";

export function Bab1Identitas() {
  const informasiUmum = useModulAjarStore((s) => s.data.informasiUmum);
  const update = useModulAjarStore((s) => s.updateInformasiUmum);

  return (
    <Card>
      <CardContent className="pt-5">
        <SectionHeading
          title="Identitas Modul Ajar"
          description="Data administratif dasar sebagai kepala dokumen Modul Ajar."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nama Penyusun" htmlFor="namaPenyusun">
            <Input
              id="namaPenyusun"
              placeholder="cth. Silpi, S.Pd."
              value={informasiUmum.namaPenyusun}
              onChange={(e) => update({ namaPenyusun: e.target.value })}
            />
          </Field>
          <Field label="Satuan Pendidikan" htmlFor="satuanPendidikan">
            <Input
              id="satuanPendidikan"
              placeholder="cth. SMK Negeri 1 Yogyakarta"
              value={informasiUmum.satuanPendidikan}
              onChange={(e) => update({ satuanPendidikan: e.target.value })}
            />
          </Field>
          <Field label="Mata Pelajaran" htmlFor="mataPelajaran">
            <Input
              id="mataPelajaran"
              placeholder="cth. Dasar-Dasar Akuntansi"
              value={informasiUmum.mataPelajaran}
              onChange={(e) => update({ mataPelajaran: e.target.value })}
            />
          </Field>
          <Field label="Kelas / Fase" htmlFor="kelasFase">
            <Input
              id="kelasFase"
              placeholder="cth. X / Fase E"
              value={informasiUmum.kelasFase}
              onChange={(e) => update({ kelasFase: e.target.value })}
            />
          </Field>
          <Field label="Semester / Tahun Ajaran" htmlFor="semesterTahunAjaran">
            <Input
              id="semesterTahunAjaran"
              placeholder="cth. Ganjil / 2026-2027"
              value={informasiUmum.semesterTahunAjaran}
              onChange={(e) => update({ semesterTahunAjaran: e.target.value })}
            />
          </Field>
          <Field label="Elemen" htmlFor="elemen">
            <Input
              id="elemen"
              placeholder="cth. Proses Bisnis Bidang Akuntansi"
              value={informasiUmum.elemen}
              onChange={(e) => update({ elemen: e.target.value })}
            />
          </Field>
          <Field label="Topik / Materi" htmlFor="topikMateri">
            <Input
              id="topikMateri"
              placeholder="cth. Persamaan Dasar Akuntansi"
              value={informasiUmum.topikMateri}
              onChange={(e) => update({ topikMateri: e.target.value })}
            />
          </Field>
          <Field label="Alokasi Waktu" htmlFor="alokasiWaktu">
            <Input
              id="alokasiWaktu"
              placeholder="cth. 3 x 45 menit"
              value={informasiUmum.alokasiWaktu}
              onChange={(e) => update({ alokasiWaktu: e.target.value })}
            />
          </Field>
          <Field label="Moda Pembelajaran" htmlFor="modaPembelajaran">
            <Select
              id="modaPembelajaran"
              value={informasiUmum.modaPembelajaran}
              onChange={(e) => update({ modaPembelajaran: e.target.value })}
            >
              <option value="">Pilih moda pembelajaran</option>
              <option value="Tatap Muka (Luring)">Tatap Muka (Luring)</option>
              <option value="Pembelajaran Jarak Jauh (Daring)">
                Pembelajaran Jarak Jauh (Daring)
              </option>
              <option value="Blended Learning (Kombinasi)">
                Blended Learning (Kombinasi)
              </option>
            </Select>
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
