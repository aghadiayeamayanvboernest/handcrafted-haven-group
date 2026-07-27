import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        404
     </p>
      <h1 className="mt-2 font-heading text-3xl text-graphite md:text-4xl">
        We couldn&rsquo;t find that product
     </h1>
      <p className="mt-3 text-base text-graphite-soft">
        The piece you&rsquo;re looking for may have been sold or moved. Head back
        to the homepage to discover other handcrafted treasures.
     </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Back to home
     </Link>
   </div>
  );
}
