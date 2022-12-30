import React from "react";
import Image from "next/image";
import Link from "next/link";

const mangaSearch = ({ search }) => {
  //    const img = search.title
  //    console.log(img)
  return (
    <>
      <div className="flex flex-col gap-3 mx-3 ">
        {search?.map((sear) => {
          return (
            <Link href={`/mangainformation/${sear?.slug}`} key={sear.id}>
              <div className="rounded flex gap-4" >
                <img
                  className="bg-white"
                  key={sear.id}
                  src={`https://meo.comick.pictures/${sear.md_covers[0].b2key}`}
                  width={100}
                  height={100}
                  priority="true"
                  alt="cover"
                />
                <div className="flex-col hover:bg-[#332818] w-2/3 rounded-md p-2 space-y-3">
                  <h1 className="text-2xl" key={sear.title}>
                    {sear.title}
                  </h1>
                  <h1 className="bg-[#dca54c] text-black w-32 sm:w-2/12 rounded-sm text-center p-1">Rating : {sear.rating === null ? "0": sear.rating}</h1>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default mangaSearch;

export async function getServerSideProps(context) {
  const { params } = context;

  const response = await fetch(
    `https://api.comick.fun/search?q=${params.mangasearch}`
  );
  const data = await response.json();
  return {
    props: {
      search: data.slice(0, 8),
    },
  };
}
