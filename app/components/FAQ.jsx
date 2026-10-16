import { FAQ as DAFTAR } from '@/lib/acara';

export default function FAQ() {
  return (
    <section id="tanya" className="scroll-mt-16 bg-stage py-16 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <p className="cue mb-5 text-spot">Sebelum masuk</p>
          <h2 className="text-[2rem] leading-[1.08] font-extrabold md:text-[2.6rem]">
            Pertanyaan yang biasa datang dari kursi penonton
          </h2>
        </div>
        <div className="border-t border-chalk/12">
          {DAFTAR.map((f) => (
            <details key={f.t} className="group border-b border-chalk/12">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-semibold text-chalk [&::-webkit-details-marker]:hidden">
                {f.t}
                <span aria-hidden="true" className="text-xl text-spot transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-6 leading-relaxed">{f.j}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
