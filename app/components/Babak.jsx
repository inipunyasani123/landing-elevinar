import Link from 'next/link';
import { ACARA, BABAK, JEDA, jadwal, pembicaraBySlug } from '@/lib/acara';

/* Susunan acara ditulis seperti program pertunjukan: tiap sesi adalah babak
   dengan jam tayang, sinopsis, dan siapa yang berdiri di bawah lampu. */
export default function Babak() {
  const j = jadwal();
  return (
    <section id="babak" className="scroll-mt-16 bg-stage-2 py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 grid gap-5 md:mb-14 md:gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-end">
          <div>
            <p className="cue mb-5 text-spot">Susunan babak · {j.hari}</p>
            <h2 className="text-[2rem] leading-[1.08] font-extrabold md:text-[2.8rem]">
              Empat babak, satu hari, tidak ada yang molor
            </h2>
          </div>
          <p className="leading-relaxed">
            Pintu dibuka {ACARA.pintu}. Tiap babak berdurasi 105 menit — 80 menit materi, 25 menit
            tanya jawab — dan ditutup tepat pada jamnya, meski masih ada tangan yang terangkat.
          </p>
        </div>

        <ol className="border-t border-chalk/12">
          {BABAK.map((b) => {
            const p = b.pembicara === 'semua' ? null : pembicaraBySlug(b.pembicara);
            return (
              <li key={b.kode}>
                <article className="grid gap-4 border-b border-chalk/12 py-7 md:grid-cols-[9rem_minmax(0,1fr)_minmax(0,0.75fr)] md:gap-10 md:py-9">
                  <div className="flex items-baseline gap-3 md:block">
                    <p className="cue text-spot">Babak {b.kode}</p>
                    <p className="font-[family-name:var(--font-archivo)] text-2xl font-extrabold tabular-nums text-chalk md:mt-3 md:text-3xl">
                      {b.mulai}
                    </p>
                    <p className="cue md:mt-1.5">sampai {b.selesai}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold md:text-2xl">{b.judul}</h3>
                    <p className="mt-2 leading-relaxed md:mt-3">{b.sinopsis}</p>
                    <p className="mt-3 text-sm text-chalk/85 md:mt-4">
                      Di bawah lampu:{' '}
                      {p ? (
                        <Link href={`/pembicara/${p.slug}`} className="inline-block py-2 font-semibold text-spot underline decoration-spot/40 underline-offset-4 hover:decoration-spot">
                          {p.nama}
                        </Link>
                      ) : (
                        <span className="font-semibold text-chalk">ketiga pembicara</span>
                      )}
                    </p>
                  </div>
                  <div className="border-l-2 border-spot/40 pl-5">
                    <p className="cue mb-2 text-spot md:mb-3">Dibawa pulang</p>
                    <ul className="space-y-2 text-sm leading-relaxed text-chalk/90">
                      {b.bawa.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </article>
                {b.kode === JEDA.setelah && (
                  <div className="flex items-center gap-4 border-b border-chalk/12 bg-curtain/25 px-5 py-4">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-curtain" />
                    <p className="cue text-chalk">
                      {JEDA.mulai}–{JEDA.selesai} · {JEDA.judul}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="text-sm">Tata tertib penonton, susunan kredit, dan apa yang dikirim setelah tirai turun ada di buku acara.</p>
          <Link
            href="/buku-acara"
            className="cue shrink-0 border border-chalk/25 px-5 py-3 text-chalk transition-colors hover:border-spot hover:text-spot"
          >
            Buka buku acara
          </Link>
        </div>
      </div>
    </section>
  );
}
