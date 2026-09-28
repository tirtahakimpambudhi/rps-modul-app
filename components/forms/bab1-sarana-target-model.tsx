"use client";

import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, SectionHeading } from "./field";

export function Bab1SaranaTargetModel() {
  const informasiUmum = useModulAjarStore((s) => s.data.informasiUmum);
  const update = useModulAjarStore((s) => s.updateInformasiUmum);

  return (
    <Card>
      <CardContent className="space-y-6 pt-5">
        <div>
          <SectionHeading
            title="Sarana & Prasarana"
            description="Alat, bahan, dan media pendukung yang digunakan selama pembelajaran."
          />
          <Field label="Uraian Sarana & Prasarana" htmlFor="saranaPrasarana">
            <Textarea
              id="saranaPrasarana"
              rows={4}
              placeholder="cth. Laptop, proyektor, LKPD cetak, papan tulis..."
              value={informasiUmum.saranaPrasarana}
              onChange={(e) => update({ saranaPrasarana: e.target.value })}
            />
          </Field>
        </div>

        <div>
          <SectionHeading
            title="Target Peserta Didik"
            description="Karakteristik dan jumlah peserta didik sasaran modul ajar ini."
          />
          <Field label="Uraian Target Peserta Didik" htmlFor="targetPesertaDidik">
            <Textarea
              id="targetPesertaDidik"
              rows={4}
              placeholder="cth. Peserta didik reguler kelas X, 36 siswa..."
              value={informasiUmum.targetPesertaDidik}
              onChange={(e) => update({ targetPesertaDidik: e.target.value })}
            />
          </Field>
        </div>

        <div>
          <SectionHeading
            title="Model & Metode Pembelajaran"
            description="Pendekatan, model, dan metode pembelajaran yang digunakan."
          />
          <Field label="Uraian Model & Metode" htmlFor="modelMetodePembelajaran">
            <Textarea
              id="modelMetodePembelajaran"
              rows={4}
              placeholder="cth. Problem Based Learning; diskusi, presentasi..."
              value={informasiUmum.modelMetodePembelajaran}
              onChange={(e) => update({ modelMetodePembelajaran: e.target.value })}
            />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
