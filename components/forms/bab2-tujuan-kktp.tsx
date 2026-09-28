"use client";

import { Plus, Trash2 } from "lucide-react";
import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionHeading } from "./field";

export function Bab2TujuanKktp() {
  const items = useModulAjarStore((s) => s.data.komponenInti.tujuanPembelajaran);
  const addItem = useModulAjarStore((s) => s.addTujuanPembelajaran);
  const updateItem = useModulAjarStore((s) => s.updateTujuanPembelajaran);
  const removeItem = useModulAjarStore((s) => s.removeTujuanPembelajaran);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <SectionHeading
            title="Tujuan Pembelajaran (TP) & KKTP"
            description="Rumusan tujuan pembelajaran beserta Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)."
          />
          <Button size="sm" variant="outline" onClick={addItem} className="shrink-0">
            <Plus className="h-3.5 w-3.5" /> Tambah TP
          </Button>
        </div>

        {items.length === 0 ? (
          <p className="rounded-md border border-dashed py-8 text-center text-sm text-muted-foreground">
            Belum ada Tujuan Pembelajaran. Klik &quot;Tambah TP&quot; untuk memulai.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[12%]">Kode TP</TableHead>
                <TableHead className="w-[43%]">Rumusan Tujuan Pembelajaran</TableHead>
                <TableHead className="w-[40%]">KKTP</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      placeholder="10.1"
                      value={item.kodeTP}
                      onChange={(e) => updateItem(item.id, { kodeTP: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      rows={3}
                      placeholder="Peserta didik dapat..."
                      value={item.rumusanTP}
                      onChange={(e) => updateItem(item.id, { rumusanTP: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      rows={3}
                      placeholder="Kriteria ketercapaian yang terukur..."
                      value={item.kktp}
                      onChange={(e) => updateItem(item.id, { kktp: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
