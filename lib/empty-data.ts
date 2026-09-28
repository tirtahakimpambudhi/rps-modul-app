import type { ModulAjarData } from "./types";

export function getEmptyData(): ModulAjarData {
  return {
    informasiUmum: {
      namaPenyusun: "",
      satuanPendidikan: "",
      mataPelajaran: "",
      kelasFase: "",
      semesterTahunAjaran: "",
      elemen: "",
      topikMateri: "",
      alokasiWaktu: "",
      modaPembelajaran: "",
      kompetensiAwal: "",
      profilPancasila: [],
      saranaPrasarana: "",
      targetPesertaDidik: "",
      modelMetodePembelajaran: "",
    },
    komponenInti: {
      capaianPembelajaran: "",
      tujuanPembelajaran: [],
      pemahamanBermakna: "",
      pertanyaanPemantik: "",
      langkahPembelajaran: [],
      rencanaAsesmen: {
        diagnostik: "",
        formatif: "",
        sumatif: "",
      },
      pembelajaranBerdiferensiasi: "",
      remedialPengayaan: "",
      refleksiSiswa: "",
      refleksiGuru: "",
    },
    lampiran: {
      bahanAjarRingkas: "",
      lkpd: "",
      kunciJawabanLkpd: "",
      mediaPembelajaran: "",
      instrumenAsesmen: "",
      rubrikPenilaian: "",
      daftarPustaka: "",
    },
    lastUpdated: new Date().toISOString(),
  };
}
