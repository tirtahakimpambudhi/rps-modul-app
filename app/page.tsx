"use client";

import { useState } from "react";
import { Sidebar, MobileSidebarOverlay } from "@/components/layout/sidebar";
import { Toolbar } from "@/components/layout/toolbar";
import { FormRenderer } from "@/components/forms/form-renderer";
import { DocumentPreview } from "@/components/preview/document-preview";
import { useModulAjarStore } from "@/lib/store";

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const viewMode = useModulAjarStore((s) => s.viewMode);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar desktop */}
      <aside className="no-print hidden w-72 shrink-0 border-r lg:block">
        <Sidebar />
      </aside>

      {/* Sidebar mobile */}
      <MobileSidebarOverlay open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Toolbar onOpenSidebar={() => setMobileNavOpen(true)} />

        <main className="thin-scrollbar flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          {viewMode === "form" ? <FormRenderer /> : <DocumentPreview />}
        </main>
      </div>
    </div>
  );
}
