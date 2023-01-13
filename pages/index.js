import LatestManga from "../components/latestmanga";

import TrendingManga from "../components/Trending";

export default function Home({ latest, trends }) {
  return (
    <>
      <TrendingManga trends={trends} />
      <h1 className="mx-2 mt-10 text-xl">Latest Manga</h1>
      <div className="grid w-full grid-cols-2 gap-2 px-2 mt-2 text-2xl sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {latest.map((latest) => {
          return (
            <div className="" key={latest.id}>
              <LatestManga latest={latest} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const response = await fetch(
    `https://api.comick.app/chapter/?lang=en&order=new&tachiyomi=false&type=manga&type=manhwa&type=manhua&accept_mature_content=true`
  );
  const trending = await fetch(`
  https://api.comick.app/top?type=trending&comic_types=manga&comic_type=manhwa&comic_type=manhua&accept_mature_content=true
  `);

  const latest = await response.json();
  const trend = await trending.json();
  return {
    props: {
      latest,
      trends: trend?.trending,
    },
  };
}
