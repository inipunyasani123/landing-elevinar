import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ACARA, PEMBICARA, SITE, babakByKode, jadwal, pembicaraBySlug } from '@/lib/acara';
import Sorot from '../../components/Sorot';

/* Deskripsi meta maksimal 155 karakter, dipotong di batas kata. */
const ringkas = (t, n = 155) => (t.length <= n ? t : `${t.slice(0, t.lastIndexOf(' ', n - 1)).replace(/[,.;:]$/, '')}…`);

export function generateStaticParams() {
  return PEMBICARA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = pembicaraBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.nama} · Babak ${p.babak}`,
    description: ringkas(`${p.nama} membawakan Babak ${p.babak} “${babakByKode(p.babak).judul}”. “${p.kutipan}”`),
    alternates: { canonical: `${SITE}/pembicara/${p.slug}` },
  };
}

export default async function HalamanPembicara({ params }) {
  const { slug } = await params;
  const p = pembicaraBySlug(slug);
  if (!p) notFound();
  const b = babakByKode(p.babak);
  const j = jadwal();
  const lain = PEMBICARA.filter((x) => x.slug !== p.slug);

  return (
    <main className="bg-stage pt-16">
      <section className="relative overflow-hidden px-6 pt-16 pb-20">
        <div aria-hidden="true" className="spotlight absolute inset-x-0 top-0 h-[30rem]" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[auto_minmax(0,1fr)]">
          <div className="mx-auto md:mx-0">
            <Sorot inisial={p.inisial} ukuran="lg" />
          </div>
          <div>
            <p className="cue text-spot">
              <Link href="/#pembicara" className="hover:text-spot-soft">Di balik layar</Link> · Babak {p.babak}
            </p>
            <h1 className="mt-4 text-4xl leading-[1.02] font-extrabold md:text-6xl">{p.nama}</h1>
            <p className="mt-3 text-lg text-chalk/85">{p.peran}</p>
            <blockquote className="mt-8 border-l-2 border-spot pl-5 text-xl leading-snug text-chalk md:text-2xl">
              “{p.kutipan}”
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-stage-2 px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <h2 className="cue mb-6 text-spot">Latar</h2>
            <div className="space-y-5 text-lg leading-relaxed">
              {p.latar.map((x) => (
                <p key={x.slice(0, 24)}>{x}</p>
              ))}
            </div>
            <h2 className="cue mt-12 mb-5 text-spot">Yang akan dibahas</h2>
            <ol className="space-y-4">
              {p.bahas.map((x, i) => (
                <li key={x} className="flex gap-4 leading-relaxed text-chalk">
                  <span className="font-[family-name:var(--font-archivo)] font-extrabold text-spot tabular-nums">0{i + 1}</span>
                  {x}
                </li>
              ))}
            </ol>
          </div>

          <aside className="h-fit border border-chalk/12 bg-stage p-6">
            <p className="cue text-spot">Babak {b.kode} · {j.hari}</p>
            <p className="mt-4 font-[family-name:var(--font-archivo)] text-3xl font-extrabold text-chalk tabular-nums">
              {b.mulai}–{b.selesai}
            </p>
            <h2 className="mt-4 text-xl font-extrabold">{b.judul}</h2>
            <p className="mt-3 text-sm leading-relaxed">{b.sinopsis}</p>
            <p className="mt-4 text-sm leading-relaxed text-chalk/85">Lalu duduk di panel Babak IV: “Pertanyaan yang sulit”.</p>
            <Link href="/#daftar" className="mt-6 inline-flex w-full justify-center bg-spot py-3.5 text-sm font-bold text-stage hover:bg-spot-soft">
              Ambil kursi untuk babak ini
            </Link>
            <Link href="/buku-acara" className="cue mt-4 block text-center text-dust hover:text-chalk">
              Lihat buku acara
            </Link>
          </aside>
        </div>
      </section>

      <nav aria-label="Pembicara lain" className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="cue mb-6 text-spot">Juga di atas panggung</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {lain.map((x) => (
              <li key={x.slug}>
                <Link href={`/pembicara/${x.slug}`} className="flex items-center gap-5 border border-chalk/12 p-5 transition-colors hover:border-spot/60">
                  <span className="font-[family-name:var(--font-archivo)] text-2xl font-extrabold text-spot">{x.inisial}</span>
                  <span>
                    <span className="block font-semibold text-chalk">{x.nama}</span>
                    <span className="text-sm">Babak {x.babak} · {x.peran}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </main>
  );
}
