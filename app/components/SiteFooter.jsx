import Link from 'next/link';
import { ACARA, PEMBICARA, jadwal } from '@/lib/acara';

export default function SiteFooter() {
  const j = jadwal();
  return (
    <footer className="curtain-top bg-stage-2 print:hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,1fr))]">
        <div>
          <p className="font-[family-name:var(--font-archivo)] text-xl font-extrabold text-chalk">Elevinar</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            Webinar yang dijalankan seperti pertunjukan. Pertunjukan #{ACARA.nomor}: {ACARA.judul} —{' '}
            {j.hari}.
          </p>
        </div>
        <nav aria-label="Tautan pertunjukan">
          <p className="cue mb-4 text-spot">Pertunjukan</p>
          <ul className="space-y-0.5 text-sm">
            <li><Link href="/#panggung" className="inline-block py-3 hover:text-chalk">Denah panggung</Link></li>
            <li><Link href="/#babak" className="inline-block py-3 hover:text-chalk">Susunan babak</Link></li>
            <li><Link href="/buku-acara" className="inline-block py-3 hover:text-chalk">Buku acara</Link></li>
            <li><Link href="/#daftar" className="inline-block py-3 hover:text-chalk">Ambil kursi</Link></li>
          </ul>
        </nav>
        <nav aria-label="Pembicara">
          <p className="cue mb-4 text-spot">Di balik layar</p>
          <ul className="space-y-0.5 text-sm">
            {PEMBICARA.map((p) => (
              <li key={p.slug}>
                <Link href={`/pembicara/${p.slug}`} className="inline-block py-3 hover:text-chalk">
                  {p.nama}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-chalk/10">
        <p className="cue mx-auto max-w-6xl px-6 py-6 leading-[1.7]">
          © 2026 Elevinar · Nama, jadwal, dan harga di situs ini hanya gambaran, bukan penawaran sungguhan.
        </p>
      </div>
    </footer>
  );
}
