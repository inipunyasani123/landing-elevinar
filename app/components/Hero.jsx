import { ACARA, jadwal } from '@/lib/acara';

const angka = [
  ['4 babak', 'Sepanjang satu hari'],
  ['105 menit', 'Tiap babak, termasuk tanya jawab'],
  ['300 kursi', 'Dibatasi agar diskusi tetap hidup'],
];

export default function Hero() {
  const j = jadwal();
  return (
    <section className="relative overflow-hidden bg-stage pt-24 pb-14 md:pt-36 md:pb-28">
      {/* Kerucut lampu sorot dari atas panggung */}
      <div aria-hidden="true" className="spotlight absolute inset-x-0 top-0 h-[34rem]" />
      <div aria-hidden="true" className="stage-floor absolute inset-x-0 bottom-0 h-52" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="cue naik mb-6 text-spot md:mb-8">
          Pertunjukan #{ACARA.nomor} · {j.hari} · Daring
        </p>

        <h1 className="text-[2.6rem] leading-[0.98] font-extrabold sm:text-6xl lg:text-[4.6rem]">
          Lampu menyala.
          <br />
          <span className="text-spot">Tempat Anda sudah ada.</span>
        </h1>

        <p className="naik naik-2 mx-auto mt-6 max-w-xl leading-relaxed text-dust md:mt-7">
          Webinar yang dijalankan seperti pertunjukan: jadwal yang ditepati, pembicara yang
          disiapkan, dan jumlah kursi yang sengaja dibatasi supaya sesi tanya jawab tidak
          tenggelam.
        </p>

        <div className="naik naik-3 mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 md:mt-10">
          <a
            href="#daftar"
            className="inline-flex items-center justify-center bg-spot px-8 py-4 text-sm font-bold text-stage transition-colors duration-300 hover:bg-spot-soft"
          >
            Ambil kursi
          </a>
          <a
            href="#panggung"
            className="inline-flex items-center justify-center border border-chalk/25 px-8 py-4 text-sm font-bold text-chalk transition-colors duration-300 hover:border-chalk/60"
          >
            Lihat denah panggung
          </a>
        </div>

        <dl className="naik naik-3 mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 border-t border-chalk/12 pt-7 sm:gap-8 md:mt-16 md:pt-9">
          {angka.map(([nilai, ket]) => (
            <div key={nilai} className="flex flex-col-reverse justify-end">
              <dt className="cue mt-2 text-dust sm:mt-2.5">{ket}</dt>
              <dd className="text-lg font-extrabold text-chalk sm:text-2xl">{nilai}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
