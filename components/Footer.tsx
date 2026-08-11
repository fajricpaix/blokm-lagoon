import Image from "next/image";
import { logoAlt, logoSrc, establishedYear } from "@/lib/data";
import type { ContactInfo, SocialLink } from "@/lib/data";

export default function Footer({
  contact,
  socialLinks,
}: {
  contact: ContactInfo;
  socialLinks: SocialLink[];
}) {
  return (
    <footer id="join-us" className="bg-black px-6 py-20 text-white sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
            <Image src={logoSrc} alt={logoAlt} fill sizes="56px" className="object-cover" />
          </div>
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/50">
            Join Us
          </span>
          <h2 className="max-w-md text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
            Gabung Meja Kami
          </h2>
          <p className="max-w-md text-white/70">{contact.address}</p>
          <p className="text-white/70">{contact.hours}</p>
        </div>
        <div className="flex flex-col gap-4">
          <a
            href={contact.whatsappHref}
            className="text-lg font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            {contact.whatsapp}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-white/70 hover:text-white"
          >
            {contact.email}
          </a>
          <div className="mt-4 flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-16 max-w-6xl text-xs text-white/40">
        © {new Date().getFullYear()} Blok M Serpong Lagoon · Est. {establishedYear}. Semua hak
        cipta dilindungi.
      </p>
    </footer>
  );
}
