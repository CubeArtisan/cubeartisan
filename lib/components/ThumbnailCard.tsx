import Link from "next/link";

export default function ThumbnailCard({
  thumbnail,
  caption,
  link,
}: {
  thumbnail: string;
  caption: string;
  link: string;
}) {
  return (
    <figure className="relative h-56 w-56 overflow-clip rounded-md transition hover:scale-[1.02] hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]">
      <div
        className="absolute h-full w-full bg-cover bg-center shadow-[inset_0_-6rem_5rem_-5rem_black]"
        style={{ backgroundImage: `url(${thumbnail})` }}
      />
      <Link href={link} className="absolute h-full w-full" />
      <figcaption className="absolute mt-[11.5rem] pb-3 pl-3 text-xl font-semibold text-gray-100">
        {caption}
      </figcaption>
    </figure>
  );
}
