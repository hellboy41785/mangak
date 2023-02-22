import striptags from "striptags";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useMyMangaStore } from "../context/myMangaList";

const MangaInformation = ({ mangaIn }) => {
  const infos = mangaIn.comic;
  const info = {
    title: infos?.title,
    cover: {
      img: infos?.md_covers[0].b2key,
      w: infos?.md_covers[0].w,
      h: infos?.md_covers[0].h,
    },
    titles: infos.md_titles.slice(0, 4),
    tags: infos.mu_comics?.mu_comic_categories,
    about: infos.desc,
    slug: infos.slug,
    count: infos.last_chapter,
    id: infos.id,
    genres: infos?.md_comic_md_genres,
  };
  const cleanAbout = striptags(info.about).replace(/(https?:\/\/[^\s]+)/gi, "");
  const { myMangaLists, addNewManga, removeManga, addFollow } = useMyMangaStore(
    (state) => ({
      myMangaLists: state.myMangaLists,
      addNewManga: state.addNewManga,
      removeManga: state.removeManga,
      addFollow: state.addFollow,
    })
  );

  const Bookmark = () => {
    addNewManga({
      title: info.title,
      image: info.cover,
      slug: info.slug,
      count: info.count,
      id: info.id,
      reading: "0",
      follow: false,
    });
  };
  const [myList, setMyList] = useState();
  useEffect(() => {
    setMyList(myMangaLists);
  }, [myMangaLists]);


  const id = myList?.find((e) => e.id === info.id)?.id || null;


  return (
    <>
      <div className="flex justify-between ">
        <div className="flex flex-col gap-4 lg:flex-row">
          <img
            className="rounded-md"
            rel="preload"
            priority="high"
            src={`https://meo.comick.pictures/${info.cover.img}`}
            as={`${info.cover.img}`}
            width={640}
            height={700}
            alt="covers"
          />
          <div className="">
            <h1 className="text-2xl sm:text-3xl">{info.title}</h1>
            <div className="px-3 mt-5 border border-yellow-500 rounded-md flex-">
              <h1 className="text-sm ">Alternative name : </h1>
              {info.titles.map((title) => (
                <h2 key={title.title} className="mt-2 text-sm">
                  {title.title}
                </h2>
              ))}
            </div>

            <div className="w-full mt-5 dropdown dropdown-hover">
              <label tabIndex="0" className="m-1 btn">
                Tags
              </label>
              <ul
                tabIndex="0"
                className="flex-row p-2 shadow dropdown-content menu bg-base-100 rounded-box "
              >
                <>
                  {info.tags === undefined || null ? (
                    <>
                      {info.genres.map((genre) => (
                        <li key={genre.md_genres.slug}>
                          <a className="text-xs"> {genre.md_genres.name}</a>
                        </li>
                      ))}
                    </>
                  ) : (
                    <>
                      {info.tags.map((tag) => (
                        <li key={tag.mu_categories.slug}>
                          <a className="text-xs"> {tag?.mu_categories.title}</a>
                        </li>
                      ))}
                    </>
                  )}
                </>
              </ul>
            </div>
            <div className="mt-5 ">
              <p className="w-40 py-1 text-center text-black rounded-md bg-neutral-content text-1xl">
                Description
              </p>
              <p className="text-[18px] ">{cleanAbout}</p>
            </div>
            <div className="flex items-center gap-5 mt-10 text-2xl text-yellow-400">
              <div className="cursor-pointer">
                {id !== info.id && (
                  <div className="" onClick={() => Bookmark()}>
                    <div>
                      <BsBookmark />
                    </div>
                  </div>
                )}

                <div>
                  {myList?.map((book) => {
                    return (
                      <div key={book.id}>
                        {book.slug === info.slug && (
                          <div
                            className="flex items-center gap-3 "
                            key={book.id}
                          >
                            <div onClick={() => removeManga(book.slug)}>
                              <BsFillBookmarkFill />
                            </div>
                            <div className="flex gap-5 text-lg sm:text-xl">
                              Chapter Reading
                              <div className="p-1 px-20 text-black bg-yellow-400 rounded-md">
                                {book.reading} / {book.count}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MangaInformation;
