import { ACARA, jadwal } from '@/lib/acara';

/* Tanpa dinding logo. Satu pertunjukan hanya punya satu mitra, dan aturannya
   ditulis terbuka supaya penonton tahu apa yang akan dan tidak akan terjadi. */
const ATURAN = [
  ['Disebut dua kali', 'Sekali saat pembukaan, sekali saat tirai turun. Tidak ada iklan di tengah babak.'],
  ['Tidak memilih pembicara', 'Susunan babak disusun sebelum mitra dicari, dan tidak berubah karenanya.'],
  ['Kursi untuk timnya', 'Sepuluh kursi barisan B untuk karyawan mitra, di luar 300 kursi penonton.'],
];

export default function Mitra() {
  const j = jadwal();
  return (
    <section className="bg-stage py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 border border-chalk/12 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="cue mb-5 text-spot">Mitra pertunjukan</p>
            <h2 className="text-2xl leading-tight font-extrabold md:text-3xl">
              Satu kursi mitra — dan untuk pertunjukan #{ACARA.nomor} kursi itu masih kosong
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Kami sengaja tidak memasang deretan logo. Pertunjukan #08 membuka satu slot mitra mulai{' '}
              {j.bulanBerikut}.
            </p>
          </div>
          <dl className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {ATURAN.map(([t, d]) => (
              <div key={t} className="border-l-2 border-spot/40 pl-4">
                <dt className="font-semibold text-chalk">{t}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
