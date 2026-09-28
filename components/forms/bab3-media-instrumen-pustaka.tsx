"use client";

import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, SectionHeading } from "./field";

export function Bab3MediaInstrumenPustaka() {
  const lampiran = useModulAjarStore((s) => s.data.lampiran);
  const update = useModulAjarStore((s) => s.updateLampiran);

  return (
    <Card>
      <CardContent className="space-y-6 pt-5">
        <div>
          <SectionHeading title="Media Pembelajaran" />
          <Field label="Daftar Media" htmlFor="mediaPembelajaran">
            <Textarea
              id="mediaPembelajaran"
              rows={4}
              placeholder="cth. Slide presentasi, video, kartu simulasi..."
              value={lampiran.mediaPembelajaran}
              onChange={(e) => update({ mediaPembelajaran: e.target.value })}
            />
          </Field>
        </div>

        <div>
          <SectionHeading title="Instrumen Asesmen" />
          <Field label="Daftar Instrumen" htmlFor="instrumenAsesmen">
            <Textarea
              id="instrumenAsesmen"
              rows={4}
              placeholder="cth. Lembar observasi, kuis, tes tertulis..."
              value={lampiran.instrumenAsesmen}
              onChange={(e) => update({ instrumenAsesmen: e.target.value })}
            />
          </Field>
        </div>

        <div>
          <SectionHeading title="Rubrik Penilaian" />
          <Field label="Uraian Rubrik" htmlFor="rubrikPenilaian">
            <Textarea
              id="rubrikPenilaian"
              rows={5}
              placeholder="Tuliskan kriteria dan skala penilaian..."
              value={lampiran.rubrikPenilaian}
              onChange={(e) => update({ rubrikPenilaian: e.target.value })}
            />
          </Field>
        </div>

        <div>
          <SectionHeading title="Daftar Pustaka" />
          <Field label="Referensi" htmlFor="daftarPustaka">
            <Textarea
              id="daftarPustaka"
              rows={4}
              placeholder="Tuliskan sumber referensi sesuai kaidah penulisan..."
              value={lampiran.daftarPustaka}
              onChange={(e) => update({ daftarPustaka: e.target.value })}
            />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
