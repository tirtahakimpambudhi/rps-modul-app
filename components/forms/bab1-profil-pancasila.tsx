"use client";

import { Plus, Trash2 } from "lucide-react";
import { useModulAjarStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionHeading } from "./field";

export function Bab1ProfilPancasila() {
  const items = useModulAjarStore((s) => s.data.informasiUmum.profilPancasila);
  const addItem = useModulAjarStore((s) => s.addProfilPancasila);
  const updateItem = useModulAjarStore((s) => s.updateProfilPancasila);
  const removeItem = useModulAjarStore((s) => s.removeProfilPancasila);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <SectionHeading
            title="Profil Pelajar Pancasila"
            description="Dimensi Profil Pelajar Pancasila yang ingin dikuatkan beserta bentuk penguatannya dalam pembelajaran."
          />
          <Button size="sm" variant="outline" onClick={addItem} className="shrink-0">
            <Plus className="h-3.5 w-3.5" /> Tambah Baris
          </Button>
        </div>

        {items.length === 0 ? (
          <p className="rounded-md border border-dashed py-8 text-center text-sm text-muted-foreground">
            Belum ada dimensi ditambahkan. Klik &quot;Tambah Baris&quot; untuk memulai.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[35%]">Dimensi</TableHead>
                <TableHead>Bentuk Penguatan</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      placeholder="cth. Bernalar Kritis"
                      value={item.dimensi}
                      onChange={(e) => updateItem(item.id, { dimensi: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="cth. Menganalisis studi kasus transaksi keuangan"
                      value={item.bentukPenguatan}
                      onChange={(e) =>
                        updateItem(item.id, { bentukPenguatan: e.target.value })
                      }
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
