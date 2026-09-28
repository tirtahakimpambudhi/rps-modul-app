import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type {
  ModulAjarData,
  InformasiUmum,
  KomponenInti,
  Lampiran,
  ProfilPancasilaItem,
  TujuanPembelajaranItem,
  LangkahPertemuan,
  RencanaAsesmen,
  SectionId,
} from "./types";
import { getEmptyData } from "./empty-data";
import { getDummyData } from "./dummy-data";

export type ViewMode = "form" | "preview";
export type SyncStatus = "idle" | "saving" | "success" | "error";

interface ModulAjarState {
  data: ModulAjarData;
  activeSection: SectionId;
  viewMode: ViewMode;
  syncStatus: SyncStatus;
  syncMessage: string;

  // navigasi
  setActiveSection: (section: SectionId) => void;
  setViewMode: (mode: ViewMode) => void;

  // update generik per-bab
  updateInformasiUmum: (patch: Partial<InformasiUmum>) => void;
  updateKomponenInti: (patch: Partial<KomponenInti>) => void;
  updateLampiran: (patch: Partial<Lampiran>) => void;
  updateRencanaAsesmen: (patch: Partial<RencanaAsesmen>) => void;

  // CRUD Profil Pelajar Pancasila
  addProfilPancasila: () => void;
  updateProfilPancasila: (id: string, patch: Partial<ProfilPancasilaItem>) => void;
  removeProfilPancasila: (id: string) => void;

  // CRUD Tujuan Pembelajaran & KKTP
  addTujuanPembelajaran: () => void;
  updateTujuanPembelajaran: (id: string, patch: Partial<TujuanPembelajaranItem>) => void;
  removeTujuanPembelajaran: (id: string) => void;

  // CRUD Langkah Pembelajaran (per pertemuan)
  addLangkahPertemuan: () => void;
  updateLangkahPertemuan: (id: string, patch: Partial<LangkahPertemuan>) => void;
  removeLangkahPertemuan: (id: string) => void;

  // aksi umum
  loadDummyData: () => void;
  resetData: () => void;
  loadData: (data: ModulAjarData) => void;
  setSyncStatus: (status: SyncStatus, message?: string) => void;
}

export const useModulAjarStore = create<ModulAjarState>()(
  persist(
    (set) => ({
      data: getEmptyData(),
      activeSection: "identitas",
      viewMode: "form",
      syncStatus: "idle",
      syncMessage: "",

      setActiveSection: (section) => set({ activeSection: section }),
      setViewMode: (mode) => set({ viewMode: mode }),

      updateInformasiUmum: (patch) =>
        set((state) => ({
          data: {
            ...state.data,
            informasiUmum: { ...state.data.informasiUmum, ...patch },
            lastUpdated: new Date().toISOString(),
          },
        })),

      updateKomponenInti: (patch) =>
        set((state) => ({
          data: {
            ...state.data,
            komponenInti: { ...state.data.komponenInti, ...patch },
            lastUpdated: new Date().toISOString(),
          },
        })),

      updateLampiran: (patch) =>
        set((state) => ({
          data: {
            ...state.data,
            lampiran: { ...state.data.lampiran, ...patch },
            lastUpdated: new Date().toISOString(),
          },
        })),

      updateRencanaAsesmen: (patch) =>
        set((state) => ({
          data: {
            ...state.data,
            komponenInti: {
              ...state.data.komponenInti,
              rencanaAsesmen: { ...state.data.komponenInti.rencanaAsesmen, ...patch },
            },
            lastUpdated: new Date().toISOString(),
          },
        })),

      addProfilPancasila: () =>
        set((state) => ({
          data: {
            ...state.data,
            informasiUmum: {
              ...state.data.informasiUmum,
              profilPancasila: [
                ...state.data.informasiUmum.profilPancasila,
                { id: uuidv4(), dimensi: "", bentukPenguatan: "" },
              ],
            },
          },
        })),

      updateProfilPancasila: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            informasiUmum: {
              ...state.data.informasiUmum,
              profilPancasila: state.data.informasiUmum.profilPancasila.map((item) =>
                item.id === id ? { ...item, ...patch } : item
              ),
            },
          },
        })),

      removeProfilPancasila: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            informasiUmum: {
              ...state.data.informasiUmum,
              profilPancasila: state.data.informasiUmum.profilPancasila.filter(
                (item) => item.id !== id
              ),
            },
          },
        })),

      addTujuanPembelajaran: () =>
        set((state) => ({
          data: {
            ...state.data,
            komponenInti: {
              ...state.data.komponenInti,
              tujuanPembelajaran: [
                ...state.data.komponenInti.tujuanPembelajaran,
                { id: uuidv4(), kodeTP: "", rumusanTP: "", kktp: "" },
              ],
            },
          },
        })),

      updateTujuanPembelajaran: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            komponenInti: {
              ...state.data.komponenInti,
              tujuanPembelajaran: state.data.komponenInti.tujuanPembelajaran.map((item) =>
                item.id === id ? { ...item, ...patch } : item
              ),
            },
          },
        })),

      removeTujuanPembelajaran: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            komponenInti: {
              ...state.data.komponenInti,
              tujuanPembelajaran: state.data.komponenInti.tujuanPembelajaran.filter(
                (item) => item.id !== id
              ),
            },
          },
        })),

      addLangkahPertemuan: () =>
        set((state) => ({
          data: {
            ...state.data,
            komponenInti: {
              ...state.data.komponenInti,
              langkahPembelajaran: [
                ...state.data.komponenInti.langkahPembelajaran,
                {
                  id: uuidv4(),
                  pertemuanKe: String(state.data.komponenInti.langkahPembelajaran.length + 1),
                  alokasiWaktu: "",
                  pendahuluan: "",
                  intiSintaks: "",
                  penutup: "",
                },
              ],
            },
          },
        })),

      updateLangkahPertemuan: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            komponenInti: {
              ...state.data.komponenInti,
              langkahPembelajaran: state.data.komponenInti.langkahPembelajaran.map((item) =>
                item.id === id ? { ...item, ...patch } : item
              ),
            },
          },
        })),

      removeLangkahPertemuan: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            komponenInti: {
              ...state.data.komponenInti,
              langkahPembelajaran: state.data.komponenInti.langkahPembelajaran.filter(
                (item) => item.id !== id
              ),
            },
          },
        })),

      loadDummyData: () => set({ data: getDummyData() }),
      resetData: () => set({ data: getEmptyData() }),
      loadData: (data) => set({ data }),
      setSyncStatus: (status, message = "") => set({ syncStatus: status, syncMessage: message }),
    }),
    {
      name: "modul-ajar-kurikulum-merdeka-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ data: state.data }),
    }
  )
);
