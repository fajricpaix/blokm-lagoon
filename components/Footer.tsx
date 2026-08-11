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
    <footer id="join-us" className="bg-surface px-6 py-20 text-foreground sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
            <Image src={logoSrc} alt={logoAlt} fill sizes="56px" className="object-cover" />
          </div>
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Join Us
          </span>
          <h2 className="max-w-md text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
            Gabung Meja Kami
          </h2>
          <p className="max-w-md text-sand">{contact.address}</p>
          <p className="text-sand">{contact.hours}</p>
        </div>
        <div className="flex flex-col gap-4">
          <a
            href={contact.whatsappHref}
            className="text-lg font-medium text-gold underline decoration-gold/40 underline-offset-4 hover:text-flame hover:decoration-flame"
          >
            {contact.whatsapp}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-sand hover:text-foreground"
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
                className="text-sm uppercase tracking-[0.2em] text-sand hover:text-gold"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-16 max-w-6xl text-xs text-sand/60">
        © {new Date().getFullYear()} Blok M Serpong Lagoon · Est. {establishedYear}. Semua hak
        cipta dilindungi.
      </p>
    </footer>
  );
}
