import { BARISAN } from '@/lib/acara';

/* ============================================================================
   Bagian penanda Elevinar: DENAH PANGGUNG.
   Tingkatan tiket biasanya dijelaskan lewat tabel harga. Di sini dijelaskan
   lewat posisi duduk — barisan mana yang Anda tempati, dan apa konsekuensinya
   terhadap jarak Anda dengan pembicara.
   ========================================================================== */

const baris = BARISAN;

export default function StageMap() {
  return (
    <section id="panggung" className="relative scroll-mt-16 overflow-hidden bg-stage py-16 md:py-28">
      <div aria-hidden="true" className="spotlight-soft absolute inset-x-0 top-0 h-96" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="cue mb-5 text-spot">Denah Panggung</p>
          <h2 className="text-[2rem] leading-[1.08] font-extrabold md:text-[2.8rem]">
            Yang membedakan tiket bukan harganya, tapi jaraknya
          </h2>
          <p className="mt-5 leading-relaxed text-dust">
            Semakin depan barisan Anda, semakin besar peluang pertanyaan Anda terjawab langsung.
            Itu saja bedanya — isi materinya sama untuk semua.
          </p>
        </div>

        {/* Panggung */}
        <div className="mx-auto mb-3 max-w-3xl">
          <div className="curtain-top bg-stage-2 py-5 text-center">
            <span className="cue text-spot">Panggung · Pembicara</span>
          </div>
          {/* Kerucut cahaya menuju penonton */}
          <div
            aria-hidden="true"
            className="mx-auto h-10 w-full"
            style={{
              background:
                'linear-gradient(to bottom, rgb(245 185 66 / 0.18), transparent)',
              clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)',
            }}
          />
        </div>

        {/* Barisan kursi */}
        <div className="space-y-3 sm:space-y-4">
          {baris.map((b) => (
            <article
              key={b.kode}
              className="grid gap-4 border border-chalk/12 bg-stage-2 p-5 sm:gap-6 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto] lg:items-center lg:gap-10"
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center bg-spot text-sm font-extrabold text-stage"
                    style={{ opacity: b.terang }}
                  >
                    {b.kode}
                  </span>
                  <h3 className="text-lg font-extrabold text-chalk">{b.nama}</h3>
                </div>
                <p className="cue mt-3 text-dust">{b.kursi} kursi</p>

                {/* Deretan kursi kecil sebagai penanda kepadatan */}
                <div aria-hidden="true" className="mt-3 flex flex-wrap gap-1 sm:mt-4">
                  {Array.from({ length: 14 }).map((_, k) => (
                    <span
                      key={k}
                      className="h-1.5 w-3 rounded-sm bg-spot"
                      style={{ opacity: b.terang * (k < 10 ? 1 : 0.35) }}
                    />
                  ))}
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-2.5">
                {b.dapat.map((d) => (
                  <li key={d} className="flex gap-3 text-sm leading-relaxed text-chalk/90">
                    <span aria-hidden="true" className="mt-2 h-1 w-3 shrink-0 bg-spot" />
                    {d}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between gap-6 border-t border-chalk/12 pt-4 sm:pt-5 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
                <span className="text-xl font-extrabold text-chalk">{b.harga}</span>
                <a
                  href={`/?kursi=${b.kode}#daftar`}
                  className="cue border-b border-spot/50 pb-1 text-spot transition-colors hover:border-spot"
                >
                  Ambil kursi {b.kode}
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="cue mt-8 text-center leading-[1.7] text-dust">
          Harga dan jumlah kursi di atas hanya gambaran, bukan penawaran sungguhan.
        </p>
      </div>
    </section>
  );
}
