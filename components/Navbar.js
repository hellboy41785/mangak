import Link from "next/link";
import { useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
    setSearch([]);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchManga = async () => {
      try {
        const response = await fetch(
          `${process.env.CORS_URL}https://api.comick.app/search/?q=${search}`
        );
        const data = await response.json();
        if (isMounted) {
          setResult(data);
        }
      } catch (err) {}
    };
    if (search.length > 0) {
      fetchManga();
    } else {
      setResult([]);
    }
    return () => (isMounted = false);
  }, [search]);

  const dropDown = () => {
    return (
      <div className="shadow-sm">
        <ul className="grid grid-cols-2 md:grid-cols-3 flex-col gap-0 bg-[#372d20] rounded-md ">
          {result?.slice(0, 6).map((sh) => {
            return (
              <>
                <Link href={`/mangainformation/${sh.slug}`}>
                  <li
                    onClick={() => setSearch([])}
                    className="flex gap-3 p-2 w-full hover:bg-[#dca347] hover:text-black rounded-md items-center"
                  >
                    <img
                      className="rounded-md "
                      src={`https://meo.comick.pictures/${
                        sh?.md_covers === undefined
                          ? "k8wx3.jpg"
                          : sh?.md_covers[0].b2key
                      }`}
                      width={60}
                      height={50}
                      alt="cover"
                    />
                    <p>{sh.title}</p>
                  </li>
                </Link>
              </>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <>
      <div className="sticky top-0 z-50 flex flex-col items-center mt-3 shadow-sm ">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href="/" className="text-xl normal-case btn btn-ghost">
              Mangak
            </Link>
          </div>
          <div className="flex-none gap-2">
            <div className="">
              <form onSubmit={handleClick}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="w-full max-w-xs input input-bordered input-warning"
                />
              </form>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://img.icons8.com/clouds/500/null/naruto-sign.png" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <Link href={`/profile`}>
                  <li>
                    <p className="">My List</p>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div>{dropDown()}</div>
      </div>
    </>
  );
};

export default Navbar;
