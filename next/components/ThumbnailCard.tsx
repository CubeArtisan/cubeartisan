import Link from 'next/link';

export type ThumbnailCardProps = {
  thumbnail: string;
  caption?: string;
  link?: string;
};

const ThumbnailCard = ({ thumbnail, caption = '', link = '' }: ThumbnailCardProps) => (
  <div className="overlap-content aspect-thumbnail overflow-clip rounded transition hover:scale-[1.02] hover:drop-shadow-3xl grid">
    <div
      className="h-full w-full bg-cover bg-center shadow-[inset_0_-6rem_5rem_-5rem_black]"
      style={{ backgroundImage: `url(${thumbnail})` }}
    />
    <Link href={link} className=" h-full w-full" />
    <h2 className="self-end pb-3 px-3 text-xl font-semibold text-gray-100">{caption}</h2>
  </div>
);

export default ThumbnailCard;
