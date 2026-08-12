"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  src: string;
  alt: string;
  images?: string[];
}

export default function ProductGallery({ src, alt, images = [] }: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : [src];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = galleryImages[selectedIndex] || src;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="overflow-hidden rounded-[var(--radius)] border border-primary/10 bg-placeholder">
        <div className="relative aspect-square w-full">
          <Image
            src={activeImage}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            unoptimized={activeImage.startsWith("data:")}
            className="object-cover transition-all duration-300"
          />
        </div>
      </div>

      {/* Thumbnails row if multiple images exist */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {galleryImages.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-[var(--radius)] border-2 transition-all ${
                selectedIndex === idx
                  ? "border-primary ring-2 ring-primary/20 scale-105"
                  : "border-primary/20 opacity-70 hover:opacity-100"
              }`}
              aria-label={`View photo ${idx + 1} of ${galleryImages.length}`}
            >
              <Image
                src={img}
                alt={`${alt} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                unoptimized={img.startsWith("data:")}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
