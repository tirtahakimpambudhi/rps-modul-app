"use client";

import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, SectionHeading } from "./field";

export function Bab2CapaianPembelajaran() {
  const capaianPembelajaran = useModulAjarStore((s) => s.data.komponenInti.capaianPembelajaran);
  const update = useModulAjarStore((s) => s.updateKomponenInti);

  return (
    <Card>
      <CardContent className="pt-5">
        <SectionHeading
          title="Capaian Pembelajaran (CP)"
          description="Salin atau rumuskan Capaian Pembelajaran fase terkait sesuai elemen dan mata pelajaran."
        />
        <Field label="Rumusan Capaian Pembelajaran" htmlFor="capaianPembelajaran">
          <Textarea
            id="capaianPembelajaran"
            rows={7}
            placeholder="Tuliskan Capaian Pembelajaran sesuai fase dan elemen..."
            value={capaianPembelajaran}
            onChange={(e) => update({ capaianPembelajaran: e.target.value })}
          />
        </Field>
      </CardContent>
    </Card>
  );
}
