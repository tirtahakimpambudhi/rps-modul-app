"use client";

import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, SectionHeading } from "./field";

export function Bab2Refleksi() {
  const komponenInti = useModulAjarStore((s) => s.data.komponenInti);
  const update = useModulAjarStore((s) => s.updateKomponenInti);

  return (
    <Card>
      <CardContent className="space-y-6 pt-5">
        <SectionHeading
          title="Refleksi"
          description="Pertanyaan refleksi bagi peserta didik dan guru di akhir pembelajaran."
        />
        <Field label="Refleksi Peserta Didik" htmlFor="refleksiSiswa">
          <Textarea
            id="refleksiSiswa"
            rows={5}
            placeholder={"1. ...\n2. ...\n3. ..."}
            value={komponenInti.refleksiSiswa}
            onChange={(e) => update({ refleksiSiswa: e.target.value })}
          />
        </Field>
        <Field label="Refleksi Guru" htmlFor="refleksiGuru">
          <Textarea
            id="refleksiGuru"
            rows={5}
            placeholder={"1. ...\n2. ...\n3. ..."}
            value={komponenInti.refleksiGuru}
            onChange={(e) => update({ refleksiGuru: e.target.value })}
          />
        </Field>
      </CardContent>
    </Card>
  );
}
