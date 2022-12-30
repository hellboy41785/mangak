import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import Sider from "../../components/Sider";
import Head from "next/head";

function mangaView({ read, info }) {
  
  return (
    <>
    <Head>
      <title>Chapter : {info.chapter.chap} </title>
      <link rel="icon" href="https://img.icons8.com/color/240/null/berserk.png"/>
    </Head>
      <Sider info={info} />
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="p-5 mb-6 text-2xl text-black bg-yellow-500 rounded-md">
          Translator Group : {info.chapter.group_name}
        </h1>
        {read.map((img) => {
          return (
            <div className="" key={img.s}>
              <Image
                src={
                  `https://meo3.comick.pictures/${img.b2key}` === 500
                    ? `https://meo2.comick.pictures/file/comick/${img.b2key}`
                    : `https://meo3.comick.pictures/${img.b2key}`
                }
                width={img.w}
                height={img.h}
                alt="chapters"
                priority="high"
              />
            </div>
          );
        })}
        <div className="flex items-center justify-center w-full mt-10 ">
          <Link href={`${info.prev?.hid}`}>
            <div
              className={`bg-base-300 rounded place-items-center p-2 ${
                info.prev?.chap === undefined ? "invisible" : "visible"
              }`}
            >
              <h1>{`Previous Chapter : ${info.prev?.chap}`}</h1>
            </div>
          </Link>
          <div
            className={`divider divider-horizontal ${
              info.prev?.chap === undefined ? "invisible" : "visible"
            } ${info.next?.chap === undefined ? "invisible" : "visible"}`}
          >
            OR
          </div>
          <Link href={`${info.next?.hid}`}>
            <div
              className={`bg-base-300 rounded place-items-center p-2  ${
                info.next?.chap === undefined ? "invisible " : "visible "
              }`}
            >
              <h1>{`Next Chapter : ${info.next?.chap}`}</h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default mangaView;

mangaView.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  const { params } = context;

  const response = await fetch(
    `https://api.comick.app/chapter/${params.mangaview}/?tachiyomi=false`
  );
  const data = await response.json();

  return {
    props: {
      read: data?.chapter?.md_images,
      info: data,
    },
  };
}
