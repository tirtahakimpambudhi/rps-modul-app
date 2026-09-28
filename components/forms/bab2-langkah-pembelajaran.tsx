"use client";

import { Plus, Trash2 } from "lucide-react";
import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Field, SectionHeading } from "./field";

export function Bab2LangkahPembelajaran() {
  const items = useModulAjarStore((s) => s.data.komponenInti.langkahPembelajaran);
  const addItem = useModulAjarStore((s) => s.addLangkahPertemuan);
  const updateItem = useModulAjarStore((s) => s.updateLangkahPertemuan);
  const removeItem = useModulAjarStore((s) => s.removeLangkahPertemuan);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <SectionHeading
            title="Langkah Pembelajaran"
            description="Rincian kegiatan Pendahuluan, Inti/Sintaks, dan Penutup untuk setiap pertemuan."
          />
          <Button size="sm" variant="outline" onClick={addItem} className="shrink-0">
            <Plus className="h-3.5 w-3.5" /> Tambah Pertemuan
          </Button>
        </div>

        {items.length === 0 ? (
          <p className="rounded-md border border-dashed py-8 text-center text-sm text-muted-foreground">
            Belum ada pertemuan ditambahkan. Klik &quot;Tambah Pertemuan&quot; untuk memulai.
          </p>
        ) : (
          <div className="space-y-6">
            {items.map((item, idx) => (
              <div key={item.id} className="rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Pertemuan ke-{idx + 1}</p>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Pertemuan Ke-">
                    <Input
                      placeholder="1"
                      value={item.pertemuanKe}
                      onChange={(e) => updateItem(item.id, { pertemuanKe: e.target.value })}
                    />
                  </Field>
                  <Field label="Alokasi Waktu">
                    <Input
                      placeholder="cth. 3 x 45 menit"
                      value={item.alokasiWaktu}
                      onChange={(e) => updateItem(item.id, { alokasiWaktu: e.target.value })}
                    />
                  </Field>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <Field label="Kegiatan Pendahuluan">
                    <Textarea
                      rows={3}
                      placeholder="Salam, apersepsi, penyampaian tujuan pembelajaran..."
                      value={item.pendahuluan}
                      onChange={(e) => updateItem(item.id, { pendahuluan: e.target.value })}
                    />
                  </Field>
                  <Field label="Kegiatan Inti / Sintaks Pembelajaran">
                    <Textarea
                      rows={5}
                      placeholder="Uraikan sintaks model pembelajaran secara berurutan..."
                      value={item.intiSintaks}
                      onChange={(e) => updateItem(item.id, { intiSintaks: e.target.value })}
                    />
                  </Field>
                  <Field label="Kegiatan Penutup">
                    <Textarea
                      rows={3}
                      placeholder="Kesimpulan, refleksi singkat, rencana tindak lanjut..."
                      value={item.penutup}
                      onChange={(e) => updateItem(item.id, { penutup: e.target.value })}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
