/* ==========================================================================
   Satu sumber isi untuk Pertunjukan #07. Beranda, Buku Acara, dan halaman
   pembicara membaca dari sini supaya jam, nama, dan harga tidak bertabrakan.
   Semua nama, jadwal, dan harga adalah contoh untuk purwarupa desain.
   ========================================================================== */

export const SITE = 'https://landing-elevinar.pintuweb.id';

/* --------------------------------------------------------------------------
   Kalender bergulir. Pertunjukan digelar pada Sabtu ketiga; yang diiklankan
   selalu Sabtu ketiga terdekat yang masih paling sedikit 21 hari lagi (WIB),
   supaya loket punya waktu buka yang wajar. Halaman dibangun ulang tiap jam
   (revalidate di layout), jadi tanggal di demo ini tidak pernah lewat.
   -------------------------------------------------------------------------- */
const WIB = 7 * 3600 * 1000;
const HARI = 86400 * 1000;

function sabtuKetiga(tahun, bulan) {
  const awal = new Date(Date.UTC(tahun, bulan, 1)).getUTCDay(); // 0 = Minggu
  return new Date(Date.UTC(tahun, bulan, 1 + ((6 - awal + 7) % 7) + 14));
}

const fmt = (d, o) => d.toLocaleDateString('id-ID', { ...o, timeZone: 'UTC' });

/** Tanggal pertunjukan #07 dan bulan pertunjukan #08, dihitung dari hari ini. */
export function jadwal(sekarang = Date.now()) {
  const t = new Date(sekarang + WIB);
  const batas = Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()) + 21 * HARI;
  let bulan = t.getUTCMonth();
  while (sabtuKetiga(t.getUTCFullYear(), bulan).getTime() < batas) bulan += 1;
  const d = sabtuKetiga(t.getUTCFullYear(), bulan);
  const berikut = sabtuKetiga(t.getUTCFullYear(), bulan + 2);
  return {
    iso: d.toISOString().slice(0, 10),
    hari: fmt(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    pendek: fmt(d, { day: 'numeric', month: 'long', year: 'numeric' }),
    bulanBerikut: fmt(berikut, { month: 'long', year: 'numeric' }),
  };
}

export const ACARA = {
  nomor: '07',
  judul: 'Presentasi yang Didengar',
  pintu: '08.45 WIB',
  mulai: '09.00',
  selesai: '17.15',
  tempat: 'Daring — tautan panggung dikirim H-1',
  kursi: 300,
};

export const PEMBICARA = [
  {
    slug: 'dimas-aryaguna',
    nama: 'Dimas Aryaguna',
    inisial: 'DA',
    peran: 'Sutradara teater',
    babak: 'I',
    ringkas:
      'Dua belas tahun menyutradarai pementasan kecil, lima tahun terakhir melatih orang yang harus tampil di depan dewan direksi.',
    kutipan: 'Penonton memutuskan mau mendengar atau tidak sebelum Anda selesai menyebut nama.',
    latar: [
      'Dimas memulai dari teater kampus, lalu menyutradarai pementasan dengan panggung kurang dari sepuluh meter. Panggung sekecil itu mengajarinya satu hal: tidak ada tempat bersembunyi, jadi setiap gerak dan kalimat harus punya alasan.',
      'Sejak lima tahun lalu ia membawa cara kerja latihan teater ke ruang rapat: blocking untuk presentasi berdiri, gladi resik untuk rapat penting, dan kebiasaan menulis ulang kalimat pembuka sampai lima kali.',
    ],
    bahas: [
      'Mengapa pembukaan yang sopan justru membuat orang berhenti mendengar',
      'Tiga pola pembuka: pertanyaan, angka, atau adegan',
      'Posisi tubuh dan kamera saat presentasi dari rumah',
    ],
  },
  {
    slug: 'nadia-prameswari',
    nama: 'Nadia Prameswari',
    inisial: 'NP',
    peran: 'Konsultan presentasi data',
    babak: 'II',
    ringkas:
      'Membantu tim riset dan keuangan mengubah laporan setebal lima puluh halaman menjadi presentasi sepuluh menit.',
    kutipan: 'Kalau grafiknya perlu dijelaskan lebih dari satu kalimat, grafiknya yang salah.',
    latar: [
      'Nadia bekerja delapan tahun sebagai analis sebelum sadar bahwa pekerjaan tersulitnya bukan mengolah angka, tetapi membuat orang lain percaya pada angka itu dalam waktu singkat.',
      'Kini ia mendampingi tim yang wajib melapor rutin: menyusun ulang alur laporan bulanan, memangkas grafik, dan melatih cara menjawab "jadi intinya apa?" tanpa panik.',
    ],
    bahas: [
      'Satu pertanyaan, satu jawaban, satu grafik per slide',
      'Menyusun laporan bulanan dalam lima slide',
      'Sebelum dan sesudah: grafik yang disederhanakan',
    ],
  },
  {
    slug: 'laras-wibisono',
    nama: 'Laras Wibisono',
    inisial: 'LW',
    peran: 'Pelatih vokal, mantan penyiar radio',
    babak: 'III',
    ringkas:
      'Sembilan tahun menjadi penyiar radio pagi, kini melatih pengajar dan pembicara menjaga suara tetap stabil selama dua jam.',
    kutipan: 'Jeda bukan kekosongan. Jeda adalah tempat orang sempat berpikir.',
    latar: [
      'Di radio, Laras belajar bahwa pendengar tidak bisa melihat wajah — semua harus terbawa oleh suara. Kebiasaan itu yang sekarang ia ajarkan untuk presentasi daring, ketika wajah pembicara hanya sebesar kotak kecil di layar.',
      'Ia melatih guru, dosen, dan pembicara yang harus berbicara berjam-jam tanpa kehilangan suara: napas, tempo, dan cara berhenti sejenak tanpa terdengar ragu.',
    ],
    bahas: [
      'Latihan napas dua menit sebelum naik ke layar',
      'Tempo: kapan melambat, kapan berhenti',
      'Mengatasi suara bergetar dan kata pengisi "eee"',
    ],
  },
];

