import Hero from "../lib/components/Hero";
import ThumbnailCard from "../lib/components/ThumbnailCard";
import { homePageCards } from "../mock/home-page-cards";

const heroText = {
  mainText: "CubeArtisan",
  subText: "build, analyze, and share cubes",
};

export default function Home() {
  return (
    <>
      <Hero {...heroText} />
      <div className="clamp">
        {homePageCards.map((cardList) => (
          <div key={cardList.name}>
            <h2 className="mb-5 mt-10 text-xl font-semibold">
              {cardList.blurb}
            </h2>
            <div className="flex justify-around ">
              {cardList.section.map((card) => (
                <ThumbnailCard key={card.caption} {...card} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
