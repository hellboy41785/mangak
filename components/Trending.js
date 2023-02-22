import Image from "next/image";
import Link from "next/link";

const TrendingManga = ({ trends }) => {
 
  const trending = trends["7"]?.map((trend) => 
        <Link href={`/mangainformation/${trend.slug}`} key={trend.slug}>
          <div
            className=" h-56 w-[150px] hover:bg-[#332818] rounded-md"
            
          >
            <img
              className="min-w-[150px] h-[200px] rounded-md p-[1px]"
              src={`https://meo.comick.pictures/${trend.md_covers[0].b2key}`}
              alt="cover"
              priority="true"
            />
            <h1 className="p-1 text-sm truncate text-ellipsis text-center">
              {trend.title}
            </h1>
          </div>
        </Link>
    

  )
  

  return (
    <>
      <h1 className="mx-2 mt-6 text-xl">Trending Manga</h1>
      <div className="h-[241px] overflow-x-auto mx-2 mt-2 scrollbar-thin scrollbar-thumb-[#dca54c] scrollbar-track-[#332818] cursor-pointer">
        <div className="flex gap-3">
            {trending}

        </div>
      </div>
    </>
  );
};

export default TrendingManga;
