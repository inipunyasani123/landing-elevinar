'use client';

import { useEffect, useState } from 'react';
import { ACARA, BARISAN } from '@/lib/acara';

/* Formulir kursi. Tautan "Ambil kursi A" di denah panggung membawa ?kursi=A,
   jadi barisan itu sudah terpilih ketika pengunjung sampai di sini. */
export default function Registration({ hari }) {
  const [kursi, setKursi] = useState('B');
  const [terkirim, setTerkirim] = useState(null);

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get('kursi');
    if (k && BARISAN.some((b) => b.kode === k)) setKursi(k);
  }, []);

  const pilih = BARISAN.find((b) => b.kode === kursi);

  const kirim = (e) => {
    e.preventDefault();
    const nama = new FormData(e.currentTarget).get('nama');
    // Purwarupa desain: tidak ada data yang dikirim ke mana pun.
    setTerkirim({ nama: String(nama).split(' ')[0], kursi: pilih });
  };

  return (
    <section id="daftar" className="scroll-mt-16 bg-stage-2 py-16 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <p className="cue mb-5 text-spot">Loket</p>
          <h2 className="text-[2rem] leading-[1.08] font-extrabold md:text-[2.6rem]">
            Pilih barisan, tulis pertanyaan Anda, selesai
          </h2>
          <p className="mt-5 leading-relaxed">
            Pertanyaan yang Anda tulis di sini dibaca pembicara sebelum hari-H. Tautan panggung
            dikirim ke surel Anda sehari sebelum pertunjukan.
          </p>
          <dl className="mt-8 space-y-3 border-t border-chalk/12 pt-6 text-sm">
            <div className="flex justify-between gap-4"><dt>Hari</dt><dd className="text-chalk">{hari}</dd></div>
            <div className="flex justify-between gap-4"><dt>Pintu dibuka</dt><dd className="text-chalk">{ACARA.pintu}</dd></div>
            <div className="flex justify-between gap-4"><dt>Tempat</dt><dd className="text-right text-chalk">{ACARA.tempat}</dd></div>
          </dl>
        </div>

        <div className="border border-chalk/12 bg-stage p-6 sm:p-8">
          {terkirim ? (
            <div role="status" className="py-6">
              <p className="cue text-spot">Kursi {terkirim.kursi.kode} · {terkirim.kursi.nama}</p>
              <p className="mt-4 text-2xl font-extrabold text-chalk">
                Terima kasih, {terkirim.nama || 'penonton'}.
              </p>
              <p className="mt-3 leading-relaxed">
                Ini hanya gambaran, jadi tidak ada kursi yang benar-benar dipesan dan tidak ada
                surel yang dikirim.
              </p>
              <button
                type="button"
                onClick={() => setTerkirim(null)}
                className="cue mt-6 border border-chalk/25 px-5 py-3 text-chalk hover:border-spot hover:text-spot"
              >
                Isi ulang
              </button>
            </div>
          ) : (
            <form onSubmit={kirim} className="space-y-6">
              <fieldset>
                <legend className="cue mb-4 text-chalk">Barisan</legend>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {BARISAN.map((b) => (
                    <label
                      key={b.kode}
                      className={`cursor-pointer border p-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-spot sm:p-4 ${
                        kursi === b.kode ? 'border-spot bg-spot/10' : 'border-chalk/15 hover:border-chalk/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="kursi"
                        value={b.kode}
                        checked={kursi === b.kode}
                        onChange={() => setKursi(b.kode)}
                        className="sr-only"
                      />
                      <span className="cue block tracking-[0.1em] text-spot sm:tracking-[0.2em]">Barisan {b.kode}</span>
                      <span className="mt-2 block text-[0.8rem] font-extrabold whitespace-nowrap text-chalk sm:text-base">{b.harga}</span>
                      <span className="mt-1 block text-xs">{b.kursi} kursi</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nama" className="cue mb-2 block text-chalk">Nama</label>
                  <input id="nama" name="nama" required autoComplete="name"
                    className="w-full border border-chalk/20 bg-stage-2 px-4 py-3 text-chalk focus:border-spot focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="surel" className="cue mb-2 block text-chalk">Surel</label>
                  <input id="surel" name="surel" type="email" required autoComplete="email"
                    className="w-full border border-chalk/20 bg-stage-2 px-4 py-3 text-chalk focus:border-spot focus:outline-none" />
                </div>
              </div>
              <div>
                <label htmlFor="tanya" className="cue mb-2 block text-chalk">Pertanyaan yang ingin Anda bawa (boleh kosong)</label>
                <textarea id="tanya" name="tanya" rows={3}
                  className="w-full resize-y border border-chalk/20 bg-stage-2 px-4 py-3 text-chalk focus:border-spot focus:outline-none" />
              </div>

              <button type="submit" className="w-full bg-spot py-4 text-sm font-bold text-stage transition-colors hover:bg-spot-soft">
                Ambil kursi {pilih.kode} · {pilih.harga}
              </button>
              <p className="text-xs leading-relaxed">Formulir ini hanya gambaran dan tidak mengirim data ke mana pun.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
