import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";

const LatestManga = ({ latest }) => {
  const info = latest.md_comics;
  const image = info?.md_covers[0].b2key;

  return (
    <>
      <div className="card w-[180px] bg-base-100 shadow-xl md:max-w-[186.25px] h-[383.5px] ">
        <figure className="">
          <img
           className="w-auto h-auto rounded-md "
            rel="preload"
            src={`https://meo.comick.pictures/${image}`}
            alt="manga"         
            priority="high"
            as={image}
          />
        </figure>
        <div className="px-2 card-body">
          <h2 className="text-sm truncate text-ellipsis ">{info.title}</h2>
          <p></p>
          <div className="">
            <Link href={`/mangainformation/${info.slug}`}>
              <div className="px-2 text-sm btn btn-outline btn-warning">
                Latest Chapter : {info.last_chapter}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestManga;
