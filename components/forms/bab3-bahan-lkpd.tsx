"use client";

import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, SectionHeading } from "./field";

export function Bab3BahanLkpd() {
  const lampiran = useModulAjarStore((s) => s.data.lampiran);
  const update = useModulAjarStore((s) => s.updateLampiran);

  return (
    <Card>
      <CardContent className="space-y-6 pt-5">
        <div>
          <SectionHeading
            title="Bahan Ajar Ringkas"
            description="Ringkasan materi inti yang menjadi acuan penjelasan di kelas."
          />
          <Field label="Uraian Bahan Ajar" htmlFor="bahanAjarRingkas">
            <Textarea
              id="bahanAjarRingkas"
              rows={6}
              placeholder="Tuliskan ringkasan materi ajar..."
              value={lampiran.bahanAjarRingkas}
              onChange={(e) => update({ bahanAjarRingkas: e.target.value })}
            />
          </Field>
        </div>

        <div>
          <SectionHeading
            title="LKPD (Lembar Kerja Peserta Didik)"
            description="Instruksi dan soal/kasus yang dikerjakan peserta didik."
          />
          <Field label="Isi LKPD" htmlFor="lkpd">
            <Textarea
              id="lkpd"
              rows={7}
              placeholder="Tuliskan instruksi dan soal LKPD..."
              value={lampiran.lkpd}
              onChange={(e) => update({ lkpd: e.target.value })}
            />
          </Field>
        </div>

        <div>
          <SectionHeading title="Kunci Jawaban LKPD" />
          <Field label="Kunci Jawaban" htmlFor="kunciJawabanLkpd">
            <Textarea
              id="kunciJawabanLkpd"
              rows={5}
              placeholder="Tuliskan kunci jawaban LKPD..."
              value={lampiran.kunciJawabanLkpd}
              onChange={(e) => update({ kunciJawabanLkpd: e.target.value })}
            />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
