import Link from 'next/link';
import { ACARA, BABAK, JEDA, PEMBICARA, SETELAH, SITE, TATA_TERTIB, jadwal, pembicaraBySlug } from '@/lib/acara';
import CetakButton from '../components/CetakButton';

export const metadata = {
  title: 'Buku Acara',
  description: `Buku acara Elevinar Pertunjukan #${ACARA.nomor} "${ACARA.judul}": susunan babak, para pemain, tata tertib penonton, dan apa yang dikirim setelah tirai turun.`,
  alternates: { canonical: `${SITE}/buku-acara` },
};

/* Kredit ala program cetak: nama di kiri, peran di kanan, dihubungkan titik-titik. */
const KREDIT = [
  ...PEMBICARA.map((p) => [p.nama, `Babak ${p.babak} · ${p.peran}`]),
  ['Rara Anindita', 'Pembawa acara'],
  ['Bagas Pratama', 'Pengatur antrean tanya jawab'],
  ['Tim teknis Elevinar', 'Suara, layar, dan rekaman'],
];

function Titik({ kiri, kanan }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-semibold">{kiri}</span>
      <span aria-hidden="true" className="min-w-6 flex-1 border-b-2 border-dotted border-stage/25" />
      <span className="text-right text-sm text-stage/75">{kanan}</span>
    </div>
  );
}

export default function BukuAcara() {
  const j = jadwal();
  return (
    <main className="bg-stage pt-16">
      <header className="relative overflow-hidden px-6 pt-16 pb-14 text-center print:hidden">
        <div aria-hidden="true" className="spotlight absolute inset-x-0 top-0 h-[26rem]" />
        <div className="relative">
          <p className="cue text-spot">Buku acara · Pertunjukan #{ACARA.nomor}</p>
          <h1 className="mt-5 text-4xl leading-[1.02] font-extrabold md:text-6xl">{ACARA.judul}</h1>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed">
            {j.hari} · pintu dibuka {ACARA.pintu} · {ACARA.kursi} kursi daring
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CetakButton />
            <Link href="/#daftar" className="inline-flex bg-spot px-5 py-3 text-xs font-bold text-stage hover:bg-spot-soft">
              Ambil kursi
            </Link>
          </div>
        </div>
      </header>

      {/* Lembar program: kertas terang di atas panggung gelap */}
      <div className="px-4 pb-24 sm:px-6">
        <article className="mx-auto max-w-3xl bg-chalk px-6 py-12 text-stage shadow-[0_30px_80px_-30px_rgb(245_185_66/0.35)] sm:px-12 sm:py-16">
          <div className="border-b-2 border-stage pb-8 text-center">
            <p className="cue text-curtain">Elevinar mempersembahkan</p>
            <h2 className="mt-4 text-3xl font-extrabold text-stage sm:text-4xl">{ACARA.judul}</h2>
            <p className="cue mt-4 text-stage/75">Pertunjukan #{ACARA.nomor} · {j.hari}</p>
          </div>

          <section aria-labelledby="susunan" className="mt-12">
            <h2 id="susunan" className="cue mb-8 text-center text-stage">Susunan pertunjukan</h2>
            <ol className="space-y-10">
              {BABAK.map((b) => {
                const p = pembicaraBySlug(b.pembicara);
                return (
                  <li key={b.kode}>
                    <div className="grid gap-5 sm:grid-cols-[5rem_minmax(0,1fr)]">
                      <div className="flex items-baseline gap-3 sm:block">
                        <p className="font-[family-name:var(--font-archivo)] text-4xl font-extrabold text-curtain">{b.kode}</p>
                        <p className="cue mt-1 text-stage/75">{b.mulai}–{b.selesai}</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-stage">{b.judul}</h3>
                        <p className="mt-1 text-sm font-semibold text-stage/75">
                          {p ? (
                            <Link href={`/pembicara/${p.slug}`} className="inline-block py-2 underline decoration-stage/30 underline-offset-4 hover:decoration-stage">{p.nama}</Link>
                          ) : 'Panel ketiga pembicara'}
                        </p>
                        <p className="mt-3 leading-relaxed text-stage/85">{b.sinopsis}</p>
                        <p className="mt-3 border-l-2 border-curtain pl-4 text-sm leading-relaxed text-stage/85 italic">
                          Catatan untuk penonton: {b.catatan}
                        </p>
                      </div>
                    </div>
                    {b.kode === JEDA.setelah && (
                      <p className="cue mt-10 border-y border-stage/15 py-3 text-center text-curtain">
                        {JEDA.mulai}–{JEDA.selesai} · {JEDA.judul}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>

          <section aria-labelledby="pemain" className="mt-16 border-t-2 border-stage pt-10">
            <h2 id="pemain" className="cue mb-7 text-center text-stage">Para pemain</h2>
            <div className="space-y-4">
              {KREDIT.map(([k, v]) => (
                <Titik key={k} kiri={k} kanan={v} />
              ))}
            </div>
          </section>

          <section aria-labelledby="tertib" className="mt-16 border-t-2 border-stage pt-10">
            <h2 id="tertib" className="cue mb-7 text-center text-stage">Tata tertib penonton</h2>
            <ol className="space-y-5">
              {TATA_TERTIB.map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                  <span className="font-[family-name:var(--font-archivo)] font-extrabold text-curtain">{i + 1}.</span>
                  <p className="leading-relaxed text-stage/85">
                    <strong className="text-stage">{t}.</strong> {d}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="setelah" className="mt-16 border-t-2 border-stage pt-10">
            <h2 id="setelah" className="cue mb-7 text-center text-stage">Setelah tirai turun</h2>
            <dl className="grid gap-4 sm:grid-cols-3">
              {SETELAH.map(([h, d]) => (
                <div key={h} className="border border-stage/15 p-4">
                  <dt className="font-[family-name:var(--font-archivo)] text-2xl font-extrabold text-curtain">{h}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-stage/85">{d}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="cue mt-16 text-center leading-[1.7] text-stage/70">
            Nama, jadwal, dan harga dalam buku acara ini hanya gambaran, bukan penawaran sungguhan.
          </p>
        </article>
      </div>
    </main>
  );
}
