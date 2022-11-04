import Link from 'next/link';

export type ThumbnailCardProps = {
  thumbnail: string;
  caption?: string;
  link?: string;
};

const ThumbnailCard = ({ thumbnail, caption = '', link = '' }: ThumbnailCardProps) => (
  <div className="relative h-56 w-56 overflow-clip rounded-md transition hover:scale-[1.02] hover:drop-shadow-3xl">
    <div
      className="absolute h-full w-full bg-cover bg-center shadow-[inset_0_-6rem_5rem_-5rem_black]"
      style={{ backgroundImage: `url(${thumbnail})` }}
    />
    {link ? <Link href={link} className="absolute h-full w-full" /> : null}
    <h2 className="absolute mt-[11.5rem] pb-3 pl-3 text-xl font-semibold text-gray-100">{caption}</h2>
  </div>
);

export default ThumbnailCard;