export const BABAK = [
  {
    kode: 'I',
    mulai: '09.00',
    selesai: '10.45',
    judul: 'Sembilan puluh detik pertama',
    pembicara: 'dimas-aryaguna',
    sinopsis:
      'Mengapa pembukaan menentukan apakah orang mau mendengar sisanya — dan cara menyusun kalimat pertama yang tidak dimulai dengan "baik, terima kasih atas waktunya".',
    catatan: 'Penonton barisan A akan diminta mencoba satu kalimat pembuka di akhir babak.',
    bawa: ['Tiga pola pembuka yang bisa langsung dipakai', 'Cara memperkenalkan diri tanpa membaca CV'],
  },
  {
    kode: 'II',
    mulai: '11.00',
    selesai: '12.45',
    judul: 'Dari tabel ke cerita',
    pembicara: 'nadia-prameswari',
    sinopsis:
      'Data yang benar belum tentu dimengerti. Babak ini menyusun alur presentasi berbasis data: satu pertanyaan, satu jawaban, satu grafik per slide.',
    catatan: 'Siapkan satu slide laporan Anda sendiri — tiga di antaranya akan dibedah langsung.',
    bawa: ['Kerangka lima slide untuk laporan bulanan', 'Daftar periksa "apakah slide ini perlu ada?"'],
  },
  {
    kode: 'III',
    mulai: '13.30',
    selesai: '15.15',
    judul: 'Suara, jeda, dan tempo',
    pembicara: 'laras-wibisono',
    sinopsis:
      'Di layar, wajah Anda hanya sebesar kotak kecil. Yang tersisa adalah suara. Babak ini melatih napas, tempo, dan jeda yang tidak terdengar ragu.',
    catatan: 'Gunakan headset bila ada. Kita akan berlatih bersuara bersama selama lima menit.',
    bawa: ['Latihan napas dua menit sebelum tampil', 'Cara menghilangkan kata pengisi "eee"'],
  },
  {
    kode: 'IV',
    mulai: '15.30',
    selesai: '17.15',
    judul: 'Pertanyaan yang sulit',
    pembicara: 'semua',
    sinopsis:
      'Panel ketiga pembicara menjawab pertanyaan yang Anda kirim sejak pendaftaran. Pertanyaan barisan A dipanggil lebih dulu, lalu B, lalu kolom obrolan.',
    catatan: 'Pertanyaan yang belum terjawab dikirim jawabannya lewat surel dalam tiga hari.',
    bawa: ['Jawaban atas pertanyaan yang Anda bawa sendiri', 'Pola menjawab "saya belum tahu" dengan tenang'],
  },
];

export const JEDA = { setelah: 'II', mulai: '12.45', selesai: '13.30', judul: 'Tirai turun — istirahat' };

