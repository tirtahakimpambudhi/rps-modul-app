"use client";

import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, SectionHeading } from "./field";

export function Bab2RencanaAsesmen() {
  const rencanaAsesmen = useModulAjarStore((s) => s.data.komponenInti.rencanaAsesmen);
  const update = useModulAjarStore((s) => s.updateRencanaAsesmen);

  return (
    <Card>
      <CardContent className="space-y-6 pt-5">
        <SectionHeading
          title="Rencana Asesmen"
          description="Rencana penilaian diagnostik, formatif, dan sumatif yang akan dilakukan."
        />
        <Field label="Asesmen Diagnostik" htmlFor="diagnostik">
          <Textarea
            id="diagnostik"
            rows={4}
            placeholder="Cara mengukur kesiapan dan pemahaman awal peserta didik..."
            value={rencanaAsesmen.diagnostik}
            onChange={(e) => update({ diagnostik: e.target.value })}
          />
        </Field>
        <Field label="Asesmen Formatif" htmlFor="formatif">
          <Textarea
            id="formatif"
            rows={4}
            placeholder="Penilaian proses selama pembelajaran berlangsung..."
            value={rencanaAsesmen.formatif}
            onChange={(e) => update({ formatif: e.target.value })}
          />
        </Field>
        <Field label="Asesmen Sumatif" htmlFor="sumatif">
          <Textarea
            id="sumatif"
            rows={4}
            placeholder="Penilaian akhir untuk mengukur ketercapaian tujuan pembelajaran..."
            value={rencanaAsesmen.sumatif}
            onChange={(e) => update({ sumatif: e.target.value })}
          />
        </Field>
      </CardContent>
    </Card>
  );
}
