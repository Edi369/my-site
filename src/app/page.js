import Initial from "@/pagesComponents/initial";
import About from "@/pagesComponents/about";

export default function Home() {
  return (
    <>
      <Initial />
      <About />
      {/* add more space for the footer */}
      <div className="py-30" />
    </>
  );
}