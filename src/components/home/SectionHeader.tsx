import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  linkHref: string;
  linkLabel: string;
}

export default function SectionHeader({
  title,
  linkHref,
  linkLabel,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="text-2xl font-bold text-graphite sm:text-3xl">{title}</h2>
      <Link
        href={linkHref}
        className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
