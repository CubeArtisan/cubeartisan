import Hero from "../lib/components/Hero";
import ThumbnailCard from "../lib/components/ThumbnailCard";

const heroText = {
  mainText: "CubeArtisan",
  subText: "build, analyze, and share cubes",
};

const testThumbnailCard = {
  thumbnail:
    "https://cards.scryfall.io/art_crop/front/6/e/6e70332c-de0b-45ce-bbd1-5de4314c08db.jpg?1623594026",
  caption: "Time Warp",
  link: "/",
};

export default function Home() {
  return (
    <>
      <Hero {...heroText} />
      <div className="clamp">
        <h1 className="mt-8">Pick up where you left off</h1>
        <div className="mt-5 flex w-full flex-wrap justify-around">
          <ThumbnailCard {...testThumbnailCard} />
          <ThumbnailCard {...testThumbnailCard} />
          <ThumbnailCard {...testThumbnailCard} />
        </div>
        <h1 className="mt-8">Latest from people you follow</h1>
        <div className="mt-5 flex w-full flex-wrap justify-around">
          <ThumbnailCard {...testThumbnailCard} />
          <ThumbnailCard {...testThumbnailCard} />
          <ThumbnailCard {...testThumbnailCard} />
        </div>
      </div>
    </>
  );
}
