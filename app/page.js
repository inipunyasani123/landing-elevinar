import Hero from "./components/Hero";
import StageMap from "./components/StageMap";
import Babak from "./components/Babak";
import Pembicara from "./components/Pembicara";
import Penonton from "./components/Penonton";
import FAQ from "./components/FAQ";
import Registration from "./components/Registration";
import Mitra from "./components/Mitra";
import { ACARA, BABAK, BARISAN, PEMBICARA, SITE, jadwal } from "@/lib/acara";

export default function Home() {
  // Dihitung saat render (bukan di tingkat modul) supaya ikut bergulir tiap revalidate.
  const j = jadwal();
  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Elevinar Pertunjukan #${ACARA.nomor}: ${ACARA.judul}`,
    description: "Webinar empat babak tentang presentasi yang didengar: pembuka, data, suara, dan pertanyaan sulit. Kursi dibatasi 300.",
    startDate: `${j.iso}T09:00:00+07:00`,
    endDate: `${j.iso}T17:15:00+07:00`,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "VirtualLocation", url: SITE },
    image: [`${SITE}/og.jpg`],
    organizer: { "@type": "Organization", name: "Elevinar", url: SITE },
    performer: PEMBICARA.map((p) => ({ "@type": "Person", name: p.nama })),
    offers: BARISAN.map((b) => ({
      "@type": "Offer",
      name: `Barisan ${b.kode} · ${b.nama}`,
      price: Number(b.harga.replace(/\D/g, "")),
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${SITE}/?kursi=${b.kode}#daftar`,
    })),
    subEvent: BABAK.map((b) => ({
      "@type": "Event",
      name: `Babak ${b.kode}: ${b.judul}`,
      startDate: `${j.iso}T${b.mulai.replace(".", ":")}:00+07:00`,
      endDate: `${j.iso}T${b.selesai.replace(".", ":")}:00+07:00`,
      location: { "@type": "VirtualLocation", url: SITE },
    })),
  };

  return (
    <main>
      <Hero />
      <StageMap />
      <Babak />
      <Pembicara />
      <Penonton />
      <FAQ />
      <Registration hari={j.hari} />
      <Mitra />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }} />
    </main>
  );
}
