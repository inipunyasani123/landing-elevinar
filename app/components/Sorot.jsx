import Image from 'next/image';

/* Potret pembicara di bawah kerucut lampu sorot. Pembicara di purwarupa ini fiktif, jadi potretnya
   ilustrasi buatan sendiri (public/images/pembicara), bukan foto orang sungguhan. */
const UKURAN = {
  sm: { kelas: 'h-14 w-14', px: 56 },
  md: { kelas: 'h-40 w-40', px: 160 },
  lg: { kelas: 'h-56 w-56 md:h-64 md:w-64', px: 256 },
};

export default function Sorot({ slug, alt = '', ukuran = 'md', priority = false }) {
  const u = UKURAN[ukuran];
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full border border-chalk/12 bg-stage ${u.kelas}`}>
      <Image
        src={`/images/pembicara/${slug}.webp`}
        alt={alt}
        width={u.px}
        height={u.px}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
