import Image from "next/image";

export function ArticleFeaturedImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl bg-black/5">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 768px"
      />
    </div>
  );
}
