import Blogs from "@/components/Blogs";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center mt-10 mb-20 sm:my-15 gap-5">
        <h1 className="header-text text-center sm:text-start">
          Your Hub for Fresh Ideas 
          <span className="blue-gradient"> and Bold Perspectives</span>
        </h1>
        <p className="hidden text-start sm:flex sm:text-gray-500 text-xl">
        Dive into a space where innovation meets inspiration. <br/>
        </p>

        <Blogs/>
      </div>
    </>
  );
}
