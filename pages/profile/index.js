import { useMyMangaStore } from "../../context/myMangaList";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

const MyList = () => {
  const {myMangaLists} = useMyMangaStore.getState();
  const [myList, setMyList] = useState([]);
  useEffect(() => {
    setMyList(myMangaLists);
  }, [myMangaLists]);

  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>

      {myList.length === 0 ? (
        <div className="flex items-center justify-center w-full h-[600px] ">
          <h1 className="font-serif text-4xl">No BookMarks</h1>
        </div>
      ) : (
        myList.map((List) => (
          <div className="flex gap-4 mx-2 my-3" key={List.id}>
            <img
              className="h-[200px] w-[150px]"
              src={`https://meo.comick.pictures/${List.image.img}`}
              alt="cover"
            />
            <div className="flex-col hover:bg-[#332818] p-3 rounded-sm w-2/3">
              <Link href={`/mangainformation/${List.slug}`}>
                <h1>{List.title}</h1>
                <h1 className="mt-2">Chapter Reading</h1>
                <div className="mt-1 w-28">
                  <h1 className="p-1 text-center text-black bg-yellow-500 rounded-md">{`${List.reading} / ${List.count}`}</h1>
                </div>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyList;
