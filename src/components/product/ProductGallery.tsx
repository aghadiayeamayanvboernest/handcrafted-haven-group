import Image from "next/image";

interface ProductGalleryProps {
  src: string;
  alt: string;
}

export default function ProductGallery({ src, alt }: ProductGalleryProps) {
  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-primary/10 bg-placeholder">
      <div className="relative aspect-square w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          unoptimized={src.startsWith("data:")}
          className="object-cover"
        />
    </div>
  </div>
  );
}
