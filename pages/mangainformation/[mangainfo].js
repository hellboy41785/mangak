import { info } from "daisyui/src/colors";
import Image from "next/image";
import striptags from "striptags";
import MangaInformation from "../../components/MangaInformation";
import { useState, useEffect,useContext } from "react";
import Link from "next/link";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Head from "next/head";

import { useMyMangaStore } from "../../context/myMangaList";

const MangaInfo = ({ mangaIn }) => {
  const [order, setOrder] = useState(true);
  const [orderValue, setOrderValue] = useState("0");
  const [mangaChap, setMangaChap] = useState([]);
  const [readingCount, setReadingCount] = useState("0")
  const addReading = useMyMangaStore((state) => state.addReading)





  
  
  useEffect(() => {
    const fetchMangaChapters = async () => {
      const response = await fetch(
        `https://api.comick.app/comic/${mangaIn.comic.id}/chapter?chap-order=${orderValue}&lang=en`,
        {
          headers:{
            'Access-Control-Allow-Origin': 'https://mangak.vercel.app',
          }
        }
      );
      const data = await response.json();
      setMangaChap(data);
    };
    fetchMangaChapters();
  }, [orderValue]);

 
  return (
    <>
    <Head>
      <title>{mangaIn?.comic.title}</title>
    </Head>
    <div className=" px-2 py-10 ">
      <MangaInformation mangaIn={mangaIn} readingCount={readingCount} />
      <div
        onClick={() => setOrder((prev) => !prev)}
        className="flex items-center gap-2 mt-10 cursor-pointer "
      >
        <h1
          onClick={() => (order ? setOrderValue("1") : setOrderValue("0"))}
          className="text-2xl "
        >
          Chapters
        </h1>
        <div className="">
          <h1 className="text-3xl">
            {order ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-5 md:grid-cols-7 ">
        {mangaChap.chapters?.map((chap) => {
          return (
            <div
            onClick={()=>addReading(mangaIn.comic.id,chap.chap)}
              key={chap.id}
              className="rounded-md bg-[#3e3322] hover:bg-yellow-500 hover:text-black flex items-center justify-center"
            >
              <Link href={`/chapterview/${chap.hid}`}>
                <h1 className="p-4 text-center">{chap.chap === null ? "0" : chap.chap}</h1>
                <p className="text-sm text-center">{chap.group_name}</p>
              </Link>
            </div>
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
