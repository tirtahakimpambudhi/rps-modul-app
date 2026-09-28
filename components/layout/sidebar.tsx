"use client";

import { NAV_ITEMS } from "@/lib/types";
import { useModulAjarStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { GraduationCap, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BAB_LABEL: Record<"I" | "II" | "III", string> = {
  I: "BAB I — Informasi Umum",
  II: "BAB II — Komponen Inti",
  III: "BAB III — Lampiran",
};

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const activeSection = useModulAjarStore((s) => s.activeSection);
  const setActiveSection = useModulAjarStore((s) => s.setActiveSection);
  const setViewMode = useModulAjarStore((s) => s.setViewMode);

  const groups: ("I" | "II" | "III")[] = ["I", "II", "III"];

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 border-b px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Modul Ajar</p>
          <p className="text-xs text-muted-foreground">Kurikulum Merdeka</p>
        </div>
      </div>

      <nav className="thin-scrollbar flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {groups.map((bab) => (
          <div key={bab}>
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {BAB_LABEL[bab]}
            </p>
            <div className="space-y-0.5">
              {NAV_ITEMS.filter((item) => item.bab === bab).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setViewMode("form");
                    onNavigate?.();
                  }}
                  className={cn(
                    "w-full rounded-md px-2.5 py-2 text-left text-sm transition-colors",
                    activeSection === item.id
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-foreground/80 hover:bg-muted"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t px-4 py-3">
        <Badge variant="secondary" className="w-full justify-center py-1.5">
          Tersimpan otomatis di perangkat ini
        </Badge>
      </div>
    </div>
  );
}

export function MobileSidebarOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 h-full w-72 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>
        <Sidebar onNavigate={onClose} />
      </div>
    </div>
  );
}
