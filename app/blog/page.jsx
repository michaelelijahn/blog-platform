import Blogs from "@/components/Blogs";
import Header from "@/components/Header";

export default function SavedBlogs() {
  return (
    <>
      <Header/>
      <div className="flex flex-col justify-center mt-5 mb-20 sm:my-15 gap-5">
        <h1 className="header-text text-center sm:text-start">
          Your Saved Ideas
          <span className="blue-gradient"> and Favorite Perspectives</span>
        </h1>
        <p className="hidden text-start sm:flex sm:text-gray-500 text-xl">
          Revisit the blogs that inspired you. <br/>
        </p>
        <Blogs title={"Saved Blogs"} filterSaved={true} />
      </div>
    </>
  );
}