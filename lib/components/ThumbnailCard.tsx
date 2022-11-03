export default function ThumbnailCard({
  thumbnail,
  caption,
}: {
  thumbnail: string;
  caption: string;
}) {
  return (
    <figure className="relative h-56 w-56 overflow-clip rounded-md">
      <div
        className="absolute h-full w-full bg-cover bg-center shadow-[inset_0_-6rem_5rem_-5rem_black]"
        style={{ backgroundImage: `url(${thumbnail})` }}
      />
      <figcaption className="absolute mt-[11.5rem] pb-3 pl-3 text-xl font-semibold text-gray-100">
        {caption}
      </figcaption>
    </figure>
  );
}
