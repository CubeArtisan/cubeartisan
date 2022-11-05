import Hero from '@cubeartisan/next/components/Hero';
import ThumbnailCard from '@cubeartisan/next/components/ThumbnailCard';
import homePageCards from '@cubeartisan/next/mock/home-page-cards';

const heroText = {
  mainText: 'CubeArtisan',
  subText: 'build, analyze, and share cubes',
};

const Home = () => (
  <>
    <Hero {...heroText} />
    <div className="w-[min(80%,theme(screens.md))] mx-auto">
      {homePageCards.map((cardList) => (
        <div key={cardList.name}>
          <h2 className="mb-5 mt-10 text-lg font-semibold w-max">{cardList.blurb}</h2>
          <div className="grid grid-cols-auto-3 gap-4">
            {cardList.section.map((card) => (
              <ThumbnailCard key={card.caption} {...card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
);
export default Home;
