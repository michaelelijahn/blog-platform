"use client"
import Blogs from "@/components/Blogs";
import Header from "@/components/Header";
import CreateIcon from '@mui/icons-material/Create';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CREATOR_SECRET } from "./utils/utils";

export default function Home() {

  const { data : session } = useSession();
  const isCreator  = session?.user?.email === CREATOR_SECRET;

  return (
    <>
      <Header/>
      <div className="flex flex-col justify-center mt-5 mb-20 sm:my-15 gap-5">
        <h1 className="header-text text-center sm:text-start">
          Your Hub for Fresh Ideas 
          <span className="blue-gradient"> and Bold Perspectives</span>
        </h1>
        <p className="hidden text-start sm:flex sm:text-gray-500 text-xl">
          Dive into a space where innovation meets inspiration. <br/>
        </p>
        <Blogs title={"Most Recent Blogs"}/>
      </div>
      {(session?.user?.id && isCreator) && 
      <Link href="/create-blog" className="fixed bottom-5 right-8 sm:right-14 sm:bottom-10 md:right-6 md:bottom-10 shadow-2xl bg-blue-700 hover:bg-blue-800 py-4 px-5 text-center rounded-full text-white" >
        <div className="flex justify-center items-center gap-4 ">
          <p>Create Blog</p> 
          <CreateIcon sx={{color: "white", fontSize: 35}}/>
        </div>
      </Link> 
      };
    </>
  );
}
