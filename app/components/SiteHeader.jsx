import Link from 'next/link';
import Navigasi from './Navigasi';

/* Bilah atas panggung: nama pertunjukan di kiri, tombol kursi di kanan.
   Tautan memakai "/#…" supaya tetap berfungsi dari halaman dalam. */
export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 print:hidden border-b border-chalk/10 bg-stage/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex min-h-11 items-center gap-2.5">
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-spot shadow-[0_0_14px_rgb(245_185_66/0.7)]" />
          <span className="font-[family-name:var(--font-archivo)] text-lg font-extrabold tracking-tight text-chalk">
            Elevinar
          </span>
        </Link>
        <Navigasi>
          <Link
            href="/#daftar"
            className="inline-flex h-11 items-center bg-spot px-4 text-xs font-bold text-stage transition-colors hover:bg-spot-soft"
          >
            Ambil kursi
          </Link>
        </Navigasi>
      </div>
    </header>
  );
}
