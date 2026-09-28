"use client";

import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, SectionHeading } from "./field";

export function Bab1KompetensiAwal() {
  const informasiUmum = useModulAjarStore((s) => s.data.informasiUmum);
  const update = useModulAjarStore((s) => s.updateInformasiUmum);

  return (
    <Card>
      <CardContent className="pt-5">
        <SectionHeading
          title="Kompetensi Awal"
          description="Kemampuan atau pengetahuan prasyarat yang perlu dimiliki peserta didik sebelum mempelajari topik ini."
        />
        <Field label="Uraian Kompetensi Awal" htmlFor="kompetensiAwal">
          <Textarea
            id="kompetensiAwal"
            rows={6}
            placeholder="Jelaskan pengetahuan atau keterampilan prasyarat peserta didik..."
            value={informasiUmum.kompetensiAwal}
            onChange={(e) => update({ kompetensiAwal: e.target.value })}
          />
        </Field>
      </CardContent>
    </Card>
  );
}
