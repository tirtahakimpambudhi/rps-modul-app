import { v4 as uuidv4 } from "uuid";
import type { ModulAjarData } from "./types";

// Contoh dokumen lengkap: Modul Ajar "Persamaan Dasar Akuntansi" — Fase E (Kelas X)
export function getDummyData(): ModulAjarData {
  return {
    informasiUmum: {
      namaPenyusun: "Silpi, S.Pd.",
      satuanPendidikan: "SMK Negeri 1 Yogyakarta",
      mataPelajaran: "Dasar-Dasar Akuntansi dan Keuangan Lembaga",
      kelasFase: "X / Fase E",
      semesterTahunAjaran: "Ganjil / 2026-2027",
      elemen: "Proses Bisnis Bidang Akuntansi dan Keuangan Lembaga",
      topikMateri: "Persamaan Dasar Akuntansi",
      alokasiWaktu: "3 x 45 menit (1 Pertemuan)",
      modaPembelajaran: "Tatap Muka (Luring)",
      kompetensiAwal:
        "Peserta didik telah memahami konsep dasar transaksi keuangan sederhana dan mengenal istilah aset, utang, serta modal dalam kehidupan sehari-hari.",
      profilPancasila: [
        {
          id: uuidv4(),
          dimensi: "Bernalar Kritis",
          bentukPenguatan:
            "Menganalisis pengaruh transaksi keuangan terhadap posisi aset, liabilitas, dan ekuitas melalui studi kasus.",
        },
        {
          id: uuidv4(),
          dimensi: "Mandiri",
          bentukPenguatan:
            "Menyelesaikan LKPD analisis persamaan akuntansi secara individu sebelum diskusi kelompok.",
        },
        {
          id: uuidv4(),
          dimensi: "Gotong Royong",
          bentukPenguatan:
            "Berkolaborasi dalam kelompok untuk menyusun dan mempresentasikan ilustrasi persamaan dasar akuntansi suatu usaha jasa.",
        },
      ],
      saranaPrasarana:
        "Laptop/komputer, proyektor, LKPD cetak, papan tulis, kalkulator, koneksi internet (opsional untuk simulasi daring).",
      targetPesertaDidik:
        "Peserta didik reguler kelas X (36 siswa), tanpa kesulitan belajar khusus, dengan variasi gaya belajar visual, auditori, dan kinestetik.",
      modelMetodePembelajaran:
        "Model: Problem Based Learning (PBL). Metode: Diskusi kelompok, tanya jawab, penugasan studi kasus, dan presentasi.",
    },
    komponenInti: {
      capaianPembelajaran:
        "Pada akhir fase E, peserta didik mampu memahami proses bisnis bidang akuntansi dan keuangan lembaga, termasuk memahami persamaan dasar akuntansi sebagai fondasi pencatatan transaksi keuangan pada perusahaan jasa, dagang, dan manufaktur.",
      tujuanPembelajaran: [
        {
          id: uuidv4(),
          kodeTP: "10.1",
          rumusanTP:
            "Peserta didik dapat menjelaskan pengertian dan unsur-unsur persamaan dasar akuntansi (aset, liabilitas, ekuitas) dengan tepat.",
          kktp:
            "Menjelaskan minimal 3 unsur persamaan akuntansi beserta definisinya secara benar dalam tes tertulis.",
        },
        {
          id: uuidv4(),
          kodeTP: "10.2",
          rumusanTP:
            "Peserta didik dapat menganalisis pengaruh transaksi keuangan terhadap persamaan dasar akuntansi.",
          kktp:
            "Menyelesaikan minimal 8 dari 10 kasus transaksi dengan analisis pengaruh yang tepat pada LKPD.",
        },
        {
          id: uuidv4(),
          kodeTP: "10.3",
          rumusanTP:
            "Peserta didik dapat menyusun ilustrasi persamaan dasar akuntansi dari serangkaian transaksi usaha jasa sederhana.",
          kktp:
            "Menyusun tabel persamaan akuntansi yang seimbang (balance) dari studi kasus usaha jasa dengan tingkat ketepatan minimal 80%.",
        },
      ],
      pemahamanBermakna:
        "Setiap transaksi keuangan yang terjadi dalam suatu usaha, sekecil apa pun, akan selalu memengaruhi keseimbangan antara apa yang dimiliki (aset) dan dari mana sumber pembiayaannya (liabilitas dan ekuitas). Prinsip keseimbangan inilah yang menjadi dasar seluruh sistem pencatatan akuntansi modern.",
      pertanyaanPemantik:
        "1. Jika kalian membuka usaha kecil-kecilan, dari mana saja sumber dana yang mungkin kalian gunakan?\n2. Apa yang terjadi pada kekayaan usaha jika pemilik menambah modal atau usaha meminjam uang ke bank?\n3. Mengapa dalam akuntansi, total aset harus selalu sama dengan total liabilitas ditambah ekuitas?",
      langkahPembelajaran: [
        {
          id: uuidv4(),
          pertemuanKe: "1",
          alokasiWaktu: "3 x 45 menit",
          pendahuluan:
            "Guru membuka pembelajaran dengan salam, doa, dan presensi (5 menit). Guru menyampaikan tujuan pembelajaran dan memberikan apersepsi melalui pertanyaan pemantik terkait sumber dana usaha (10 menit). Guru menayangkan ilustrasi kasus usaha kecil untuk memantik rasa ingin tahu peserta didik (5 menit).",
          intiSintaks:
            "Sintaks PBL:\n1. Orientasi peserta didik pada masalah: Guru menyajikan studi kasus transaksi UMKM 'Laundry Bersih' (15 menit).\n2. Mengorganisasikan peserta didik untuk belajar: Peserta didik dibagi ke dalam 6 kelompok dan menerima LKPD (10 menit).\n3. Membimbing penyelidikan individu/kelompok: Peserta didik menganalisis pengaruh 10 transaksi terhadap aset, liabilitas, dan ekuitas menggunakan tabel persamaan akuntansi (35 menit).\n4. Mengembangkan dan menyajikan hasil karya: Setiap kelompok menyusun laporan tabel persamaan akuntansi dan menyiapkan bahan presentasi (20 menit).\n5. Menganalisis dan mengevaluasi proses pemecahan masalah: 3 kelompok mempresentasikan hasil, kelompok lain memberi tanggapan, guru memberi penguatan dan koreksi (30 menit).",
          penutup:
            "Peserta didik menyimpulkan konsep persamaan dasar akuntansi bersama guru (10 menit). Guru memberikan kuis formatif singkat 5 soal (10 menit). Peserta didik mengisi lembar refleksi pembelajaran dan guru menyampaikan rencana pembelajaran berikutnya (5 menit).",
        },
      ],
      rencanaAsesmen: {
        diagnostik:
          "Kuis lisan di awal pembelajaran mengenai istilah aset, utang, dan modal untuk memetakan pemahaman awal peserta didik.",
        formatif:
          "Observasi diskusi kelompok menggunakan rubrik, LKPD analisis transaksi, dan kuis singkat 5 soal pilihan ganda di akhir pertemuan.",
        sumatif:
          "Tes tertulis uraian pada akhir sub-topik yang mencakup penjelasan konsep dan studi kasus penyusunan persamaan dasar akuntansi.",
      },
      pembelajaranBerdiferensiasi:
        "Diferensiasi konten: peserta didik dengan pemahaman awal rendah mendapat LKPD dengan contoh transaksi yang lebih sederhana, sedangkan yang sudah mahir mendapat kasus tambahan yang lebih kompleks. Diferensiasi proses: kelompok visual menggunakan diagram/skema, kelompok kinestetik menggunakan simulasi kartu transaksi fisik.",
      remedialPengayaan:
        "Remedial: peserta didik yang belum mencapai KKTP diberikan pembelajaran ulang dengan pendampingan tutor sebaya dan mengerjakan ulang kasus transaksi yang lebih sederhana. Pengayaan: peserta didik yang telah mencapai KKTP diberikan studi kasus persamaan akuntansi pada usaha dagang sebagai perluasan wawasan.",
      refleksiSiswa:
        "1. Bagian mana dari materi persamaan dasar akuntansi yang menurutmu paling mudah dan paling sulit dipahami?\n2. Bagaimana perasaanmu saat menyelesaikan analisis transaksi dalam kelompok?\n3. Apa yang akan kamu lakukan untuk meningkatkan pemahamanmu pada topik ini?",
      refleksiGuru:
        "1. Apakah tujuan pembelajaran pada pertemuan ini telah tercapai secara keseluruhan?\n2. Kendala apa yang ditemui selama proses pembelajaran berlangsung?\n3. Strategi apa yang perlu diperbaiki untuk pertemuan berikutnya?",
    },
    lampiran: {
      bahanAjarRingkas:
        "Persamaan Dasar Akuntansi dirumuskan sebagai: ASET = LIABILITAS + EKUITAS. Aset adalah sumber daya yang dimiliki dan dikendalikan perusahaan (kas, piutang, perlengkapan, peralatan). Liabilitas adalah kewajiban perusahaan kepada pihak lain (utang usaha, utang bank). Ekuitas adalah hak pemilik atas aset perusahaan setelah dikurangi liabilitas (modal, prive, laba/rugi). Setiap transaksi keuangan akan memengaruhi minimal dua unsur dalam persamaan ini sehingga keseimbangan selalu terjaga.",
      lkpd:
        "LKPD 'Analisis Transaksi Laundry Bersih':\nCatatlah pengaruh transaksi berikut terhadap Aset, Liabilitas, dan Ekuitas dalam bentuk tabel:\n1. Pemilik menyetor uang tunai Rp10.000.000 sebagai modal awal.\n2. Membeli peralatan laundry seharga Rp6.000.000 secara tunai.\n3. Membeli perlengkapan (deterjen, pewangi) Rp500.000 secara kredit.\n4. Menerima pendapatan jasa laundry tunai Rp750.000.\n5. Membayar sebagian utang perlengkapan Rp200.000.\n6. Membayar beban listrik dan air Rp150.000.\n7. Pemilik mengambil uang untuk keperluan pribadi (prive) Rp100.000.\n8. Menerima pendapatan jasa secara kredit Rp300.000.\n9. Membayar gaji karyawan Rp400.000.\n10. Membeli tambahan peralatan Rp1.000.000 secara kredit.",
      kunciJawabanLkpd:
        "Kunci jawaban (ringkas, saldo akhir): Kas Rp4.900.000; Piutang Rp300.000; Perlengkapan Rp500.000; Peralatan Rp7.000.000 → Total Aset Rp12.700.000. Utang Usaha Rp1.100.000 (Liabilitas). Modal Rp10.000.000, Prive (Rp100.000), Laba Rp1.700.000 → Total Ekuitas Rp11.600.000. Catatan: guru menyesuaikan penjelasan detail perhitungan laba (pendapatan Rp1.050.000 − beban Rp550.000 = Rp1.700.000... nilai disesuaikan sebagai panduan pembahasan, bukan kunci mutlak) saat pembahasan di kelas.",
      mediaPembelajaran:
        "Slide presentasi (PowerPoint/Canva) ilustrasi persamaan akuntansi, video animasi singkat proses transaksi UMKM, kartu simulasi transaksi fisik, dan papan tulis untuk pembahasan bersama.",
      instrumenAsesmen:
        "1. Lembar observasi diskusi kelompok (rubrik terlampir). 2. LKPD analisis transaksi (10 soal kasus). 3. Kuis formatif 5 soal pilihan ganda. 4. Tes sumatif uraian 3 soal (penjelasan konsep + studi kasus).",
      rubrikPenilaian:
        "Rubrik Diskusi Kelompok (skala 1-4 pada tiap aspek): (1) Ketepatan analisis transaksi, (2) Kerja sama kelompok, (3) Kejelasan presentasi hasil, (4) Ketepatan menjawab pertanyaan. Skor 4 = sangat baik, 3 = baik, 2 = cukup, 1 = perlu bimbingan. Nilai akhir = (total skor / 16) x 100.",
      daftarPustaka:
        "1. Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2022). Capaian Pembelajaran Program Keahlian Akuntansi dan Keuangan Lembaga. Jakarta: Kemendikbudristek.\n2. Hery. (2021). Akuntansi Dasar 1 & 2. Jakarta: Grasindo.\n3. Toto Sucipto, dkk. (2021). Akuntansi Dasar untuk SMK/MAK Kelas X. Jakarta: Yudhistira.",
    },
    lastUpdated: new Date().toISOString(),
  };
}
