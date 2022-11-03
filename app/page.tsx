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
};

export default function Home() {
  return (
    <main>
      <Hero {...heroText} />
      <div className="mx-auto mt-5 w-fit">
        <ThumbnailCard {...testThumbnailCard} />
      </div>
    </main>
  );
}
