import { Sparkles, HandHeart, ShieldCheck, Truck, type LucideIcon } from "lucide-react";

interface ValueProp {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const VALUE_PROPS: ValueProp[] = [
  {
    Icon: Sparkles,
    title: "Handmade with care",
    description: "Every piece is crafted by hand, never mass-produced.",
  },
  {
    Icon: HandHeart,
    title: "Support local artisans",
    description: "Your purchase goes directly to independent makers.",
  },
  {
    Icon: ShieldCheck,
    title: "Secure checkout",
    description: "Shop with confidence through protected payments.",
  },
  {
    Icon: Truck,
    title: "Worldwide shipping",
    description: "Treasures delivered from makers around the globe.",
  },
];

export default function ValueProps() {
  return (
    <section aria-label="Why shop with Handcrafted Haven" className="bg-cream">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {VALUE_PROPS.map(({ Icon, title, description }) => (
          <li key={title} className="flex items-start gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tag text-primary"
              aria-hidden="true"
            >
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-body text-sm font-semibold text-graphite">
                {title}
              </h3>
              <p className="mt-1 text-sm text-graphite-soft">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
