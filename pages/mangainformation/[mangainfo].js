import MangaInformation from "../../components/MangaInformation";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Head from "next/head";
import { Fragment } from "react";

import { useMyMangaStore } from "../../context/myMangaList";

const MangaInfo = ({ mangaIn }) => {
  const [order, setOrder] = useState(true);
  const [orderValue, setOrderValue] = useState("0");
  const [mangaChap, setMangaChap] = useState([]);
  const [readingCount, setReadingCount] = useState("0");
  const addReading = useMyMangaStore((state) => state.addReading);

  useEffect(() => {
    const fetchMangaChapters = async () => {
      const response = await fetch(
        `${process.env.CORS_URL}https://api.comick.app/comic/${mangaIn.comic.id}/chapter?chap-order=${orderValue}`
      );
      const data = await response.json();
      setMangaChap(data);
    };
    fetchMangaChapters();
  }, [orderValue]);

  const handleSubmit = () => {
    setOrder((prev) => !prev);
    order ? setOrderValue("1") : setOrderValue("0");
  };

  return (
    <>
      <Head>
        <title>{mangaIn?.comic.title}</title>
      </Head>
      <div className="px-2 py-10 ">
        <MangaInformation mangaIn={mangaIn} readingCount={readingCount} />
        <div
          onClick={() => handleSubmit()}
          className="flex items-center gap-2 mt-10 cursor-pointer "
        >
          <h1 className="text-2xl ">Chapters</h1>
          <div className="">
            <h1 className="text-3xl">
              {order ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-5 md:grid-cols-7 ">
          {mangaChap.chapters?.map((chap) => {
            return (
              <Fragment key={chap.id}>
                {chap.lang === "en" && (
                  <Link
                    href={`/chapterview/${chap.hid}`}
                    className="rounded-md bg-[#3e3322] hover:bg-yellow-500 hover:text-black flex flex-col"
                    onClick={() => addReading(mangaIn.comic.id, chap.chap)}
                  >
                    <h1 className="text-center  p-4">{chap.chap === null ? "0" : chap.chap}</h1>
                    <div className="w-full  p-1">
                      <p className=" text-xs truncate text-center">
                        {chap.group_name}
                      </p>
                    </div>
                  </Link>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MangaInfo;

export async function getServerSideProps(context) {
  const { params } = context;

  const response = await fetch(
    `https://api.comick.app/comic/${params.mangainfo}`
  );
  const data = await response.json();

  return {
    props: {
      mangaIn: data,
    },
  };
}
