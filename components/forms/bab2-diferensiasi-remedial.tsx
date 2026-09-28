"use client";

import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, SectionHeading } from "./field";

export function Bab2DiferensiasiRemedial() {
  const komponenInti = useModulAjarStore((s) => s.data.komponenInti);
  const update = useModulAjarStore((s) => s.updateKomponenInti);

  return (
    <Card>
      <CardContent className="space-y-6 pt-5">
        <div>
          <SectionHeading
            title="Pembelajaran Berdiferensiasi"
            description="Penyesuaian konten, proses, atau produk berdasarkan kesiapan, minat, atau profil belajar peserta didik."
          />
          <Field label="Uraian Diferensiasi" htmlFor="pembelajaranBerdiferensiasi">
            <Textarea
              id="pembelajaranBerdiferensiasi"
              rows={5}
              placeholder="Jelaskan strategi diferensiasi konten/proses/produk..."
              value={komponenInti.pembelajaranBerdiferensiasi}
              onChange={(e) => update({ pembelajaranBerdiferensiasi: e.target.value })}
            />
          </Field>
        </div>

        <div>
          <SectionHeading
            title="Remedial & Pengayaan"
            description="Rencana tindak lanjut bagi peserta didik yang belum atau sudah mencapai KKTP."
          />
          <Field label="Uraian Remedial & Pengayaan" htmlFor="remedialPengayaan">
            <Textarea
              id="remedialPengayaan"
              rows={5}
              placeholder="Jelaskan program remedial dan pengayaan..."
              value={komponenInti.remedialPengayaan}
              onChange={(e) => update({ remedialPengayaan: e.target.value })}
            />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
