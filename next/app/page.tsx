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
    <div>
      {homePageCards.map((cardList) => (
        <div key={cardList.name}>
          <h2 className="mb-5 mt-10 text-xl font-semibold">{cardList.blurb}</h2>
          <div className="flex justify-around ">
            {cardList.section.map((card) => (
              <ThumbnailCard {...card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
);
export default Home;
