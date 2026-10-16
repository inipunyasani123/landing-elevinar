'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NAV = [
  ['/#panggung', 'Denah'],
  ['/#babak', 'Susunan babak'],
  ['/#pembicara', 'Pembicara'],
  ['/buku-acara', 'Buku acara'],
];

/* Navigasi utama + menu ponsel. Di ponsel panelnya turun seperti tirai: garis merah tirai di atas, nama tiap bagian ditulis besar dengan nomor babak di kirinya.
   Menu tertutup sendiri saat pindah halaman, menekan Escape (fokus kembali ke
   tombol), atau mengetuk di luar panel. */
export default function Navigasi({ children }) {
  const path = usePathname();
  const [buka, setBuka] = useState(false);
  const tombol = useRef(null);
  const panel = useRef(null);

  useEffect(() => setBuka(false), [path]);

  useEffect(() => {
    if (!buka) return undefined;
    const tutup = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape') return;
      if (e.type === 'pointerdown' && (panel.current?.contains(e.target) || tombol.current?.contains(e.target))) return;
      setBuka(false);
      if (e.type === 'keydown') tombol.current?.focus();
    };
    document.addEventListener('keydown', tutup);
    document.addEventListener('pointerdown', tutup);
    return () => {
      document.removeEventListener('keydown', tutup);
      document.removeEventListener('pointerdown', tutup);
    };
  }, [buka]);

  const aktif = (href) => (!href.includes('#') && href !== '/' && path.startsWith(href) ? 'page' : undefined);

  return (
    <>
      <nav aria-label="Navigasi utama" className="hidden items-center gap-7 md:flex">
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} aria-current={aktif(href)} className="cue text-dust transition-colors hover:text-chalk aria-[current=page]:text-spot">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        {children}
        <button
          ref={tombol}
          type="button"
          aria-expanded={buka}
          aria-controls="menu-ponsel"
          onClick={() => setBuka((b) => !b)}
          className="cue inline-flex h-10 min-w-[4.75rem] items-center justify-center border border-chalk/25 px-3 text-chalk md:hidden"
        >
          {buka ? 'Tutup' : 'Menu'}
        </button>
      </div>
      <nav id="menu-ponsel" ref={panel} aria-label="Navigasi ponsel" hidden={!buka} className="curtain-top absolute inset-x-0 top-full bg-stage-2 shadow-[0_24px_40px_-20px_rgb(0_0_0/0.8)] md:hidden">
        <ol className="mx-auto max-w-6xl px-6 py-3">
          {NAV.map(([href, label], i) => (
            <li key={href} className="border-b border-chalk/10 last:border-b-0">
              <Link href={href} onClick={() => setBuka(false)} aria-current={aktif(href)} className="flex items-baseline gap-4 py-3.5 text-chalk aria-[current=page]:text-spot">
                <span className="cue w-6 text-spot">{['I', 'II', 'III', 'IV'][i]}</span>
                <span className="font-[family-name:var(--font-archivo)] text-lg font-extrabold tracking-tight">{label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