export const BARISAN = [
  {
    kode: 'A',
    nama: 'Barisan Depan',
    kursi: 40,
    harga: 'Rp 450.000',
    dapat: [
      'Nama Anda disebut lebih dulu saat tanya jawab',
      'Ruang diskusi kecil 30 menit bersama pembicara',
      'Rekaman, materi mentah, dan sertifikat kehadiran',
    ],
    terang: 1,
  },
  {
    kode: 'B',
    nama: 'Barisan Tengah',
    kursi: 120,
    harga: 'Rp 250.000',
    dapat: ['Boleh bertanya lewat mikrofon', 'Rekaman dan materi', 'Sertifikat kehadiran'],
    terang: 0.62,
  },
  {
    kode: 'C',
    nama: 'Barisan Belakang',
    kursi: 140,
    harga: 'Rp 95.000',
    dapat: ['Bertanya lewat kolom obrolan', 'Rekaman selama 30 hari'],
    terang: 0.34,
  },
];

export const PENONTON = [
  {
    judul: 'Yang presentasi ke atasan tiap bulan',
    isi: 'Laporan rutin yang selalu dipotong di slide ketiga. Babak II ditulis untuk Anda.',
  },
  {
    judul: 'Yang akan sidang atau wawancara',
    isi: 'Mahasiswa tingkat akhir dan pelamar kerja yang harus menjawab pertanyaan tak terduga. Babak IV untuk Anda.',
  },
  {
    judul: 'Yang meyakinkan klien atau calon investor',
    isi: 'Pemilik usaha dan tim penjualan yang punya sepuluh menit untuk membuat orang peduli. Babak I untuk Anda.',
  },
];

export const BUKAN_UNTUK = [
  'Kelas pembawa acara atau MC panggung besar',
  'Paket templat slide siap pakai',
  'Pelatihan bahasa Inggris untuk presentasi',
];

export const TATA_TERTIB = [
  ['Pintu dibuka 15 menit sebelum babak', 'Masuk lebih awal untuk menguji mikrofon; babak dimulai tepat waktu walau kursi belum penuh.'],
  ['Kamera boleh mati', 'Hanya penonton yang dipanggil bertanya yang diminta menyalakan kamera.'],
  ['Satu pertanyaan per orang per babak', 'Supaya giliran merata. Pertanyaan tambahan boleh ditulis di kolom obrolan.'],
  ['Tidak merekam sendiri', 'Rekaman resmi dikirim ke semua penonton; merekam layar membuat pembicara enggan bercerita.'],
  ['Terlambat tetap boleh masuk', 'Tapi antrean tanya jawab mengikuti urutan hadir di babak itu.'],
];

export const SETELAH = [
  ['H+1', 'Rekaman keempat babak'],
  ['H+2', 'Materi dan kerangka slide (barisan A juga menerima materi mentah)'],
  ['H+3', 'Sertifikat kehadiran dan jawaban tertulis untuk pertanyaan yang belum terjawab'],
];

export const FAQ = [
  {
    t: 'Apakah kamera saya harus menyala?',
    j: 'Tidak. Kamera hanya diminta menyala saat nama Anda dipanggil untuk bertanya — dan itu pun boleh ditolak.',
  },
  {
    t: 'Bagaimana kalau saya terlambat?',
    j: 'Pintu virtual dibuka pukul 08.45 dan tetap terbuka sepanjang acara. Anda bisa masuk kapan saja, tetapi antrean tanya jawab mengikuti urutan hadir di babak berjalan.',
  },
  {
    t: 'Apakah ada rekaman?',
    j: 'Ada untuk semua barisan. Barisan A dan B menyimpan rekaman tanpa batas waktu; barisan C bisa menontonnya selama 30 hari.',
  },
  {
    t: 'Bisakah saya pindah barisan?',
    j: 'Bisa naik barisan sampai tiga hari sebelum pertunjukan dengan membayar selisih harga, selama kursinya masih ada.',
  },
  {
    t: 'Kapan pertanyaan dikirim?',
    j: 'Sejak Anda mendaftar. Tulis di kolom "pertanyaan yang ingin Anda bawa". Pembicara membacanya sebelum hari-H sehingga jawabannya disiapkan, bukan diimprovisasi.',
  },
  {
    t: 'Apakah uang bisa kembali?',
    j: 'Bisa penuh sampai tujuh hari sebelum acara. Setelah itu kursi tidak bisa diuangkan, tetapi boleh dialihkan ke orang lain.',
  },
];

export const pembicaraBySlug = (slug) => PEMBICARA.find((p) => p.slug === slug);
export const babakByKode = (kode) => BABAK.find((b) => b.kode === kode);
