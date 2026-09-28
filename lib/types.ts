// Tipe data lengkap untuk struktur Modul Ajar Kurikulum Merdeka

export interface ProfilPancasilaItem {
  id: string;
  dimensi: string;
  bentukPenguatan: string;
}

export interface TujuanPembelajaranItem {
  id: string;
  kodeTP: string;
  rumusanTP: string;
  kktp: string;
}

export interface LangkahPertemuan {
  id: string;
  pertemuanKe: string;
  alokasiWaktu: string;
  pendahuluan: string;
  intiSintaks: string;
  penutup: string;
}

export interface InformasiUmum {
  namaPenyusun: string;
  satuanPendidikan: string;
  mataPelajaran: string;
  kelasFase: string;
  semesterTahunAjaran: string;
  elemen: string;
  topikMateri: string;
  alokasiWaktu: string;
  modaPembelajaran: string;
  kompetensiAwal: string;
  profilPancasila: ProfilPancasilaItem[];
  saranaPrasarana: string;
  targetPesertaDidik: string;
  modelMetodePembelajaran: string;
}

export interface RencanaAsesmen {
  diagnostik: string;
  formatif: string;
  sumatif: string;
}

export interface KomponenInti {
  capaianPembelajaran: string;
  tujuanPembelajaran: TujuanPembelajaranItem[];
  pemahamanBermakna: string;
  pertanyaanPemantik: string;
  langkahPembelajaran: LangkahPertemuan[];
  rencanaAsesmen: RencanaAsesmen;
  pembelajaranBerdiferensiasi: string;
  remedialPengayaan: string;
  refleksiSiswa: string;
  refleksiGuru: string;
}

export interface Lampiran {
  bahanAjarRingkas: string;
  lkpd: string;
  kunciJawabanLkpd: string;
  mediaPembelajaran: string;
  instrumenAsesmen: string;
  rubrikPenilaian: string;
  daftarPustaka: string;
}

export interface ModulAjarData {
  informasiUmum: InformasiUmum;
  komponenInti: KomponenInti;
  lampiran: Lampiran;
  lastUpdated: string;
}

export const SECTION_IDS = [
  "identitas",
  "kompetensi-awal",
  "profil-pancasila",
  "sarana-target-model",
  "capaian-pembelajaran",
  "tujuan-kktp",
  "pemahaman-pemantik",
  "langkah-pembelajaran",
  "rencana-asesmen",
  "diferensiasi-remedial",
  "refleksi",
  "bahan-lkpd",
  "media-instrumen-pustaka",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export interface NavItem {
  id: SectionId;
  label: string;
  bab: "I" | "II" | "III";
}

export const NAV_ITEMS: NavItem[] = [
  { id: "identitas", label: "Identitas Modul Ajar", bab: "I" },
  { id: "kompetensi-awal", label: "Kompetensi Awal", bab: "I" },
  { id: "profil-pancasila", label: "Profil Pelajar Pancasila", bab: "I" },
  { id: "sarana-target-model", label: "Sarana, Target & Model", bab: "I" },
  { id: "capaian-pembelajaran", label: "Capaian Pembelajaran", bab: "II" },
  { id: "tujuan-kktp", label: "Tujuan Pembelajaran & KKTP", bab: "II" },
  { id: "pemahaman-pemantik", label: "Pemahaman Bermakna & Pemantik", bab: "II" },
  { id: "langkah-pembelajaran", label: "Langkah Pembelajaran", bab: "II" },
  { id: "rencana-asesmen", label: "Rencana Asesmen", bab: "II" },
  { id: "diferensiasi-remedial", label: "Diferensiasi & Remedial", bab: "II" },
  { id: "refleksi", label: "Refleksi", bab: "II" },
  { id: "bahan-lkpd", label: "Bahan Ajar & LKPD", bab: "III" },
  { id: "media-instrumen-pustaka", label: "Media, Instrumen & Pustaka", bab: "III" },
];
