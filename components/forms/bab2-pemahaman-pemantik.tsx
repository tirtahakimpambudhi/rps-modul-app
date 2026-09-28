"use client";

import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, SectionHeading } from "./field";

export function Bab2PemahamanPemantik() {
  const komponenInti = useModulAjarStore((s) => s.data.komponenInti);
  const update = useModulAjarStore((s) => s.updateKomponenInti);

  return (
    <Card>
      <CardContent className="space-y-6 pt-5">
        <div>
          <SectionHeading
            title="Pemahaman Bermakna"
            description="Inti pemahaman yang diharapkan tertanam kuat pada peserta didik setelah pembelajaran."
          />
          <Field label="Uraian Pemahaman Bermakna" htmlFor="pemahamanBermakna">
            <Textarea
              id="pemahamanBermakna"
              rows={5}
              placeholder="Tuliskan pemahaman bermakna yang ingin dicapai..."
              value={komponenInti.pemahamanBermakna}
              onChange={(e) => update({ pemahamanBermakna: e.target.value })}
            />
          </Field>
        </div>

        <div>
          <SectionHeading
            title="Pertanyaan Pemantik"
            description="Pertanyaan pembuka untuk memantik rasa ingin tahu dan mengaktifkan pengetahuan awal peserta didik."
          />
          <Field label="Daftar Pertanyaan Pemantik" htmlFor="pertanyaanPemantik">
            <Textarea
              id="pertanyaanPemantik"
              rows={5}
              placeholder={"1. ...\n2. ...\n3. ..."}
              value={komponenInti.pertanyaanPemantik}
              onChange={(e) => update({ pertanyaanPemantik: e.target.value })}
            />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
