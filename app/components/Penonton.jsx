import { BUKAN_UNTUK, PENONTON } from '@/lib/acara';

export default function Penonton() {
  return (
    <section className="bg-stage-2 py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 max-w-2xl md:mb-12">
          <p className="cue mb-5 text-spot">Penonton</p>
          <h2 className="text-[2rem] leading-[1.08] font-extrabold md:text-[2.6rem]">
            Anda yang berbicara di depan orang, tapi bukan untuk tepuk tangan
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <ul className="grid gap-px border border-chalk/12 bg-chalk/12 sm:grid-cols-3">
            {PENONTON.map((p, i) => (
              <li key={p.judul} className="bg-stage-2 p-5 sm:p-6">
                <span className="cue text-spot">Kursi {String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg leading-snug font-extrabold sm:mt-4">{p.judul}</h3>
                <p className="mt-3 text-sm leading-relaxed">{p.isi}</p>
              </li>
            ))}
          </ul>
          <div className="border border-curtain/60 bg-curtain/15 p-6 lg:self-start">
            <p className="cue text-chalk">Mungkin bukan untuk Anda, bila mencari</p>
            <ul className="mt-5 space-y-3">
              {BUKAN_UNTUK.map((x) => (
                <li key={x} className="flex gap-3 text-sm leading-relaxed text-chalk/90">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-chalk/60" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
