import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Path under /public used as the banner background. */
  image: string;
  /** Small eyebrow label above the title. */
  eyebrow?: string;
}

export default function PageHeader({
  title,
  subtitle,
  image,
  eyebrow,
}: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-graphite/85 via-graphite/65 to-graphite/40"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 max-w-2xl text-4xl font-bold text-cream drop-shadow-sm sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-xl text-base text-cream/90 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
